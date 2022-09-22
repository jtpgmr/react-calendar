import { useEffect, useRef, useState } from "react";
import CalendarRow from "./CalendarRow";

import styles from "../../styles/global";

const DAYS = ["Sn", "M", "Tu", "W", "Th", "F", "Sa"];
const NUM_DAYS_OF_WEEK = 7;
const NEXT = "Next"
const PREV = "Prev"

const Calendar = () => {
  const currentDate = new Date();
  // defaults actively shown month to the current Month
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentMonthText, setCurrentMonthText] = useState(
    currentDate.toDateString().split(" ")[1]
  );
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const prevMonth = useRef(null);
  // list of the index of the first weekday of the month for each month
  const [firstDayInMonth, setFirstDayInMonth] = useState([]);
  // also the # of days in a month
  const [lastDayInMonth, setLastDayInMonth] = useState([]);
  const [numberOfRows, setNumberOfRows] = useState(null);

  useEffect(() => {
    setCurrentMonthText(
      new Date(new Date().setMonth(currentMonth)).toDateString().split(" ")[1]
    );
    //references previous activeMonth
    prevMonth.current = currentMonth;
  }, [currentMonth]);

  useEffect(() => {
    let firstDay = [];
    for (let i = 1; i <= 12; i++) {
      firstDay.push(new Date(`${currentYear}/${i}/1`).getDay());
    }

    setFirstDayInMonth(firstDay);
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
    setLastDayInMonth(lastDay);
  }, [currentYear, currentMonth]);

  useEffect(() => {
    const rows = Math.ceil(lastDayInMonth / NUM_DAYS_OF_WEEK);
    setNumberOfRows(rows + 1);
  }, [lastDayInMonth, numberOfRows]);

  const renderCalendarRows = () => {
    let calendarRows = [];
    for (let i = 0; i < numberOfRows; i++) {
      calendarRows.push(
        <tr key={`row-${i}-${currentMonth}-${currentYear}`}>
          <CalendarRow
            key={`calendarRow-${i}-${currentMonth}-${currentYear}`}
            firstWeekdayOfMonth={firstDayInMonth[currentMonth]}
            lastDayInMonth={lastDayInMonth}
            row={i}
            currentMonth={currentMonth}
            currentYear={currentYear}
          />
        </tr>
      );
    }
    return calendarRows;
  };

  const prevPage = () => {
      if (prevMonth.current === 0) {
        setCurrentYear(currentYear - 1);
        setCurrentMonth(11);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
  }

  const nextPage = () => {
    if (prevMonth.current === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
}

  return (
    <div className="p-6 bg-white dark:bg-gray-700 w-96 my-20vh mx-auto border-2 border-black rounded-3xl md:scale-90">
      <div className="">

        <div className="flex items-center justify-between mb-4">
          <div className="text-left font-bold text-xl text-black dark:text-white">
            {currentMonthText}&nbsp;{currentYear}
          </div>

          <div className="flex space-x-4">
            <button
              className={`${styles.button}`}
              onClick={prevPage}
            >
              {PREV}
            </button>
            <button
              className={`${styles.button}`}
              onClick={nextPage}
            >
              {NEXT}
            </button>
          </div>
        </div>

        <div className="-mx-2">
          <table className="w-full dark:text-white">
            <thead>
              <tr>
                {DAYS.map((day, idx) => {
                  if (day === DAYS[0] || day === DAYS[NUM_DAYS_OF_WEEK - 1]) {
                    return (
                      <th
                        className={`${styles.headerRow} text-purple-600`}
                        key={`DAYS-${idx}`}
                      >
                        {day}
                      </th>
                    );
                  } else {
                    return (
                      <th className={`${styles.headerRow}`} key={`DAYS-${idx}`}>
                        {day}
                      </th>
                    );
                  }
                })}
              </tr>
            </thead>
            <tbody>{renderCalendarRows()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
