const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'app.html');
const html = fs.readFileSync(file, 'utf8');

// Multiple <style> blocks are valid. The old validator incorrectly required
// exactly one block, which caused the GitHub Action to fail before building.
const opens = (html.match(/<style\b/gi) || []).length;
const closes = (html.match(/<\/style>/gi) || []).length;
if (opens !== closes) {
  throw new Error(`UI CSS structure invalid: ${opens} <style> opens / ${closes} </style> closes.`);
}

const bodyMatch = /<body\b/i.exec(html);
if (!bodyMatch) throw new Error('UI structure invalid: <body> not found.');
const bodyPos = bodyMatch.index;
const headEnd = html.search(/<\/head>/i);
if (headEnd < 0) throw new Error('UI structure invalid: </head> not found.');

// Every style block must live in <head>; none may be injected into the body.
const bodyHtml = html.slice(bodyPos);
if (/<style\b/i.test(bodyHtml)) {
  throw new Error('UI CSS structure invalid: <style> found inside <body>.');
}

// Catch the original CSS-leak failure mode: a CSS selector appearing as
// visible text immediately in the body before normal markup.
const suspicious = /(?:^|>)\s*(?:\.[A-Za-z_-][\w-]*|#[A-Za-z_-][\w-]*|@media\b|@supports\b)\s*\{/m;
if (suspicious.test(bodyHtml)) {
  throw new Error('UI CSS structure invalid: CSS-like text detected in body.');
}

// Inline logo must not depend on an external branding image.
if (!/href=["']data:image\//i.test(html) || !/side-brand[^>]*>\s*<img[^>]*src=["']data:image\//is.test(html)) {
  throw new Error('Inline branding logo validation failed.');
}

if (!/overflow-y:auto!important/i.test(html)) {
  throw new Error('Sidebar scroll guard missing.');
}

console.log(`UI structure validation PASS (${opens} style blocks, all in head)`);
