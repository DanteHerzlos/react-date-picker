import { DatePicker, ModeTypeEnum } from "DatePicker/DatePicker";
import "./App.css";
import { PickerTypeEnum } from "./DatePicker/types/PickerTypesEnum";
import { useState } from "react";

const App = () => {
  const [date, setDate] = useState(new Date());
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
          pickerType={PickerTypeEnum.DAY}
          options={{ locale: "ru" }}
          mode={ModeTypeEnum.INPUT}
          onChange={setDate}
          label="my label"
          value={date}
        />
      </div>
    </div>
  );
};

export default App;
