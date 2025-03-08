import SDK from '@sitecore-feaas/sdk';
import fs from 'fs';
import uploadMediaToSitecore, { UploadMediaToSitecoreProps } from 'lib/sitecore-media/uploadMediaToSitecore';
import path from 'path';

/*
  DEPLOY -Step 3
  Push latest Parcel component output to Sitecore FEaaS
*/

/* UPDATE THIS PATH FOR YOUR COMPONENT TO DEPLOY */
deploy('AuthorHint', 'Cat Fact'); // TODO: pass name from CLI/script

const SitecoreRootPath = process.env.MEDIA_IMPORT_ROOT_PATH_WITHOUT_MEDIA;
const EdgeLibrary = process.env.MEDIA_EDGE_ENDPOINT;

async function deploy(name: string, feaasName: string): Promise<void> {
  const styles = readStyles();
  const js = readJS();

  const jsRef = await publishToMediaLib(name, js);
  
  await pushToComponentService(feaasName, styles, jsRef);
}

// ============ READ JS AND CSS FROM PARCEL OUTPUT =====================

function readStyles(): string {
  const filePath = path.resolve('dist/index.html');
  const file = fs.readFileSync(filePath, { encoding: 'utf8' });
  const cssFileName = extractStyleSrc(file);
  const styles = fs.readFileSync(`dist/${cssFileName}`, { encoding: 'utf8' });
  return styles;
}

function readJS(): string {
  const filePath = path.resolve('dist/index.html');
  const file = fs.readFileSync(filePath, { encoding: 'utf8' });
  const jsFileName = extractScriptSrc(file);
  const js = fs.readFileSync(`dist/${jsFileName}`, { encoding: 'utf8' });
  return js;
}

function extractStyleSrc(htmlString: string) {
  const match = htmlString.match(/<link[^>]+href=["']([^"']+)["']/);
  return match ? match[1] : null;
}

function extractScriptSrc(htmlString: string) {
  const match = htmlString.match(/<script[^>]+src=["']([^"']+)["']/);
  return match ? match[1] : null;
}

// ============ UPLOAD JS TO MEDIA LIB =====================
async function publishToMediaLib(name: string, contents: string): Promise<string> {
    
  const mediaProps: UploadMediaToSitecoreProps = {
    content: contents,
    mediapath: name,
    fileName: `${name}.js`, // Needs file extension for Media Lib to import correctly
    publishItem: true,
  };

  console.log('UPLOADING to Sitecore...', name, `${contents.substring(0, 20)}...`);
  const uploadMediaInSitecoreResponse = await uploadMediaToSitecore(mediaProps);
  // NOTE: this just kicks off publishing, does not wait for it.
  console.log('UPLOAD SUCCESS',uploadMediaInSitecoreResponse)
  
  // Match the published url (optimistically)
  const jsRef = `${EdgeLibrary}/${SitecoreRootPath}${name}.js`; // NOTE: needs .js suffix to load
  return jsRef;
}

// ====================================== UPLOAD COMPONENT TO FEAAS =======================

async function pushToComponentService(componentName: string, styles: string, jsRef: string) {
    const instanceId = 'Ie9TtFs25F'; // DO WE NEED THIS?
    const defaultStyles = `
    .magic-box {
        grid-column: 1;
        grid-column-end: 13;
        grid-row: 1;
        grid-row-end: 6;
        order: 0;
        position: relative;
        ---self--display: flex;
        display: var(---self--display);
        flex-wrap: nowrap;
        flex-direction: column;
        justify-content: stretch;
        align-items: stretch;
        row-gap: calc(var(---supports--flex-gap, 0)* var(---spacing--row-gap));
        column-gap: calc(var(---supports--flex-gap, 0)* var(---spacing--column-gap));
        max-width: min(var(---self--max-available-width, 100%), var(---self--max-width, 100%));
    }`
    ;
  const view = `<style data-format-version=\"30\">${defaultStyles} ${styles}</style><section class=\"-grid--custom\" data-instance-id=\"${instanceId}\"><div class="magic-box"></div><div class=\"-embed\" data-embed-src=\"${jsRef}\"></div></section>`;
  await uploadToFEaaS(componentName, view);
}

const sdk = new SDK({
  // API key to access the library (can be found in Library settings in web app)
  apiKey: 'BwN_3EsCzMVKB5ROW38PO3Avp6uLtzj6',

  // enable logging
  verbose: true,

  // Optional: Configuring the non-production environment
  backend: 'https://components.sitecorecloud.io/api',
  frontend: 'https://components.sitecorecloud.io',
  cdn: `https://feaas.blob.core.windows.net`,
});

// ASSUMES COMPONENT ALREADY EXISTS. THIS WILL REPLACE CONTENTS on saved slot of latest version.
const uploadToFEaaS = async (componentName:string, view: string) => {
  // TODO - make more dynamic
  const libraryId = '4pYetcyUyDv5bBt13c2X8W';

  // Access library
  const library = await sdk.libraries.get({ id: libraryId });

  // Fetch all dependent resources (components, stylesheets, datasources)
  // Everything EXCLUDING component versions
  await library.fetchAll();

  // Can access components now:
  for (const collection of library.collections) {
    console.log('- Collection', collection.name);
    for (const component of collection.components) {
      if (component.name == componentName) {
        console.log('  |- Component', component.name);
        // for (const version of await component.versions.fetch()) {
        //   console.log('    |- Version: ', version.name);
        // }
        const versions = await component.versions.fetch();
        const maxR = versions.reduce((x, v) => {
            const maxV = Math.max(x.number, v.revision);
        return {number: maxV, id: maxV == x.number ? x.id : v.id}}, {number: 0, id: ''});
        console.log('MAX R', maxR);

        // NOTE: target 'saved' version to edit latest. Use Component builder to stage and publish.
        const v = await versions.get({ revision: maxR.number, status: 'saved', id: maxR.id });
        if (v.revision == maxR.number) {
          v.view = view;
          console.log('SAVING view', v.view);
          v.revision++; // IMPORTANT: must update revision for it to save!!
          v.modifiedAt = new Date();
          await v.adapter.save(v);
          return;
        }
      }
    }
  }
};
