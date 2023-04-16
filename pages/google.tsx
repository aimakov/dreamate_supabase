import { supabase } from "@/utils/supabaseClient";
import React from "react";
type Props = {};

const Google = (props: Props) => {
    async function signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });

        console.log(data);
    }

    return (
        <div>
            <button onClick={signInWithGoogle}>Google</button>
        </div>
    );
};

export default Google;
