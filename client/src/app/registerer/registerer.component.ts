import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registerer',
  templateUrl: './registerer.component.html',
  styleUrls: ['./registerer.component.css'],
  host: {'class': 'grow flex'}, // ! Styling host container to fill all avialable space
})
export class RegistererComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
