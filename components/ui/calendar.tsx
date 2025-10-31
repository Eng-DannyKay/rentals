import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const IconLeft = () => <ChevronLeft className="h-4 w-4" />;
const IconRight = () => <ChevronRight className="h-4 w-4" />;

export interface CalendarProps {
  className?: string;
  value?: Date | null;
  onSelect?: (date: Date | undefined) => void;
}

export function Calendar({ className, value, onSelect }: Readonly<CalendarProps>) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = React.useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(value ?? null);

  React.useEffect(() => {
    setSelectedDate(value ?? null);
  }, [value]);

  // Helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };
  const getFirstDayOfWeek = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  const isSelected = (date: Date) => {
    return (
      selectedDate &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };


  const prevMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };
  const nextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfWeek = getFirstDayOfWeek(currentMonth);
  const days: (Date | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d));
  }

  const weekRows: (Array<Date | null>)[] = [];
  for (let i = 0; i < days.length; i += 7) {
    weekRows.push(days.slice(i, i + 7));
  }

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className={cn("p-3", className)}>
      <div className="flex justify-center pt-1 relative items-center">
        <button
          type="button"
          onClick={prevMonth}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1"
          )}
          aria-label="Previous Month"
        >
          <IconLeft />
        </button>
        <span className="text-sm font-medium">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1"
          )}
          aria-label="Next Month"
        >
          <IconRight />
        </button>
      </div>
      <div className="w-full border-collapse space-y-1 mt-4">
        <div className="flex">
          {weekDays.map((wd) => (
            <div
              key={wd}
              className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-center"
            >
              {wd}
            </div>
          ))}
        </div>
        {weekRows.map((week, weekIndex) => (
          <div
            key={`week-${currentMonth.getFullYear()}-${currentMonth.getMonth()}-${weekIndex}`}
            className="flex w-full mt-2"
          >
            {week.map((date, dayIndex) => (
              <div
                key={date ? date.toDateString() : `empty-${weekIndex}-${dayIndex}`}
                className="h-9 w-9 text-center text-sm p-0 relative"
              >
                {date ? (
                  <button
                    type="button"
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "h-9 w-9 p-0 font-normal",
                      isSelected(date)
                        ? "bg-primary text-primary-foreground"
                        : "",
                      isToday(date) ? "bg-accent text-accent-foreground" : ""
                    )}
                    onClick={() => {
                      setSelectedDate(date);
                      if (onSelect) onSelect(date);
                    }}
                  >
                    {date.getDate()}
                  </button>
                ) : (
                  <span className="invisible">0</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
