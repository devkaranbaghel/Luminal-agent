import fs from 'fs';

const results = JSON.parse(fs.readFileSync('lint-results.json', 'utf8'));

for (const file of results) {
  if (file.errorCount === 0 && file.warningCount === 0) continue;
  
  let content = fs.readFileSync(file.filePath, 'utf8');
  let lines = content.split('\n');
  let changed = false;

  const messages = file.messages.sort((a,b) => b.line - a.line); // Reverse order to not mess up offsets if we added lines (we won't)

  for (const msg of messages) {
    if (msg.ruleId === '@typescript-eslint/no-explicit-any') {
      const lineIdx = msg.line - 1;
      if (lines[lineIdx]) {
        // Safe replacement on the specific line
        lines[lineIdx] = lines[lineIdx].replace(/any/g, 'unknown');
        changed = true;
      }
    } else if (msg.ruleId === '@typescript-eslint/no-unused-vars') {
      const lineIdx = msg.line - 1;
      const match = msg.message.match(/'([^']+)' is/);
      if (match && lines[lineIdx]) {
        const varName = match[1];
        if (!varName.startsWith('_')) {
          // Add underscore
          const regex = new RegExp(`\\b${varName}\\b`, 'g');
          lines[lineIdx] = lines[lineIdx].replace(regex, `_${varName}`);
          // special fix for imports where it might be structured
          lines[lineIdx] = lines[lineIdx].replace(`_${varName},`, '');
          lines[lineIdx] = lines[lineIdx].replace(`, _${varName}`, '');
          lines[lineIdx] = lines[lineIdx].replace(`import { _${varName} }`, 'import { }');
          changed = true;
        }
      }
    } else if (msg.ruleId === 'react/no-unescaped-entities') {
      const lineIdx = msg.line - 1;
      if (lines[lineIdx]) {
        lines[lineIdx] = lines[lineIdx].replace(/'/g, "&apos;");
        changed = true;
      }
    }
  }

  if (changed) {
    fs.writeFileSync(file.filePath, lines.join('\n'), 'utf8');
  }
}
