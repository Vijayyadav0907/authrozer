import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "@/lib/api";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

const VerifyMail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setLoading(false);
        setVerified(false);
        setMessage("Verification token is missing.");
        return;
      }

      try {
        const { data } = await axios.post(
          `${API_URL}/api/user/verify-email`,
          {}, // No request body
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setVerified(true);
        setMessage(data.message);
      } catch (error) {
        setVerified(false);
        setMessage(
          error.response?.data?.message || "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center">

        {loading ? (
          <>
            <Loader2 className="h-16 w-16 animate-spin text-blue-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold">Verifying Email...</h2>
            <p className="text-gray-500 mt-3">
              Please wait while we verify your account.
            </p>
          </>
        ) : verified ? (
          <>
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-green-600">
              Email Verified!
            </h2>

            <p className="mt-4 text-gray-600">{message}</p>

            <button
              onClick={() => navigate("/login")}
              className="mt-8 w-full rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition"
            >
              Go to Login
            </button>
          </>
        ) : (
          <>
            <XCircle className="h-16 w-16 text-red-600 mx-auto mb-6" />

            <h2 className="text-3xl font-bold text-red-600">
              Verification Failed
            </h2>

            <p className="mt-4 text-gray-600">{message}</p>

            <button
              onClick={() => navigate("/signup")}
              className="mt-8 w-full rounded-xl bg-red-600 py-3 text-white font-semibold hover:bg-red-700 transition"
            >
              Back to Signup
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyMail;
