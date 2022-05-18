import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  host: {'class': 'w-full flex justify-between items-baseline py-2 px-8 bg-white border-b border-gray-200'} // ! Styling host container
})
export class NavbarComponent implements OnInit {


  @Input() title: string;
 // @Input() user: string; // !!! To be converted to a user interface object

  constructor() { }

  ngOnInit(): void {
  }

}
