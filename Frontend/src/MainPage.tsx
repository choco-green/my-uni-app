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

		const events: CalendarEvent[] = [
			{
				id: 101,
				title: "Computer Science Lecture",
				description: "Lecture on advanced algorithms",
				startDate: "2024-02-12T09:00:00",
				endDate: "2024-02-12T10:30:00",
				venueId: 2,
			},
			{
				id: 102,
				title: "Mathematics Tutorial",
				description: "Tutorial on calculus",
				startDate: "2024-02-12T11:00:00",
				endDate: "2024-02-12T12:30:00",
				venueId: 3,
			},
			{
				id: 103,
				title: "Study Session",
				description: "General study session",
				startDate: "2024-02-12T14:00:00",
				endDate: "2024-02-12T15:30:00",
				venueId: 4,
			},
			{
				id: 104,
				title: "English Literature Seminar",
				description: "Seminar on modern literature themes",
				startDate: "2024-02-13T10:00:00",
				endDate: "2024-02-13T11:30:00",
				venueId: 5,
			},
			{
				id: 105,
				title: "Physics Lab",
				description: "Practical experiments in physics",
				startDate: "2024-02-13T13:00:00",
				endDate: "2024-02-13T15:00:00",
				venueId: 6,
			},
			{
				id: 106,
				title: "Computer Science Coding Lab",
				description: "Hands-on coding session",
				startDate: "2024-02-13T15:30:00",
				endDate: "2024-02-13T17:00:00",
				venueId: 2,
			},
			{
				id: 107,
				title: "Physics Lecture",
				description: "Lecture on electromagnetism",
				startDate: "2024-02-15T09:00:00",
				endDate: "2024-02-15T10:30:00",
				venueId: 6,
			},
			{
				id: 108,
				title: "English Literature Reading Group",
				description: "Discussion on Shakespeare's works",
				startDate: "2024-02-15T11:00:00",
				endDate: "2024-02-15T12:30:00",
				venueId: 5,
			},
			{
				id: 109,
				title: "Mathematics Problem-Solving Session",
				description: "Solving complex problems",
				startDate: "2024-02-15T14:00:00",
				endDate: "2024-02-15T15:30:00",
				venueId: 3,
			},
			{
				id: 110,
				title: "Computer Science Project Meeting",
				description: "Weekly team meeting for projects",
				startDate: "2024-02-16T10:00:00",
				endDate: "2024-02-16T11:30:00",
				venueId: 2,
			},
			{
				id: 111,
				title: "Physics Discussion Group",
				description: "Discussing recent advancements in physics",
				startDate: "2024-02-16T13:00:00",
				endDate: "2024-02-16T14:30:00",
				venueId: 6,
			},
			{
				id: 112,
				title: "Campus Science Club Meeting",
				description: "Weekly club meeting",
				startDate: "2024-02-16T15:00:00",
				endDate: "2024-02-16T16:30:00",
				venueId: 7,
			},
			{
				id: 113,
				title: "Mathematics Lecture",
				description: "Lecture on advanced mathematics topics",
				startDate: "2024-02-14T09:00:00",
				endDate: "2024-02-14T10:30:00",
				venueId: 3,
			},
			{
				id: 114,
				title: "Study Session",
				description: "Focused study session on various subjects",
				startDate: "2024-02-14T11:00:00",
				endDate: "2024-02-14T12:30:00",
				venueId: 4,
			},
		];

		setCalendarEvents(
			events.map((event) => {
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
			})
		);

		if (navigation !== undefined) {
			onNavigate(date, view, navigation);
			setNavigation(undefined);
		}
	}, [navigation, date, view]);

	const EventPropGetter: EventPropGetter<Event> = useCallback((event) => {
		console.log(event);
		return {};
	}, []);

	console.log(calendarEvents);

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
