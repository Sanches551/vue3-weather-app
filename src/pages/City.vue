<script setup>
import { onMounted, watch } from 'vue';
import { useFavoritesCities } from '../useFavoritesCities';
import Button from 'primevue/button';

const { favoritesCities, addToFavorite, getWeather, location, weather, route } = useFavoritesCities();

onMounted(async () => {
  await getWeather();
});

watch(location, getWeather);

function addCity() {
  addToFavorite();
}
</script>

<template>
  <div class="p-10">
    <h2>{{ weather?.name }}</h2>
    <h1>{{ Math.round(weather?.main.temp) }}&deg;С</h1>
    <p>{{ weather?.weather[0].main }}</p>
    <div>
      <img
          :src="`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`"
          alt=""
      >
    </div>
    <Button v-if="route.query.unFavorite" class="bg-white" label="Добавить в избранное" variant="outlined" @click="addCity"/>
  </div>
</template>

<style scoped>

</style>
