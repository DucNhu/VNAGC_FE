import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { AuthenService } from 'src/app/core/_service/authen/authen.service';
import { MustMatch } from 'src/app/_helpers/authen/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading = false;
  registerForm: FormGroup;
  errorName = false;

  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });
  modal_info_title = 'Success';
  modal_error_title = 'Error'
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private authenservice: AuthenService,
    toasterService: ToasterService,
  ) {
    this.toasterService = toasterService;
  }

  ngOnInit(): void {
    this.initRegisterForm();
  }
  initRegisterForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.compose([
        Validators.required,
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,}')
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z0-9._%-]{6,30}')
      ])],
      confirmPassword: ['', Validators.compose([
        Validators.required,
      ])]
    }, {
      validator: [MustMatch('password', 'confirmPassword')]
    });
  }
  f = (controlName: string) => this.registerForm.controls[controlName];
  isInvalid = (controlName: string) => {
    let c = this.f(controlName);
    return c && c.invalid && (c.dirty || c.touched);
  }
  submitForm() {
    const validateName = this.registerForm.controls.name.value.trimEnd();
    if (validateName == "") {
      this.errorName = true;
      return;
    } else {
      this.errorName = false
    }
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    let data = {
      "fullName": this.registerForm.controls.name.value,
      "email": this.registerForm.controls.email.value,
      "password": this.registerForm.controls.password.value,
      "isAdmin": false,
      "isShipper": false,
      "isActive": false,
      "type": 0,
      "status": false
    }
    this.loading = true;
    this.authenservice.register(data).subscribe(
      (dt: any) => {
        console.log(data, dt)
        this.sendMaillaAccNotActive(data, dt.Infor.Id);
      },
      err => {
        err.error.Errors.forEach(element => {
          this.showError(element)
        });
        this.loading = false;
      }
    )
  }

  sendMaillaAccNotActive(e, id) {
    let val = {
      "ToEmail": `${e.email}`,
      "Body": `
        <h1 style='color:#26ae61'>Congratulations on successful account registration</h1>
        <p>
        Hello Mr.${e.fullName} <br>
        Our admin has confirmed you are a ${e.isActive}, you can now login with your account: <br>
        Nik name: <span style='color: green'>${e.email}</span> <br>
        You can login using the link below <br>
        </p>
        <a href='http://localhost:4200/activeAccount/${id}'>http://localhost:4200/login</a>
        `,
      "Subject": "Welcome Dink and Milk"
    }
    this.authenservice.sendMail(val).subscribe(
      data => {
        this.router.navigate(["/"])
        this.loading = false;
      },
      err => {
        err.error.Errors.forEach(element => {
          this.showError(element)
        });
        this.loading = false;
      }
    )
  }
  showSuccess(mess) {
    this.toasterService.pop('success', this.modal_info_title, mess);
  }
  showError(mess) {
    this.toasterService.pop('error', this.modal_error_title, mess);
  }
}
