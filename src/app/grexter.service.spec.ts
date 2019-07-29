import { TestBed } from '@angular/core/testing';

import { GrexterService } from './grexter.service';

describe('GrexterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GrexterService = TestBed.get(GrexterService);
    expect(service).toBeTruthy();
  });
});
