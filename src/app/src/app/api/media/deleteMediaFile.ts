import { getToken } from './fetch';
import { deleteMediaFileGraphQL } from './graphql';
import { DeleteMediaItem } from './type';

/**
 * fetch custom Site Info using GraphQL
 * @returns The GraphQL response for Custom Site Info
 */
const deleteMediaFile = async (itemName: string): Promise<string> => {
  const endpoint = process.env.GRAPH_QL_AUTHORING_ENDPOINT as string;

  const getAuthToken = await getToken();
  const mediaItemPath = process.env.MEDIA_IMPORT_ROOT_PATH + itemName;

  const data = {
    query: deleteMediaFileGraphQL,
    variables: {
      itemPath: mediaItemPath,
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
  const deleteMediaFileJson = (await response.json()) as DeleteMediaItem;
  const apiStatus =
    deleteMediaFileJson.data &&
    deleteMediaFileJson.data.deleteItem &&
    deleteMediaFileJson.data.deleteItem.successful
      ? JSON.stringify(deleteMediaFileJson.data.deleteItem.successful)
      : '';
  return apiStatus;
};

export default deleteMediaFile;
