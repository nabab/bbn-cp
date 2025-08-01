import fs from 'fs';
import path from 'path';

const componentsDir = path.resolve('./src/components');

function generateIndexFile(i18nDir, componentName) {
  const files = fs.readdirSync(i18nDir)
    .filter(f => f.endsWith('.lang'));

  if (files.length === 0) return;

  const imports = [];
  const entries = [];

  for (const file of files) {
    const match = file.match(new RegExp(`^${componentName}\\.([a-z]{2})\\.lang$`));
    if (!match) continue;

    const lang = match[1];
    imports.push(`import ${lang} from './${file}';`);
    entries.push(`  ${lang}`);
  }

  const content = `${imports.join('\n')}

export default {
${entries.join(',\n')}
};
`;

  const indexPath = path.join(i18nDir, 'index.js');
  fs.writeFileSync(indexPath, content);
  console.log(`✅ Created ${indexPath}`);
}

function processComponents() {
  const components = fs.readdirSync(componentsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  for (const component of components) {
    const i18nDir = path.join(componentsDir, component, '_i18n');
    if (fs.existsSync(i18nDir) && fs.statSync(i18nDir).isDirectory()) {
      generateIndexFile(i18nDir, component);
    }
  }
}

processComponents();
