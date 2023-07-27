import React from "react";
import * as locales from "react-date-range/dist/locale";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

export const DateRange = ({ selectionRange, setSelectionRange }) => {
  const handleSelect = (date) => {
    setSelectionRange({ ...date.selection });
  };

  return (
    <div>
      <DateRangePicker
        inputRanges={[]}
        locale={locales["es"]}
        ranges={[selectionRange]}
        onChange={handleSelect}
        editableDateInputs={true}
        moveRangeOnFirstSelection={false}
        renderStaticRangeLabel={() => null}
        l
      />
    </div>
  );
};
