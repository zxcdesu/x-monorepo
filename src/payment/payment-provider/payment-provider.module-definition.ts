import { ConfigurableModuleBuilder } from '@nestjs/common';
import { PaymentProviderOptions } from './payment-provider-options.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<PaymentProviderOptions>()
    .setClassMethodName('forRoot')
    .build();
