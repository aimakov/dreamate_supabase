import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { supabase } from "@/utils/supabaseClient";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/authSlice";
import { useRouter } from "next/router";

type Props = {};

const Rooms = (props: Props) => {
  const user = useSelector(selectUser);
  const [userRooms, setUserRooms] = useState([]);
  const [joinedRooms, setJoinedRooms] = useState([]);
  const router = useRouter();

  const getUserRooms = async () => {
    const { data, error } = await supabase
      .from("rooms")
      .select()
      .eq("host", user.id);

    // console.log(data);
    setUserRooms(data);
  };

  const getJoinedRooms = async () => {
    const { data, error } = await supabase
      .from("rooms")
      .select()
      .containedBy("users", [user.id]);

    setJoinedRooms(data);
  };

  useEffect(() => {
    if (user.id) {
      getUserRooms();
      getJoinedRooms();
    }
  }, [user]);

  return (
    <Layout>
      <div className="w-full min-h-screen flex flex-col justify-center items-center">
        <div className="p-4 w-11/12 flex flex-col items-center bg-white/20 rounded-xl gap-10">
          <div className="w-full flex flex-col items-center">
            <h2 className=" text-xl mb-4">Your rooms:</h2>
            {userRooms.map((userRoom) => (
              <div
                key={userRoom.id}
                onClick={() => router.push("/rooms/" + userRoom.room_code)}
                className="px-5 py-3 w-3/4 bg-white/30 rounded-3xl text-center"
              >
                {userRoom.room_name}
              </div>
            ))}
          </div>
          <div className="w-full flex flex-col items-center">
            <h2 className=" text-xl mb-4">Joined rooms:</h2>
            {joinedRooms.map((joinedRoom) => (
              <div
                key={joinedRoom.id}
                onClick={() => router.push("/rooms/" + joinedRoom.room_code)}
                className="px-5 py-3 w-3/4 bg-white/30 rounded-3xl text-center"
              >
                {joinedRoom.room_name}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => router.back()}
          className="w-[130px] py-[10px] bg-white/30 mt-4 rounded-3xl hover:bg-white/50 transition-all"
        >
          Go Back
        </button>
      </div>
    </Layout>
  );
};

export default Rooms;
