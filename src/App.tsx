import { DatePicker } from "DatePicker/DatePicker";
import "./App.css";


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
    <DatePicker onChange={console.log} locale="ru"/>
    </div>
  );
};

export default App;
