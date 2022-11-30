import { ALTERAR_PROJETOS, CADASTRAR_PROJETOS, CADASTRAR_TAREFA, OBTER_PROJETOS,OBTER_TAREFAS,REMOVER_PROJETOS } from './tipo-acoes';
import { INotificacao } from './../interfaces/INotificacao';
import { EXCLUIR_PROJETO, ALTERAR_PROJETO, ADICIONA_PROJETO, NOTIFICAR, DEFINIR_PROJETOS, DEFINIR_TAREFAS, ADICIONA_TAREFA } from './tipo-mutacoes';
import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import http from "@/http"
import ITarefa from '@/interfaces/ITarefa';
interface Estado{
    projetos: IProjeto[],
    tarefas: ITarefa[],
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        tarefas: [],
        notificacoes:[]
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string){
            const projeto ={
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto;
            state.projetos.push(projeto);
        },
        [ALTERAR_PROJETO](state, projeto: IProjeto){
            const index = state.projetos.findIndex(proj => proj.id === projeto.id);
            state.projetos[index] = projeto;
        },
        [EXCLUIR_PROJETO](state, id:string){
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [DEFINIR_PROJETOS](state,projetos: IProjeto[]){
            state.projetos = projetos;
        },
        [DEFINIR_TAREFAS](state,tarefas: ITarefa[]){
            state.tarefas = tarefas;
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa){
            state.tarefas.push(tarefa);
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
        [OBTER_PROJETOS]({commit}){
            http.get('projetos')
                .then(resp => commit(DEFINIR_PROJETOS,resp.data))
        },
        [CADASTRAR_PROJETOS](contexto, nomeDoProjeto: string){
            return http.post('/projetos',{
                nome: nomeDoProjeto
            })
        },
        [ALTERAR_PROJETOS](contexto, projeto: IProjeto){
            return http.put(`/projetos/${projeto.id}`,projeto)
        },
        [REMOVER_PROJETOS]({commit}, id: string){
            return http.delete(`/projetos/${id}`)
                .then(() => commit(EXCLUIR_PROJETO, id))
        },
        [OBTER_TAREFAS]({commit}){
            http.get('tarefas')
                .then(resp => commit(DEFINIR_TAREFAS,resp.data))
        },
        [CADASTRAR_TAREFA]({commit}, tarefa: ITarefa){
            return http.post('/tarefas',tarefa)
                .then(resposta => commit(ADICIONA_TAREFA,resposta.data))
        },
    }
});

export function useStore(): Store<Estado>{
    return vuexUseStore(key);
}