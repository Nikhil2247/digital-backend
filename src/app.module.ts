import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { TableModule } from './table/table.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { WebsocketModule } from './websocket/websocket.module';
import { OrderItemModule } from './order-item/order-item.module';
import { EventManagerModule } from './event-manager/event-manager.module';
import { EventVendorModule } from './event-vendor/event-vendor.module';
import { NotificationService } from './notification/notification.service';
import { NotificationController } from './notification/notification.controller';
import { S3Service } from './s3/s3.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    EventModule,
    TableModule,
    MenuModule,
    OrderModule,
    WebsocketModule,
    OrderItemModule,
    EventManagerModule,
    EventVendorModule,
  ],
  controllers: [AppController],
  providers: [AppService, S3Service],
})
export class AppModule {}
