import { publishMediaItemGraphQL } from "../graphql/graphql";
import { PublishJob } from "../graphql/type";

const publishMediaItemInSitecore = async (
  itemPath: string,
  authToken: string
): Promise<PublishJob> => {
  const endpoint = process.env.GRAPH_QL_AUTHORING_ENDPOINT as string;
  const data = {
    query: publishMediaItemGraphQL,
    variables: {
      itemPath: itemPath,
    },
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  });

  const publishMediaJson = await response.json();
  return publishMediaJson as PublishJob;
};

export default publishMediaItemInSitecore;
