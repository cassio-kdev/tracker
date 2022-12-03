import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS } from './tipo-acoes';
import { INotificacao } from './../interfaces/INotificacao';
import { NOTIFICAR, DEFINIR_TAREFAS, ADICIONA_TAREFA, ALTERA_TAREFA } from './tipo-mutacoes';
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import http from "@/http"
import ITarefa from '@/interfaces/ITarefa';
import { EstadoProjeto, projeto } from './modulos/projeto';
export interface Estado{
    tarefas: ITarefa[],
    notificacoes: INotificacao[],
    projeto: EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        tarefas: [],
        notificacoes:[],
        projeto: {
            projetos: []
        }
    },
    mutations: {
        [DEFINIR_TAREFAS](state,tarefas: ITarefa[]){
            state.tarefas = tarefas;
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa){
            state.tarefas.push(tarefa);
        },
        [ALTERAR_TAREFA](state, tarefa: ITarefa){
            const index = state.tarefas.findIndex(t => t.id === t.id);
            state.tarefas[index] = tarefa;
        },
        [NOTIFICAR](state, novaNotificacao: INotificacao){
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)
            
            setTimeout(() =>{
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            },1500)
        }

    },
    actions:{
        [OBTER_TAREFAS]({commit}){
            http.get('tarefas')
                .then(resp => commit(DEFINIR_TAREFAS,resp.data))
        },
        [CADASTRAR_TAREFA]({commit}, tarefa: ITarefa){
            return http.post('/tarefas',tarefa)
                .then(resposta => commit(ADICIONA_TAREFA,resposta.data))
        },
        [ALTERAR_TAREFA]({commit}, tarefa: ITarefa){
            return http.put(`/tarefas/${tarefa.id}`,tarefa)
                .then(tarefa => commit(ALTERA_TAREFA, tarefa))
        }
    },
    modules:{
        projeto
    }
});

export function useStore(): Store<Estado>{
    return vuexUseStore(key);
}