import { ChannelAdapter, Prisma } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';
import { IsDefined, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateChannelDto<T extends JsonValue = JsonValue>
  implements
    Omit<Prisma.ChannelUncheckedCreateInput, 'id' | 'projectId' | 'status'>
{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ChannelAdapter)
  adapter: ChannelAdapter;

  @IsString()
  externalId: string;

  @IsDefined()
  token: T;
}
