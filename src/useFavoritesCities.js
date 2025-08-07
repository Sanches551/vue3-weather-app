import { computed, ref } from 'vue'
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const favoritesCities = ref(JSON.parse(localStorage.getItem('favoriteCities')) || []);

export function useFavoritesCities() {
    const route = useRoute();
    const router = useRouter();
    const location = computed(() => route.params.city);
    const weather = ref(null);
    const getWeather = () => axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location.value}&units=metric&appid=1139a967c8b02efe3de4ebaeb505e1ea`)
        .then(response => {
            weather.value = response.data;
        });

    const updateFavoritesCities = () => {
        localStorage.setItem('favoriteCities', JSON.stringify(favoritesCities.value));
    };

    function addToFavorite() {
        const locationObject = {
            city: route.params.city,
            temp: Math.round(weather.value.main.temp),
            link: '/weather/' + route.params.city,
        };

        favoritesCities.value.push(locationObject);
        updateFavoritesCities();

        const { unFavorite, ...query } = route.query;
        router.replace({ query, city: locationObject.city.value });
    }

    function removeFromFavorite(event, index) {
        favoritesCities.value.splice(index, 1);
        updateFavoritesCities();
    }

    return {
        favoritesCities,
        route,
        location,
        weather,
        addToFavorite,
        removeFromFavorite,
        getWeather,
    };
}