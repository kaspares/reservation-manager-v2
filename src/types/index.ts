export interface LoginData {
    email: string,
    password: string
}

export interface Reservation {
    id: string,
    firstName: string,
    lastName: string,
    guests: Guests,
    phoneNum: string,
    dateFrom: string,
    dateTo: string,
    nights: number,
    comment: string,
    price: number,
    deposit: boolean,
    fullCost: number,
}

export type AddReservation = {
    firstName: string
    lastName: string,
    guests: Guests,
    phoneNum: string,
    price: number,
    dateFrom: string,
    dateTo: string,
    comment: string
}

export type Guests = {
    adults: number,
    children: number

}

export type UpdateDepositPayload = {
    id: string
    deposit: boolean
}

export type ReservationApiResponse = Record<string, Omit<Reservation, 'id'>>
