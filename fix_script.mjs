import fs from 'fs';

const results = JSON.parse(fs.readFileSync('lint-results.json', 'utf8'));

for (const file of results) {
  if (file.errorCount === 0 && file.warningCount === 0) continue;
  
  let content = fs.readFileSync(file.filePath, 'utf8');
  let originalContent = content;

  // Fix catch block tyings safely
  content = content.replace(/catch\s*\(\s*([a-zA-Z0-9_]+)\s*:\s*any\s*\)/g, 'catch ($1: unknown)');

  // Unescaped entities for common words in JSX
  content = content.replace(/\bdon't\b/g, "don&apos;t");
  content = content.replace(/\bdidn't\b/g, "didn&apos;t");
  content = content.replace(/\bcan't\b/g, "can&apos;t");
  content = content.replace(/\bwon't\b/g, "won&apos;t");
  content = content.replace(/\bYou're\b/g, "You&apos;re");
  content = content.replace(/\byou're\b/g, "you&apos;re");
  content = content.replace(/\bI'm\b/g, "I&apos;m");
  content = content.replace(/\bI'll\b/g, "I&apos;ll");
  content = content.replace(/\bIt's\b/g, "It&apos;s");
  content = content.replace(/\bit's\b/g, "it&apos;s");
  content = content.replace(/\bwe'll\b/g, "we&apos;ll");
  content = content.replace(/\bWe're\b/g, "We&apos;re");
  content = content.replace(/\bwe're\b/g, "we&apos;re");
  content = content.replace(/\blet's\b/g, "let&apos;s");
  content = content.replace(/\bLet's\b/g, "Let&apos;s");

  if (content !== originalContent) {
    fs.writeFileSync(file.filePath, content, 'utf8');
  }
}
console.log("Safe string replacements complete.");
