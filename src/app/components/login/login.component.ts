import { CookieService } from 'ngx-cookie-service';
import { RestServicesService } from './../../services/rest-services.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public form: FormGroup
  body: object

  constructor(
    private formBuilder: FormBuilder,
    private RestServices: RestServicesService,
    private cookieService : CookieService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      users: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


  send(): any {
    let data = {
      user: this.form.value.users,
      pass: this.form.value.password
    }
    console.log('this.form.value: ' + JSON.stringify(data));
    this.RestServices.post('http://localhost:3000/login', data).subscribe((res: any) => {
      this.cookieService.set('token_access',res.token,4,'/');
      this.router.navigate(['/usuarios'])
      /*
      for (const i in res) {
        if (Object.prototype.hasOwnProperty.call(res, i)) {
          const element = res[i];
          if (JSON.parse(JSON.stringify(res)).codeStatus == 300) {
            if (i == 'description') {
              this.toastr.error(element);
              console.log('element: ' + element);
            }
          }

          if (JSON.parse(JSON.stringify(res)).codeStatus == 200) {
            if (i == 'token') {
              this.toastr.success(element);
              this.cookieService.set('token_access', element, 4, '/');
              this.router.navigate(['/home'])
              console.log('element: ' + element);
            }
          }
          
        }
      }
      */
    })
  }

}
