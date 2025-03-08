![Hackathon Logo](docs/images/hackathon.png?raw=true "Hackathon Logo")
# Sitecore Hackathon 2025

- MUST READ: **[Submission requirements](SUBMISSION_REQUIREMENTS.md)**
- [Entry form template](ENTRYFORM.md)
  
![Hackathon Logo](docs/images/hackathon.png?raw=true "Hackathon Logo")

# Sitecore Hackathon 2025

-   MUST READ: **[Submission requirements](SUBMISSION_REQUIREMENTS.md)**
-   [Entry form template](ENTRYFORM.md)

## Team name

<img src="https://github.com/Sitecore-Hackathon/2024-Cloud-Surfers/blob/main/src/datasyncapp/public/logo-h.png?raw=true" width="350" alt="Cloud Surfers Logo"/>

## Category

XM Cloud Component Builder Enhancement

## Description

Adds ability to create new dynamic components in XM Cloud without a code deployment.

There are three parts to this submission:
-   Exporting custom component using the Parcel build tool
-   Uploading Parcel-generated javascript to the Sitecore media library using Sitecore Content Authoring APIs
-   Updating the latest saved version of a specified component's view in a FEaaS (Front-End as a Service) library by fetching all dependencies, identifying the latest revision, modifying its view, and saving the changes.

## Video link

⟹ [Submission Title](XXX)

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
  AUTHORING_GRAPHQL_TOKEN_ENDPOINT_URL=<your_token_endpoint>
  MEDIA_IMPORT_ROOT_PATH_WITHOUT_MEDIA=<your_media_import_path>
  MEDIA_EDGE_ENDPOINT=<your_media_edge_endpoint>
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

#### Token Endpoint

#### Media Import Part

#### Media Edge Endpoint
  
### Steps to Start the Application
1. Open a terminal or command prompt and navigate to the root of the project.
2. Change to the application directory:
   ```sh
   cd ./src/app
   ```
3. Start the application in connected mode:
   ```sh
   npm run start:connected
   ```

### Deployment Process for FEaaS
The deployment process consists of three sequential steps, managed by specific scripts:

| Script     | Description                                                                  |
| ---------- | ---------------------------------------------------------------------------- |
| `deploy`   | Runs all three deployment steps in sequence.                                 |
| `deploy-1` | Prepares parcel files for export, ensuring all required assets are included. |
| `deploy-2` | Executes the parcel build process to generate optimized assets.              |
| `deploy-3` | Pushes HTML, CSS, and JavaScript files to the Media Library and FEaaS.       |
