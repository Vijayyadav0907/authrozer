import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { LockKeyhole, Loader2, Eye, EyeOff } from "lucide-react";

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


const ResetPassword = () => {

  const { email } = useParams();

  const navigate = useNavigate();


  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);



  const handleSubmit = async (e) => {

    e.preventDefault();


    if(password !== confirmPassword){

      toast.error("Passwords do not match");

      return;

    }


    try {

      setIsLoading(true);


      const res = await axios.post(
        `http://localhost:300/api/user/reset-password/${email}`,
        {
        newPassword: password,
    confirmPassword: confirmPassword
        }
      );


      if(res.data.success){

        toast.success(res.data.message);

        navigate("/login");

      }


    } catch(error){

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

              <LockKeyhole className="h-8 w-8 text-blue-600"/>

            </div>

          </div>


          <CardTitle className="text-3xl font-bold">
            Reset Password
          </CardTitle>


          <CardDescription>

            Create a new password for

            <br />

            <span className="font-medium text-gray-900">
              {email}
            </span>

          </CardDescription>


        </CardHeader>



        <CardContent>


          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >


            {/* Password */}

            <div className="space-y-2">

              <Label>
                New Password
              </Label>


              <div className="relative">


                <Input

                  type={
                    showPassword 
                    ? "text" 
                    : "password"
                  }

                  placeholder="Enter new password"

                  value={password}

                  onChange={(e)=>setPassword(e.target.value)}

                  required

                  className="pr-10"

                />


                <button

                  type="button"

                  onClick={()=>
                    setShowPassword(!showPassword)
                  }

                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"

                >

                  {
                    showPassword
                    ?
                    <EyeOff size={18}/>
                    :
                    <Eye size={18}/>
                  }


                </button>


              </div>


            </div>



            {/* Confirm Password */}


            <div className="space-y-2">


              <Label>
                Confirm Password
              </Label>


              <div className="relative">


                <Input

                  type={
                    showConfirmPassword 
                    ? "text" 
                    : "password"
                  }

                  placeholder="Confirm password"

                  value={confirmPassword}

                  onChange={(e)=>
                    setConfirmPassword(e.target.value)
                  }

                  required

                  className="pr-10"

                />



                <button

                  type="button"

                  onClick={()=>
                    setShowConfirmPassword(!showConfirmPassword)
                  }

                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"

                >

                  {
                    showConfirmPassword
                    ?
                    <EyeOff size={18}/>
                    :
                    <Eye size={18}/>
                  }


                </button>


              </div>


            </div>



            <Button

              type="submit"

              className="w-full bg-blue-600 hover:bg-blue-700"

              disabled={isLoading}

            >

              {
                isLoading ?

                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                  Updating...
                </>

                :

                "Reset Password"
              }


            </Button>


          </form>


        </CardContent>


      </Card>


    </div>

  );
};


export default ResetPassword;