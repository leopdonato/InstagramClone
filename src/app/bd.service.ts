import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import { Injectable } from '@angular/core';
import { Progresso } from './progresso.service';

@Injectable()
export class Bd {

    constructor(private progresso: Progresso) {}

    public publicar(publicacao: any): void {

        const nomeImagem = Date.now();

        firebase.storage().ref()
            .child(`imagens/${nomeImagem}`)
            .put(publicacao.imagem)
            .on(firebase.storage.TaskEvent.STATE_CHANGED,
                //aconpanhamento do progresso do upload
                (snapshot: any) => {
                    this.progresso.status = 'andamento';
                    this.progresso.estado = snapshot;
                    //console.log(snapshot);
                },
                (error) => {
                    this.progresso.status = 'erro';
                    //console.log(error);
                },
                () => {
                    //finalização do progresso
                    this.progresso.status = 'concluido';
                    //console.log('upload completo');
                }
            );

        /*
        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({
                titulo: publicacao.titulo
            });

        console.log(publicacao);
        */


    }
}
