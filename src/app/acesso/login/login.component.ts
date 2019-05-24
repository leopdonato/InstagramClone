import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Auth } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output()
  public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public msgErrorLogin: string;
  public isDisabled: boolean = true;

  public formulario: FormGroup;

  constructor(
    private autenticacao: Auth,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      senha: [null, [Validators.minLength(6), Validators.required]]
    });
  }

  ngOnInit() {
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }

  public autenticar(): void {
    this.autenticacao.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha
    );
    this.msgErrorLogin = this.autenticacao.msgError;
  }

  public validarFormulario(): void {
    if (this.formulario.valid) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }

}
