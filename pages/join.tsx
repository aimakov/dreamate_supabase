import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { actionError, actionSuccess } from "@/store/popupSlice";
import { supabase } from "@/utils/supabaseClient";

type Props = {};

const Join = (props: Props) => {
  const user = useSelector(selectUser);
  const router = useRouter();
  const dispatch = useDispatch();
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);

  const typeRoomCode = (e: any) => {
    if (e.target.value.length > 6) return;
    else setRoomCode(e.target.value);
  };

  const joinRoom = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/joinRoom", {
        room_code: roomCode.toUpperCase(),
        user_id: user.id,
        user_name: user.user_metadata.full_name,
      });

      dispatch(actionSuccess({ message: response.data.message }));
      setTimeout(() => {
        setLoading(false);
        router.push("rooms/" + roomCode.toUpperCase());
      }, 2000);
    } catch (error) {
      setLoading(false);
      dispatch(actionError({ message: error.response.data.message }));
    }
  };

  const getRoom = async () => {
    const { data, error } = await supabase
      .from("rooms")
      .select()
      .eq("room_code", roomCode.toUpperCase());

    if (error) console.log(error);
  };

  useEffect(() => {
    if (!user.id) {
      router.push("/");
      dispatch(actionError({ message: `You are not signed in.` }));
    }
  }, [router]);

  if (!user.id) return <Layout> </Layout>;
  else
    return (
      <Layout>
        <div className="w-full min-h-screen flex flex-col justify-center items-center font-montserrat">
          <div className="w-[280px] h-[280px] bg-white/30 rounded-[20px] shadow-md flex flex-col justify-center items-center">
            <h2 className="text-2xl font-medium mb-[14px]">Enter Room Code:</h2>
            <input
              value={roomCode}
              onChange={typeRoomCode}
              className=" p-4 rounded-[4px] mb-[32px] w-10/12 text-center uppercase text-lg"
            />
            <div className="flex flex-col gap-2">
              <button
                disabled={roomCode.length < 6 || loading}
                onClick={joinRoom}
                className=" disabled:bg-gray-300 disabled:hover:cursor-not-allowed w-[130px] h-[44px] bg-white/30 rounded-3xl hover:bg-white/50 transition-all"
              >
                {loading ? (
                  <img src="/loading.gif" className="w-[34px] mx-auto" />
                ) : (
                  "Join Room"
                )}
              </button>
              <button
                onClick={() => router.back()}
                className="w-[130px] py-[10px] bg-white/30 rounded-3xl hover:bg-white/50 transition-all"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
};

export default Join;
