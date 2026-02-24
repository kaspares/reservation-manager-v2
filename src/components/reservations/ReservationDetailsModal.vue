<script setup lang="ts">
import { watch, ref } from 'vue';
import type { Reservation } from '@/types';

const props = defineProps<{
    open: boolean,
    reservation: Reservation | null,
    title?: string
}>()

const emits = defineEmits<{
   (e: 'update:open', value: boolean): void 
}>()

const dlg = ref<HTMLDialogElement | null>(null)

function close() {
    emits('update:open', false)
}

watch(() => props.open,
(val) => {
    if(!dlg.value) return

    if (val) dlg.value.showModal()
    else dlg.value.close();
})

</script>

<template>
    <dialog ref="dlg" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ props.title ?? "Reservation details" }}</h3>
      <div v-if="props.reservation" class="mt-4 space-y-3">
        <div class="grid grid-cols-2 gap-2 text-lg">
          <div class="opacity-70">Lastname</div>
          <div class="font-medium">{{ props.reservation.lastName }}</div>

          <div class="opacity-70">Adults</div>
          <div class="font-medium">{{ props.reservation.guests.adults }}</div>

          <div class="opacity-70">Children</div>
          <div class="font-medium">{{ props.reservation.guests.children }}</div>

          <div class="opacity-70">Nights</div>
          <div class="font-medium">{{ props.reservation.nights }}</div>

          <div class="opacity-70">Price per person</div>
          <div class="font-medium">{{ props.reservation.price }} zł</div>

          <div class="opacity-70">Phone</div>
          <div class="font-medium">{{ props.reservation.phoneNum }}</div>

          <div class="opacity-70">Dates</div>
          <div class="font-medium">{{ props.reservation.dateFrom }} → {{ props.reservation.dateTo }}</div>

          <div class="opacity-70">Full cost</div>
          <div class="font-medium">{{ props.reservation.fullCost }} zł</div>
        </div>

        <div>
          <div class="opacity-70 text-sm mb-1">Comment</div>
          <div class="p-3 rounded-lg bg-base-200 text-sm whitespace-pre-wrap">
            {{ props.reservation.comment || 'No comment' }}
          </div>
        </div>
      </div>
      <div class="modal-action">
        <button class="btn" @click="close">Close</button>
      </div>
    </div>
  </dialog>
</template>