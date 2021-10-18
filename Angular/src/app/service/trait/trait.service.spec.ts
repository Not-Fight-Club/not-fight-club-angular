import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TraitService } from './trait.service';

describe('TraitService', () => {
  let service: TraitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(TraitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
