<script setup lang="ts">
import { useReservationStore } from '@/stores/reservation';
import { useRouter } from 'vue-router';
import ReservationForm from '@/components/reservations/ReservationForm.vue';
import type { AddReservation } from '@/types';
const reservationStore = useReservationStore()
const router = useRouter()
async function saveData(data:AddReservation) {
    await reservationStore.addReservation(data)
    router.replace('/')
}
</script>

<template>
  <ReservationForm @save-data="saveData"></ReservationForm>
</template>