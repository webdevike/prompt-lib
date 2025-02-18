import { openai } from '@ai-sdk/openai';
import { fireworks } from '@ai-sdk/fireworks';
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

export const DEFAULT_CHAT_MODEL: string = 'chat-model-small';

const openRouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});



export const myProvider = customProvider({
  languageModels: {
    'chat-model-small': openai('gpt-4o-mini'),
    'chat-model-large': openai('gpt-4o'),
    'chat-model-reasoning': wrapLanguageModel({
      model: fireworks('accounts/fireworks/models/deepseek-r1'),
      middleware: extractReasoningMiddleware({ tagName: 'think' }),
    }),
    'title-model': openai('gpt-4-turbo'),
    'artifact-model': openai('gpt-4o-mini'),
    'dolphin-model': openRouter.chat('meta-llama/llama-3.1-405b-instruct'),
  },
  imageModels: {
    'small-model': openai.image('dall-e-2'),
    'large-model': openai.image('dall-e-3'),
  },
});

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  // {
  //   id: 'chat-model-small',
  //   name: 'Small model',
  //   description: 'Small model for fast, lightweight tasks',
  // },
  // {
  //   id: 'chat-model-large',
  //   name: 'Large model',
  //   description: 'Large model for complex, multi-step tasks',
  // },
  // {
  //   id: 'chat-model-reasoning',
  //   name: 'Reasoning model',
  //   description: 'Uses advanced reasoning',
  // },
  {
    id: 'dolphin-model',
    name: 'Dolphin model',
    description: 'Uses advanced reasoning',
  },
];
