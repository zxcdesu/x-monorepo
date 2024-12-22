import { OpenAI } from 'openai';

export interface OpenAIConfig {
  apiKey: string;
  model: OpenAI.ChatModel;
  proxyUrl: string;
}
