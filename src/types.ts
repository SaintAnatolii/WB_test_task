export interface User {
    id: string
    name: string
    email: string
    phone: string
    age?: number | null
    city?: string
    date?: string
    address?: string
    post_index?: number | null
    country?: string
    buy_count: number
    date_of_created: string
    total_cost: number | string
    card_number: string
    payment_status: boolean
    discount: number
    bonus_count: number | string
    level: number | string
    referals: number
    status?: string
}
