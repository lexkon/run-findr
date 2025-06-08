export type RunningEvent = {
    id: string
    event_name: string
    distance: number
    location: string
    event_date: string
    event_time: string
    image_url: string
    description: string
}

export type EventFormValues = {
    eventName: string
    eventDescription: string
    eventLocation: string
    eventDistance: string
    eventDate: string
    eventTime: string
}