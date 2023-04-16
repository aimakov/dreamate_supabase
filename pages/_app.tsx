import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store/store";
import { supabase } from "@/utils/supabaseClient";

export default function App({ Component, pageProps }: AppProps) {
    supabase.auth.onAuthStateChange((event, session) => {
        console.log(event);
        console.log("_app.js");

        fetch("/api/auth", {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" }),
            credentials: "same-origin",
            body: JSON.stringify({ event, session }),
        });
    });

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
