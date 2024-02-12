import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import React, { useState } from "react";
import { Event } from "react-big-calendar";
import { DateRange } from "react-day-picker";
import { Button } from "./@/components/ui/button";
import { Calendar } from "./@/components/ui/calendar";
import { Input } from "./@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "./@/components/ui/popover";
import { cn } from "./@/lib/utils";
import EventCard from "./EventCard";
import fetchEvents from "./apiCalls/fetchEvents";
import fetchFilteredEvents from "./apiCalls/fetchFilteredEvents";

export interface OurOwnEvent {
	capacity: number;
	description: string;
	endDate: string;
	id: number;
	startDate: string;
	title: string;
	venueId: number;
	venueName: string;
}

interface EventsProps {
	handleAddToCalendar: (
		startDate: string,
		endDate: string,
		description: string,
		venueId: number,
		title: string,
		id: number
	) => void;
	calendarEvents: Event[] | undefined;
}

function Events({ handleAddToCalendar, calendarEvents }: EventsProps) {
	const [capacity, setCapacity] = useState<number | undefined>(undefined);
	const [date, setDate] = React.useState<DateRange | undefined>(undefined);
	const [events, setEvents] = useState<OurOwnEvent[] | undefined>(undefined);
	const [randomCapacity, setRandomCapacity] = useState<number[] | undefined>(
		undefined
	);

	React.useEffect(() => {
		fetchEvents().then((fetchedEvents: OurOwnEvent[]) => {
			setEvents(fetchedEvents);
		});
	}, []);

	async function onFilterClick() {
		const fetchedEvents = await fetchFilteredEvents(date, capacity);
		setEvents(fetchedEvents);
	}

	if (events && !randomCapacity) {
		const randomCapacity: number[] = [];
		events.map((event) => {
			randomCapacity[event.id] = getRandomArbitrary(
				0,
				event.capacity + 1
			);
		});
		setRandomCapacity(randomCapacity);
	}

	return (
		events && (
			<div className="mt-4 ml-4 mr-4 w-96">
				<h1 className="text-2xl mb-2">Your Events</h1>
				<div className="flex gap-4 mb-4 flex-col xl:flex-row">
					<Input
						type="number"
						placeholder="Capacity"
						onChange={(e) => setCapacity(parseInt(e.target.value))}
					/>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								id="date"
								variant={"outline"}
								className={cn(
									"justify-start text-left font-normal",
									!date && "text-muted-foreground"
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{date?.from ? (
									date.to ? (
										<>
											{format(date.from, "LLL dd, y")} -{" "}
											{format(date.to, "LLL dd, y")}
										</>
									) : (
										format(date.from, "LLL dd, y")
									)
								) : (
									<span>Pick a date</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								initialFocus
								mode="range"
								defaultMonth={date?.from}
								selected={date}
								onSelect={setDate}
								numberOfMonths={2}
							/>
						</PopoverContent>
					</Popover>
					<Button onClick={onFilterClick}>Filter</Button>
				</div>
				<div className="h-[90vh] overflow-auto">
					{randomCapacity &&
						events.map((event) => (
							<EventCard
								key={event.id}
								id={event.id}
								capacity={event.capacity}
								description={event.description}
								endDate={event.endDate}
								startDate={event.startDate}
								title={event.title}
								venueName={event.venueName}
								generatedCapacity={randomCapacity[event.id]}
								events={events}
								setEvents={setEvents}
								venueId={event.venueId}
								addedToCalendar={
									(calendarEvents &&
										calendarEvents.filter(
											(calendarEvent) =>
												calendarEvent.resource.id ===
												event.id
										).length > 0) ??
									false
								}
								handleAddToCalendar={handleAddToCalendar}
							/>
						))}
				</div>
			</div>
		)
	);
}

function getRandomArbitrary(min: number, max: number) {
	return Math.round(Math.random() * (max - min) + min);
}

export default Events;
