import {
	faCaretDown,
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import { NavigateAction, View } from "react-big-calendar";
import { Button } from "./@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./@/components/ui/dropdown-menu";

interface CustomToolBarProps {
	date: Date;
	view: View;
	setView: Dispatch<SetStateAction<View>>;
	setNavigation: Dispatch<SetStateAction<NavigateAction | undefined>>;
}

function CustomToolBar({
	date,
	view,
	setView,
	setNavigation,
}: CustomToolBarProps) {
	return (
		<div className="flex content-center items-center mb-2 gap-4 m-4">
			<Button onClick={() => setNavigation("DATE")}>Today</Button>
			<div className="bg-primary rounded-md">
				<Button
					onClick={() => setNavigation("PREV")}
					className="rounded-none border-r rounded-l-md"
				>
					<FontAwesomeIcon icon={faChevronLeft} />
				</Button>
				<Button onClick={() => setNavigation("NEXT")}>
					<FontAwesomeIcon icon={faChevronRight} />
				</Button>
			</div>
			<div className="text-2xl font-bold flex-grow text-center text-slate-700">
				{displayDate(date, view)}
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger
					asChild
					className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-slate-700 text-primary-foreground shadow hover:bg-slate-500 h-9 px-4 py-2 hover:text-primary-foreground"
				>
					<Button variant="outline">
						{capitalizeFirstLetter(view)}
						<FontAwesomeIcon icon={faCaretDown} className="ml-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56">
					<DropdownMenuSeparator />
					<DropdownMenuRadioGroup
						value={view}
						onValueChange={(v) => setView(v as View)}
					>
						<DropdownMenuRadioItem value="month">
							Month
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="week">
							Week
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="day">
							Day
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="agenda">
							Agenda
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

function capitalizeFirstLetter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function displayDate(date: Date, view: View) {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const day = date.getDay();
	const month = months[date.getMonth()];
	const year = date.getFullYear();
	if (view == "day") {
		return `${day} ${month} ${year}`;
	} else if (view == "week") {
		return `${month} ${year}`;
	} else if (view == "month") {
		return `${month} ${year}`;
	}
}

export default CustomToolBar;
