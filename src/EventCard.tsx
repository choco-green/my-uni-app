import { Button } from "./@/components/ui/button";

interface EventCardProps {
	capacity: number;
	description: string;
	endDate: string;
	startDate: string;
	title: string;
	venueName: string;
}

function EventCard({
	capacity,
	description,
	endDate,
	startDate,
	title,
	venueName,
}: EventCardProps) {
	return (
		<div className="mb-4 border p-4 rounded-md flex justify-between items-center flex-grow-0 xl:flex-row flex-col">
			<div className="flex-col flex xl:p-0 p-4">
				<h2>{title}</h2>
				<p className="text-gray-500 text-sm">{venueName}</p>
				<p className="text-gray-500 text-xs">
					{formatDate(new Date(startDate))} -{" "}
					{formatDate(new Date(endDate))}
				</p>
				<p className="text-gray-400 text-xs">Capacity: {capacity}</p>

				<p className="text-sm">{description}</p>
			</div>
			<Button className="h-full">Add to Calendar</Button>
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
