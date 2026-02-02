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

            {/* Counter State */}
            {/* <div className="flex flex-col gap-4 h-dvh w-full justify-center items-center">
                this is our counter from state {counter}
                <CounterFunctions />
            </div> */}
            {/* <div className="flex gap-2">
                    <button className='btn btn-success w-fit' onClick={() => {
                        setCounter(counter + 1)
                    }}>+</button>
                    <button className='btn btn-error w-fit' onClick={() => {
                        setCounter(counter - 1)
                    }}>-</button>
                </div> */}
        </>
    )
}