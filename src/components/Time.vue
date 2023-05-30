<script setup>
import { ref, onMounted, onDeactivated } from 'vue'

const props = defineProps({
    timeZone: String,
    offset: Number,
    timeZoneName: String
})

const localTime = ref("")
const offsetDisplay = ref("")
const timeZoneDisplay = ref("")
const interval = ref(null)

onMounted(() => {
    const getTimeString = (
        timeZone,
        offset,
        timeZoneName
    ) => {
        const localTime = new Date(Date.now()).toLocaleTimeString("en-US", {
            timeZone: timeZone,
        });
        const utcOffset = new Date(Math.abs(offset * 1000))
            .toISOString()
            .slice(11, 19);

        return [localTime, `${offset > 0 ? "+" : "-"}${utcOffset}`, timeZoneName];
    };
    interval.value = setInterval(() => {
        const result = getTimeString(props.timeZone, props.offset, props.timeZoneName)
        localTime.value = result[0]
        offsetDisplay.value = result[1]
        timeZoneDisplay.value = result[2]
    }, 500)
})

onDeactivated(() => {
    if (interval.value !== null) {
        clearInterval(interval.value)
    }
})
</script>

<template>
    <span>{{localTime}}</span>
    <span>{{`${offsetDisplay}  ${timeZoneDisplay}`}}</span>
</template>