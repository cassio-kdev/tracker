<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
    <Box v-if="listaVazia"> Você não está muito produtivo hoje :( </Box>
  </div>
</template>

<script lang="ts">
import { OBTER_TAREFAS, CADASTRAR_TAREFA, OBTER_PROJETOS } from "@/store/tipo-acoes";
import { computed, defineComponent } from "vue";
import Box from "../components/Box.vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import { useStore } from "@/store";
import ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
  components: {
    Formulario,
    Tarefa,
    Box,
  },
  computed: {
    listaVazia(): boolean {
      return this.tarefas.length == 0;
    },
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    }
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);
    return {
      tarefas: computed(() => store.state.tarefas),
      store
    };
  },
});
</script>
