import fs from 'fs';
import commonmark from 'commonmark';

export default function fetchData(config) {
  return new Promise((resolve, reject) => {
    const content = fs.readFileSync(__dirname + '/index.md', 'utf-8');
    const reader = new commonmark.Parser();
    const writer = new commonmark.HtmlRenderer();
    const parsed = reader.parse(content);
    return resolve({ content: writer.render(parsed) });
  });
}
