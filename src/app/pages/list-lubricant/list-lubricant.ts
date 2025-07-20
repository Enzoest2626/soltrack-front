import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LubricantService } from '../../services/Lubricant.service';

@Component({
  selector: 'app-list-lubricant',
  imports: [],
  templateUrl: './list-lubricant.html',
  styleUrl: './list-lubricant.css'
})
export class ListLubricant implements OnInit{
  
  lubricantService: LubricantService = inject(LubricantService);
  router: Router = inject(Router);

  list: any[] = [];

  loading: boolean = true;

  ngOnInit(): void {
    this.lubricantService.findAll().subscribe((data) => {
      this.loading = false;
      this.list = data;
    })
  }

  back(): void {
    this.router.navigate(["/home"]);
  }
}
