import { Test, TestingModule } from '@nestjs/testing';
import { EventVendorService } from './event-vendor.service';

describe('EventVendorService', () => {
  let service: EventVendorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventVendorService],
    }).compile();

    service = module.get<EventVendorService>(EventVendorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
