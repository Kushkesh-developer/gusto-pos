import fs from 'fs';

function removeExtraBlankLines(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // Remove consecutive blank lines or lines that contain only whitespace
  const cleanedContent = fileContent.replace(/^\s*\n/gm, '');

  fs.writeFileSync(filePath, cleanedContent, 'utf-8');
}

// Pass the output directory or specific files
const filePaths = process.argv.slice(2);
filePaths.forEach(removeExtraBlankLines);
