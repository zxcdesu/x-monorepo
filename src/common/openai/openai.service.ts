import { Inject, Injectable } from '@nestjs/common';
import { HttpsProxyAgent } from 'https-proxy-agent';
import OpenAI from 'openai';
import { APIPromise } from 'openai/core';
import { OpenAIConfig } from './interfaces';
import { OPENAI_CONFIG } from './openai.constants';

@Injectable()
export class OpenAIService extends OpenAI {
  constructor(@Inject(OPENAI_CONFIG) private readonly config: OpenAIConfig) {
    super({
      apiKey: config.apiKey,
      httpAgent: config.proxyUrl
        ? new HttpsProxyAgent(config.proxyUrl)
        : undefined,
    });
  }

  createChatCompetitionUsingDefaultModel(
    body: Omit<
      OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming,
      'model'
    >,
  ): APIPromise<OpenAI.Chat.Completions.ChatCompletion> {
    return this.chat.completions.create({
      ...body,
      model: this.config.model,
    });
  }
}
