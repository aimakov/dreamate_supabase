import React from "react";

type Props = {
    children: React.ReactNode;
};

const Layout = (props: Props) => {
    return (
        <div className="font-montserrat w-full h-full min-h-screen bg-gradient-to-r from-[rgba(0,242,96,0.8)]  to-[rgba(5,117,230,0.8)]">{props.children}</div>
    );
};

export default Layout;
