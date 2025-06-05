// notification.controller.ts
import { Controller, Post, Sse } from '@nestjs/common';
import { fromEvent, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

@Sse('sse')
sse(): Observable<MessageEvent> {
  return this.notificationService.orderStatus$.pipe(
    tap(data => console.log('SSE pipeline event:', data)),
    map(data => ({
      data: JSON.stringify(data),
    }) as MessageEvent),
  );
}


  @Post('test')
  sendTestNotification() {
    this.notificationService.emitOrderStatusUpdate({ test: 'Hello SSE!' });
    return { status: 'Test event sent' };
  }

  @Post('test-order')
sendTestOrderNotification() {
  this.notificationService.emitOrderStatusUpdate({
    id: 'test-order-id',
    status: 'READY',
    createdAt: new Date(),
    updatedAt: new Date(),
    eventId: 'test-event',
    tableId: 'test-table',
    guestId: 'test-guest'
  });
  return { status: 'Order test event sent' };
}

}
