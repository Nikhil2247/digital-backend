import { Injectable } from '@nestjs/common';
import { Subject, Observable, fromEvent } from 'rxjs';
import { EventEmitter } from 'events';

@Injectable()
export class NotificationService {
  private readonly eventEmitter = new EventEmitter();

  // Expose a public method to get the eventEmitter as Observable
  get orderStatus$() {
    return fromEvent(this.eventEmitter, 'orderStatusUpdate');
  }

  emitOrderStatusUpdate(data: any) {
    console.log('NotificationService emitting:', data);
    this.eventEmitter.emit('orderStatusUpdate', data);
  }
}
