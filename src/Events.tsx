import moment from "moment";
import React, { useState } from "react";
import EventCard from "./EventCard";

// interface Event {
// 	id: number;
// 	name: string;
// 	date: string;
// 	location: string;
// }

function Events() {
	const [filters, setFilters] = useState({
		name: "",
		date: "",
		location: "",
	});

	const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFilters((prevFilters) => ({
			...prevFilters,
			[name]: value,
		}));
	};

	const [events] = useState([
		{
			id: 1,
			name: "Conference",
			startDate: moment().add(1, "minute").toDate(),
			endDate: moment().add(2, "minute").toDate(),
			location: "New York",
		},
		{
			id: 2,
			name: "Workshop",
			startDate: moment().add(3, "minute").toDate(),
			endDate: moment().add(4, "minute").toDate(),
			location: "San Francisco",
		},
		{
			id: 3,
			name: "Hackathon",
			startDate: moment().add(5, "minute").toDate(),
			endDate: moment().add(6, "minute").toDate(),
			location: "London",
		},
	]);

	// Render your events list and apply filters as needed

	return (
		<div>
			<h1 className="text-3xl">Events</h1>
			<div>
				<label htmlFor="name">Name:</label>
				<input
					type="text"
					id="name"
					name="name"
					value={filters.name}
					onChange={handleFilterChange}
				/>
			</div>
			<div>
				<label htmlFor="date">Date:</label>
				<input
					type="text"
					id="date"
					name="date"
					value={filters.date}
					onChange={handleFilterChange}
				/>
			</div>
			<div>
				<label htmlFor="location">Location:</label>
				<input
					type="text"
					id="location"
					name="location"
					value={filters.location}
					onChange={handleFilterChange}
				/>
			</div>
			{events.map((event) => (
				<EventCard
					title={event.name}
					startDate={event.startDate}
					endDate={event.endDate}
					description={event.location}
				/>
			))}
		</div>
	);
}

export default Events;
