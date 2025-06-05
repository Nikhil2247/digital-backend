import { Test, TestingModule } from '@nestjs/testing';
import { EventVendorController } from './event-vendor.controller';

describe('EventVendorController', () => {
  let controller: EventVendorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventVendorController],
    }).compile();

    controller = module.get<EventVendorController>(EventVendorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
