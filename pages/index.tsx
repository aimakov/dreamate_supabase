import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { generateRoomCode } from "@/functions/generateRoomCode";
import axios from "axios";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { selectUser, loginSuccess, logoutSuccess, loginError } from "@/store/authSlice";
import { actionError, actionSuccess } from "@/store/popupSlice";
// interface Room {
//     id: string,
//     room_code: string,
//     created_at: Date,
//     players:
// }

export default function Home() {
    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector(selectUser);

    // const getRooms = async () => {
    //     try {
    //         const { data, error } = await supabase.from("rooms").select("room_code");
    //         if (error) throw error;

    //         if (data.length) return data.reduce((acc: any, val) => [...acc, val.room_code], []);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const getURL = () => {
        let url =
            //   process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
            //   process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
            "http://localhost:3000/";
        // Make sure to include `https://` when not localhost.
        url = url.includes("http") ? url : `https://${url}`;
        // Make sure to including trailing `/`.
        url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
        return url;
    };

    const signin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: getURL(),
            },
        });
    };

    const signOut = async () => {
        console.log("signing out");
        const { error } = await supabase.auth.signOut();
        dispatch(logoutSuccess({}));
    };

    const createRoom = async () => {
        try {
            console.log(Object.keys(user).length);
            if (!Object.keys(user).length) dispatch(actionError({ message: "You are not logged in." }));
            else {
                const { data: roomCodes_data, error: roomCodes_error } = await supabase.from("rooms").select("room_code");
                if (roomCodes_error) throw roomCodes_error;

                const uniqueRoomCode = generateRoomCode(roomCodes_data);

                console.log(uniqueRoomCode);

                const { error } = await supabase.from("rooms").insert({ room_code: uniqueRoomCode });
                if (error) throw error;

                console.log("New room created: " + uniqueRoomCode);

                dispatch(actionSuccess({ message: "Success" }));
                setTimeout(() => {
                    router.push("rooms/" + uniqueRoomCode);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const testSession = async () => {
        const response = await axios.post("api/createRoom");

        console.log(response);
    };

    return (
        <Layout>
            <div className="w-full h-full min-h-screen relative flex flex-col justify-center items-center max-w-sm mx-auto gap-6">
                {user.id && (
                    <h2 className=" text-lg">
                        Hello, <b>{user.user_metadata.full_name}</b>
                    </h2>
                )}
                <img src={"/Logo.png"} alt="logo" className="w-3/4" />

                <div className="flex flex-col mt-10 gap-3">
                    <button
                        onClick={() => router.push("/create")}
                        disabled={!user.id}
                        className="disabled:bg-gray-300 disabled:hover:cursor-not-allowed py-4 w-[150px] bg-white/40 shadow-md rounded-2xl"
                    >
                        Create room
                    </button>

                    <button
                        disabled={!user.id}
                        onClick={() => router.push("/join")}
                        className="disabled:bg-gray-300 disabled:hover:cursor-not-allowed py-4 mb-10 w-[150px] bg-white/40 shadow-md rounded-2xl"
                    >
                        Join room
                    </button>

                    <button
                        onClick={() => router.push("/rooms")}
                        disabled={!user?.id}
                        className="py-4 w-[150px] bg-white/40 shadow-md rounded-2xl disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Your rooms
                    </button>

                    {Object.keys(user).length ? (
                        <button onClick={signOut} className="py-4 w-[150px] bg-white/40 shadow-md rounded-2xl">
                            Sign out
                        </button>
                    ) : (
                        <button onClick={signin} className="py-4 w-[150px] bg-white/40 shadow-md rounded-2xl">
                            Sign in
                        </button>
                    )}
                </div>
                <Link href={"privacy_policy"} className="absolute bottom-4 left-2/4 -translate-x-1/2 text-xs">
                    Privacy Policy
                </Link>
            </div>
        </Layout>
    );
}
