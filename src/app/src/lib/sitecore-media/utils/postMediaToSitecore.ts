
import { UploadMedia } from '../graphql/type';
import publishMediaItemInSitecore from './publishMediaItemInSitecore';

/**
 * Purpose: Upload our JS file to Sitecore media library
 * See Docs for overview of process: https://doc.sitecore.com/xp/en/developers/latest/sitecore-experience-manager/en%20%20/query-examples-for-authoring-operations.html#upload-media
 * Big thanks to Gaurav for node.js implementation example here! https://github.com/gauravpansari1991/XMCloudImageImport
 */

export interface uploadMediaInSitecoreProps {
  content: string;
  contentType: string;
  fileName: string;
  presignedUploadUrl: string;
  authToken: string;
  publishItem?: boolean;
}
const postMediaToSitecore = async ({
  content,
  contentType,
  fileName,
  presignedUploadUrl,
  authToken,
  publishItem,
}: uploadMediaInSitecoreProps): Promise<UploadMedia> => {

  const blob = new Blob([content], { type: contentType }); // Set type for import to match appropriately
  const data = new FormData();
  data.append('file', blob, fileName);

  // TODO: Add logic for update vs add new
  
  const response = await fetch(presignedUploadUrl, {
    method: 'POST',
    body: data,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const uploadMediaJson = (await response.json()) as UploadMedia;

  if (publishItem && uploadMediaJson.ItemPath) {
    publishMediaItemInSitecore(uploadMediaJson.ItemPath, authToken);
  }

  return uploadMediaJson;
};

export default postMediaToSitecore;
