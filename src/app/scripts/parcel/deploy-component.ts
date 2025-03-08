import SDK from '@sitecore-feaas/sdk';
import fs from 'fs';
import path from 'path';

/*
  METADATA GENERATION
  Generates the /src/temp/metadata.json file which contains application 
  configuration metadata that is used for Sitecore XM Cloud integration.
*/
deploy('AuthorHint'); // TODO: pass name

async function deploy(name: string): Promise<void> {
  const styles = readStyles();
  const js = readJS();

  await publishToMediaLib(name, js);

  const jsRef = `https://edge.sitecorecloud.io/americaneag94e0-eaglekitba18-demo1b79-2869/media/Project/clientprefix/CloudSurfers/${name}.js`; // NOTE: needs .js suffix to load
  await pushToComponentService(styles, jsRef);
}

// ============ READ JS AND CSS FROM PARCEL OUTPUT =====================

function readStyles(): string {
  const filePath = path.resolve('dist/index.html');
  console.log(`reading parcel file ${filePath}`);
  const file = fs.readFileSync(filePath, { encoding: 'utf8' });
  const cssFileName = extractStyleSrc(file);
  const styles = fs.readFileSync(`dist/${cssFileName}`, { encoding: 'utf8' });
  return styles;
}

function readJS(): string {
  const filePath = path.resolve('dist/index.html');
  console.log(`reading parcel file ${filePath}`);
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
function publishToMediaLib(name: string, contents: string) {
  console.log(name, contents.substring(0, 20));
}

// ====================================== UPLOAD COMPONENT TO FEAAS =======================

async function pushToComponentService(styles: string, jsRef: string) {
  const view = `<styles>${styles}</styles><section class=\"-grid--custom\" data-instance-id=\"Ie9TtFs25F\"><div><h1 class=\"-heading1--fisher--heading\" data-instance-id=\"Rcyt5iTKJ3\">alert(\"hi\");</h1><p class=\"-lines-- -palette--E85e0KXcyt\" data-instance-id=\"C42NPwzfp6\"><var data-path=\"x8bdvhKTE7.fact\"></var></p><button class=\"-button--fisher--button--hover\" data-instance-id=\"4MwwlunW11\">Click me</button></div><div class=\"-embed\" data-embed-src=\"${jsRef}\"><mycomponent example=\"myprop\"></mycomponent></div></section><div id="app"></div>`;
  await uploadToFEaaS(view);
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
const uploadToFEaaS = async (view: string) => {
  // TODO - make more dynamic
  const libraryId = '4pYetcyUyDv5bBt13c2X8W';
  const componentName = 'Cat Fact';

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
        const maxR = versions.reduce((x, v) => Math.max(x, v.revision), 0);
        console.log('MAX R', maxR);

        // NOTE: target 'saved' version to edit latest. Use Component builder to stage and publish.
        const v = await versions.get({ revision: maxR, status: 'saved', id: 'kXB7h9YxoI' });
        if (v.revision == maxR) {
          v.view = view;
          // console.log(v.view);
          v.revision++; // IMPORTANT: must update revision for it to save!!
          await v.adapter.save(v);
          break;
        }
      }
    }
  }
};
