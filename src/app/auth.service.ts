import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';

export class Auth {
    public cadastrarUsuario(usuario: Usuario): void {

        firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
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
}
