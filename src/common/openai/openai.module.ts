import { DynamicModule, Module } from '@nestjs/common';
import { OpenAIConfig } from './interfaces';
import { OPENAI_CONFIG } from './openai.constants';
import { OpenAIService } from './openai.service';

@Module({})
export class OpenAIModule {
  static register(config: OpenAIConfig): DynamicModule {
    return {
      module: OpenAIModule,
      providers: [
        {
          provide: OPENAI_CONFIG,
          useValue: config,
        },
        OpenAIService,
      ],
      exports: [OpenAIService],
    };
  }
}
