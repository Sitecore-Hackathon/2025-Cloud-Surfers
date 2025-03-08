
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