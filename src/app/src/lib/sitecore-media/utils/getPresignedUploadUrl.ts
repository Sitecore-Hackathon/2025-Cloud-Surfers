import { getMediaPrerenderUrlGraphQL } from "../graphql/graphql";
import { PreSignedUploadUrl } from "../graphql/type";


const getPresignedUploadUrl = async (itemPath: string, token: string): Promise<string> => {
  const endpoint = process.env.GRAPH_QL_AUTHORING_ENDPOINT as string;
  const mediaItemPath = process.env.MEDIA_IMPORT_ROOT_PATH_WITHOUT_MEDIA + itemPath;
  const data = {
    query: getMediaPrerenderUrlGraphQL,
    variables: {
      itemPath: mediaItemPath,
    },
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const preSignedUploadUrlJson = (await response.json()) as PreSignedUploadUrl;
  return preSignedUploadUrlJson.data &&
    preSignedUploadUrlJson.data.uploadMedia &&
    preSignedUploadUrlJson.data.uploadMedia.presignedUploadUrl
    ? preSignedUploadUrlJson.data.uploadMedia.presignedUploadUrl
    : '';
};

export default getPresignedUploadUrl;
