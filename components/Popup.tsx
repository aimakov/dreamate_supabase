import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMessage, selectType, selectToggle, actionClear } from "@/store/popupSlice";

const Popup = () => {
    const [popup, setPopup] = useState(false);

    const message = useSelector(selectMessage);
    const type = useSelector(selectType);
    const toggle = useSelector(selectToggle);

    const dispatch = useDispatch();

    const [loop, setLoop] = useState<any>();

    const colorCodes = {
        ERROR: "#fca5a5",
        SUCCESS: "#4ade80",
        INFO: "#fde68a",
    };

    const showPopup = () => {
        setPopup(true);

        setLoop(
            setTimeout(() => {
                setPopup(false);
                // setTimeout(() => {
                //     dispatch(actionClear(""));
                // }, 500);
            }, 1000)
        );
    };

    const memo = useMemo(() => {
        if (message) showPopup();
    }, [toggle]);

    // useEffect(() => {
    //     if (message) {
    //         showPopup();
    //     }

    //     return () => {
    //         clearTimeout(loop);
    //     };
    // }, [toggle]);

    return (
        <div
            style={{
                top: popup ? "80px" : "-140px",
                backgroundColor: colorCodes[type],
            }}
            className={`p-4 text-center rounded-md shadow-md inline-block absolute transition-all left-2/4 -translate-x-1/2 ease-in-out duration-300 z-50`}
        >
            {message}
        </div>
    );
};

export default Popup;
