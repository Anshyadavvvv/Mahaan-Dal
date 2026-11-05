import { readFileSync } from "node:fs";

for (const line of readFileSync(new URL("../.env.local", import.meta.url), "utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (!m) continue;
  process.env[m[1]] ??= m[2].replace(/^"|"$/g, "");
}

import { connectDB } from "../lib/db";
import { Letter, Grievance, Member } from "../lib/models";
import { grievanceSchema, letterSchema, memberSchema } from "../lib/validation";

async function main() {
  const letter = letterSchema.parse({
    name: "Diag Letter",
    mobile: "9876543210",
    consent: true,
    subject: "Hello subject",
    message: "This is a long enough message.",
    website: ""
  });
  const agri = grievanceSchema.safeParse({
    name: "Diag Jan",
    mobile: "9876543210",
    consent: true,
    district: "Lucknow",
    category: "agriculture",
    details: "This is a long enough grievance detail.",
    website: ""
  });
  const edu = grievanceSchema.safeParse({
    name: "Diag Jan",
    mobile: "9876543210",
    consent: true,
    district: "Lucknow",
    category: "education",
    details: "This is a long enough grievance detail.",
    attachment: "",
    website: ""
  });
  const member = memberSchema.safeParse({
    name: "Diag Member",
    mobile: "9876543210",
    consent: true,
    dob: "1990-01-15",
    gender: "",
    district: "Varanasi",
    address: "Village block 123",
    website: ""
  });
  console.log("agriculture", agri.success, agri.success ? "" : agri.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(" | "));
  console.log("education", edu.success, edu.success ? "" : edu.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(" | "));
  console.log("member", member.success, member.success ? "" : member.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(" | "));

  const uri = process.env.MONGODB_URI || "";
  const scheme = uri.split(":")[0];
  let parsed: URL | null = null;
  let parseError = "";
  try {
    parsed = new URL(uri.replace(/^mongodb(\+srv)?:/, "https:"));
  } catch (err) {
    parseError = err instanceof Error ? err.name : "parse failed";
  }
  const rawUser = uri.match(/^mongodb(?:\+srv)?:\/\/([^:/@]+)/)?.[1] || "";
  const passwordRaw = parsed?.password || "";
  let decoded = passwordRaw;
  try { decoded = decodeURIComponent(passwordRaw); } catch { decoded = passwordRaw; }
  console.log(JSON.stringify({
    scheme,
    parseError: parseError || null,
    userLen: parsed?.username.length ?? 0,
    userLooksEncoded: rawUser.includes("%"),
    passwordLen: decoded.length,
    passwordHasReserved: /[:/?#@\[\]%]/.test(decoded),
    passwordHasWhitespace: /\s/.test(decoded),
    passwordTrimChanges: decoded !== decoded.trim(),
    userHasWhitespace: parsed ? /\s/.test(decodeURIComponent(parsed.username)) : false,
    passwordIsEncoded: passwordRaw !== decoded,
    host: parsed?.hostname || null,
    db: parsed?.pathname || null,
    hasQuery: Boolean(parsed?.search)
  }));

  await connectDB();
  const stamp = Date.now();
  const l = await Letter.create({ ...letter, reference: `MD-DIAG-${stamp}` });
  const g = edu.success ? await Grievance.create({ ...edu.data, reference: `MD-DIAGG-${stamp}` }) : null;
  const m = member.success ? await Member.create({ ...member.data, reference: `MD-DIAGM-${stamp}` }) : null;
  const foundL = await Letter.findById(l._id).lean();
  const foundG = g ? await Grievance.findById(g._id).lean() : null;
  const foundM = m ? await Member.findById(m._id).lean() : null;
  console.log("letter", foundL?.name, foundL?.subject, foundL?.reference);
  console.log("grievance", foundG?.name, foundG?.category, foundG?.district);
  console.log("member", foundM?.name, foundM?.address, String(foundM?.dob));
  await Letter.deleteOne({ _id: l._id });
  if (g) await Grievance.deleteOne({ _id: g._id });
  if (m) await Member.deleteOne({ _id: m._id });
  console.log("cleaned test documents");
}

main().then(() => process.exit(0)).catch((err) => {
  console.error("FAIL", err?.name, err?.message);
  process.exit(1);
});
