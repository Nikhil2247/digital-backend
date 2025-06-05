import { Test, TestingModule } from '@nestjs/testing';
import { EventManagerController } from './event-manager.controller';

describe('EventManagerController', () => {
  let controller: EventManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventManagerController],
    }).compile();

    controller = module.get<EventManagerController>(EventManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
