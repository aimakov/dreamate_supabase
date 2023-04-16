import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useDispatch } from "react-redux";
import { loginSuccess, loginError, logoutSuccess } from "@/store/authSlice";
import Popup from "./Popup";

type Props = {
    children: React.ReactNode;
};

const Layout = (props: Props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            console.log(event);
            console.log(session);
            if (event === "SIGNED_IN") dispatch(loginSuccess(session.user));
            if (event === "SIGNED_OUT") dispatch(logoutSuccess);
            // if (session?.user.id) {
            //     dispatch(loginSuccess(session.user));
            // } else dispatch(logoutSuccess);
        });
    }, []);

    return (
        <div className="font-montserrat w-full h-full min-h-screen bg-gradient-to-r from-[rgba(0,242,96,0.8)]  to-[rgba(5,117,230,0.8)]">
            <>
                <Popup />
                {props.children}
            </>
        </div>
    );
};

export default Layout;
