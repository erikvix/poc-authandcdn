"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-indigo-500 rounded-md w-8 font-normal text-[0.8rem] dark:text-indigo-400",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-indigo-100 [&:has([aria-selected].day-outside)]:bg-indigo-100/50 [&:has([aria-selected].day-range-end)]:rounded-r-md dark:[&:has([aria-selected])]:bg-indigo-800 dark:[&:has([aria-selected].day-outside)]:bg-indigo-800/50",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-indigo-900 text-indigo-50 hover:bg-indigo-900 hover:text-indigo-50 focus:bg-indigo-900 focus:text-indigo-50 dark:bg-indigo-50 dark:text-indigo-900 dark:hover:bg-indigo-50 dark:hover:text-indigo-900 dark:focus:bg-indigo-50 dark:focus:text-indigo-900",
        day_today:
          "bg-indigo-100 text-indigo-900 dark:bg-indigo-800 dark:text-indigo-50",
        day_outside:
          "day-outside text-indigo-500 aria-selected:bg-indigo-100/50 aria-selected:text-indigo-500 dark:text-indigo-400 dark:aria-selected:bg-indigo-800/50 dark:aria-selected:text-indigo-400",
        day_disabled: "text-indigo-500 opacity-50 dark:text-indigo-400",
        day_range_middle:
          "aria-selected:bg-indigo-100 aria-selected:text-indigo-900 dark:aria-selected:bg-indigo-800 dark:aria-selected:text-indigo-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
