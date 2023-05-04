import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { actionError, actionSuccess } from "@/store/popupSlice";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/authSlice";

type Props = {};

const Join = (props: Props) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [roomName, setRoomName] = useState("");

  const typeRoomName = (e: any) => {
    setRoomName(e.target.value);
  };

  const createRoom = async () => {
    try {
      setLoading(true);
      // if (!roomName) {
      //   dispatch(actionError({ message: "Enter room name." }));
      //   return;
      // }

      const response = await axios.post("api/createRoom", {
        room_name: roomName.toUpperCase(),
        host: user.id,
        host_name: user.user_metadata.full_name,
      });
      //   console.log(response);
      dispatch(actionSuccess({ message: response.data.message }));
      setTimeout(() => {
        setLoading(false);
        router.push(`/rooms/${response.data.room_code}`);
      }, 2000);
    } catch (error) {
      console.log(error);
      setLoading(false);
      dispatch(actionError({ message: error.response.data.message }));
    }

    // if (response.data.success) router.push("rooms/" + roomCode.toUpperCase());
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
            <h2 className="text-2xl font-medium mb-[14px]">Enter Room Name:</h2>
            <input
              value={roomName}
              onChange={typeRoomName}
              className=" p-4 rounded-[4px] mb-[32px] text-center uppercase text-lg w-10/12"
            />
            <div className="flex flex-col gap-2">
              <button
                onClick={createRoom}
                disabled={!roomName || loading}
                className={`w-[130px]  h-[44px] bg-white/30 rounded-3xl hover:bg-white/50 transition-all disabled:bg-gray-200 disabled:hover:cursor-not-allowed`}
              >
                {loading ? (
                  <img src="/loading.gif" className="w-[34px] mx-auto" />
                ) : (
                  "Create Room"
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
