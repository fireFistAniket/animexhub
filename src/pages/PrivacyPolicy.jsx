import React from "react";
import { Link } from "react-router-dom";

const PrivacyPollicy = () => {
  return (
    <main className="flex flex-col items-stretch justify-center gap-[2vmax] my-[2vmin] mx-[3vmax]">
      <div className="flex items-center justify-center">
        <h1 className="text-[2vmax] font-bold text-neutral-900">
          Privacy Policy
        </h1>
      </div>
      <details
        className="bg-neutral-100 px-[2vmax] py-[2vmin] shadow-lg rounded-lg"
        open
      >
        <summary className="text-[1.6vmax] font-semibold capitalize text-neutral-900 cursor-pointer py-[2vmin]">
          Introduction
        </summary>
        <p className="text-[1.3vmax] font-medium text-neutral-900">
          Welcome to AnimeXhuB. We value your privacy and are committed to
          protecting your personal information. This Privacy Policy outlines how
          we collect, use, and safeguard your information when you visit our
          website.
        </p>
      </details>
      <details className="bg-neutral-100 px-[2vmax] py-[2vmin] shadow-lg rounded-lg">
        <summary className="text-[1.6vmax] font-semibold capitalize text-neutral-900 cursor-pointer py-[2vmin]">
          Information We Collect
        </summary>
        <ul className="text-[1.3vmax] font-medium text-neutral-900 flex flex-col gap-[1vmax]">
          <li className="list-disc">
            <span className="font-semibold">Personal Information:</span> When
            you register on our site, subscribe to our newsletter, or fill out a
            form, we may collect personal information such as your name, email
            address, and any other details you provide.
          </li>
          <li className="list-disc">
            <span className="font-semibold">Usage Data:</span> We automatically
            collect information about your interactions with our website, such
            as your IP address, browser type, referring/exit pages, and
            operating system.
          </li>
        </ul>
      </details>
      <details className="bg-neutral-100 px-[2vmax] py-[2vmin] shadow-lg rounded-lg">
        <summary className="text-[1.6vmax] font-semibold capitalize text-neutral-900 cursor-pointer py-[2vmin]">
          How We Use Your Information
        </summary>
        <ul className="text-[1.3vmax] font-medium text-neutral-900 flex flex-col gap-[1vmax]">
          <li className="list-disc">
            <span className="font-semibold">
              To Provide and Improve Our Services:
            </span>{" "}
            We use your information to personalize your experience, improve our
            website, and respond to your requests and feedback.
          </li>
          <li className="list-disc">
            <span className="font-semibold">To Communicate with You:</span> We
            may send periodic emails regarding updates, promotions, or other
            information relevant to AnimeXhuB. You can opt-out of these
            communications at any time.
          </li>
          <li className="list-disc">
            <span className="font-semibold">To Ensure Security:</span> We use
            your information to monitor and enhance the security of our website.
          </li>
        </ul>
      </details>
      <details className="bg-neutral-100 px-[2vmax] py-[2vmin] shadow-lg rounded-lg">
        <summary className="text-[1.6vmax] font-semibold capitalize text-neutral-900 cursor-pointer py-[2vmin]">
          Sharing Your Information
        </summary>
        <p className="text-[1.3vmax] font-medium text-neutral-900">
          We do not sell, trade, or otherwise transfer your personal information
          to outside parties. However, we may share your information with
          trusted third parties who assist us in operating our website,
          conducting our business, or servicing you, so long as those parties
          agree to keep this information confidential.
        </p>
      </details>
      <details className="bg-neutral-100 px-[2vmax] py-[2vmin] shadow-lg rounded-lg">
        <summary className="text-[1.6vmax] font-semibold capitalize text-neutral-900 cursor-pointer py-[2vmin]">
          Cookies and Tracking Technologies
        </summary>
        <p className="text-[1.3vmax] font-medium text-neutral-900">
          AnimeXhuB uses cookies to enhance your experience on our website.
          Cookies are small files that a site or its service provider transfers
          to your computer&apos;s hard drive through your web browser &#40;if
          you allow&#41; that enables the site&apos;s or service provider&apos;s
          systems to recognize your browser and capture and remember certain
          information.
        </p>
      </details>
      <details className="bg-neutral-100 px-[2vmax] py-[2vmin] shadow-lg rounded-lg">
        <summary className="text-[1.6vmax] font-semibold capitalize text-neutral-900 cursor-pointer py-[2vmin]">
          Third-Party Links
        </summary>
        <p className="text-[1.3vmax] font-medium text-neutral-900">
          Our website may contain links to third-party websites. These
          third-party sites have separate and independent privacy policies. We,
          therefore, have no responsibility or liability for the content and
          activities of these linked sites.
        </p>
      </details>
      <details className="bg-neutral-100 px-[2vmax] py-[2vmin] shadow-lg rounded-lg">
        <summary className="text-[1.6vmax] font-semibold capitalize text-neutral-900 cursor-pointer py-[2vmin]">
          Your Rights
        </summary>
        <p className="text-[1.3vmax] font-medium text-neutral-900">
          You have the right to access, correct, or delete your personal
          information that we hold. You may also object to the processing of
          your personal data or request that we restrict its processing. To
          exercise these rights, please contact us at{" "}
          <Link
            to="mailto:codencreativity@gmail.com"
            className="text-[--primary]"
          >
            codencreativity@gmail.com
          </Link>
          .
        </p>
      </details>
      <details className="bg-neutral-100 px-[2vmax] py-[2vmin] shadow-lg rounded-lg">
        <summary className="text-[1.6vmax] font-semibold capitalize text-neutral-900 cursor-pointer py-[2vmin]">
          Changes to This Privacy Policy
        </summary>
        <p className="text-[1.3vmax] font-medium text-neutral-900">
          AnimeXhuB reserves the right to update this Privacy Policy at any
          time. We will notify you of any changes by posting the new Privacy
          Policy on our website. You are advised to review this Privacy Policy
          periodically for any changes.
        </p>
      </details>
      <details className="bg-neutral-100 px-[2vmax] py-[2vmin] shadow-lg rounded-lg">
        <summary className="text-[1.6vmax] font-semibold capitalize text-neutral-900 cursor-pointer py-[2vmin]">
          Contact Us
        </summary>
        <p className="text-[1.3vmax] font-medium text-neutral-900">
          If you have any questions about this Privacy Policy, please contact us
          at: Email:{" "}
          <Link
            to="mailto:codencreativity@gmail.com"
            className="text-[--primary]"
          >
            codencreativity@gmail.com
          </Link>
        </p>
      </details>
    </main>
  );
};

export default PrivacyPollicy;
