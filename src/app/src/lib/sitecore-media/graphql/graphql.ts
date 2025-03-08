// GraphQL query to fetch media files from Sitecore media library
const sitecoreMediaRootItem = '3dcb5ebac01b48119047f529753f639f';
export const getMediaFilesGraphQL = /* GraphQL */ `
  query searchresult($pageIndex: Int!){
    search(
      query: {
        index: "sitecore_master_index"
        paging: {
          pageSize: 15,
          pageIndex: $pageIndex,
        }
        searchStatement: {
          criteria: [
            { criteriaType: CONTAINS, field: "_path", value: "${sitecoreMediaRootItem}" }  
            { operator: NOT, field: "_templatename", value: "Media folder" }          
          ]
        }
      }
    ) {
      totalCount
        results {
            innerItem {
                path
                name
                displayName
            }
        }
    }
  }
`;

// GraphQL query to get media pre-render url
export const getMediaPrerenderUrlGraphQL = /* GraphQL */ `
  mutation MediaPrerenderUrl($itemPath: String!) {
    # The itemPath parameter should not include the Sitecore media library obsolete path
    # The media item name should be included in the itemPath
    uploadMedia(input: { itemPath: $itemPath }) {
      presignedUploadUrl
    }
  }
`;

// GraphQL query to delete media from sitecore media library
export const deleteMediaFileGraphQL = /* GraphQL */ `
  mutation deleteMediaItem($itemPath: String!) {
    deleteItem(input: { path: $itemPath, permanently: true }) {
      successful
    }
  }
`;

// GraphQL query to update fields in media files into sitecore media library
export const updateMediaFileGraphQL = /* GraphQL */ `
  mutation uploadMediaItem($itemPath: String!, $fieldValue: String!) {
    updateItem(
      input: { path: $itemPath, fields: [{ name: "__Display name", value: $fieldValue }] }
    ) {
      item {
        name
        path
        displayName
      }
    }
  }
`;

export const publishMediaItemGraphQL = /* GraphQL */ `
  mutation publishMediaItem($itemPath: String!) {
    publishItem(
      input: {
        rootItemPath: $itemPath
        languages: "en"
        targetDatabases: "experienceedge"
        publishItemMode: SMART
        publishRelatedItems: false
        publishSubItems: false
      }
    ) {
      operationId
    }
  }
`;
