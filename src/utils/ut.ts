export const validateDate = (date: string | undefined): string => {
    if (!date) return ''

    const addZero = (num: number): string => {
        return num < 10 ? '0' + num : String(num)
    }

    const parsedDate = Date.parse(date)
    if (isNaN(parsedDate)) {
        return 'Некорректная дата'
    }
    const bd = new Date(parsedDate)
    return `${addZero(bd.getUTCDate())}.${addZero(bd.getUTCMonth() + 1)}.${bd.getUTCFullYear()}`
}

export const getUserTime = (
    date_of_created: string | undefined,
): string | number => {
    if (!date_of_created) {
        return 0
    }

    const now = new Date()
    const created = new Date(date_of_created)
    const diff = now.getTime() - created.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const years = Math.floor(days / 365)

    if (years == 0) {
        return 'меньше года'
    } else if (years == 1) {
        return '1 год'
    } else if (years > 1 && years < 5) {
        return `${years} года`
    } else {
        return `${years} лет`
    }
}
