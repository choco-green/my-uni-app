"use client";

import { CalendarIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import {
	DateValue,
	useButton,
	useDatePicker,
	useInteractOutside,
} from "react-aria";
import { DatePickerStateOptions, useDatePickerState } from "react-stately";
import { useForwardedRef } from "../../../lib/useForwardedRef";
import { cn } from "../../../lib/utils";
import { Button } from "../button";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Calendar } from "./calendar";
import { DateField } from "./date-field";
import { TimeField } from "./time-field";

const DateTimePicker = React.forwardRef<
	HTMLDivElement,
	DatePickerStateOptions<DateValue>
>((props, forwardedRef) => {
	const ref = useForwardedRef(forwardedRef);
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const contentRef = useRef<HTMLDivElement | null>(null);

	const [open, setOpen] = useState(false);

	const state = useDatePickerState(props);
	const {
		groupProps,
		fieldProps,
		buttonProps: _buttonProps,
		dialogProps,
		calendarProps,
	} = useDatePicker(props, state, ref);
	const { buttonProps } = useButton(_buttonProps, buttonRef);
	useInteractOutside({
		ref: contentRef,
		onInteractOutside: () => {
			setOpen(false);
		},
	});

	return (
		<div
			{...groupProps}
			ref={ref}
			className={cn(
				groupProps.className,
				"flex items-center rounded-md ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
			)}
			aria-label="Date-time-picker"
		>
			<DateField {...fieldProps} />
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild aria-label="Date text">
					<Button
						{...buttonProps}
						variant="outline"
						className="rounded-l-none"
						disabled={props.isDisabled}
						onClick={() => setOpen(true)}
						aria-label="Open calendar"
					>
						<CalendarIcon
							className="h-5 w-5"
							aria-label="calendar icon"
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent
					ref={contentRef}
					className="w-full"
					aria-label="open calendar"
				>
					<div {...dialogProps} className="space-y-3">
						<Calendar {...calendarProps} />
						{!!state.hasTime && (
							<TimeField
								value={state.timeValue}
								onChange={state.setTimeValue}
							/>
						)}
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
});

DateTimePicker.displayName = "DateTimePicker";

export { DateTimePicker };
