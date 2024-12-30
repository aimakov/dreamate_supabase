import React from "react";

import Layout from "@/components/Layout";

type Props = {};

const MobileLink = (props: Props) => {
    return (
        <Layout>
            <div className="w-full min-h-screen flex flex-col justify-center items-center font-montserrat">
                Install SunniMarriage app from AppStore/GooglePlay
            </div>
        </Layout>
    );
};

export default MobileLink;
