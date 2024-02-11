interface EventCardProps {
	title: string;
	startDate: Date;
	endDate: Date;
	description: string;
}

function EventCard({ title, startDate, endDate, description }: EventCardProps) {
	return (
		<div className="m-2 border p-4">
			<h2>{title}</h2>
			<p className="text-gray-500">
				{formatDate(startDate)} - {formatDate(endDate)}
			</p>
			<p>{description}</p>
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
	let day = date.getDate();
	const month = months[date.getMonth()];
	const year = date.getFullYear();
	let hour = date.getHours();
	let minute = date.getMinutes();

	// Adding leading zero to minutes if less than 10
	minute = minute < 10 ? "0" + minute : minute;

	// Determining the suffix for the day
	let suffix = "th";
	if (day === 1 || day === 21 || day === 31) suffix = "st";
	else if (day === 2 || day === 22) suffix = "nd";
	else if (day === 3 || day === 23) suffix = "rd";

	return `${day}${suffix} ${month} ${year} ${hour}:${minute}`;
}

export default EventCard;
