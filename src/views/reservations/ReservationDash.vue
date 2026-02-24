<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import StatCard from '@/ui/StatCard.vue';
import ReservationList from '@/components/reservations/ReservationList.vue';
import { useReservationStore } from '@/stores/reservation';

const reservationStore = useReservationStore()

const isLoading = ref(false)
const error = ref<string | null>(null)

const reservations = computed(() => {
    return reservationStore.reservations ?? []
})
const hasReservations = computed(() => {
    return reservations.value?.length > 0
})
const totalIncome = reservationStore.totalIncome

async function load() {
    isLoading.value = true
    error.value = null
    try {
        await reservationStore.loadReservations()
    } catch (e: any) {
        error.value = e?.message
    } finally {
        isLoading.value = false
    }
}

onMounted(load)
</script>


<template>
    <div class="min-h-screen bg-base-100 text-base-content">
      <div class="flex justify-center m-4 gap-8">
        <StatCard :title="'Reservations'" :value="reservations.length"></StatCard>
        <StatCard :title="'Income'" :value="totalIncome + ' $'"></StatCard>
      </div>
      <div class="flex justify-center m-10">
        <router-link class="btn btn-xl" :to="`/add-reservation`">Add new reservation</router-link>
      </div>
      <div class="m-10 bg-base-300 p-4">
          <p v-if="!hasReservations" class="text-center text-2xl">No reservations found</p>
          <ReservationList v-else :reservations="reservations" />
      </div>
    </div>
</template>
