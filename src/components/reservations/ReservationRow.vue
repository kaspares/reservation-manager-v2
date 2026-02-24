<script setup lang="ts">
import { useReservationStore } from '@/stores/reservation';
import type { Reservation } from '@/types';
import { ref, computed } from 'vue'

const reservationStore = useReservationStore()
const { reservation } = defineProps<{ reservation: Reservation }>()

const emit = defineEmits<{
    (e: 'details', reservation: Reservation): void
    (e: 'delete', id: string): void
}>()

const guests = computed(() => {
    return reservation.guests.adults + reservation.guests.children
})

const toggleDeposit = async () => {
    reservationStore.updateDeposit({
        id: reservation.id,
        deposit: !reservation.deposit
    })
} 

</script>

<template>
  <tr>
    <td>
      <input
        type="checkbox"
        class="checkbox"
        :checked="reservation.deposit"
        @click.prevent="toggleDeposit"
      />
    </td>
    <td class="font-bold">
      {{ reservation.lastName }}
    </td>
    <td>
      {{ guests }}
    </td>
    <td>{{ reservation.nights }}</td>
    <td>
      {{ reservation.dateFrom }}
    </td>
    <td>
      {{ reservation.dateTo }}
    </td>
    <td>
      {{ reservation.phoneNum }}
    </td>
    <td class="w-1">
      <div class="flex justify-end gap-2">
        <button class="btn btn-md btn-primary p-4" @click="emit('details', reservation)">
          Details
        </button>
        <button class="btn btn-md btn-error p-4 text-lg" @click="emit('delete', reservation.id)">
          X
        </button>
      </div>
    </td>
  </tr>
</template>