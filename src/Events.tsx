import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import * as React from "react";
import { useState } from "react";
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

interface OurOwnEvent {
	capacity: number;
	description: string;
	endDate: string;
	id: number;
	startDate: string;
	title: string;
	venueId: number;
	venueName: string;
}

function Events() {
	const [capacity, setCapacity] = useState<number | undefined>(undefined);
	const [date, setDate] = React.useState<DateRange | undefined>(undefined);
	const [events, setEvents] = useState<OurOwnEvent[] | undefined>(undefined);

	React.useEffect(() => {
		fetchEvents().then((fetchedEvents) => {
			setEvents(fetchedEvents);
		});
	});

	async function onFilterClick() {
		const fetchedEvents = await fetchFilteredEvents(date, capacity);
		setEvents(fetchedEvents);
	}

	return (
		events && (
			<div className="mt-4 ml-4 mr-4">
				<h1 className="text-3xl mb-2">Your Events</h1>
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
					{events.map((event) => (
						<EventCard
							key={event.id}
							capacity={event.capacity}
							description={event.description}
							endDate={event.endDate}
							startDate={event.startDate}
							title={event.title}
							venueName={event.venueName}
						/>
					))}
				</div>
			</div>
		)
	);
}

export default Events;
