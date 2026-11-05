import { NextRequest, NextResponse } from "next/server";
import { ZodSchema } from "zod";
import { connectDB } from "./db";
import { Letter, Grievance, Member } from "./models";

const buckets = new Map<string, { n: number; at: number }>();

export function rateLimit(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || now - b.at > 60000) {
    buckets.set(ip, { n: 1, at: now });
    return false;
  }
  b.n++;
  return b.n > 8;
}

export async function save(req: NextRequest, schema: ZodSchema, tableName: string) {
  if (rateLimit(req))
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  try {
    const raw = await req.json();
    if (raw.website) return NextResponse.json({ error: "Invalid submission." }, { status: 400 });

    const data = schema.parse({ ...raw, consent: raw.consent === "true" || raw.consent === true });
    if (data.attachment && Buffer.byteLength(data.attachment, "base64") > 5 * 1024 * 1024)
      return NextResponse.json({ error: "Attachment exceeds 5 MB." }, { status: 400 });

    const reference = `MD-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    
    await connectDB();
    
    const modelMap: Record<string, any> = {
      letters: Letter,
      grievances: Grievance,
      members: Member
    };
    
    const Model = modelMap[tableName];
    if (!Model) {
      return NextResponse.json({ error: "Invalid table name." }, { status: 400 });
    }
    
    await Model.create({ ...data, reference });

    return NextResponse.json({ ok: true, reference }, { status: 201 });
  } catch (err: any) {
    if (err?.name === "ZodError")
      return NextResponse.json({ error: "Please check the required fields and mobile number." }, { status: 400 });
    if (err?.name === "ValidationError" || err?.code === 11000) {
      return NextResponse.json({ error: "Validation failed or duplicate entry." }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json({ error: "Submission could not be saved. Please try again." }, { status: 500 });
  }
}