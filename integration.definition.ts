import { IntegrationDefinition, messages, z } from '@botpress/sdk'
import { name, integrationName } from './package.json'

export default new IntegrationDefinition({
  name: integrationName ?? name,
  version: '0.2.0',
  actions: {
    createTrackableLink: {
      title: 'Create Trackable Link',
      description: 'Takes a link as an input and returns a link that notifies the author when the link is clicked.',
      input: {
        schema: z.object({
          conversationId: z.string().describe('ID of the conversation'),
          originalLink: z.string().describe('URL of the link to be tracked'),
        }),
      },
      output: {
        schema: z.object({
          trackableLink: z.string().describe('URL of the trackable link'),
        })
      },
    }
  },
  channels: {
    channel: {
      messages: { ...messages.defaults }, 
    },
  },
  events: {
    clickedLink: {
      schema: z
        .object({
          conversationId: z.string().describe("ID of the conversation to notify the user"),
          originalLink: z.string(),
        })
    },
  },
})
