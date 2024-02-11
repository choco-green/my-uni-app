import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./MainPage.css";

const localizer = momentLocalizer(moment);

function MainPage() {
	const mockEvents = [
		{
			start: new Date(),
			end: moment().add(1, "minute").toDate(),
			title: "Some title",
		},
	];
	return (
		<div className="main-page">
			<div className="calendar-wrapper">
				<Calendar
					className="calendar-wrapper__calendar"
					localizer={localizer}
					events={mockEvents}
					startAccessor="start"
					endAccessor="end"
				/>
			</div>
			<div className="room-wrapper">yes.</div>
		</div>
	);
}

export default MainPage;
