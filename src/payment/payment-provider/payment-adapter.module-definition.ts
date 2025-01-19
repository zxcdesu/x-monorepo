import { ConfigurableModuleBuilder } from '@nestjs/common';
import { PaymentAdapterOptions } from './payment-adapter-options.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<PaymentAdapterOptions>()
    .setClassMethodName('forRoot')
    .build();
