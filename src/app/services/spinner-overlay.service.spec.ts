import { TestBed, inject } from '@angular/core/testing';

import { SpinnerOverlayService } from './spinner-overlay.service';

describe('SpinnerOverlayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpinnerOverlayService]
    });
  });

  it('should be created', inject([SpinnerOverlayService], (service: SpinnerOverlayService) => {
    expect(service).toBeTruthy();
  }));
});
