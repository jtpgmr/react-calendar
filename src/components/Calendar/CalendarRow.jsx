import React from "react";
import styles from "../../styles/global";

const NUM_DAYS_OF_WEEK = 7;
const FIRST_DAY = 1;

const CalendarRow = ({
  firstWeekdayOfMonth,
  lastDayInMonth,
  row,
  currentMonth,
  currentYear,
}) => {
  const currentDate = new Date().getDate();

  // list of data cells (<td></td>) for each day of the month
  let daySlots = [];
  if (row === null || row === undefined) {
    return <></>;
  }

  // POPULATES THE FIRST ROW
  // for values whose index is lower than the index of the first day of, they are given blank td's
  // if the first day of the month is Thurs, Sun to Wed will be blank
  if (!row) {
    for (let i = 0; i < firstWeekdayOfMonth; i++) {
      daySlots.push(
        <td
          key={`blank-${i}-${currentDate}`}
          className={styles.tdCalendarBlank}
        ></td>
      );
    }
    daySlots.push(
      <td
        key={`${currentMonth}-${currentYear}-${FIRST_DAY}`}
        className={styles.tdCalendar}
      >
        {FIRST_DAY}
      </td>
    );

    let populatedSlotsInFirstRow = 7 - daySlots.length;
    // console.log(daySlots)
    // console.log(populatedSlotsInFirstRow)
    for (let i = 1; i <= populatedSlotsInFirstRow; i++) {
      let j = i + 1;
      daySlots.push(
        <React.Fragment key={`fragment-${i}`}>
          {currentDate === j &&
          new Date().getMonth() === currentMonth &&
          new Date().getFullYear() === currentYear ? (
            <td
              key={`currentDay-${currentDate}`}
              className={`${styles.tdCalendarCurrent}`}
            >
              {j}
            </td>
          ) : (
            <td key={`notCurrentDay-${i}`} className={styles.tdCalendar}>
              {j}
            </td>
          )}
        </React.Fragment>
      );
    }
    return <>{!daySlots ? <></> : daySlots}</>;
  }

  //subsequent rows
  for (let i = 1; i <= NUM_DAYS_OF_WEEK; i++) {
    if (i + (NUM_DAYS_OF_WEEK * row - firstWeekdayOfMonth) <= lastDayInMonth) {
      daySlots.push(
        <React.Fragment key={`fragment-${i}-2`}>
          {currentDate === i + (7 * row - firstWeekdayOfMonth) &&
          new Date().getMonth() === currentMonth &&
          new Date().getFullYear() === currentYear ? (
            <td
              key={`currentDay-${currentDate}`}
              className={`${styles.tdCalendarCurrent}`}
            >
              {i + (NUM_DAYS_OF_WEEK * row - firstWeekdayOfMonth)}
            </td>
          ) : (
            <td key={`notCurrentDay-${i}-2`} className={styles.tdCalendar}>
              {i + (NUM_DAYS_OF_WEEK * row - firstWeekdayOfMonth)}
            </td>
          )}
        </React.Fragment>
      );
    }
  }
  return <>{daySlots}</>;
};

export default CalendarRow;
