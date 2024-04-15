import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigModule } from './infrastructures/typeorm/typeorm.config';
import { PresentationModule } from './presentation/presentation.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmConfigModule,
    PresentationModule,
  ],
  controllers: [],
  providers: [
  ],
})
export class AppModule {}
