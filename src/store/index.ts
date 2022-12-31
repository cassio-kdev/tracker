import { tarefa } from './modulos/tarefa/index';
import { INotificacao } from './../interfaces/INotificacao';
import { NOTIFICAR } from './tipo-mutacoes';
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import ITarefa from '@/interfaces/ITarefa';
import { EstadoProjeto, projeto } from './modulos/projeto';
import { EstadoTarefa } from './modulos/tarefa';
export interface Estado{
    tarefas: ITarefa[],
    notificacoes: INotificacao[],
    projeto: EstadoProjeto,
    tarefa: EstadoTarefa
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        tarefas: [],
        notificacoes:[],
        projeto: {
            projetos: []
        },
        tarefa:{
            tarefas: []
        }

    },
    mutations: {
        [NOTIFICAR](state, novaNotificacao: INotificacao){
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)
            
            setTimeout(() =>{
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            },1500)
        }

    },
    modules:{
        projeto,
        tarefa
    }
});

export function useStore(): Store<Estado>{
    return vuexUseStore(key);
}