import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Events from "./Events";

const localizer = momentLocalizer(moment);

function MainPage() {
	const mockEvents = [
		{
			id: 1,
			venue: "yes.",
			start: new Date(),
			end: moment().add(1, "minute").toDate(),
			title: "Some title",
		},
	];
	return (
		<div className="grid grid-col-5 h-full">
			<div className="calendar-wrapper col-start-1 col-end-4">
				<Calendar
					className="calendar-wrapper__calendar"
					localizer={localizer}
					events={mockEvents}
					startAccessor="start"
					endAccessor="end"
				/>
			</div>
			<div className="events-wrapper col-start-4 col-end-5 h-full">
				<Events />
			</div>
		</div>
	);
}

export default MainPage;
