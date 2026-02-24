import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  Reservation,
  AddReservation,
  ReservationApiResponse,
  UpdateDepositPayload,
} from '@/types'
import { useAuthStore } from './auth'

const API_URL = import.meta.env.VITE_API_URL

const nights = (data: AddReservation) => {
  const a = new Date(data.dateFrom)
  const b = new Date(data.dateTo)
  const diff = Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24))
  return isNaN(diff) ? 0 : diff
}

const fullCost = (data: AddReservation) => {
  return nights(data) * data.price * (data.guests.adults + data.guests.children)
}

export const useReservationStore = defineStore('reservation', () => {
  const store = useAuthStore()

  const reservations = ref<Reservation[] | null>(null)

  async function loadReservations() {
    const response = await fetch(`${API_URL}.json?auth=${store.getToken}`)

    if (!response.ok) {
      const error = new Error('Failed to loead')
      throw error
    }

    const responseData: ReservationApiResponse = await response.json()

    const reservationsData: Reservation[] = []

    if (responseData) {
      for (const key in responseData) {
        reservationsData.push({
          id: key,
          ...responseData[key],
        } as Reservation)
      }
    }
    reservations.value = reservationsData
  }
  async function addReservation(data: AddReservation) {
    const reservationData = {
      firstName: data.firstName,
      lastName: data.lastName,
      guests: data.guests,
      phoneNum: data.phoneNum,
      dateFrom: data.dateFrom,
      dateTo: data.dateTo,
      nights: nights(data),
      comment: data.comment || '',
      price: data.price || 0,
      deposit: false,
      fullCost: fullCost(data),
    }

    const response = await fetch(`${API_URL}.json?auth=${store.getToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservationData),
    })

    if (!response.ok) {
      const error = new Error('Failed to add')
      throw error
    }

    const responseData = await response.json()

    reservations.value?.push({ id: responseData.name, ...reservationData })
  }
  async function deleteReservation(id: string) {
    const response = await fetch(`${API_URL}/${id}.json?auth=${store.getToken}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const error = new Error('Failed to delete')
      throw error
    }

    reservations.value = reservations.value?.filter((r) => r.id !== id) ?? null
  }
  async function updateDeposit(reservation: UpdateDepositPayload) {
    const response = await fetch(`${API_URL}/${reservation.id}.json?auth=${store.getToken}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deposit: reservation.deposit }),
    })

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData?.message || 'Failed to update deposit')
      throw error
    }

    const reservationToUpdate = reservations.value?.find((r) => r.id === reservation.id) ?? null

    if (reservationToUpdate) {
      reservationToUpdate.deposit = reservation.deposit
    }
  }

  const totalIncome = computed(() => {
    return (reservations.value ?? []).reduce((sum, r) => sum + (r.fullCost ?? 0), 0)
  })

  return {
    reservations,
    loadReservations,
    addReservation,
    deleteReservation,
    updateDeposit,
    totalIncome,
  }
})
