<script setup>
import { computed, ref, onUpdated } from 'vue'
import TimeComponent from "./Time.vue"

const props = defineProps({
    locations: Object
})

const emit = defineEmits(['removeLocation', 'updateCenter'])

const ITEM_PER_PAGE = 10



const currentPage = ref(1)

const displayingLocations = computed(() => props.locations.slice(ITEM_PER_PAGE * (currentPage.value - 1), ITEM_PER_PAGE * (currentPage.value - 1) + ITEM_PER_PAGE))
const selectedLocations = ref({})

onUpdated(() => {
    if (displayingLocations.value.length === 0 && props.locations.length !== 0) {
        currentPage.value = currentPage.value - 1;
    }
})

function checkBoxClick(id) {
    if (selectedLocations.value[id]) {
        delete selectedLocations.value[id]
    } else {
        selectedLocations.value[id] = true
    }
}

function checkBoxClickAll() {
    if (Object.keys(selectedLocations.value).length) {
        selectedLocations.value = {}
    } else {
        props.locations.forEach((item) => {
            selectedLocations.value[item.id] = true
        })
    }
}

function goTo(lat, lng) {
    emit("updateCenter", { lat, lng })
}

function deleteClick() {
    Object.keys(selectedLocations.value).forEach((id) => emit("removeLocation", { id }))
    selectedLocations.value = {}
}
</script>

<template>
    <div class="table--container">
        <div class="table--label">
            <h3>Location List</h3>
        </div>
        <div class="table--header">
            <span class="table--icon cross" @click="checkBoxClickAll"><v-icon v-if="Object.keys(selectedLocations).length && Object.keys(selectedLocations).length === locations.length" name="bi-x-lg" scale="2" /></span>
            <div class="table--header--content">
                <p v-if="Object.keys(selectedLocations).length>0">{{`${Object.keys(selectedLocations).length} locations selected` }}</p>
            </div>
            <span class="table--icon" @click="deleteClick"><v-icon name="ri-delete-bin-7-line" scale="1.5" /></span>
        </div>
        <ul>
            <li v-for="item in displayingLocations" class="location--item">
                <span class="table--icon cross" @click="$event=>checkBoxClick(item.id)"><v-icon v-if="selectedLocations[item.id] === true" name="bi-x-lg" scale="2" /></span>
                <div class="location--item--content">
                    <p class="location--item--location">{{item.text}}</p>
                    <p class="location--item--time">
                        <TimeComponent :offset="item.rawOffset" :time-zone-name="item.timeZoneName" :time-zone="item.timeZoneId" />
                    </p>
                </div>
                <span class="table--icon" @click="$event=>goTo(item.lat, item.lng)"><v-icon name="bi-arrow-right" scale="2" /></span>
            </li>
        </ul>
        <div class="table--footer">
            <vue-awesome-paginate v-if="locations.length > displayingLocations.length" :total-items="locations.length" :items-per-page="ITEM_PER_PAGE" :max-pages-shown="3" v-model="currentPage" />
        </div>
    </div>
</template>

<style lang="scss">
.table--container {
    position: fixed;
    right: 10px;
    top: 10px;
    width: 600px;
    height: 700px;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.7);
    @media (max-width: 1000px) {
        display: none;
    }
    .table--label {
        height: 50px;
        display: flex;
        align-items: center;
        h3 {
            margin: 0;
            padding-left: 4px;
            padding-top: 12px;
            padding-bottom: 12px;
        }
    }
    .table--header {
        display: grid;
        height: 50px;
        box-sizing: border-box;
        grid-template-columns: 50px 1fr 50px;
        span {
            cursor: pointer;
            font-size: 50px;
        }
        .table--icon {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 60px;
            cursor: pointer;
            border-top: 1px solid rgba(0, 0, 0, 0.7);
            border-bottom: 1px solid rgba(0, 0, 0, 0.7);
            &:hover {
                svg {
                    transform: scale(1.2);
                }
            }
        }
        .cross {
            &:hover {
                svg {
                    transform: none;
                }
            }
        }
        .table--header--content {
            border: 1px solid rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            padding-left: 4px;
        }
    }
    ul {
        list-style-type: none;
        .location--item {
            display: grid;
            height: 50px;
            box-sizing: border-box;
            grid-template-columns: 50px 1fr 50px;
            .location--item--content {
                padding: 6px;
                box-sizing: border-box;
                height: auto;
                width: 500px;
                border: 1px solid rgba(0, 0, 0, 0.7);
                border-top: none;
                display: flex;
                flex-direction: column;
                justify-content: center;
                row-gap: 4px;
                @media (max-width: 1000px) {
                    width: 300px;
                }
                p {
                    width: 480px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .location--item--location {
                    font-weight: 700;
                    font-size: 14px;
                    line-height: 14px;
                    letter-spacing: 0px;
                    padding-bottom: 3px;
                }
                .location--item--time {
                    font-weight: 300;
                    font-size: 11.5px;
                    line-height: 14px;
                    letter-spacing: 0px;
                    display: flex;
                    justify-content: space-between;
                }
            }
            .table--icon {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 60px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.7);
                cursor: pointer;
                &:hover {
                    svg {
                        transform: scale(1.2);
                    }
                }
            }
            .cross {
                &:hover {
                    svg {
                        transform: none;
                    }
                }
            }
        }
    }
    .table--footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
        border-top: 1px solid rgba(0, 0, 0, 0.7);
        li {
            margin-left: 2px;
            .paginate-buttons {
                border: 1px solid rgba(0, 0, 0, 0.7);
                background-color: white;
                cursor: pointer;
            }
            .active-page {
                text-decoration: underline;
            }
        }
    }
}
</style>