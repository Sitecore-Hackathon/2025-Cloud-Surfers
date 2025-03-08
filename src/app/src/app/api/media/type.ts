export type GraphQLMediaFilesInfoResponse = {
  data: GraphQLMediaFilesInfoSearch;
};

export type GraphQLMediaFilesInfoSearch = {
  search: GraphQLMediaFilesInfoResults;
};

type GraphQLMediaFilesInfoResults = {
  results: GraphQLMediaFilesInnerItemResult[];
  totalCount: number;
};

export type GraphQLMediaFilesInnerItemResult = {
  innerItem: GraphQLMediaFilesInfoInnerItem;
};

type GraphQLMediaFilesInfoInnerItem = {
  path: string;
  name: string;
  displayName: string;
};

export type ApiResponse = {
  id: string;
  name: string;
  asseturl: string;
};

export type MediaApiResponse = {
  apiResponse: ApiResponse[];
};

export type PreSignedUploadUrl = {
  data: {
    uploadMedia: {
      presignedUploadUrl: string;
    };
  };
};

export type DeleteMediaItem = {
  data: {
    deleteItem: {
      successful: boolean;
    };
  };
};

export type UploadMedia = {
  Id: string;
  Name: string;
  ItemPath: string;
};

export type UpdateMediaItem = {
  data: {
    updateItem: {
      item: {
        name: string;
        path: string;
        displayName: string;
        alt: {
          value: string;
        };
      };
    };
  };
};

export type PublishJob = {
  data: {
    publishItem: {
      operationId: string;
    };
  };
};
