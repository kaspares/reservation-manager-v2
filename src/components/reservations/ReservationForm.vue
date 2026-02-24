<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { AddReservation } from '@/types';

type TextField = { val: string; isValid: boolean }
type NumberField = { val: number | null; isValid: boolean }

const emit = defineEmits<{
    (e:'save-data', reservation: AddReservation): void
}>()

const firstName = reactive<TextField>({ val: '', isValid: true })
const lastName = reactive<TextField>({ val: '', isValid: true })
const phone = reactive<TextField>({ val: '', isValid: true })
const comment = reactive<TextField>({ val: '', isValid: true })

const guests = reactive<{
  adults: NumberField
  children: NumberField
}>({
  adults: { val: null, isValid: true },
  children: { val: null, isValid: true },
})

const price = reactive<NumberField>({ val: null, isValid: true })

const dateFrom = reactive<TextField>({ val: '', isValid: true })
const dateTo = reactive<TextField>({ val: '', isValid: true })

const formIsValid = ref(true)

function validateForm() {
  formIsValid.value = true

  if (firstName.val.trim() === '') {
    firstName.isValid = false
    formIsValid.value = false
  }
  if (lastName.val.trim() === '') {
    lastName.isValid = false
    formIsValid.value = false
  }

  if (guests.adults.val === null) {
    guests.adults.isValid = false
    formIsValid.value = false
  }
  if (guests.children.val === null) {
    guests.children.isValid = false
    formIsValid.value = false
  }

  if (phone.val.trim() === '') {
    phone.isValid = false
    formIsValid.value = false
  }

  if (price.val === null) {
    price.isValid = false
    formIsValid.value = false
  }

  if (dateFrom.val.length === 0) {
    dateFrom.isValid = false
    formIsValid.value = false
  }
  if (dateTo.val.length === 0) {
    dateTo.isValid = false
    formIsValid.value = false
  }
}

function submitForm() {
  validateForm()
  if (!formIsValid.value) return

  const payload: AddReservation = {
    firstName: firstName.val.trim(),
    lastName: lastName.val.trim(),
    guests: {
      adults: guests.adults.val ?? 0,
      children: guests.children.val ?? 0,
    },
    phoneNum: phone.val.trim(),
    price: price.val ?? 0,
    dateFrom: dateFrom.val,
    dateTo: dateTo.val,
    comment: comment.val.trim(),
  }

  emit('save-data', payload)
}

function clearValidity(input: 'firstName' | 'lastName' | 'phone' | 'price' | 'dateFrom' | 'dateTo' | 'comment') {
  const map = { firstName, lastName, phone, price: price as unknown as TextField, dateFrom, dateTo, comment }
  map[input].isValid = true
}

function clearGuestValidity(type: 'adults' | 'children') {
  guests[type].isValid = true
}

</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="min-h-screen bg-base-300 flex items-center justify-center p-4">
      <div class="card w-full max-w-md bg-base-100 shadow-xl">
        <div class="card-body gap-6 m-6">
          <h2 class="card-title justify-center text-4xl">Reservation</h2>
          <label class="floating-label">
            <input
              type="text"
              placeholder="Firstname"
              class="input input-md"
              :class="{ 'input-error': !firstName.isValid }"
              v-model="firstName.val"
              @blur="clearValidity('firstName')"
            />
            <span>Firstname</span>
          </label>
          <label class="floating-label">
            <input
              type="text"
              placeholder="Lastname"
              class="input input-md"
              :class="{ 'input-error': !lastName.isValid }"
              v-model="lastName.val"
              @blur="clearValidity('lastName')"
            />
            <span>Lastname</span>
          </label>
          <label class="floating-label">
            <input
              type="number"
              placeholder="Adults"
              class="input input-md"
              :class="{ 'input-error': !guests.adults.isValid }"
              @blur="clearGuestValidity('adults')"
              v-model="guests.adults.val"
            />
            <span>Adults</span>
          </label>
          <label class="floating-label">
            <input
              type="number"
              placeholder="Children"
              class="input input-md"
              :class="{ 'input-error': !guests.children.isValid }"
              @blur="clearGuestValidity('children')"
              v-model="guests.children.val"
            />
            <span>Children</span>
          </label>
          <label class="floating-label">
            <input
              type="text"
              placeholder="Phone"
              class="input input-md"
              :class="{ 'input-error': !phone.isValid }"
              v-model="phone.val"
              @blur="clearValidity('phone')"
            />
            <span>Phone</span>
          </label>
          
          <div class="flex flex-row gap-8">
            <label class="floating-label">
              <input
                type="date"
                placeholder="Medium"
                class="input input-md"
                :class="{ 'input-error': !dateFrom.isValid }"
                @blur="clearValidity('dateFrom')"
                v-model="dateFrom.val"
              />
              <span>Date From</span>
            </label>
            <label class="floating-label">
              <input
                type="date"
                placeholder="Medium"
                class="input input-md"
                :class="{ 'input-error': !dateTo.isValid }"
                @blur="clearValidity('dateTo')"
                v-model="dateTo.val"
              />
              <span>Date To</span>
            </label>
          </div>
          <label class="floating-label w-20">
            <input
              type="text"
              placeholder="Price"
              class="input input-md"
              :class="{ 'input-error': !price.isValid }"
              v-model="price.val"
              @blur="clearValidity('price')"
            />
            <span>Price</span>
          </label>
          <p class="text-error" v-if="!formIsValid">Please fix the above errors and submit again</p>
          <div class="flex flex-row gap-8">
            <div class="card-actions justify-start pt-2">
              <router-link to="/" class="btn btn-error w-30">Cancel</router-link>
            </div>
            <div class="card-actions justify-start pt-2">
              <button class="btn btn-primary w-30" type="submit">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>