
import { UploadMedia } from './graphql/type';
import getPresignedUploadUrl from './utils/getPresignedUploadUrl';
import { getToken } from './utils/getToken';
import postMediaToSitecore from './utils/postMediaToSitecore';

/**
 * PURPOSE: Upload our JS file to Sitecore media library
 * See Docs for overview of process: https://doc.sitecore.com/xp/en/developers/latest/sitecore-experience-manager/en%20%20/query-examples-for-authoring-operations.html#upload-media
 * Big thanks to Gaurav for node.js implementation example here! https://github.com/gauravpansari1991/XMCloudImageImport
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
  const authToken = await getToken();

  const presignedUploadUrl = await getPresignedUploadUrl(mediapath, authToken);

  const uploadResponse = await postMediaToSitecore({
    content,
    contentType: 'text/javascript',
    authToken,
    fileName,
    presignedUploadUrl: presignedUploadUrl,
    publishItem
  }) 

  return uploadResponse;
};

export default uploadMediaInSitecore;
