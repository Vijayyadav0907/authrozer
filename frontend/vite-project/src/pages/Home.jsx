import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, MailCheck, LockKeyhole, LogOut, Mail } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Home = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

  
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
   

    toast.success("Logged out successfully.");

    navigate("/login");
  };


const getUser = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:300/api/user/get-user",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUser(res.data.user);
  } catch (error) {
    console.log(error);
  }
};


  useEffect(() => {
    getUser();
  }, []);





 



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100">

      {/* Navbar */}
      <nav className="bg-white shadow-md px-8 py-4 flex items-center justify-between">

        <h1 className="text-2xl font-bold text-blue-600">
          Auth System
        </h1>

        <div className="flex items-center gap-5">

         

         {
  user?.isverified ? (
    <div className="flex items-center gap-2">
      <MailCheck className="h-10 w-10 text-blue-600" />
      <h1 className="text-lg font-semibold">Email Verified</h1>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Mail className="h-10 w-10 text-blue-600" />
      <h1 className="text-lg font-semibold">Email Not Verified</h1>
    </div>
  )
}
          
       

        </div>


        

       

<div className="flex items-center gap-5">

  <DropdownMenu>

    <DropdownMenuTrigger asChild>

      <Avatar 
        className="
          h-10 
          w-10 
          rounded-full 
          border-2 
          border-blue-300 
          hover:border-red-500 
          hover:shadow-lg
          transition-all 
          duration-200 
          cursor-pointer
        "
      >

        <AvatarFallback>
          <span className="text-xl font-semibold text-blue-600">
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </span>
        </AvatarFallback>

      </Avatar>

    </DropdownMenuTrigger>


    <DropdownMenuContent 
      className="w-64"
      align="end"
    >


      <DropdownMenuGroup>


        <DropdownMenuLabel>

          <div className="flex flex-col gap-1">

            <span className="font-semibold text-sm">
              {user?.username}
            </span>


            <span className="text-xs text-muted-foreground">
              {user?.email}
            </span>


          </div>

        </DropdownMenuLabel>


      </DropdownMenuGroup>



      <DropdownMenuSeparator />



      <DropdownMenuItem>
        Profile
      </DropdownMenuItem>



      <DropdownMenuItem>
        Settings
      </DropdownMenuItem>



      <DropdownMenuSeparator />



      <DropdownMenuItem
        onClick={handleLogout}
        className="text-red-600 cursor-pointer"
      >

        <LogOut className="mr-2 h-4 w-4" />

        Logout

      </DropdownMenuItem>


    </DropdownMenuContent>


  </DropdownMenu>


</div>
      </nav>

      {/* Hero Section */}

      <section className="max-w-7xl mx-auto px-6 py-24 flex flex-col-reverse lg:flex-row items-center gap-20">

        {/* Left */}

        <div className="flex-1">

          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium">
            🎉 Authentication Successful
          </span>

          <h1 className="mt-6 text-5xl font-bold text-gray-900 leading-tight">
            Welcome
            <span className="text-blue-600">
              {" "}
              {user?.username || "User"}
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Your account has been authenticated successfully.
            You now have access to protected routes using JWT
            Authentication and Email Verification.
          </p>

          <button
            onClick={handleLogout}
            className="mt-10 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl transition"
          >
            Logout
          </button>

        </div>

        {/* Right */}

        <div className="flex-1">

          <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-8">

            <div className="flex items-center gap-5">
              <div className="bg-green-100 p-3 rounded-full">
                <ShieldCheck className="text-green-600" />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Secure Authentication
                </h3>

                <p className="text-gray-500">
                  JWT token successfully authenticated.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="bg-blue-100 p-3 rounded-full">
                <MailCheck className="text-blue-600" />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Email Verified
                </h3>

                <p className="text-gray-500">
                  Your email address has been verified.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="bg-purple-100 p-3 rounded-full">
                <LockKeyhole className="text-purple-600" />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Protected Routes
                </h3>

                <p className="text-gray-500">
                  This page is only accessible to authenticated users.
                </p>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="text-center py-6 text-gray-500 border-t">
        © {new Date().getFullYear()} Authentication System
      </footer>

    </div>
  );
};

export default Home;