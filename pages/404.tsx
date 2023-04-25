import React from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {};

export default function ErrorPage(props: Props) {
    const router = useRouter();

    return (
        <Layout>
            <div className="w-full min-h-screen h-full flex flex-col justify-center items-center">
                <div className=" w-full flex flex-col items-center">
                    <img alt="404" src="/svg/404.svg" className=" mix-blend w-4/6" />
                    <p className="text-xl mt-4 text-center">Opps! Page not found!</p>
                    <p className="text-sm text-center w-9/12">The page you are looking for does not seem to exist.</p>
                </div>

                <div className="flex flex-col gap-4 mt-10">
                    <Link href="/">
                        <button onClick={() => router.back()} className="py-4 w-[150px] bg-white/40 shadow-md rounded-2xl">
                            HOMEPAGE
                        </button>
                    </Link>
                    <button onClick={() => router.back()} className="py-4 w-[150px] bg-white/40 shadow-md rounded-2xl">
                        GO BACK
                    </button>
                </div>
            </div>
        </Layout>
    );
}
