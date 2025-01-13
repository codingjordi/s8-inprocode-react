import { useState, useEffect } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { getEventsRequest, createEventRequest, deleteEventRequest, updateEventRequest } from "@/api/calendar.api";

export default function Calendar() {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isNewEvent, setIsNewEvent] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await getEventsRequest();
      const formattedEvents = response.data.map(event => ({
        id: event.id,
        title: event.title,
        start: new Date(event.event_date),
        description: event.description,
        allDay: true,
      }));
      setCurrentEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleDateSelect = (selectInfo) => {
    const event_date = selectInfo.startStr;
    setEventDetails({
      title: "",
      description: "",
      event_date,
    });
    setIsNewEvent(true);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    setEventDetails({
      id: event.id,
      title: event.title,
      description: event.extendedProps.description,
      event_date: event.start.toISOString(),
    });
    setIsNewEvent(false);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleSaveEvent = async () => {
    setIsSaving(true);
    try {
      if (isNewEvent) {
        await createEventRequest(eventDetails);
      } else {
        await updateEventRequest(eventDetails.id, eventDetails);
      }
      await fetchEvents();
      setIsDialogOpen(false);
      setIsEditing(false);
      setEventDetails(null);
    } catch (error) {
      console.error("Error saving event:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteEvent = async () => {
    setIsDeleting(true);
    try {
      await deleteEventRequest(eventDetails.id);
      await fetchEvents();
      setIsDialogOpen(false);
      setIsDeleteDialogOpen(false);
      setEventDetails(null);
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEventDrop = async (dropInfo) => {
    const { event } = dropInfo;
    const updatedEvent = {
      ...event.extendedProps,
      id: event.id,
      title: event.title,
      event_date: event.start.toISOString(),
    };
    try {
      await updateEventRequest(event.id, updatedEvent);
      await fetchEvents();
    } catch (error) {
      console.error("Error updating event date:", error);
      dropInfo.revert();
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row">
      <div className="md:block md:w-3/12">
        <div className="py-10 text-2xl font-extrabold px-7">Calendar Events</div>
        <ul className="space-y-4">
          {currentEvents.length <= 0 && (
            <div className="italic text-center text-gray-400">No Events Present</div>
          )}
          {currentEvents.length > 0 &&
            currentEvents.map((event) => (
              <li
                className="border border-gray-200 shadow px-4 py-2 rounded-md text-blue-800"
                key={event.id}
                onClick={() => handleEventClick({ event })}
              >
                {event.title}
                <br />
                <label className="text-slate-950">
                  {formatDate(event.start, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </label>
              </li>
            ))}
        </ul>
      </div>
      <div className="w-full md:w-9/12">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          events={currentEvents}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
        />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isNewEvent ? "Create New Event" : isEditing ? "Edit Event" : "Event Details"}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div className="space-y-4">
              <div>
                <strong>Title:</strong>{" "}
                {isEditing || isNewEvent ? (
                  <input
                    type="text"
                    value={eventDetails?.title}
                    onChange={(e) =>
                      setEventDetails({ ...eventDetails, title: e.target.value })
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  <span>{eventDetails?.title}</span>
                )}
              </div>
              <div>
                <strong>Description:</strong>{" "}
                {isEditing || isNewEvent ? (
                  <textarea
                    value={eventDetails?.description}
                    onChange={(e) =>
                      setEventDetails({ ...eventDetails, description: e.target.value })
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  <span>{eventDetails?.description}</span>
                )}
              </div>
              <div>
                <strong>Date:</strong>{" "}
                {isEditing || isNewEvent ? (
                  <input
                    type="datetime-local"
                    value={eventDetails?.event_date.slice(0, 16)}
                    onChange={(e) =>
                      setEventDetails({ ...eventDetails, event_date: e.target.value })
                    }
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  <span>
                    {eventDetails?.event_date && formatDate(eventDetails.event_date, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </span>
                )}
              </div>
            </div>
          </DialogDescription>
          <DialogFooter>
            {isEditing || isNewEvent ? (
              <button
                onClick={handleSaveEvent}
                disabled={isSaving}
                className={`bg-blue-500 text-white px-4 py-2 rounded ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSaving ? (isNewEvent ? 'Saving...' : 'Updating...') : (isNewEvent ? 'Save' : 'Update')}
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <p>Do you really want to delete this event?</p>
          </DialogDescription>
          <DialogFooter>
            <button
              onClick={handleDeleteEvent}
              disabled={isDeleting}
              className={`bg-red-500 text-white px-4 py-2 rounded ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isDeleting ? 'Deleting...' : 'Yes, Delete'}
            </button>
            <button
              onClick={() => setIsDeleteDialogOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

