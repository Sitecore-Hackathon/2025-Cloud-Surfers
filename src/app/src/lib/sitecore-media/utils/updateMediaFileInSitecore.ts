import { updateMediaFileGraphQL } from '../graphql/graphql';
import { UpdateMediaItem } from '../graphql/type';

/**
 * UPDATE Existing Media Item
 * ** FUNCTION NOT TESTED YET
 */
const updateMediaFileInSitecore = async (
  itemPath: string,
  fieldValue: string,
  authToken: string,
): Promise<UpdateMediaItem> => {
  const endpoint = process.env.GRAPH_QL_AUTHORING_ENDPOINT as string;

  const data = {
    query: updateMediaFileGraphQL,
    variables: {
      itemPath: itemPath,
      fieldValue: fieldValue,
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
  const updateMediaFileJson = (await response.json()) as UpdateMediaItem;
  return updateMediaFileJson;
};

export default updateMediaFileInSitecore;
