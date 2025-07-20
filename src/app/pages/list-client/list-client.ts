import { Component, inject, OnInit } from '@angular/core';
import { ClientService } from '../../services/Client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-client',
  imports: [],
  templateUrl: './list-client.html',
  styleUrl: './list-client.css'
})
export class ListClient implements OnInit {

  clientService: ClientService = inject(ClientService);
  router: Router = inject(Router);

  list: any[] = [];

  loading: boolean = true;

  ngOnInit(): void {
    this.clientService.findAll().subscribe((data)=> {
      this.loading = false;
      this.list = data;
    });
  }

  back(): void {
    this.router.navigate(["/home"]);
  }

}
