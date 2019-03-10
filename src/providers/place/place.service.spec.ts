/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlaceService } from './place.service';

describe('Service: Place', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaceService]
    });
  });

  it('should ...', inject([PlaceService], (service: PlaceService) => {
    // expect(service).toBeTruthy();
  }));
});
