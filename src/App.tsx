import { DatePicker, ModeTypeEnum } from "DatePicker/DatePicker";
import "./App.css";
import { PickerTypeEnum } from "DatePicker/UI/Calendar/Calendar";

const App = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        justifyContent: "center",
      }}
    >
      <DatePicker
        options={{ locale: "ru" }}
        mode={ModeTypeEnum.INPUT}
        pickerMode={PickerTypeEnum.DAY}
        onChange={console.log}
      />
    </div>
  );
};

export default App;
