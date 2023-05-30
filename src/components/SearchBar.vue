<script setup>
import { ref, onMounted } from 'vue'
import Axios from "axios"
import { useToast } from 'vue-toast-notification';

defineProps({
    center: Object
})

const searchbox = ref(null)
const $toast = useToast();
const emit = defineEmits(['addLocation', "updateCenter"])

const updateUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
        (locations) => {

            emit("updateCenter", {
                lng: locations.coords.longitude,
                lat: locations.coords.latitude,
            })
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
}

onMounted(() => {
    if (google !== undefined) {
        const getTimeZoneUrl = (lat, lng) => {
            return ` https://maps.googleapis.com/maps/api/timezone/json?location=${lat}%2C${lng}&timestamp=${Math.floor(new Date().getTime() / 100)}&key=AIzaSyCcxWe-IIs24W5pM10BeJcuSsMXTMoH7qM`;
        };
        const searchBox = new google.maps.places.SearchBox(searchbox.value)
        searchBox.addListener("places_changed", () => {
            const places = searchBox.getPlaces()
            if (places.length) {
                const result = {
                    id: `${new Date().getTime()}`,
                    lat: places[0].geometry.location.lat(),
                    lng: places[0].geometry.location.lng(),
                    text: places[0].formatted_address
                }
                Axios.get(getTimeZoneUrl(result.lat, result.lng)).then((res) => {
                    result["timeZoneId"] = res.data.timeZoneId
                    result["timeZoneName"] = res.data.timeZoneName
                    result["rawOffset"] = res.data.rawOffset
                    emit("addLocation", result)
                })

            } else {
                $toast.open({
                    message: 'No result found',
                    type: 'default',
                    position: 'top'
                    // all of other options may go here
                });
                //throw Error("No result found")
            }
        })
    }
})
</script>

<template>
    <div class="search--container">
        <input type="text" ref="searchbox" placeholder="Search">
        <div class="locate--icon" @click="updateUserLocation">
            <v-icon name="bi-pin-map" scale="1.2" />
        </div>
    </div>
</template>


<style lang="scss">
.search--container {
    position: fixed;
    left: 10px;
    top: 10px;
    width: 400px;
    border: none;
    box-sizing: border-box;
}

.locate--icon {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    transform: translate(100%);
    border: 1px solid rgba(0, 0, 0, 0.7);
    background-color: white;
    height: 30px;
    width: 30px;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
        svg {
            transform: scale(1.2);
        }
    }
}

input {
    height: 30px;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.7);
    outline: none;
    padding: 6px;
    box-sizing: border-box;
}
</style>