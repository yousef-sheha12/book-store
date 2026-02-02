import React from 'react'
import { useCounterStore } from './store'

export default function CounterFunctions() {
    const increament = useCounterStore((state) => state.increament)
    const decreament = useCounterStore((state) => state.decreament)

    return (
        <>
            <div className="flex gap-2">
                <button className='btn btn-success w-fit' onClick={increament}>+</button>
                <button className='btn btn-error w-fit' onClick={decreament}>-</button>
            </div>
        </>
    )
}
