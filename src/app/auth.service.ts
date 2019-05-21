import { Usuario } from './acesso/usuario.model';

export class Auth{
    public cadastrarUsuario(usuario: Usuario): void{
        console.log('Chegamos no serviço', usuario);
    }
}