import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../crud.service';
import { Product } from '../product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(public crudService: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.crudService.getAll().subscribe((data: Product[]) => {
      this.products = data;
    });
  }
  deletePdt(id: number) {
    this.crudService.delete(id).subscribe(() => {
    });
  }
}
