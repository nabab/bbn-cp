import fs from 'node:fs';
import path from 'node:path';

const folderPath = path.join(import.meta.dirname, 'src', 'components');
const components = [];
const isFile = fileName => {
  return fs.lstatSync(fileName).isFile();
};
const scanPath = dirPath => {
  fs.readdirSync(dirPath).forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (isFile(fullPath)) {
      if (file.endsWith('.js')) {
        const script = fs.readFileSync(fullPath, 'utf8');
        const htmlFilePath = fullPath.replace('.js', '.html');
        let htmlContent = '';
        if (fs.existsSync(htmlFilePath)) {
          htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
        }

        const cssFilePath = fullPath.replace('.js', '.css');
        let cssContent = '';
        if (fs.existsSync(cssFilePath)) {
          cssContent = fs.readFileSync(cssFilePath, 'utf8');
        }

        if (script?.length && htmlContent?.length) {
          const p  = dirPath.substring(folderPath.length + 1);
          let name = p.split(path.sep).join('-');
          components.push({
            name: `testapp-${name}`,
            script: script,
            content: htmlContent,
            css: cssContent
          });
        }
      }
    }
    else {
      scanPath(dirPath + '/' + file);
    }
  });
};

scanPath(folderPath);
fs.writeFile(
  path.join(import.meta.dirname, 'src', 'js', 'components.js'),
  `export default ${JSON.stringify(components, null, 2)};`,
  'utf8',
  err => {}
);
export default components;