import { TestBed } from '@angular/core/testing';

import { CwfdataService } from './cwfdata.service';

describe('CwfdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CwfdataService = TestBed.get(CwfdataService);
    expect(service).toBeTruthy();
  });
});
