import React, { useState } from "react";

export default function TestPage() {

    const [count, setCount] = useState(150);
    console.log(count);

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[500px] h-[500px] bg-amber-100 text-white flex justify-center items-center gap-[25px]">                
                <button onClick={
                    () => {
                        console.log("Decrement button clicked");
                        setCount(220);
                    }
                } className="w-[100px] bg-accent h-[40px] rounded-lg">
                    -
                </button>
                <span className="text-5xl text-accent">
                    {count}
                </span>
                <button onClick={
                    () => {
                        console.log("Increment Button clicked");
                        setCount(440);
                    }
                } className="w-[100px] bg-accent h-[40px] rounded-lg">
                    +
                </button>
            </div>
        </div>
    );
}