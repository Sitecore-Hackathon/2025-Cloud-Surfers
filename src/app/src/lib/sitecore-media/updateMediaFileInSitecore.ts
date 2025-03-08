import { updateMediaFileGraphQL } from './graphql/graphql';
import { UpdateMediaItem } from './graphql/type';
import { getToken } from './utils/getToken';

/**
 * UPDATE Existing Media Item
 */
const updateMediaFileInSitecore = async (
  itemPath: string,
  fieldValue: string
): Promise<UpdateMediaItem> => {
  const endpoint = process.env.GRAPH_QL_AUTHORING_ENDPOINT as string;

  const getAuthToken = await getToken();

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
      Authorization: `Bearer ${getAuthToken}`,
    },
  });
  const updateMediaFileJson = (await response.json()) as UpdateMediaItem;
  return updateMediaFileJson;
};

export default updateMediaFileInSitecore;
