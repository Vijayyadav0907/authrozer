import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "@/lib/api";
import { toast } from "sonner";
import { ShieldCheck, Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";


const VerifyOtp = () => {

  const { email } = useParams();

  const navigate = useNavigate();


  const [otp, setOtp] = useState("");

  const [isLoading, setIsLoading] = useState(false);



  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      setIsLoading(true);


      const res = await axios.post(
        `${API_URL}/api/user/verify-otp/${email}`,
        {
          otp
        }
      );


      if(res.data.success){

        toast.success(res.data.message);

        // next page will be reset password
        navigate(`/reset-password/${email}`);

      }


    } catch(error){

      toast.error(
        error.response?.data?.message ||
        "Invalid OTP"
      );

    } finally {

      setIsLoading(false);

    }

  };



  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center px-4">


      <Card className="w-full max-w-md shadow-xl">


        <CardHeader className="text-center">


          <div className="flex justify-center mb-4">

            <div className="bg-blue-100 p-4 rounded-full">

              <ShieldCheck 
                className="h-8 w-8 text-blue-600"
              />

            </div>

          </div>


          <CardTitle className="text-3xl font-bold">
            Verify OTP
          </CardTitle>


          <CardDescription>

            Enter the OTP sent to

            <br />

            <span className="font-medium text-gray-900">
              {email}
            </span>

          </CardDescription>


        </CardHeader>



        <CardContent>


          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >


            <div className="space-y-2">


              <Label htmlFor="otp">
                Enter OTP
              </Label>


              <Input

                id="otp"

                type="text"

                maxLength={6}

                placeholder="Enter 6 digit OTP"

                value={otp}

                onChange={(e)=>setOtp(e.target.value)}

                required

                className="text-center text-lg tracking-widest"

              />


            </div>



            <Button

              type="submit"

              className="w-full bg-blue-600 hover:bg-blue-700"

              disabled={isLoading}

            >

              {
                isLoading ? (

                  <>
                    <Loader2 
                      className="mr-2 h-4 w-4 animate-spin"
                    />

                    Verifying...

                  </>

                ) : (

                  "Verify OTP"

                )
              }


            </Button>



          </form>


        </CardContent>


      </Card>


    </div>

  );
};


export default VerifyOtp;
