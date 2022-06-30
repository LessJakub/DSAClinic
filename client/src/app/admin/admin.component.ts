import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { newUser } from '../shared/interfaces/newUser';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  host: {'class': 'grow flex flex-col'}, // ! Styling host container to fill all avialable space
})
export class AdminComponent implements OnInit {

  constructor(private as: AccountService) { }

  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    surname: new FormControl(null, Validators.required),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    role: new FormControl(null, Validators.required)
  });

  newUser: newUser;

  ngOnInit(): void {
  }

  sendUser(): void {
    if(this.form.valid) {
      this.newUser = {
        name: this.form.controls['name'].value,
        surname: this.form.controls['surname'].value,
        username: this.form.controls['username'].value,
        password: this.form.controls['password'].value,
        role: this.form.controls['role'].value
      };

      this.as.createUser(this.newUser).subscribe(result => {
        if(result) {
          window.alert("New user Added");
          this.form.reset();
        }
      });
    }
  }

  goToDBPanel() {
    window.open("https://localhost:8081/admin");
  }

}
