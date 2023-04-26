import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";

const Privacy_policy = () => {
  return (
    <Layout>
      <div className="py-20 w-full flex flex-col justify-center items-center">
        <div className="flex flex-col items-center w-11/12 max-w-md bg-white py-6 px-10 rounded-xl">
          <div className=" text-center mb-10">
            <h2 className="text-[2rem] font-extrabold">Privacy Policy</h2>
            <p>Effective date: April 25, 2023</p>
          </div>

          <div className=" text-sm text-[#334155] flex flex-col gap-6">
            <p>
              At Dreamate, we are committed to protecting the privacy and
              security of our users&apos; personal information. This Privacy
              Policy outlines the types of personal information we collect, how
              we use and protect that information, and your rights and choices
              with respect to your personal information.
            </p>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-black">
                Information we collect
              </h3>
              <p>
                We may collect the following types of personal information from
                you when you use our website:
              </p>
              <ul className="list-disc pl-6">
                <li>
                  Name, email address, postal address, and other contact
                  information
                </li>
                <li>
                  Payment information, such as credit card numbers and billing
                  addresses
                </li>
                <li>Purchase history and transaction details</li>
                <li>
                  Information about your device and internet connection, such as
                  your IP address and browser type
                </li>
                <li>
                  Information about your use of our website, such as pages
                  visited and search queries
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-black">
                How we use your information
              </h3>
              <p>We use your personal information to:</p>
              <ul className="list-disc pl-6">
                <li>Process transactions and fulfill orders</li>
                <li>Provide customer support and respond to your inquiries</li>
                <li>Analyze and improve our website and services</li>
                <li>
                  Communicate with you about our products and services,
                  promotions, and other news and information that may be of
                  interest to you
                </li>
              </ul>
              <p>
                We may also use your information for other purposes with your
                consent.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-black">
                Sharing of information
              </h3>
              <p>
                We do not sell or rent your personal information to third
                parties. We may share your personal information with third-party
                service providers who help us operate our website and provide
                our services. These service providers are contractually
                obligated to protect the confidentiality and security of your
                personal information.
                <br />
                <br />
                We may also share your personal information with law enforcement
                authorities or other third parties as required by law or to
                protect our rights and property.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-black">
                Cookies and other tracking technologies
              </h3>
              <p>
                We may use cookies and other tracking technologies to collect
                information about your use of our website. Cookies are small
                data files that are stored on your device and allow us to
                remember your preferences and personalize your experience. You
                can control the use of cookies through your browser settings.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-black">
                Data retention and security
              </h3>
              <p>
                We retain your personal information for as long as necessary to
                fulfill the purposes for which it was collected or as required
                by law. We take reasonable measures to protect the
                confidentiality and security of your personal information, but
                we cannot guarantee its absolute security.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-black">
                Your rights and choices
              </h3>
              <p>
                You have the right to access and correct your personal
                information, as well as to request that we delete it or restrict
                its use. You may also object to the processing of your personal
                information and request that we provide your information in a
                portable format. To exercise these rights, please contact us
                using the information below.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-black">
                Updates to this Privacy Policy
              </h3>
              <p>
                We may update this Privacy Policy from time to time. The most
                current version will be posted on our website with the date of
                the last update. We encourage you to review this Privacy Policy
                periodically.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-black">Contact us</h3>
              <p>
                If you have any questions or concerns about our privacy
                practices, please contact us at nurbolat.aimakov@gmail.com.
              </p>
            </div>
          </div>
        </div>
        <Link href="/" className="px-4 py-2 bg-white/30 rounded-xl mt-6">
          HOMEPAGE
        </Link>
      </div>
    </Layout>
  );
};

export default Privacy_policy;
