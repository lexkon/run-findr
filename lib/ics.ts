type ICSDetails = {
    title: string
    description?: string
    location?: string
    start: string
    end: string
}

export function generateICS({ title, description = '', location = '', start, end }: ICSDetails) {
    const content = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `SUMMARY:${title}`,
        `DESCRIPTION:${description}`,
        `LOCATION:${location}`,
        `DTSTART:${formatICSDate(start)}`,
        `DTEND:${formatICSDate(end)}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\n')

    const blob = new Blob([content], { type: 'text/calendarcharset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${title.replace(/\s+/g, '_')}.ics`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}

function formatICSDate(iso: string) {
    return new Date(iso).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}