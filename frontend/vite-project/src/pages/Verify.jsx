import React from "react";
import { MailCheck, ArrowRight } from "lucide-react";

const Verify = () => {
    const openGmail = () => {
  window.open("https://mail.google.com", "_blank");
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl border border-gray-200 p-8 text-center">

        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
          <MailCheck className="h-10 w-10 text-blue-600" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900">
          Check Your Email
        </h1>

        {/* Description */}
        <p className="mt-4 text-gray-600 leading-7">
          We've sent a verification link to your email address.
          Click the link in the email to activate your account.
        </p>

        {/* Note */}
        <div className="mt-6 rounded-xl bg-blue-50 border border-blue-100 p-4">
          <p className="text-sm text-blue-700">
            If you don't see the email within a few minutes,
            please check your <span className="font-semibold">Spam</span> or{" "}
            <span className="font-semibold">Promotions</span> folder.
          </p>
        </div>

        {/* Button */}
        <button
          className="mt-8 w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          onClick={openGmail}
        >
          Open Email
          <ArrowRight size={18} />
        </button>

        {/* Footer */}
        <p className="mt-6 text-sm text-gray-500">
          Didn't receive the email?{" "}
          <button className="font-semibold text-blue-600 hover:underline">
            Resend Verification Email
          </button>
        </p>
      </div>
    </div>
  );
};

export default Verify;