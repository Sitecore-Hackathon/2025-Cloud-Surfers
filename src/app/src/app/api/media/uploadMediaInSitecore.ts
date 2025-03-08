import { getToken } from './fetch';
import getSitecoreMediaUrl from './getSitecoreMediaUrl';
import publishMediaItemInSitecore from './publishMediaItemInSitecore';
import { UploadMedia } from './type';

/**
 * fetch custom Site Info using GraphQL
 * @returns The GraphQL response for Custom Site Info
 */

export interface uploadMediaInSitecoreProps {
  content: string;
  mediapath: string;
  fileName: string;
  publishItem?: boolean;
}
const uploadMediaInSitecore = async ({
  content,
  mediapath,
  fileName,
  publishItem,
}: uploadMediaInSitecoreProps): Promise<UploadMedia> => {
  const getAuthToken = await getToken();
  const endpoint = await getSitecoreMediaUrl(mediapath, getAuthToken);
  const blob = new Blob([content], { type: 'text/javascript' });
  const data = new FormData();
  data.append('file', blob, fileName);
  const response = await fetch(endpoint, {
    method: 'POST',
    body: data,
    headers: {
      Authorization: `Bearer ${getAuthToken}`,
    },
  });
  const uploadMediaJson = (await response.json()) as UploadMedia;
  if (publishItem && uploadMediaJson.ItemPath) {
    publishMediaItemInSitecore(uploadMediaJson.ItemPath, getAuthToken);
  }
  return uploadMediaJson;
};

export default uploadMediaInSitecore;
