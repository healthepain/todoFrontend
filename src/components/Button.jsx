// import React from 'react'

import { useState } from "react";

function Button({ name = "click me" }) {

    // const lableName = name || "strenger"
    const [number, setNumber] = useState(1)

    const handleClick = () => {
        setNumber((prev) => prev + 1)
    };


    return (
        <>
            {/* {
                name == "buy" ?
                    <button onClick={handleClick}>Button Buy</button> :
                    <button onClick={handleClick}>Button Sell</button>
            } */}

            <button onClick={handleClick}> {name}</button>
            <p>{number}</p>
        </>
    )
}

export default Button
