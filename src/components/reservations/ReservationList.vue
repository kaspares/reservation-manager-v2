<script setup lang="ts">
import { ref } from 'vue'
import { useReservationStore } from '@/stores/reservation'
import ReservationRow from './ReservationRow.vue';
import ReservationDetailsModal from './ReservationDetailsModal.vue';
import type { Reservation } from '@/types';

const reservationStore = useReservationStore()

const props = defineProps<{
    reservations: Reservation[]
}>()

const detailsOpen = ref(false)
const selectedReservation = ref<Reservation | null>(null)

function openDetails(reservation: Reservation) {
  selectedReservation.value = reservation
  detailsOpen.value = true
} 

async function deleteReservation(id: string) {
  await reservationStore.deleteReservation(id);
}

</script>

<template>
  <div>
    <div class="overflow-x-auto border border-base-300 rounded-lg">
    <table class="table table-zebra table-bordered">
      <thead>
        <tr>
          <th>Deposit</th>
          <th>Lastname</th>
          <th>Guests</th>
          <th>Nights</th>
          <th>Date From</th>
          <th>Date To</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>

      <tbody class="text-xl">
        <ReservationRow
          v-for="r in props.reservations"
          :key="r.id"
          :reservation="r"
          @details="openDetails"
          @delete="deleteReservation"
        />
      </tbody>
    </table>
  </div>

  <ReservationDetailsModal v-model:open="detailsOpen" :reservation="selectedReservation" />
  </div>
</template>