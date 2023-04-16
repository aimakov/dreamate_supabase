import React, { useEffect, useState } from "react";

const Popup = ({ notification }) => {
    const [popup, setPopup] = useState(false);

    const colorCodes = {
        ERROR: "#fca5a5",
        SUCCESS: "#4ade80",
        INFO: "#fde68a",
    };

    const showPopup = () => {
        setPopup(true);
        setTimeout(() => setPopup(false), 2000);
    };

    useEffect(() => {
        if (notification) {
            showPopup();
        }
    }, [notification]);

    return (
        <div
            style={{
                top: popup ? "80px" : "-140px",
                backgroundColor: colorCodes[notification?.type],
            }}
            className={`px-6 py-6 rounded-md shadow-md inline-block absolute transition-all left-2/4 -translate-x-1/2 ease-in-out duration-300 z-50`}
        >
            {notification?.message}
        </div>
    );
};

export default Popup;
