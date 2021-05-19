import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {
  public users: Array<any> = [];
  public roles: Array<any> = [];
  public states: Array<any> = [];
  public name: string;
  public lastname: string;
  public document: string;
  public form: FormGroup


  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.users = [
      {
        name: 'Alexander',
        lastname: 'González Rátiva',
        document: '1023999999',
        rol: 'Desarrollador',
        state: 'Activo',
        pass: '12356654897',
        phone: '31246587',
        email: 'alexander.gonzalez@correo.com.co'
      },
      {
        name: 'Pepito',
        lastname: 'Perez',
        document: '10238888888',
        rol: 'Desarrollador',
        state: 'Activo',
        pass: '12356654897',
        phone: '31246587',
        email: 'pepito.perez@correo.com.co'
      }
    ]
    this.roles = [
      { name: 'Administrador' },
      { name: 'Diseñador' },
      { name: 'Desarrollador' },
      { name: 'Cliente' }
    ]

    this.states = [
      { name: 'Activo' },
      { name: 'Inactivo' }
    ]

    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      document: ['', [Validators.required]],
      rol: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pass: ['', [Validators.required, Validators.minLength(8)]],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
        Validators.pattern(/^[1-9]\d{6,10}$/)
      ])],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  send() {
    this.users.push(this.form.value);
    this.form.reset();
  }

  listarDatos(user) {
    this.form = this.formBuilder.group({
      name: user.name,
      lastname: user.lastname,
      document: user.document,
      rol: user.rol,
      state: user.state,
      pass: user.pass,
      phone: user.phone,
      email: user.email
    });
  }

  sendUpdate() {
    let userInput = this.form.value;
    for (const i in this.users) {
      if (Object.prototype.hasOwnProperty.call(this.users, i)) {
        const element = this.users[i];
        if (userInput.document == element.document) {
          this.users[i].name = userInput.name
          this.users[i].lastname = userInput.lastname
          this.users[i].rol = userInput.rol
          this.users[i].state = userInput.state
          this.users[i].phone = userInput.phone
          this.users[i].email = userInput.email
        }
      }
    }
  }
  listarRemove(user) {
    this.name = user.name;
    this.lastname = user.lastname;
    this.document = user.document;
  }

  sendRemove() {
    for (const i in this.users) {
      if (Object.prototype.hasOwnProperty.call(this.users, i)) {
        const element = this.users[i];
        if (parseInt(this.document) == parseInt(element.document)) {
          this.users.splice(element, 1)
        }
      }
    }
  }
}
