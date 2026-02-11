import { BrowserRouter } from "react-router-dom";
import RouterApp from "./routes/RouterApp";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <RouterApp />
      </BrowserRouter>
    </>
  );
}
