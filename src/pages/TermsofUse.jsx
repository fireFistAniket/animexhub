import React from "react";
import { Link } from "react-router-dom";

const TermsofUse = () => {
  return (
    <main className="flex flex-col items-stretch justify-center gap-[2vmax] my-[2vmin] mx-[3vmax]">
      <div className="flex items-center justify-center">
        <h1 className="text-[2vmax] font-bold text-neutral-900">
          Terms of Use
        </h1>
      </div>
      <details
        className="bg-neutral-100 px-[2vmax] py-[2vmin] shadow-lg rounded-lg"
        open
      >
        <summary className="text-[1.6vmax] font-semibold capitalize text-neutral-900 cursor-pointer py-[2vmin]">
          Acceptance of Terms
        </summary>
        <p className="text-[1.3vmax] font-medium text-neutral-900">
          By accessing and using AnimeXhuB, you agree to comply with and be
          bound by these Terms of Use. If you do not agree to these terms,
          please do not use the website.
        </p>
      </details>
      <details className="bg-neutral-100 px-[2vmax] py-[2vmin] shadow-lg rounded-lg">
        <summary className="text-[1.6vmax] font-semibold capitalize text-neutral-900 cursor-pointer py-[2vmin]">
          Use of Content
        </summary>
        <p className="text-[1.3vmax] font-medium text-neutral-900">
          All content provided on AnimeXhuB, including text, images, and
          multimedia, is for informational purposes only. Unauthorized use or
          reproduction of content is prohibited.
        </p>
      </details>
      <details className="bg-neutral-100 px-[2vmax] py-[2vmin] shadow-lg rounded-lg">
        <summary className="text-[1.6vmax] font-semibold capitalize text-neutral-900 cursor-pointer py-[2vmin]">
          User Conduct
        </summary>
        <ul className="text-[1.3vmax] font-medium text-neutral-900 flex flex-col gap-[1vmax]">
          <li className="list-disc">
            Engage in any activity that disrupts or interferes with the website.
          </li>
          <li className="list-disc">Use the site for any unlawful purposes.</li>
          <li className="list-disc">
            Post or transmit any content that is defamatory, offensive, or
            infringing on others&apos; rights.
          </li>
        </ul>
      </details>
      <details className="bg-neutral-100 px-[2vmax] py-[2vmin] shadow-lg rounded-lg">
        <summary className="text-[1.6vmax] font-semibold capitalize text-neutral-900 cursor-pointer py-[2vmin]">
          Intellectual Property
        </summary>
        <p className="text-[1.3vmax] font-medium text-neutral-900">
          All intellectual property rights in the content and design of the
          website belong to AnimeXhuB or its licensors. Users are granted a
          limited license to access and use the content for personal,
          non-commercial purposes.
        </p>
      </details>
      <details className="bg-neutral-100 px-[2vmax] py-[2vmin] shadow-lg rounded-lg">
        <summary className="text-[1.6vmax] font-semibold capitalize text-neutral-900 cursor-pointer py-[2vmin]">
          Disclaimer of Warranties
        </summary>
        <p className="text-[1.3vmax] font-medium text-neutral-900">
          AnimeXhuB provides the site &quot;as is&quot; without any warranties
          of any kind, either express or implied. We do not guarantee the
          accuracy, completeness, or reliability of any content.
        </p>
      </details>
      <details className="bg-neutral-100 px-[2vmax] py-[2vmin] shadow-lg rounded-lg">
        <summary className="text-[1.6vmax] font-semibold capitalize text-neutral-900 cursor-pointer py-[2vmin]">
          Limitation of Liability
        </summary>
        <p className="text-[1.3vmax] font-medium text-neutral-900">
          In no event shall AnimeXhuB be liable for any direct, indirect,
          incidental, or consequential damages arising from the use or inability
          to use the website.
        </p>
      </details>
      <details className="bg-neutral-100 px-[2vmax] py-[2vmin] shadow-lg rounded-lg">
        <summary className="text-[1.6vmax] font-semibold capitalize text-neutral-900 cursor-pointer py-[2vmin]">
          Changes to Terms
        </summary>
        <p className="text-[1.3vmax] font-medium text-neutral-900">
          AnimeXhuB reserves the right to modify these Terms of Use at any time.
          Changes will be effective immediately upon posting on the website.
        </p>
      </details>
      <details className="bg-neutral-100 px-[2vmax] py-[2vmin] shadow-lg rounded-lg">
        <summary className="text-[1.6vmax] font-semibold capitalize text-neutral-900 cursor-pointer py-[2vmin]">
          Governing Law
        </summary>
        <p className="text-[1.3vmax] font-medium text-neutral-900">
          These terms are governed by and construed in accordance with the laws
          of India, and you agree to submit to the exclusive jurisdiction of the
          courts in that region.
        </p>
      </details>
      <details className="bg-neutral-100 px-[2vmax] py-[2vmin] shadow-lg rounded-lg">
        <summary className="text-[1.6vmax] font-semibold capitalize text-neutral-900 cursor-pointer py-[2vmin]">
          Contact Information
        </summary>
        <p className="text-[1.3vmax] font-medium text-neutral-900">
          For any questions or concerns regarding these Terms of Use, please
          contact us at{" "}
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

export default TermsofUse;
