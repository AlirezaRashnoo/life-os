"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import JalaliCalendar from "./JalaliCalendar";
import NewEventDialog from "./NewEventDialog";
import EventDetailsDialog from "./EventDetailsDialog";
import EditEventDialog from "./EditEventDialog";
import { deleteEvent } from "@/actions/calendar";

type CalendarEvent = {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end?: Date;
};

export default function CalendarPageClient({
  events,
}: {
  events: CalendarEvent[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent>();

  return (
    <>
      <JalaliCalendar
        events={events}
        onDateClick={(date) => {
          setSelectedDate(date);

          setOpen(true);
        }}
        onEventClick={(event) => {
          setSelectedEvent(event);

          setDetailsOpen(true);
        }}
      />

      <NewEventDialog
        open={open}
        onOpenChange={setOpen}
        defaultDate={selectedDate}
      />

      <EventDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        event={selectedEvent}
        onEdit={() => {
          setDetailsOpen(false);

          setEditOpen(true);
        }}
        onDelete={async () => {
          if (!selectedEvent) return;

          await deleteEvent(selectedEvent.id);

          setDetailsOpen(false);

          router.refresh();
        }}
      />

      <EditEventDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        event={selectedEvent}
      />
    </>
  );
}
