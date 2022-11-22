import { TipoNotificacao } from '../interfaces/INotificacao';
import { NOTIFICAR } from '../store/tipo-mutacoes';
import {store} from '@/store'
export const notificacaoMixin = {
  methods:{
    notificar(titulo: string, texto: string, tipo: TipoNotificacao) : void {
      store.commit(NOTIFICAR, {
        titulo,
        texto,
        tipo,
      });
    }
  }
};
