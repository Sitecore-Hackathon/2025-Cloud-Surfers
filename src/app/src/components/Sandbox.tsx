import { SDK } from '@sitecore-feaas/sdk';
import { useEffect } from 'react';

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

export const Sandbox = (): JSX.Element => {
  // const [component, setComponent] = useState<ComponentModel>();
  /*
  <feaas-component class="-feaas" cdn="https://feaas.blob.core.windows.net"
  // library="4pYetcyUyDv5bBt13c2X8W"
  // version="responsive"
  // component="BHm25POe2I"
  // instance="fgmZxV6rSmASVru" revision="staged" fetch="">
  //  */
  useEffect(() => {
    const runAsync = async () => {
      // Access library
      const library = await sdk.libraries.get({ id: '4pYetcyUyDv5bBt13c2X8W' });

      // Fetch all dependent resources (components, stylesheets, datasources)
      // Everything EXCLUDING component versions
      await library.fetchAll();

      // Can access components now:
      for (const collection of library.collections) {
        console.log('- Collection', collection.name);
        for (const component of collection.components) {
          if (component.name == 'Cat Fact') {
            console.log('  |- Component', component.name);
            // for (const version of await component.versions.fetch()) {
            //   console.log('    |- Version: ', version.name);
            // }
            const versions = await component.versions.fetch();
            const maxR = versions.reduce((x, v) => Math.max(x, v.revision), 0);
            console.log('MAX R', maxR);

            const v = await versions.get({ revision: maxR, status: 'saved', id: 'kXB7h9YxoI' });
            if (v.revision == maxR) {
              v.view = v.view.replace('TADAA!!!', '**AHA');
              console.log(v.view);
              v.revision++;
              // await v.adapter.save(v);
              break;
            }
          }
        }
      }

      //   const comp = await fetchComponent({
      //     component: 'BHm25POe2I',
      //     library: '4pYetcyUyDv5bBt13c2X8W',
      //     cdn: 'https://feaas.blob.core.windows.net',
      //   });
    };

    runAsync();
  }, []);

  return <h1>Hello World</h1>;
};
