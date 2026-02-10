import { BrowserRouter } from "react-router-dom";
import RouterApp from "./routes/RouterApp";
// import CounterFunctions from "./CounterFunctions";
// import { useCounterStore } from "./store";

export default function App() {
  // const counter = useCounterStore((state) => state.counter)

  return (
    <>
      <BrowserRouter>
        <RouterApp />
      </BrowserRouter>
    </>
  );
}
