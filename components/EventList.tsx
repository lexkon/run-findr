import EventCard from "./EventCard"

export default function EventList() {
    return (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <EventCard eventId={11} />
            <EventCard eventId={12} />
            <EventCard eventId={13} />
            <EventCard eventId={14} />
        </section>

    )
}