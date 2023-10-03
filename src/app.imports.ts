import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypegooseModule } from 'nestjs-typegoose';

export const AppImports = [
  ScheduleModule.forRoot(),
  ConfigModule.forRoot({ isGlobal: true }),
  TypegooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
      uri: config.get<string>('MONGO_URL', process.env.MONGO_URL),
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
      autoIndex: true,
    }),
    inject: [ConfigService],
  }),
];
