import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FightService } from './fight.service';

describe('FightService', () => {
  let service: FightService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    service = TestBed.inject(FightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
