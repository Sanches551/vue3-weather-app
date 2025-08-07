<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const location = ref(null);
const weather = ref(null);

const getLocation = async () => {
  const { data } = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=5511294ebd3448d08448b8488ff0acef`);
  location.value = data;
};

const getWeather = () => axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location.value.city}&units=metric&appid=1139a967c8b02efe3de4ebaeb505e1ea`)
    .then(response => {
      weather.value = response.data;
    });

onMounted(async () => {
  await getLocation();
  await getWeather();
});

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
  </div>
</template>

<style scoped>

</style>
