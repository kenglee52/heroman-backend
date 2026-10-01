import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MechanicModule } from './modules/mechanics/mechanics.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/heromandb',
      synchronize: true,
      autoLoadEntities: true,
    }),
    MechanicModule,
    JobsModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10, 
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}