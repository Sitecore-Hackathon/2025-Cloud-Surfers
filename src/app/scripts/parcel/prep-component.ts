import fs from 'fs';
import path from 'path';

/*
  DEPLOY - Step 1
  Prepare parcel files for build.
  We reuse these, replacing for each component to output
*/
/* UPDATE THIS PATH FOR YOUR COMPONENT TO DEPLOY */
prep('/src/components/AuthorHint/AuthorHint'); // TODO: pass component name from CLI


function prep(componentFile: string): void {
  writeParcelComponentFile(componentFile);
}

/**
 * Writes the metadata object to disk.
 * @param {Metadata} metadata metadata to write.
 */
function writeParcelComponentFile(componentFile: string): void {
    // console.log('TBD', instanceId); // TODO: use unique match for multiple components
  const rcComponentName = getComponentNameFromFile(componentFile);
  // const props = {}; // TODO: consider supporting props
  const file = `import React from 'react';
import { createRoot } from 'react-dom/client';
import AuthorHint from '${componentFile}';

const root = createRoot(document.getElementsByClassName('magic-box')[0]);
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
