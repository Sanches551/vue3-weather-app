<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFavoritesCities } from '../useFavoritesCities';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const searchCityQuery = ref('');

const route = useRoute();
const router = useRouter();

const getSearchCity = (event) => {
  if (event.key === "Enter") {
    const city = searchCityQuery.value;
    router.push({
      name: 'city',
      params: { city: city },
      query: {
        unFavorite: true,
      }
    });
  }
};

const position = ref('center');
const visible = ref(false);

const openPosition = (pos) => {
  position.value = pos;
  visible.value = true;
}

const { favoritesCities, removeFromFavorite } = useFavoritesCities();

function removeCity(event) {
  const dataset = event.target.dataset;
  const decodingUrlCity = decodeURIComponent(route.path);
  const queryParams = { unFavorite: true };

  if(decodingUrlCity === dataset.value) {
    router.push({ city: decodingUrlCity, query: queryParams });
  }

  removeFromFavorite();
}
</script>

<template>
  <header class="mb-8">
    <nav class="flex justify-content-between">
      <RouterLink :to="{ name: 'home' }">
        <Button class="bg-white" icon="pi pi-home" label="WeatherAPP" variant="outlined" />
      </RouterLink>
      <IconField v-if="!route.params.city">
        <InputIcon class="cursor-pointer pi pi-search" @click="$emit('updated', searchCityQuery)" />
        <InputText
            type="text"
            v-model="searchCityQuery"
            @keypress="getSearchCity"
            placeholder="Поиск"
            class="w-full sm:w-56"
        />
      </IconField>
      <Button class="bg-white" icon="pi pi-heart" label="Избранное" variant="outlined" @click="openPosition('topright')" severity="secondary" style="min-width: 10rem" />
      <Dialog
          v-model:visible="visible"
          header="Избранное"
          :style="{ width: '25rem' }"
          :position="position"
          :modal="true"
          :draggable="false"
          :closable="false"
      >
        <Button icon="pi pi-times" aria-label="Cancel" class="absolute top-0 right-0 mt-3 mr-3" style="color: #fff; " @click="visible = false"/>
        <div class="w-full">
          <div v-for="(item, index) in favoritesCities" :key="index" class="flex">
            <IconField class="mb-1">
              <RouterLink :to="{path: item.link}">
                <div class="w-auto pr-6" style="color: #fff">{{ item.city }} {{ item.temp }}&deg;С</div>
              </RouterLink>
              <InputIcon class="cursor-pointer pi pi-trash" style="color: #fff" :data-value="item.link" @click="removeCity($event, index)" />
            </IconField>
          </div>
        </div>
      </Dialog>
    </nav>
  </header>
</template>

<style scoped>

</style>
