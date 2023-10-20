import path from 'path';

export default function (source) {
  const componentName = JSON.stringify(path.basename(this.resourcePath, path.extname(this.resourcePath)));
  return source.replace('__COMPONENT_NAME__', componentName);
};
