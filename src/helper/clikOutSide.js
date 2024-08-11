import React, { useEffect } from "react";

function ClickOutSide(ref, handler) {
    useEffect (() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                handler();
            };
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [ref, handler]);   
}

export default ClickOutSide;