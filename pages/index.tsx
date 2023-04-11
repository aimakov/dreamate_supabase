import Layout from "@/components/Layout";
import Link from "next/link";

export default function Home() {
    return (
        <Layout>
            <div className="w-full min-h-screen flex flex-col justify-center items-center">
                <img src={"/logo.png"} alt="logo" className="w-3/4" />

                <div className="flex flex-col mt-6 gap-3">
                    <button className="py-4 w-[150px] bg-white/40 shadow-md rounded-2xl">Create room</button>

                    <button className="py-4 w-[150px] bg-white/40 shadow-md rounded-2xl">Join room</button>
                </div>
            </div>
        </Layout>
    );
}
