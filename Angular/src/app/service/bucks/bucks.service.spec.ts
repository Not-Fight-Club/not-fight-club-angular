import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { BucksService } from './bucks.service';

describe('BucksService', () => {
  let service: BucksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        HttpClientModule
      ]
    });
    service = TestBed.inject(BucksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
