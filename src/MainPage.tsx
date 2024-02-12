import moment from "moment";
import React, { useCallback, useState } from "react";
import {
	Calendar,
	Event,
	EventPropGetter,
	NavigateAction,
	View,
	momentLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolBar from "./CustomToolBar";
import Events from "./Events";

const localizer = momentLocalizer(moment);

export interface CalendarEvent {
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
	const [view, setView] = useState<View>("week");
	const [navigation, setNavigation] = useState<NavigateAction | undefined>(
		undefined
	);
	const [date, setDate] = useState<Date>(new Date());
	const [selectedEvent, setSelectedEvent] = useState<Event | undefined>(
		undefined
	);

	const handleSelected = (event: Event) => {
		setSelectedEvent(event);
		console.info("[handleSelected - event]", event);
	};

	React.useEffect(() => {
		// fetchCalendarEvents().then((fetchedEvents: CalendarEvent[]) => {
		// 	const ConvertedEvents = fetchedEvents.map((event) => {
		// 		return {
		// 			title: event.title,
		// 			start: new Date(event.startDate),
		// 			end: new Date(event.endDate),
		// 			resource: {
		// 				description: event.description,
		// 				venueId: event.venueId,
		// 				id: event.id,
		// 			},
		// 		} as Event;
		// 	});
		// 	setCalendarEvents(ConvertedEvents);
		// });

		if (navigation !== undefined) {
			onNavigate(date, view, navigation);
			setNavigation(undefined);
		}
	}, [navigation, date, view]);

	const EventPropGetter: EventPropGetter<Event> = useCallback((event) => {
		console.log(event);
		return {};
	}, []);

	return (
		<div className="flex h-full overflow-hidden">
			<div className="flex flex-col flex-grow mx-2">
				<CustomToolBar
					date={date}
					view={view}
					setView={setView}
					setNavigation={setNavigation}
				/>
				<Calendar
					date={date}
					localizer={localizer}
					events={calendarEvents}
					startAccessor="start"
					endAccessor="end"
					toolbar={false}
					view={view}
					onView={(view) => setView(view)}
					onNavigate={onNavigate}
					eventPropGetter={EventPropGetter}
					onSelectEvent={handleSelected}
					selected={selectedEvent}
				/>
			</div>
			<div className="events-wrapper col-start-4 col-end-5 h-[100vh] px-2">
				<Events
					handleAddToCalendar={handleAddToCalendar}
					calendarEvents={calendarEvents}
				/>
			</div>
		</div>
	);

	function onNavigate(date: Date, view: View, action: NavigateAction) {
		if (view === "month" && action === "NEXT") {
			setDate(moment(date).add(1, "month").toDate());
		}
		if (view === "month" && action === "PREV") {
			setDate(moment(date).subtract(1, "month").toDate());
		}
		if (view === "week" && action === "NEXT") {
			setDate(moment(date).add(1, "week").toDate());
		}
		if (view === "week" && action === "PREV") {
			setDate(moment(date).subtract(1, "week").toDate());
		}
		if ((view === "day" || view === "agenda") && action === "NEXT") {
			setDate(moment(date).add(1, "day").toDate());
		}
		if ((view === "day" || view === "agenda") && action === "PREV") {
			setDate(moment(date).subtract(1, "day").toDate());
		}
		if (action === "DATE") {
			setDate(new Date());
		}
	}

	function handleAddToCalendar(
		startDate: string,
		endDate: string,
		description: string,
		venueId: number,
		title: string,
		id: number
	) {
		setCalendarEvents((prevEvents) => {
			return [
				...(prevEvents || []),
				{
					title,
					start: new Date(startDate),
					end: new Date(endDate),
					resource: {
						description,
						venueId,
						id,
					},
				},
			];
		});
	}
}

export default MainPage;
