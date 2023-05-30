<script setup>
import { ref, onMounted, watch, onUpdated } from 'vue'
const props = defineProps({
    locations: Object,
    center: Object
})

const mapRef = ref(null)
const mapInstanceRef = ref(null)
const makerRef = ref([])

onUpdated(
    () => {
        if (mapInstanceRef.value != null) {
            //Set Center on Props Change
            mapInstanceRef.value.setCenter({ ...props.center })
            //Set Center on Props Change
            makerRef.value.forEach(marker => {
                marker.setMap(null)
            })
            makerRef.value = props.locations.map(item => {
                return new google.maps.Marker({
                    position: { lat: item.lat, lng: item.lng },
                    map: mapInstanceRef.value
                })
            })

        }

    }
)

onMounted(async () => {
    if (google!==undefined) {
        const { Map } = await google.maps.importLibrary("maps");
        mapInstanceRef.value = new Map(mapRef.value, {
            center: props.center,
            zoom: 10,
            disableDefaultUI: true,
        });
        
    }
})
</script>

<template>
    <div id="map" ref="mapRef" class="map--container">
    </div>
</template>

<style>
.map--container {
    width: 100vw;
    height: 100vh;
}
</style>
  
