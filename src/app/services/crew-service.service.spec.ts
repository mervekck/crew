import { TestBed } from '@angular/core/testing';

import { CrewServiceService } from './crew-service.service';

describe('CrewServiceService', () => {
  let service: CrewServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrewServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
