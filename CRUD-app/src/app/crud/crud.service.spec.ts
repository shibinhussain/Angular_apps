import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CrudService } from './crud.service';
import { Product } from './product';

describe('CrudService', () => {
  let service: CrudService;
  let httpMock: HttpTestingController;
  const dummyProducts: Product[] = [
    {
      name: 'flipflop',
      description: 'branded',
      price: 600,
      quantity: 10,
      id: 1,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CrudService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should retrieve products from the APi via GET', () => {
    service.getAll().subscribe((value) => {
      expect(value.length).toBeGreaterThanOrEqual(1);
      expect(value).toBe(dummyProducts);
    });
    const request = httpMock.expectOne(`${service.apiRoot}/products/`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyProducts);
  });
});
