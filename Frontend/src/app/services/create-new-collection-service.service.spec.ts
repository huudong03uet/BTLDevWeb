import { TestBed } from '@angular/core/testing';

import { CreateNewCollectionServiceService } from './create-new-collection-service.service';

describe('CreateNewCollectionServiceService', () => {
  let service: CreateNewCollectionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateNewCollectionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
