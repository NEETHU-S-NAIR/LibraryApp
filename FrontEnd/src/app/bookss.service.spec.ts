import { TestBed } from '@angular/core/testing';

import { BookssService } from './bookss.service';

describe('BookssService', () => {
  let service: BookssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
