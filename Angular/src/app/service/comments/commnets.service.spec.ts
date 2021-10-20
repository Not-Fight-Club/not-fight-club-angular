import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommnetsService } from './commnets.service';

describe('CommnetsService', () => {
  let service: CommnetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    service = TestBed.inject(CommnetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
