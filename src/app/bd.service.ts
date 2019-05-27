import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

export class Bd {
    public publicar(publicacao: any): void {

        const nomeImagem = Date.now();

        firebase.storage().ref()
            .child(`imagens/${nomeImagem}`)
            .put(publicacao.imagem);

        /*
        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({
                titulo: publicacao.titulo
            });

        console.log(publicacao);
        */


    }
}
