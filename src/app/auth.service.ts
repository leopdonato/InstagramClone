import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export class Auth {
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
            .then((resposta: any) => console.log(resposta))
            .catch((error: Error) => console.log(error));
    }
}
