import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import { Letter, Grievance, Member } from "@/lib/models";

const tables = { letters: "letters", jan: "grievances", members: "members" } as const;
type Tab = keyof typeof tables;

function authorized(req: NextRequest) {
  const token = req.cookies.get("md-admin")?.value;
  if (!token || !process.env.JWT_SECRET) return false;
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

const modelMap: Record<Tab, any> = {
  letters: Letter,
  jan: Grievance,
  members: Member,
};

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const tab = (req.nextUrl.searchParams.get("tab") || "letters") as Tab;
  if (!(tab in tables)) return NextResponse.json({ error: "Invalid tab" }, { status: 400 });

  const q = req.nextUrl.searchParams.get("q") || "";
  const status = req.nextUrl.searchParams.get("status") || "";

  await connectDB();

  const Model = modelMap[tab];
  let query = Model.find().sort({ createdAt: -1 }).limit(500);

  if (status) query = query.where("status", status);
  if (q) {
    query = query.or([
      { name: { $regex: q, $options: "i" } },
      { mobile: { $regex: q, $options: "i" } },
      { district: { $regex: q, $options: "i" } },
    ]);
  }

  const items = await query.lean();
  if (!items) return NextResponse.json({ error: "No data found" }, { status: 500 });

  if (req.nextUrl.searchParams.get("csv") === "1") {
    const cols = Object.keys(items[0] || { name: "", mobile: "", status: "", createdAt: "" });
    const csv = [
      cols.join(","),
      ...items.map((item: any) => cols.map((c) => `"${String(item[c] ?? "").replaceAll('"', '""')}"`).join(","))
    ].join("\r\n");
    return new NextResponse(csv, {
      headers: {
        "content-type": "text/csv",
        "content-disposition": `attachment; filename="${tab}.csv"`,
      },
    });
  }

  return NextResponse.json({ items: items || [] });
}

export async function PATCH(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, status } = await req.json();
  if (!["new", "in progress", "resolved"].includes(status))
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });

  const tab = (req.nextUrl.searchParams.get("tab") || "letters") as Tab;
  if (!(tab in tables)) return NextResponse.json({ error: "Invalid tab" }, { status: 400 });

  await connectDB();

  const Model = modelMap[tab];
  const updated = await Model.findByIdAndUpdate(id, { status }, { new: true });
  if (!updated) return NextResponse.json({ error: "Record not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}