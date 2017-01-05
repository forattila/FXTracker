/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FxRateService } from './fx-rate.service';

describe('FxRateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FxRateService]
    });
  });

  it('should ...', inject([FxRateService], (service: FxRateService) => {
    expect(service).toBeTruthy();
  }));
});
