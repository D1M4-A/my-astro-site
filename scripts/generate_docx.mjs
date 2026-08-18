import fs from 'fs/promises';
import path from 'path';
import { Document, Packer, Paragraph, TextRun } from 'docx';

async function run() {
  const repoRoot = path.resolve('.');
  const mdPath = path.join(repoRoot, 'README_SUPABASE.md');
  const outPath = path.join(repoRoot, 'Supabase_Integration_Documentation.docx');

  let md = '';
  try {
    md = await fs.readFile(mdPath, 'utf8');
  } catch (e) {
    console.error('Could not read README_SUPABASE.md:', e.message);
    process.exit(1);
  }

  // Convert markdown/plain text to simple paragraphs. Keep lines and blank lines.
  const lines = md.split(/\r?\n/);

  const doc = new Document({ sections: [], creator: 'Bambulogy Group', title: 'Supabase Integration Documentation', description: 'Supabase integration scaffold and migration instructions' });
  const children = [];

  for (const line of lines) {
    if (line.trim() === '') {
      children.push(new Paragraph(''));
      continue;
    }
    // No styling: output every non-empty line as a plain paragraph
    if (/^```/.test(line)) {
      // Skip code fence markers entirely
      continue;
    }
    const run = new TextRun({ text: line });
    children.push(new Paragraph({ children: [run] }));
  }

  doc.addSection({ children });

  const buffer = await Packer.toBuffer(doc);
  await fs.writeFile(outPath, buffer);
  console.log('Wrote', outPath);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
