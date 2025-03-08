import fs from 'fs';
import path from 'path';

/*
  METADATA GENERATION
  Generates the /src/temp/metadata.json file which contains application 
  configuration metadata that is used for Sitecore XM Cloud integration.
*/
prep('/src/components/AuthorHint/AuthorHint');
// TODO: pass component name from CLI

function prep(componentFile: string): void {
  writeParcelComponentFile(componentFile);
}

/**
 * Writes the metadata object to disk.
 * @param {Metadata} metadata metadata to write.
 */
function writeParcelComponentFile(componentFile: string): void {
  const rcComponentName = getComponentNameFromFile(componentFile);
  // const props = {}; // TODO: consider supporting props
  const file = `import React from 'react';
import { createRoot } from 'react-dom/client';
import AuthorHint from '${componentFile}';

const root = createRoot(document.getElementById('app'));
root.render(<${rcComponentName} />);
`;
  const filePath = path.resolve('src/parcel/component.js');
  console.log(`Writing parcel file to ${filePath}`);
  fs.writeFileSync(filePath, file, { encoding: 'utf8' });
}

function getComponentNameFromFile(path: string) {
  const segments = path.split('/');
  return segments[segments.length - 1];
}
