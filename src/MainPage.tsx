import moment from "moment";
import React, { useState } from "react";
import { Calendar, Event, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Events from "./Events";
import fetchCalendarEvents from "./apiCalls/fetchCalendarEvents";

const localizer = momentLocalizer(moment);

interface CalendarEvent {
	startDate: string;
	endDate: string;
	description: string;
	venueId: number;
	title: string;
	id: number;
}

function MainPage() {
	const [calendarEvents, setCalendarEvents] = useState<Event[] | undefined>(
		undefined
	);

	React.useEffect(() => {
		fetchCalendarEvents().then((fetchedEvents: CalendarEvent[]) => {
			const ConvertedEvents = fetchedEvents.map((event) => {
				return {
					title: event.title,
					start: new Date(event.startDate),
					end: new Date(event.endDate),
					resource: {
						description: event.description,
						venueId: event.venueId,
						id: event.id,
					},
				} as Event;
			});
			setCalendarEvents(ConvertedEvents);
			console.log(ConvertedEvents);
		});
	}, []);

	return (
		calendarEvents && (
			<div className="grid grid-col-5 h-full">
				<div className="calendar-wrapper col-start-1 col-end-4 pt-8">
					<Calendar
						className="calendar-wrapper__calendar"
						localizer={localizer}
						events={calendarEvents}
						startAccessor="start"
						endAccessor="end"
					/>
				</div>
				<div className="events-wrapper col-start-4 col-end-5 h-[100vh]">
					<Events />
				</div>
			</div>
		)
	);
}

export default MainPage;
