import { DatePicker } from "./DatePicker/DatePicker";
import "./App.css";
import { useState } from "react";

const disabledDates: [Date, Date][] = [[new Date(1900, 0, 1), new Date(2000, 0, 1)]]

const App = () => {
  const [date, setDate] = useState(new Date());
  console.log(date);
  return (
    <div
      style={{
        gap: "1rem",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "200px" }}>
        <DatePicker
          name="date-picker-name"
          pickerType={'day'}
          options={{
            locale: "ru",
          }}
          disabledDates={disabledDates}
          mode={'input'}
          onChange={setDate}
          // onChange={console.log}
          label="my label"
          value={date}
        />
      </div>
    </div>
  );
};

export default App;
