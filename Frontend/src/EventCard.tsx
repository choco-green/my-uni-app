import clsx from "clsx";
import { Button } from "./@/components/ui/button";
import { OurOwnEvent } from "./Events";

interface EventCardProps {
	id: number;
	generatedCapacity: number;
	capacity: number;
	description: string;
	endDate: string;
	startDate: string;
	title: string;
	venueName: string;
	venueId: number;
	events: OurOwnEvent[];
	addedToCalendar: boolean;
	setEvents: React.Dispatch<React.SetStateAction<OurOwnEvent[] | undefined>>;
	handleAddToCalendar: (
		startDate: string,
		endDate: string,
		description: string,
		venueId: number,
		title: string,
		id: number
	) => void;
}

function EventCard({
	id,
	generatedCapacity,
	capacity,
	description,
	endDate,
	startDate,
	title,
	venueId,
	venueName,
	addedToCalendar,
	handleAddToCalendar,
}: EventCardProps) {
	return (
		<div className="mb-4 border p-4 rounded-md flex justify-between items-center flex-grow-0 flex-col">
			<div className="flex-col flex mb-4">
				<h2>{title}</h2>
				<p className="text-gray-500 text-sm">{venueName}</p>
				<p className="text-sm">{description}</p>
				<p className="text-gray-500 text-xs">
					{formatDate(new Date(startDate))} -{" "}
					{formatDate(new Date(endDate))}
				</p>
				<p className="text-gray-400 text-xs">
					Capacity: {generatedCapacity} / {capacity}
				</p>
			</div>
			<Button
				className={clsx("w-full", {
					"opacity-50 cursor-not-allowed":
						generatedCapacity >= capacity || addedToCalendar,
				})}
				onClick={() =>
					!addedToCalendar &&
					handleAddToCalendar(
						startDate,
						endDate,
						description,
						venueId,
						title,
						id
					)
				}
			>
				Add to Calendar
			</Button>
		</div>
	);
}

function formatDate(date: Date) {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const day = date.getDate();
	const month = months[date.getMonth()];
	const year = date.getFullYear();
	const hour = date.getHours();
	const minute = date.getMinutes();

	// Adding leading zero to minutes if less than 10
	const minute_string = minute < 10 ? "0" + minute : minute;

	// Determining the suffix for the day
	let suffix = "th";
	if (day === 1 || day === 21 || day === 31) suffix = "st";
	else if (day === 2 || day === 22) suffix = "nd";
	else if (day === 3 || day === 23) suffix = "rd";

	return `${day}${suffix} ${month} ${year} ${hour}:${minute_string}`;
}

export default EventCard;
