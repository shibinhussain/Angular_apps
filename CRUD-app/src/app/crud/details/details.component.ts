import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  id: number;
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private crudService: CrudService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['productId'];
    console.log(this.id);
    this.crudService.getById(this.id).subscribe((data: Product) => {
      this.product = data;
    });
  }
}
