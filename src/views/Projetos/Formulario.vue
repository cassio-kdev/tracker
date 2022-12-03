<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label"> Nome do Projeto </label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjeto"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>
<script lang="ts">
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { useStore } from "@/store";
import { defineComponent } from "vue";
import useNotificador from "@/hooks/notificador";
import { CADASTRAR_PROJETOS, ALTERAR_PROJETOS } from "@/store/tipo-acoes";

export default defineComponent({
  name: "FormuLario",
  props:{
    id:{
      type: String
    }
  },
  mounted(){
    if(this.id){
      const projeto = this.store.state.projeto.projetos.find(proj => proj.id === this.id);
      this.nomeDoProjeto = projeto?.nome || '';
    }
  },
  data() {
    return {
      nomeDoProjeto: "",
    };
  },
  methods: {
    salvar() {
      if(this.id){

        this.store.dispatch(ALTERAR_PROJETOS, {
          id: this.id,
          nome: this.nomeDoProjeto
        }).then(() => this.sucesso())
      }else{
        this.store.dispatch(CADASTRAR_PROJETOS, this.nomeDoProjeto)
        .then(() => this.sucesso())
      }
    },
    sucesso(){
      this.nomeDoProjeto = "";
      this.notificar(TipoNotificacao.SUCESSO, 'Operação','Operação realizada com sucesso');
      this.$router.push('/projetos');
    },
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador()
    return {
      store,
      notificar
    };
  },
});
</script>
