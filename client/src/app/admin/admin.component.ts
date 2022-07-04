import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { newUser } from '../shared/interfaces/newUser';
import { AccountService } from '../services/account.service';
import { ExaminationService } from '../services/examination.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  host: {'class': 'grow flex flex-col'}, // ! Styling host container to fill all avialable space
})
export class AdminComponent implements OnInit {

  constructor(private as: AccountService,
              private es: ExaminationService) { }

  addUserForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    surname: new FormControl(null, Validators.required),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    role: new FormControl(null, Validators.required)
  });

  updateUserForm = new FormGroup({
    id: new FormControl(null, Validators.required),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  addTypeForm = new FormGroup({
    type: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    icd: new FormControl(null, [Validators.required, Validators.pattern(/([\dEV]\d{2,4})|([A-Za-z]\d{2}[a-zA-Z0-9]{0,4})/gm)])
  });

  newUser: newUser;

  ngOnInit(): void {
  }

  sendUser(): void {
    if(this.addUserForm.valid) {
      this.newUser = {
        name: this.addUserForm.controls['name'].value,
        surname: this.addUserForm.controls['surname'].value,
        username: this.addUserForm.controls['username'].value,
        password: this.addUserForm.controls['password'].value,
        role: this.addUserForm.controls['role'].value
      };

      this.as.createUser(this.newUser).subscribe(result => {
        if(result) {
          window.alert("New user Added");
          this.addUserForm.reset();
        }
      });
    }
    else {
        alert("Please fill all data.")
    }
  }

  updateUser(): void {
    if(this.updateUserForm.valid) {
      const newUser = {
        'username': this.updateUserForm.controls['username'].value,
        'password': this.updateUserForm.controls['password'].value
      };

      this.as.updateUser(this.updateUserForm.controls['id'].value, newUser).subscribe(result => {
        if(result) {
          window.alert("User updated");
          this.updateUserForm.reset();
        }
      });
    }
    else {
        alert("Please fill all data.")
    }
  }

  sendExaminationType(): void {
    if(this.addTypeForm.valid) {
      const newType = {
        "name": this.addTypeForm.controls['name'].value,
        "type": this.addTypeForm.controls['type'].value,
        "icd": this.addTypeForm.controls['icd'].value
      };

      this.es.createType(newType).subscribe(result => {
        if(result) {
          window.alert("Type added");
          this.addTypeForm.reset();
        }
      });
    }
    else {
        alert("Please fill all data.")
    }
  }

  goToDBPanel() {
    const baseURL: string = "http://" + location.hostname;
    window.open(baseURL + "/admin");
  }

}
