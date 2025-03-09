![Hackathon Logo](docs/images/hackathon.png?raw=true "Hackathon Logo")

# Sitecore Hackathon 2025

## Team name

![Cloud Surfers Logo](docs/images/logo-h.png?raw=true "Cloud Surfers Logo")

## Category

XM Cloud Component Builder Extension

## Description

Adds ability to create coded components without a code deployment.

There are three parts to this submission:
-   Exporting React component using the Parcel.js build tool
-   Uploading Parcel-generated javascript to the Sitecore media library using Sitecore Content Authoring APIs
-   Updating the latest saved version of a specified FEaaS (Front-End as a Service) component's view by fetching all dependencies, identifying the latest revision, modifying its view, and saving the changes through the [Sitecore FEaaS SDK](https://www.npmjs.com/package/@sitecore-feaas/sdk)

## Video link

⟹ [Video Walkthrough](https://youtu.be/UO0M1N67-7c)

## Pre-requisites and Dependencies

-   Sitecore XM Cloud
-   Node.js 18+

## Usage Instructions

### Running the Application Locally in Connected Mode

#### Prerequisites
Before starting the application locally, ensure you complete the following steps:
- Create a copy of the `.env` file and name it `.env.local`.
- Verify that the following environment variables are correctly set, along with any required XM Cloud variables:
  
  ```env
  GRAPH_QL_AUTHORING_ENDPOINT=<your_graphql_endpoint>
  AUTHORING_GRAPHQL_TOKEN_CLIENT_ID=<your_client_id>
  AUTHORING_GRAPHQL_TOKEN_CLIENT_SECRET=<your_client_secret>
  AUTHORING_GRAPHQL_TOKEN_ENDPOINT_URL=https://auth.sitecorecloud.io/oauth/token
  MEDIA_IMPORT_ROOT_PATH_WITHOUT_MEDIA=<Relative folder in media library (after /media library) where all the JS files needs to be added.>
  MEDIA_EDGE_ENDPOINT=<your_public_media_edge_endpoint>
  ```

Below, you will find how to get the required .env.local values

#### GraphQL Endpoint

To get the **GraphQL Endpoint**, visit this URL: https://deploy.sitecorecloud.io

Click on the your project.
![GraphQL1](docs/images/GraphQL_1.png?raw=true "GraphQL1")

Then, click on the name of your project under the "Environments tab"
![GraphQL2](docs/images/GraphQL_2.png?raw=true "GraphQL2")

Finally, click on the "Details" tab and copy the link from the bottom, where it says "Authoring GraphQL IDE". This is your **GraphQL Endpoint**.
![GraphQL3](docs/images/GraphQL_3.png?raw=true "GraphQL3")

#### Client ID/Client Secret
To get the **AUTHORING GRAPHQL** creds, visit the URL: https://deploy.sitecorecloud.io/

In the left navigation pane select Credentials tab and click on create credentials.
![AUTHORINGGraphQL1](docs/images/Content-Authoring-Creds1.png?raw=true "AUTHORINGGraphQL1")

Enter the details in the pop up window.
![AUTHORINGGraphQL2](docs/images/Content-Authoring-Creds2.png?raw=true "AUTHORINGGraphQL2")

Click create and copy and store the Client Id and Client Secret. You cannot retrieve the Client secret once this window is closed.
![AUTHORINGGraphQL3](docs/images/Content-Authoring-Creds3.png?raw=true "AUTHORINGGraphQL3")

#### Media Edge Endpoint
See video for way to find this value.
																													 

## Steps to Start the Application
1. Open a terminal or command prompt and navigate to the root of the project.
2. Change to the application directory:
   ```sh
   cd ./src/app
   ```
3. Start the application in connected mode:
   ```sh
   npm run start:connected
   ```

## Deployment Process for FEaaS
Once a component has been built, the following script can be run to deploy it. We built a sample component called *AuthorHint*, which can be found here: `\src\app\src\components\AuthorHint`

Currently, there are two areas in the deployment scripts that need to be updated with the correct component name.

The component will need to be updated in: `\scripts\parcel\prep-component.ts`
![prep-component](docs/images/prep-component.png?raw=true "prep-component")

The component will need to be updated in: `\scripts\parcel\deploy-component.ts` <br />
The first string is the React component filename. The second is the FEaaS component name that it will overwrite. 
![deploy-component](docs/images/deploy-component.png?raw=true "deploy-component")

You are now ready to deploy your component to XM Cloud.
   ```sh
   npm run deploy
   ```

The deployment process consists of three sequential steps, managed by specific scripts. The **deploy** script can be used, since it runs everything needed to deploy for FEaaS. 

| Script     | Description                                                                  |
| ---------- | ---------------------------------------------------------------------------- |
| `deploy`   | Runs all three deployment steps in sequence.                                 |
| `deploy-1` | Prepares parcel files for export, ensuring all required assets are included. |
| `deploy-2` | Executes the parcel build process to generate optimized assets.              |
| `deploy-3` | Pushes HTML, CSS, and JavaScript files to the Media Library and FEaaS.       |

## Appendix

This Next.js app was created as a Vanilla Sitecore JSS App using this command:<br />
`npx create-sitecore-jss@latest --yes --destination app --appName app --templates "nextjs, nextjs-sxa, nextjs-multisite, nextjs-xmcloud"`

#### Notable Custom Code Reference
| Code Area    | Description                                                                  |
| ---------- | ---------------------------------------------------------------------------- |
| `/src/parcel`   | These system files Handle the parcel export process	                                 |
| `/script/parcel/*.ts` | Edit these inputs. These are the scripts executed by `npm run deploy` that build and push component to Media Library and FEaaS	 |
| `/src/lib/sitecore-media` | Utilities to upload Sitecore Media item              |
| `/src/components/AuthorHint` | Example component       |
| `package.json` | Installed parcel, sitecore-feaas/sdk npm packages and added scripts explained above      |
