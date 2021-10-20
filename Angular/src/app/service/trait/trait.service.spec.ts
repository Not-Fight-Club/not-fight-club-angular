import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TraitService } from './trait.service';

describe('TraitService', () => {
  let service: TraitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    service = TestBed.inject(TraitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
