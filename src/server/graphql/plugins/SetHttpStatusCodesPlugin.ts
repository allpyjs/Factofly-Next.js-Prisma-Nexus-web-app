export const SetHttpStatusCodesPlugin = {
  async requestDidStart() {
    return {
      async willSendResponse({ response }: any) {
        response.http.status = 200;
      }
    };
  }
};

export default SetHttpStatusCodesPlugin;
