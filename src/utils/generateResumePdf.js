// Generates a clean, ATS-ready 1-page A4 PDF file directly in the browser
// so "Download PDF" works reliably on mobile & desktop without window.print().

function escapePdfText(str) {
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[^\x20-\x7E]/g, '-');
}

function wrapText(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = '';
  for (const w of words) {
    if ((current + ' ' + w).trim().length > maxChars) {
      if (current) lines.push(current.trim());
      current = w;
    } else {
      current = (current + ' ' + w).trim();
    }
  }
  if (current) lines.push(current.trim());
  return lines;
}

export function downloadResumePdf() {
  const ops = [];
  let y = 790;

  const addText = (text, x, size = 10, font = 'F1') => {
    ops.push(`BT /${font} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${escapePdfText(text)}) Tj ET`);
  };

  const addLine = (yPos) => {
    ops.push(`0.8 w 45 ${yPos} m 550 ${yPos} l S`);
  };

  const addSectionHeading = (title) => {
    y -= 10;
    addLine(y + 10);
    addText(title, 45, 10.5, 'F2');
    y -= 15;
  };

  const addParagraph = (text, x = 45, size = 9.5, maxChars = 94, font = 'F1') => {
    const lines = wrapText(text, maxChars);
    for (const line of lines) {
      addText(line, x, size, font);
      y -= size + 3.5;
    }
  };

  // Header
  addText('Rishabh Sonawane - B.Tech Data Science Student', 45, 16, 'F2');
  y -= 16;
  addText(
    'Palghar, Maharashtra, India | rishabhsonawane333@gmail.com | github.com/DataByRishabh',
    45,
    9,
    'F1'
  );
  y -= 12;
  addText('linkedin.com/in/rishabh-sonawane-554014387 | github.com/risdev18', 45, 9, 'F1');
  y -= 10;

  // Profile
  addSectionHeading('PROFILE');
  addParagraph(
    'B.Tech Data Science student (2025-2029) focused on Business Intelligence, Data Analytics, and AI/ML exploration. Experienced in building executive Power BI dashboards with DAX and relational data modeling, practicing SQL queries, and co-authoring peer-reviewed academic research.'
  );

  // Research & Projects
  addSectionHeading('RESEARCH & PROJECTS');

  addText('Published Research - MAT Journals (Vol. 12, Issue 1 | Apr 2026)', 45, 10, 'F2');
  y -= 13;
  addParagraph(
    '- Co-authored published paper: "Statistical Machine Learning-based Odometry Correction for Cost-effective Indoor Robot Localization" (e-ISSN: 2581-7647).',
    52,
    9,
    90
  );
  addParagraph(
    '- Team won 3rd Prize at the National Level Anveshnam Workshop (SJCEM) for cost-effective indoor robot localization.',
    52,
    9,
    90
  );

  y -= 4;
  addText('E-Commerce Sales & Business Performance - Power BI (2025 - 2026)', 45, 10, 'F2');
  y -= 13;
  addParagraph(
    '- Built an interactive Power BI dashboard tracking 3.35M Total Revenue, 1.26M Net Profit, 35.83% Profit Margin, 1,425 Orders, INR 2,347.58 AOV, and 300 Customers.',
    52,
    9,
    90
  );
  addParagraph(
    '- Modeled relational table links across OrdersTable, ProductsTable, and DateTable with custom DAX measures and Category/Date slicers.',
    52,
    9,
    90
  );

  y -= 4;
  addText('Autonomous Robotics Car - Hardware Engineering (2026)', 45, 10, 'F2');
  y -= 13;
  addParagraph(
    '- Engineered a three-wheel robotic chassis with dual DC geared motors, dual servo motors, and a custom OLED display.',
    52,
    9,
    90
  );

  y -= 4;
  addText('AI-Assisted Product Concepts - Vyronix & Relief Hospital (2026)', 45, 10, 'F2');
  y -= 13;
  addParagraph(
    '- Designed fitness telemetry flows (Vyronix) and normalized healthcare data schemas (Relief Hospital) using AI-assisted workflows.',
    52,
    9,
    90
  );

  // Education
  addSectionHeading('EDUCATION');
  addText('2025 - 2029   B.Tech in Data Science - St. John College of Engineering and Management', 45, 9.5, 'F1');
  y -= 13;
  addText('HSC           Higher Secondary Certificate (HSC) - AECS-1, Tarapur', 45, 9.5, 'F1');
  y -= 13;
  addText('SSC           Secondary School Certificate (SSC) - Don Bosco School, Boisar', 45, 9.5, 'F1');
  y -= 10;

  // Skills & Certifications
  addSectionHeading('SKILLS & CERTIFICATIONS');
  addParagraph('BI & Analytics: Microsoft Power BI Desktop, DAX, Data Modeling, Power Query, KPI Design', 45, 9, 92);
  addParagraph('Data & Code: SQL (Beginner-Intermediate), C, C++', 45, 9, 92);
  addParagraph(
    'Certifications: AI Skills Passport (EY & Microsoft), Data Analyst 101 (Microsoft & Simplilearn), LLM For Young Developers (IndiaAI & Meta), Python for Prompt Engineering',
    45,
    9,
    92
  );
  addParagraph('Languages: English (Fluent), Hindi (Fluent), Marathi (Native)', 45, 9, 92);

  const streamContent = ops.join('\n');
  const objects = [
    '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj',
    '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj',
    '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >> endobj',
    `4 0 obj << /Length ${streamContent.length} >> stream\n${streamContent}\nendstream endobj`,
    '5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj',
    '6 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> endobj',
  ];

  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  for (const obj of objects) {
    offsets.push(pdf.length);
    pdf += obj + '\n';
  }
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  const blob = new Blob([pdf], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Rishabh_Sonawane_Resume.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
