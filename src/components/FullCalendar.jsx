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
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";

export const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Nuevo estado para gestionar la edición.
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // Estado para confirmar eliminación.

  useEffect(() => {
    // Cargar los eventos desde el almacenamiento local
    if (typeof window !== "undefined") {
      const savedEvents = localStorage.getItem("events");
      if (savedEvents) {
        setCurrentEvents(JSON.parse(savedEvents));
      }
    }
  }, []);

  useEffect(() => {
    // Guardar eventos en el almacenamiento local cuando cambien
    if (typeof window !== "undefined") {
      localStorage.setItem("events", JSON.stringify(currentEvents));
    }
  }, [currentEvents]);

  const handleEventClick = (selected) => {
    const event = selected.event;
    setEventDetails({
      title: event.title,
      start: event.start,
      end: event.end,
    });
    setIsDialogOpen(true);
  };

  const handleEditEvent = () => {
    setIsEditing(true);
  };

  const handleDeleteEvent = () => {
    setCurrentEvents((prevEvents) =>
      prevEvents.filter(
        (event) =>
          event.title !== eventDetails.title ||
          event.start !== eventDetails.start
      )
    );
    setIsDialogOpen(false);
    setIsDeleteDialogOpen(false); // Cerrar el modal de confirmación de eliminación
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsEditing(false); // Restablecer a estado no editable
    setEventDetails(null);
  };

  return (
    <div>
      <div className="flex w-full px-10 justify-start items-start gap-8">
        <div className="w-3/12">
          <div className="py-10 text-2xl font-extrabold px-7">Calendar Events</div>
          <ul className="space-y-4">
            {currentEvents.length <= 0 && (
              <div className="italic text-center text-gray-400">No Events Present</div>
            )}

            {currentEvents.length > 0 &&
              currentEvents.map((event) => (
                <li
                  className="border border-gray-200 shadow px-4 py-2 rounded-md text-blue-800"
                  key={event.title}
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

        <div className="w-9/12 mt-8">
          <FullCalendar
            height={"85vh"}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={
              typeof window !== "undefined"
                ? JSON.parse(localStorage.getItem("events") || "[]")
                : []
            }
          />
        </div>
      </div>

      {/* Modal para ver y editar evento */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
          </DialogHeader>

          <DialogDescription>
            <div className="space-y-4">
              <div>
                <strong>Title:</strong>{" "}
                {!isEditing ? (
                  <span>{eventDetails?.title}</span>
                ) : (
                  <input
                    type="text"
                    value={eventDetails?.title}
                    onChange={(e) =>
                      setEventDetails({
                        ...eventDetails,
                        title: e.target.value,
                      })
                    }
                  />
                )}
              </div>

              <div>
                <strong>Date:</strong>{" "}
                {!isEditing ? (
                  <span>
                    {formatDate(eventDetails?.start, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                ) : (
                  <input
                    type="date"
                    value={eventDetails?.start.toISOString().split("T")[0]}
                    onChange={(e) =>
                      setEventDetails({
                        ...eventDetails,
                        start: new Date(e.target.value),
                      })
                    }
                  />
                )}
              </div>
            </div>
          </DialogDescription>

          <DialogFooter>
            <button
              onClick={handleEditEvent}
              className="bg-yellow-500 text-white p-3 rounded-md"
            >
              Edit
            </button>
            <button
              onClick={() => setIsDeleteDialogOpen(true)}
              className="bg-red-500 text-white p-3 rounded-md"
            >
              Remove
            </button>
          </DialogFooter>

          <DialogClose className="mt-4">Close</DialogClose>
        </DialogContent>
      </Dialog>

      {/* Modal de confirmación de eliminación */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>

          <DialogDescription>
            <p>Do you really want to delete the event?</p>
          </DialogDescription>

          <DialogFooter>
            <button
              onClick={handleDeleteEvent}
              className="bg-red-500 text-white p-3 rounded-md"
            >
              Yes, Delete
            </button>
            <button
              onClick={handleCancelDelete}
              className="bg-gray-500 text-white p-3 rounded-md"
            >
              Cancel
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;
