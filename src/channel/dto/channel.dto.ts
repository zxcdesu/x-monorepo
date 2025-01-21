import { Channel, ChannelAdapter, ChannelStatus } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ChannelDto<T extends JsonValue = JsonValue> implements Channel {
  @Expose()
  id: string;

  @Exclude()
  projectId: string;

  @Expose()
  name: string;

  @Expose()
  adapter: ChannelAdapter;

  @Exclude()
  externalId: string;

  @Exclude()
  token: T;

  @Expose()
  status: ChannelStatus;

  @Expose()
  failedReason: string | null;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
