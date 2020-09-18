import { TestBed } from '@angular/core/testing';

import { ResultCategoriesService } from './result-categories.service';

describe('ResultCategoriesService', () => {
  let service: ResultCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
