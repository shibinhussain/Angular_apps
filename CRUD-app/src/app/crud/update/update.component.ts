import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  id: number;
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crudService: CrudService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['productId'];
    this.crudService.getById(this.id).subscribe((data: Product) => {
      this.product = data;
    });
  }
  updatePdt() {
    this.crudService.update(this.id, this.product).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/crud']);
    });
  }
}
