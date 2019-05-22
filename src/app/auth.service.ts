import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class Auth {

    public tokenId: string;

    constructor(private router: Router) { }

    public cadastrarUsuario(usuario: Usuario): Promise<any> {

        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {

                //remover a senha do atributo senha do objeto usuario
                delete usuario.senha;

                //registrado dados complementares do usuario do path email na base 64
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set(usuario);
            })
            .catch((error: Error) => {
                console.log(error);
            });
    }

    public autenticar(email: string, senha: string): void {
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => {
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.tokenId = idToken;
                        localStorage.setItem('Token', idToken);
                        this.router.navigate(['/home']);
                    });
            })
            .catch((error: Error) => console.log(error));
    }

    public autenticado(): boolean {
        let isAuth: boolean = true;

        if (this.tokenId === undefined && localStorage.getItem('Token') != null) {
            this.tokenId = localStorage.getItem('Token');
        }

        if (this.tokenId === undefined){
            this.router.navigate(['/']);
        }

        if (this.tokenId !== undefined) { //pode retornar esta expressao somente
            isAuth = true;
        } else {
            isAuth = false;
        }

        return isAuth;
    }

    public sair(): void {
        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('Token');
                this.tokenId = undefined;
                this.router.navigate(['/']);
            });
    }
}
