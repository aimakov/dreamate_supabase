import React, { useEffect } from "react";

import Layout from "@/components/Layout";

type Props = {};

const MobileLink = (props: Props) => {
  const redirectToApp = () => {
    let fallbackLink = "https://yourapp.com/download";

    // isiOS isAndroid implement by yourself
    // if (isiOS() || isAndroid()) {
    window.location = "sunnimarriage://" as Location | (string & Location);

    const androidAppStoreLink = "https://play.google.com/store/apps/details?id=com.test.android";
    const iosAppStoreLink = "itms-apps://itunes.apple.com/app/my-app/idxxxxxxxx?mt=8";
    // fallbackLink = isAndroid() ? androidAppStoreLink : iosAppStoreLink;

    fallbackLink = iosAppStoreLink;

    // setTimeout still executes after the app is opened, so the current page will navigate to the fallback link
    // to prevent this, I use the document.hasFocus function to check
    setTimeout(function () {
      // if the app is opened, the document won't be focused
      // so if app is not installed, the document will be focused
      if (document.hasFocus()) {
        window.location = fallbackLink as Location | (string & Location);
      }
    }, 1000);
    // }
  };

  useEffect(() => {
    redirectToApp();
  }, []);
  return (
    <Layout>
      <div className="w-full min-h-screen flex flex-col justify-center items-center font-montserrat">Install SunniMarriage app from AppStore/GooglePlay</div>
    </Layout>
  );
};

export default MobileLink;
