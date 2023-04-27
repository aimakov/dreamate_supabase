import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginError, logoutSuccess, selectUser } from "@/store/authSlice";
import Popup from "./Popup";
import Modal from "./Modal";

type Props = {
    children: React.ReactNode;
};

const Layout = (props: Props) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (Object.keys(user).length < 1 && session) dispatch(loginSuccess(session.user));
            else dispatch(logoutSuccess);
        });
    }, []);

    return (
        <div id="Layout" className=" font-comfortaa w-full h-full min-h-screen bg-gradient-to-r from-[rgba(0,242,96,0.8)]  to-[rgba(5,117,230,0.8)] ">
            <>
                <Popup />

                {props.children}
            </>
        </div>
    );
};

export default Layout;
