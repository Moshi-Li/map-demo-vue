<script setup>
import { ref } from "vue"
import { useToast } from 'vue-toast-notification';
import { Loader } from '@googlemaps/js-api-loader';
import TestMap from './components/Map.vue'
import SearchBar from "./components/SearchBar.vue"
import LocationTable from "./components/Table.vue"


const center = ref({ lat: 44, lng: -80 })
const locations = ref([{
        text: "Nian Yi Kuai Zi Richmond Hill, Highway 7, Richmond Hill, ON, Canada",
        lat: 43.841674,
        lng: -79.3991207,
        id: "1685344507207",
        timeZoneId: "America/Toronto",
        timeZoneName: "Eastern Standard Time",
        rawOffset: -18000,
    },

    {
        text: "Montreal, QC, Canada",
        lat: 45.5018869,
        lng: -73.56739189999999,
        id: "1685343869295",
        timeZoneId: "America/Toronto",
        timeZoneName: "Eastern Standard Time",
        rawOffset: -18000,
    },
    {
        text: "Toronto, ON, Canada",
        lat: 43.653226,
        lng: -79.3831843,
        id: "1685343866101",
        timeZoneId: "America/Toronto",
        timeZoneName: "Eastern Standard Time",
        rawOffset: -18000,
    },
    {
        text: "Saint Charles, MO, USA",
        lat: 38.7881062,
        lng: -90.4974359,
        id: "1685343852386",
        timeZoneId: "America/Chicago",
        timeZoneName: "Central Standard Time",
        rawOffset: -21600,
    },

    {
        text: "East Lansing, MI, USA",
        lat: 42.7369792,
        lng: -84.48386540000001,
        id: "1685343827100",
        timeZoneId: "America/Detroit",
        timeZoneName: "Eastern Standard Time",
        rawOffset: -18000,
    },
    {
        text: "Los Angeles, CA, USA",
        lat: 34.0522342,
        lng: -118.2436849,
        id: "1685345023741",
        timeZoneId: "America/Los_Angeles",
        timeZoneName: "Pacific Standard Time",
        rawOffset: -28800,
    },
    {
        text: "West Lafayette, IN, USA",
        lat: 40.4258686,
        lng: -86.90806549999999,
        id: "1685343820128",
        timeZoneId: "America/Indiana/Indianapolis",
        timeZoneName: "Eastern Standard Time",
        rawOffset: -18000,
    },

    {
        text: "Chicago, IL, USA",
        lat: 41.8781136,
        lng: -87.6297982,
        id: "1685343837455",
        timeZoneId: "America/Chicago",
        timeZoneName: "Central Standard Time",
        rawOffset: -21600,
    },
    {
        text: "Locust Grove, GA, USA",
        lat: 33.3459495,
        lng: -84.109083,
        id: "1685343808252",
        timeZoneId: "America/New_York",
        timeZoneName: "Eastern Standard Time",
        rawOffset: -18000,
    },
    {
        text: "New York, NY, USA",
        lat: 40.7127753,
        lng: -74.0059728,
        id: "1685344891772",
        timeZoneId: "America/New_York",
        timeZoneName: "Eastern Standard Time",
        rawOffset: -18000,
    },
    {
        text: "Chengdu, Sichuan, China",
        lat: 30.5722599,
        lng: 104.0665099,
        id: "1685343628899",
        timeZoneId: "Asia/Shanghai",
        timeZoneName: "China Standard Time",
        rawOffset: 28800,
    },
])
const googleApiLoaded = ref(false)


const $toast = useToast();
const loader = new Loader({
  apiKey: "AIzaSyCcxWe-IIs24W5pM10BeJcuSsMXTMoH7qM",
  libraries: ["places"]
});


loader.load().then(()=>{
    //window.MAP_INIT = true
    googleApiLoaded.value = true

})

navigator.geolocation.getCurrentPosition(
    (locations) => {
        center.value = {

            lng: locations.coords.longitude,
            lat: locations.coords.latitude,
        }
    },
    (e) => {
        $toast.open({
            message: 'Failed to load location info',
            type: 'default',
            position: 'top'
            // all of other options may go here
        });
    }
)


function addLocation(item) {
    center.value = { lat: item.lat, lng: item.lng }
    locations.value.push(item)
}

function removeLocation(toRemove) {
    locations.value = locations.value.filter(item => item.id !== toRemove.id)
}

function updateCenter(item) {
    //center.value = item
    //Temp work around
    if (center.value.lng === item.lng && center.value.lat === item.lat) {
        center.value = {
            lat: item.lat * 1.00001,
            lng: item.lng * 1.00001
        }
    } else {
        center.value = item
    }
}
</script>

<template>
    <TestMap v-if="googleApiLoaded" :locations="locations" :center="center" />
    <LocationTable :locations="locations" @update-center="updateCenter" @remove-location="removeLocation" />
    <SearchBar v-if="googleApiLoaded" @add-location="addLocation" @update-center="updateCenter" :center="center" />
</template>

<style scoped>

</style>


