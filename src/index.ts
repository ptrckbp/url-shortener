import * as botpress from '.botpress'

console.info('starting integration')

class NotImplementedError extends Error {
  constructor() {
    super('Not implemented')
  }
}

export default new botpress.Integration({
  register: async () => {
    /**
     * This is called when a bot installs the integration.
     * You should use this handler to instanciate ressources in the external service and ensure that the configuration is valid.
     */
  },
  unregister: async () => {
    /**
     * This is called when a bot removes the integration.
     * You should use this handler to instanciate ressources in the external service and ensure that the configuration is valid.
     */
  },
  actions: {
    createTrackableLink: async ({ input, ctx }) => {
      const { conversationId, originalLink } = input;
      const { webhookId } = ctx;
      const encodedInformation = btoa(JSON.stringify({conversationId,originalLink})); 
      const trackableLink = `https://webhook.botpress.cloud/${webhookId}?rd=${encodedInformation}`;

      return { trackableLink };
    },
  },
  channels: {
    channel: {
      messages: {
        text: async () => {
          throw new NotImplementedError()
        },
        image: async () => {
          throw new NotImplementedError()
        },
        markdown: async () => {
          throw new NotImplementedError()
        },
        audio: async () => {
          throw new NotImplementedError()
        },
        video: async () => {
          throw new NotImplementedError()
        },
        file: async () => {
          throw new NotImplementedError()
        },
        location: async () => {
          throw new NotImplementedError()
        },
        carousel: async () => {
          throw new NotImplementedError()
        },
        card: async () => {
          throw new NotImplementedError()
        },
        choice: async () => {
          throw new NotImplementedError()
        },
        dropdown: async () => {
          throw new NotImplementedError()
        },
        bloc: async () => {
          throw new NotImplementedError()
        },
      },
    },
  },
  handler: async ({ req, client }) => {
    // if GET /redirect something
    if (req.path === "" && req.method === "GET" && req.query.startsWith("rd=")) {
      // create a URL from the request

      const url = new URL(`https://example.com/?${req.query}`);

      const rd = url.searchParams.get("rd") ?? "";

      const decodedInformation = JSON.parse(atob(rd));

      const conversationId = decodedInformation.conversationId;
      const originalLink = decodedInformation.originalLink

      // create event

     await client.createEvent({
        type: "clickedLink",
        payload: {
          conversationId,
          originalLink,
        },
      });
      // notify the user
      return {
        status: 307,
        headers: {
          "content-type": "text/html",
        },
        body: `<http><head><meta http-equiv="Refresh" content="0; URL=${originalLink}" /></head></http>`,
      };
    }

  },
})
