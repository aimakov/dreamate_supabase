import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginError, logoutSuccess, selectUser } from "@/store/authSlice";
import Popup from "./Popup";

type Props = {
    children: React.ReactNode;
};

const Layout = (props: Props) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            console.log(event);
            console.log(Object.keys(user).length);
            if (event === "INITIAL_SESSION") console.log("PIDOR");

            if (!Object.keys(user).length && session) dispatch(loginSuccess(session.user));
            else if (event === "SIGNED_IN") dispatch(loginSuccess(session.user));
            else dispatch(logoutSuccess);
            // if (event === "SIGNED_IN") dispatch(loginSuccess(session.user));
            // if (event === "SIGNED_OUT") dispatch(logoutSuccess);
            // if (session?.user.id) {
            //     dispatch(loginSuccess(session.user));
            // } else dispatch(logoutSuccess);
        });
    }, []);

    return (
        <div className=" font-comfortaa w-full h-full min-h-screen bg-gradient-to-r from-[rgba(0,242,96,0.8)]  to-[rgba(5,117,230,0.8)]">
            <>
                <Popup />
                {props.children}
            </>
        </div>
    );
};

export default Layout;
