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

import clsx from "clsx";
import { DateTimePicker } from "./@/components/ui/date-time-picker/date-time-picker";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./@/components/ui/dialog";
import { Label } from "./@/components/ui/label";

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
	const [allEvents, setAllEvents] = useState<OurOwnEvent[] | undefined>(
		undefined
	);
	const [randomCapacity, setRandomCapacity] = useState<number[] | undefined>(
		undefined
	);

	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [startDate, setStartDate] = useState<Date>(new Date());
	const [endDate, setEndDate] = useState<Date>(new Date());
	const [venueName, setVenueName] = useState<string>("");
	const [venueCapacity, setVenueCapacity] = useState<number>(0);
	const [submitted, setSubmitted] = useState<boolean>(false);

	React.useEffect(() => {
		fetchEvents().then((fetchedEvents: OurOwnEvent[]) => {
			if (!fetchedEvents) {
				return;
			}
			fetchedEvents = fetchedEvents
				.filter((event) => new Date(event.endDate) > new Date())
				.sort(
					(a, b) =>
						new Date(a.startDate).getTime() -
						new Date(b.startDate).getTime()
				);
			fetchedEvents.push(
				{
					id: 101,
					title: "Computer Science Lecture",
					description: "Lecture on advanced algorithms",
					startDate: "2024-02-12T09:00:00",
					endDate: "2024-02-12T10:30:00",
					venueName: "Engineering Building",
					venueId: 2,
					capacity: 30,
				},
				{
					id: 102,
					title: "Mathematics Tutorial",
					description: "Tutorial on calculus",
					startDate: "2024-02-12T11:00:00",
					endDate: "2024-02-12T12:30:00",
					venueName: "Mathematics Building",
					venueId: 3,
					capacity: 20,
				},
				{
					id: 103,
					title: "Study Session",
					description: "General study session",
					startDate: "2024-02-12T14:00:00",
					endDate: "2024-02-12T15:30:00",
					venueName: "Library",
					venueId: 4,
					capacity: 15,
				},
				{
					id: 104,
					title: "English Literature Seminar",
					description: "Seminar on modern literature themes",
					startDate: "2024-02-13T10:00:00",
					endDate: "2024-02-13T11:30:00",
					venueName: "Humanities Building",
					venueId: 5,
					capacity: 25,
				},
				{
					id: 105,
					title: "Physics Lab",
					description: "Practical experiments in physics",
					startDate: "2024-02-13T13:00:00",
					endDate: "2024-02-13T15:00:00",
					venueName: "Science Building",
					venueId: 6,
					capacity: 20,
				},
				{
					id: 106,
					title: "Computer Science Coding Lab",
					description: "Hands-on coding session",
					startDate: "2024-02-13T15:30:00",
					endDate: "2024-02-13T17:00:00",
					venueName: "Engineering Building",
					venueId: 2,
					capacity: 30,
				},
				{
					id: 107,
					title: "Physics Lecture",
					description: "Lecture on electromagnetism",
					startDate: "2024-02-15T09:00:00",
					endDate: "2024-02-15T10:30:00",
					venueName: "Science Building",
					venueId: 6,
					capacity: 30,
				},
				{
					id: 108,
					title: "English Literature Reading Group",
					description: "Discussion on Shakespeare's works",
					startDate: "2024-02-15T11:00:00",
					endDate: "2024-02-15T12:30:00",
					venueName: "Humanities Building",
					venueId: 5,
					capacity: 15,
				},
				{
					id: 109,
					title: "Mathematics Problem-Solving Session",
					description: "Solving complex problems",
					startDate: "2024-02-15T14:00:00",
					endDate: "2024-02-15T15:30:00",
					venueName: "Mathematics Building",
					venueId: 3,
					capacity: 20,
				},
				{
					id: 110,
					title: "Computer Science Project Meeting",
					description: "Weekly team meeting for projects",
					startDate: "2024-02-16T10:00:00",
					endDate: "2024-02-16T11:30:00",
					venueName: "Engineering Building",
					venueId: 2,
					capacity: 10,
				},
				{
					id: 111,
					title: "Physics Discussion Group",
					description: "Discussing recent advancements in physics",
					startDate: "2024-02-16T13:00:00",
					endDate: "2024-02-16T14:30:00",
					venueName: "Science Building",
					venueId: 6,
					capacity: 15,
				},
				{
					id: 112,
					title: "Campus Science Club Meeting",
					description: "Weekly club meeting",
					startDate: "2024-02-16T15:00:00",
					endDate: "2024-02-16T16:30:00",
					venueName: "Student Center",
					venueId: 7,
					capacity: 50,
				},
				{
					id: 113,
					title: "Mathematics Lecture",
					description: "Lecture on advanced mathematics topics",
					startDate: "2024-02-14T09:00:00",
					endDate: "2024-02-14T10:30:00",
					venueName: "Mathematics Building",
					venueId: 3,
					capacity: 25,
				},
				{
					id: 114,
					title: "Study Session",
					description: "Focused study session on various subjects",
					startDate: "2024-02-14T11:00:00",
					endDate: "2024-02-14T12:30:00",
					venueName: "Library",
					venueId: 4,
					capacity: 20,
				}
			);
			setAllEvents(fetchedEvents);
			setEvents(fetchedEvents);
		});
	}, []);

	async function onFilter() {
		const filteredEvents: OurOwnEvent[] | undefined = allEvents?.filter(
			(event) => {
				if (date && date.from && date.to) {
					const startDate = new Date(event.startDate);
					const endDate = new Date(event.endDate);
					const from = new Date(date.from);
					const to = new Date(date.to);
					if (!(startDate >= from || endDate <= to)) {
						return false;
					}
				}
				if (capacity) {
					if (!(event.capacity >= capacity)) {
						return false;
					}
				}
				return true;
			}
		);
		console.log(filteredEvents, capacity, date);
		setEvents(filteredEvents);
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

	function addToEventList() {
		const newEvent: OurOwnEvent = {
			id: getNextId(),
			title,
			description,
			startDate: startDate.toISOString(),
			endDate: endDate.toISOString(),
			venueName,
			venueId: 1,
			capacity: venueCapacity,
		};
		setEvents([...(events || []), newEvent]);
	}

	function getNextId() {
		return events?.length ? events[events.length - 1].id + 1 : 1;
	}

	return (
		events && (
			<div className="bg-slate-100 p-4 rounded-md w-[30rem] flex flex-col gap-4">
				<Dialog>
					<DialogTrigger asChild>
						<Button
							className={clsx({
								"aria[]": submitted,
							})}
						>
							Host Events
						</Button>
					</DialogTrigger>
					<DialogContent className="md:min-w-[40rem] w-full bg-slate-100">
						<DialogHeader>
							<DialogTitle>
								Host Your Event, Share Your Skill
							</DialogTitle>
							<DialogDescription>
								Submit this form to give more details about what
								you want to host
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="title" className="text-right">
									Title
								</Label>
								<Input
									id="title"
									className="col-span-3"
									onChange={(event) =>
										setTitle(event.target.value)
									}
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label
									htmlFor="description"
									className="text-right"
								>
									Description
								</Label>
								<Input
									id="description"
									className="col-span-3"
									onChange={(event) =>
										setDescription(event.target.value)
									}
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label
									htmlFor="username"
									className="text-right"
								>
									Start Time
								</Label>
								<DateTimePicker
									granularity="minute"
									onChange={(date) => {
										setStartDate(
											date.toDate(getLocalTimeZone())
										);
										console.log(
											date.toDate(getLocalTimeZone())
										);
									}}
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label
									htmlFor="username"
									className="text-right"
								>
									End Time
								</Label>
								<DateTimePicker
									granularity="minute"
									onChange={(date) => {
										setEndDate(
											date.toDate(getLocalTimeZone())
										);
										console.log(
											date.toDate(getLocalTimeZone())
										);
									}}
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label
									htmlFor="venueName"
									className="text-right"
								>
									Venue Name
								</Label>
								<Input
									id="venueName"
									className="col-span-3"
									onChange={(event) =>
										setVenueName(event.target.value)
									}
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label
									htmlFor="capacity"
									className="text-right"
								>
									Capacity of Venue
								</Label>
								<Input
									id="capacity"
									className="col-span-3"
									onChange={(event) => {
										setVenueCapacity(
											parseInt(event.target.value)
										);
									}}
								/>
							</div>
						</div>
						<DialogClose asChild>
							<Button
								type="submit"
								onClick={() => {
									if (
										!title ||
										!description ||
										!startDate ||
										!endDate ||
										!venueName ||
										!venueCapacity
									) {
										return;
									}
									addToEventList();
									handleAddToCalendar(
										startDate.toISOString(),
										endDate.toISOString(),
										description,
										1,
										title,
										getNextId()
									);
								}}
							>
								Submit Event
							</Button>
						</DialogClose>
						<DialogFooter></DialogFooter>
					</DialogContent>
				</Dialog>
				<div className="flex gap-4 flex-col xl:flex-row">
					<Input
						type="number"
						placeholder="Capacity"
						onChange={(e) => {
							setSubmitted(true);
							if (
								title ||
								description ||
								startDate ||
								endDate ||
								venueName ||
								venueCapacity
							) {
								return;
							}
							setCapacity(parseInt(e.target.value));
							onFilter();
						}}
					/>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								id="date"
								variant={"outline"}
								className={cn(
									"justify-start text-left font-normal bg-slate-100",
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
								onSelect={(dateRange) => {
									setDate(dateRange);
									onFilter();
								}}
								selected={{ from: date?.from, to: date?.to }}
							/>
						</PopoverContent>
					</Popover>
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
								generatedCapacity={
									randomCapacity[event.id] ?? 0
								}
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

function getLocalTimeZone() {
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export default Events;
