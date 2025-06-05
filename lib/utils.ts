export function formatDateWithWeekdayOrdinal(dateString: string): string {
    const date = new Date(dateString)

    const day = date.getDate()
    const ordinal = (n: number) => {
        const s = ['th', 'st', 'nd', 'rd']
        const v = n % 100
        return s[(v - 20) % 10] || s[v] || s[0]
    }

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        month: 'long',
        year: 'numeric'
    }

    const formatter = new Intl.DateTimeFormat('en-GB', options)
    const parts = formatter.formatToParts(date)

    const weekday = parts.find(p => p.type === 'weekday')?.value
    const month = parts.find(p => p.type === 'month')?.value
    const year = parts.find(p => p.type === 'year')?.value

    return `${weekday}, ${month} ${day}${ordinal(day)}, ${year}`
}

export function formatTime(timeString: string) {
    const [hour, minute] = timeString.split(':')
    const hourNum = parseInt(hour)
    const ampm = hourNum >= 12 ? 'pm' : 'am'
    const displayHour = hourNum % 12 === 0 ? 12 : hourNum % 12

    return `${displayHour}:${minute}${ampm}`
}

export function formatDistance(km: number): string {
    if (km <= 0) return "Invalid distance";

    const labels: Record<number, string> = {
        1: "1 kilometre",
        1.6: "Mile",
        5: "5K",
        10: "10K",
        16: "10 miles",
        21: "Half marathon",
        42: "Marathon",
    };

    return labels[km] ?? `${km}K`;
}