<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import { useToast } from 'primevue/usetoast';

import Card from 'primevue/card'
import Toast from 'primevue/toast';
</script>

<template>
  <Header class="" />
  <div class="container">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<style scoped>

</style>
