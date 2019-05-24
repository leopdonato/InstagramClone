import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../usuario.model';
import { Auth } from 'src/app/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output()
  public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public msgErrorCadastro: string;

  public isDisabled: boolean = true;

  public formulario: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    nome_completo: new FormControl(null, [Validators.required]),
    nome_usuario: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    senha: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private autenticacao: Auth
  ) { }

  ngOnInit() {
  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login');
  }

  public cadastrarUsuario(): void {
    const usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_usuario,
      this.formulario.value.senha
    );

    this.autenticacao.cadastrarUsuario(usuario)
      .then(() => this.exibirPainelLogin())
      .catch(() => {
        this.msgErrorCadastro = this.autenticacao.msgError;
      });
  }

  public validarFormulario(): void {
    if (this.formulario.valid){
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }

}
