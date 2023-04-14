import React from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

type Props = {};

const Room = (props: Props) => {
  const router = useRouter();
  const { id: gameId } = router.query;

  return (
    <Layout>
      <div className="w-full min-h-screen flex flex-col justify-center items-center">
        {gameId}
      </div>
    </Layout>
  );
};

export default Room;
