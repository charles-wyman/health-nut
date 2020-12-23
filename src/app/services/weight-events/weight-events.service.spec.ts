import { TestBed } from '@angular/core/testing';

import { WeightEventsService } from './weight-events.service';

describe('WeightEventsService', () => {
  let service: WeightEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeightEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
