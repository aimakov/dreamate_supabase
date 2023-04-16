import React, { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useDispatch } from "react-redux";
import { loginSuccess, loginError } from "@/store/authSlice";

type Props = {
    children: React.ReactNode;
};

const Layout = (props: Props) => {
    const dispatch = useDispatch();

    supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user.id) dispatch(loginSuccess(session.user));
        else dispatch(loginError);
    });

    return (
        <div className="font-montserrat w-full h-full min-h-screen bg-gradient-to-r from-[rgba(0,242,96,0.8)]  to-[rgba(5,117,230,0.8)]">
            <>{props.children}</>
        </div>
    );
};

export default Layout;
