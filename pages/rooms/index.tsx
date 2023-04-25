import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { supabase } from "@/utils/supabaseClient";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "@/store/authSlice";
import { useRouter } from "next/router";
import { actionError } from "@/store/popupSlice";

type Props = {};

const Rooms = (props: Props) => {
  const user = useSelector(selectUser);
  const [userRooms, setUserRooms] = useState([]);
  const [joinedRooms, setJoinedRooms] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const getUserRooms = async () => {
    const { data, error } = await supabase
      .from("rooms")
      .select()
      .eq("host", user.id);
    if (error) {
      dispatch(actionError({ message: "Something went wrong." }));
      return;
    }
    // console.log(data);
    setUserRooms(data);
  };

  const getJoinedRooms = async () => {
    const { data, error } = await supabase
      .from("rooms")
      .select()
      .contains("users", [user.id]);
    if (error) {
      dispatch(actionError({ message: "Something went wrong." }));
      return;
    }
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
      <div className="w-full min-h-screen flex flex-col justify-center items-center max-w-sm mx-auto">
        <div className="p-4 w-11/12 flex flex-col items-center bg-white/20 rounded-xl gap-10">
          {userRooms.length < 1 && joinedRooms.length < 1 && (
            <h2>Rooms list is empty.</h2>
          )}
          {userRooms.length > 0 && (
            <div className="w-full flex flex-col  items-center">
              <h2 className=" text-xl mb-4 ">Your rooms:</h2>
              <div className="w-full flex flex-col items-center gap-2">
                {userRooms.map((userRoom) => (
                  <div
                    key={userRoom.id}
                    onClick={() => router.push("/rooms/" + userRoom.room_code)}
                    className="px-6 py-3 min-w-[150px] bg-white/30 rounded-3xl text-center "
                  >
                    {userRoom.room_name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {joinedRooms.length > 0 && (
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
          )}
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
