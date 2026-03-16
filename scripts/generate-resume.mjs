import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const lines = [
  { font: "F2", size: 24, x: 72, y: 740, text: "Junhao Resume Template" },
  { font: "F1", size: 11, x: 72, y: 718, text: "Replace this file with your actual resume PDF before you submit the site." },
  { font: "F2", size: 13, x: 72, y: 678, text: "Header" },
  { font: "F1", size: 11, x: 72, y: 658, text: "Name | Professional email | Phone | LinkedIn | GitHub | City, State" },
  { font: "F2", size: 13, x: 72, y: 624, text: "Education" },
  { font: "F1", size: 11, x: 72, y: 604, text: "University, Degree / Major, Expected Graduation" },
  { font: "F1", size: 11, x: 72, y: 586, text: "Add relevant coursework, GPA, honors, or scholarships if helpful." },
  { font: "F2", size: 13, x: 72, y: 552, text: "Experience" },
  { font: "F1", size: 11, x: 72, y: 532, text: "Role, Organization, Dates - 2 to 4 bullets focused on contribution and impact." },
  { font: "F1", size: 11, x: 72, y: 514, text: "Use strong verbs and keep each bullet concise and outcome-oriented." },
  { font: "F2", size: 13, x: 72, y: 480, text: "Projects" },
  { font: "F1", size: 11, x: 72, y: 460, text: "Project title, tools, and a short summary of problem, approach, and result." },
  { font: "F1", size: 11, x: 72, y: 442, text: "Add repo, report, dashboard, or demo links when possible." },
  { font: "F2", size: 13, x: 72, y: 408, text: "Skills" },
  { font: "F1", size: 11, x: 72, y: 388, text: "Programming, data tools, visualization, and communication strengths." },
  { font: "F2", size: 13, x: 72, y: 354, text: "Reminder" },
  { font: "F1", size: 11, x: 72, y: 334, text: "If you already have a polished resume, replace this template directly and keep the same filename." },
];

function escapePdfText(text) {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

const stream = [
  "BT",
  ...lines.flatMap((line) => [
    `/${line.font} ${line.size} Tf`,
    `1 0 0 1 ${line.x} ${line.y} Tm`,
    `(${escapePdfText(line.text)}) Tj`,
  ]),
  "ET",
].join("\n");

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>",
  `<< /Length ${Buffer.byteLength(stream, "utf8")} >>\nstream\n${stream}\nendstream`,
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
];

let pdf = "%PDF-1.4\n";
const offsets = [0];

objects.forEach((object, index) => {
  offsets.push(Buffer.byteLength(pdf, "utf8"));
  pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
});

const xrefOffset = Buffer.byteLength(pdf, "utf8");

pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += "0000000000 65535 f \n";

for (let i = 1; i < offsets.length; i += 1) {
  pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
}

pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

const output = resolve("assets", "files", "junhao-resume-template.pdf");
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, pdf, "binary");
