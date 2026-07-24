import React, { useState } from "react";
import { API_URL } from "@/lib/api";
import { Link } from "react-router-dom";
import { Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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


const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setIsLoading(true);

      console.log(email);

      const response = await fetch(
        `${API_URL}/api/user/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      navigate(`/verify-otp/${email}`);


      toast.success("Password reset link sent successfully");


    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
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

              <Mail className="h-8 w-8 text-blue-600" />

            </div>

          </div>


          <CardTitle className="text-3xl font-bold">
            Forgot Password?
          </CardTitle>


          <CardDescription className="mt-2">
            Enter your email address and we will send you a
            password reset link.
          </CardDescription>


        </CardHeader>



        <CardContent>


          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >


            <div className="space-y-2">


              <Label htmlFor="email">
                Email Address
              </Label>


              <Input

                id="email"

                type="email"

                placeholder="Enter your registered email"

                value={email}

                onChange={(e)=>setEmail(e.target.value)}

                required

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
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )
              }


            </Button>



            <p className="text-center text-sm text-muted-foreground">

              Remember your password?{" "}

              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </Link>


            </p>


          </form>


        </CardContent>


      </Card>


    </div>

  );
};


export default ForgotPassword;
