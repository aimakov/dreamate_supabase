import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { supabase } from "@/utils/supabaseClient";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "@/store/authSlice";
import axios from "axios";

type Props = {};

const Room = (props: Props) => {
  const router = useRouter();
  const { id: room_code } = router.query;
  const user = useSelector(selectUser);

  const [roomDetails, setRoomDetails] = useState<any>();

  const getRoomDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("rooms")
        .select()
        .eq("room_code", room_code);

      if (error) throw error;

      setRoomDetails(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const leaveRoom = async () => {
    try {
      console.log("user_id: " + user.id);
      console.log("room_code: " + room_code);

      const response = await axios.post("/api/leaveRoom", {
        room_code: room_code,
        user_id: user.id,
      });

      if (response.data.success) router.push("/rooms");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoomDetails();
  }, []);

  return (
    <Layout>
      <div className="w-full min-h-screen flex flex-col justify-center items-center">
        {room_code}
        {user.id && roomDetails?.users.includes(user.id) && (
          <button
            onClick={leaveRoom}
            className="w-[130px] py-[10px] bg-white/30 rounded-3xl hover:bg-white/50 transition-all"
          >
            Leave Room
          </button>
        )}
      </div>
    </Layout>
  );
};

export default Room;
