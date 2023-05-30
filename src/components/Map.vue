<script setup>
import { GoogleMap, Marker } from 'vue3-google-map'

defineProps({
    locations: Object,
    center: Object
})
</script>

<template>
    <GoogleMap api-key="AIzaSyCcxWe-IIs24W5pM10BeJcuSsMXTMoH7qM" style="width: 100%; height: 100vh" :center="center" :zoom="10" :disable-default-ui="true">
        <Marker v-for="(item, index) in locations" :options="{ position: { lat: item.lat, lng: item.lng } }" />
    </GoogleMap>
</template>
  
