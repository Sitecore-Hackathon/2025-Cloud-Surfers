import { getMediaFilesGraphQL } from './graphql';
import { getMockData } from './mock';
import { GraphQLMediaFilesInfoResponse, MediaApiResponse } from './type';

/**
 * fetch custom Site Info using GraphQL
 * @returns The GraphQL response for Custom Site Info
 */
const fetchMediaFilesInfo = async (
  pageIndex: number,
  getAuthToken: string
): Promise<GraphQLMediaFilesInfoResponse> => {
  const endpoint = process.env.GRAPH_QL_AUTHORING_ENDPOINT as string;

  const data = {
    query: getMediaFilesGraphQL,
    variables: {
      pageIndex: pageIndex,
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
  const mediaFiles = (await response.json()) as GraphQLMediaFilesInfoResponse;
  return mediaFiles;
};

export const getToken = async (): Promise<string> => {
  try {
    const data = {
      client_id: process.env.AUTHORING_GRAPHQL_TOKEN_CLIENT_ID,
      client_secret: process.env.AUTHORING_GRAPHQL_TOKEN_CLIENT_SECRET,
      audience: 'https://api.sitecorecloud.io',
      grant_type: 'client_credentials',
    };

    const tokenEndpoint = process.env.AUTHORING_GRAPHQL_TOKEN_ENDPOINT_URL as string;

    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const tokenJson = await response.json();

    return tokenJson ? tokenJson.access_token : '';
  } catch (ex) {
    return '';
  }
};

export async function fetchMockMediaAsync(): Promise<MediaApiResponse> {
  return getMockData();
}

export default fetchMediaFilesInfo;
