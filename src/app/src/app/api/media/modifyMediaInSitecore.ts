import deleteMediaFile from './deleteMediaFile';
import { ApiResponse, GraphQLMediaFilesInnerItemResult } from './type';
import updateMediaFileInSitecore from './updateMediaFileInSitecore';
import uploadMediaInSitecore from './uploadMediaInSitecore';

export async function modifyMediaInSitecore(
  sitecoreMediaFiles: GraphQLMediaFilesInnerItemResult[],
  apiMediaFiles: ApiResponse[]
) {
  // Delete media item
  if (
    apiMediaFiles &&
    apiMediaFiles.length > 0 &&
    sitecoreMediaFiles &&
    sitecoreMediaFiles.length > 0
  ) {
    for (let i = 0; i < sitecoreMediaFiles.length; i++) {
      const alreadyExist = apiMediaFiles.some(
        (item) => item.id == sitecoreMediaFiles[i].innerItem.displayName
      );
      if (!alreadyExist) {
        // Delete media
        await deleteMediaFile(sitecoreMediaFiles[i].innerItem.name);
      }
    }
  }

  // Create & Update media item
  for (let i = 0; i < apiMediaFiles.length; i++) {
    const alreadyExist =
      sitecoreMediaFiles.length > 0 &&
      sitecoreMediaFiles.some((item) => item.innerItem.displayName == apiMediaFiles[i].id);
    if (!alreadyExist) {
      // Upload media
      const uploadMediaInSitecoreResponse = await uploadMediaInSitecore(
        apiMediaFiles[i].id,
        apiMediaFiles[i].asseturl
      );

      // update media item
      await updateMediaFileInSitecore(uploadMediaInSitecoreResponse.ItemPath, apiMediaFiles[i].id);
    }
  }
  return 'Modification is done!';
}
