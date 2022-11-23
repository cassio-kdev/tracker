<template>
    <section>
      <router-link to="/projetos/novo" class="button">
        <span class="icon is-small">
          <i class="fas fa-plus"></i>
        </span>
        <span>Novo projeto</span>
      </router-link>
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="projeto in projetos" :key="projeto.id">
              <td>{{projeto.id}}</td>
              <td>{{projeto.nome}}</td>
              <td>
                <router-link :to="`/projetos/${projeto.id}`" class="button">
                  <span class="icon is-small">
                    <i class="fas fa-pencil-alt"></i>
                  </span>
                </router-link>
                <button class="button m1-2 is-danger" @click="exclui(projeto.id)">
                  <span class="icon is-small">
                    <i class="fa fa-trash"></i>
                  </span>
                </button>
              </td>
          </tr>
        </tbody>
      </table>
    </section>
  </template>
  <script lang="ts">
  import { useStore } from "@/store";
  import { EXCLUIR_PROJETO } from "@/store/tipo-mutacoes";
  import { computed, defineComponent } from "vue";
  import useNotificador from "@/hooks/notificador";
  import { TipoNotificacao } from "@/interfaces/INotificacao";
import { OBTER_PROJETOS } from "@/store/tipo-acoes";

  export default defineComponent({
    name: "ListA",
    methods:{
      exclui(id: string){
        this.store.commit(EXCLUIR_PROJETO, id)
        this.notificar(TipoNotificacao.SUCESSO, 'Operação','Operação realizada com sucesso')
      }
    },
    setup() {
      const store = useStore();
      const { notificar } = useNotificador();
      store.dispatch(OBTER_PROJETOS)
      return {
        projetos: computed(() => store.state.projetos),
        store,
        notificar
      };
    },
  });
  </script>
  