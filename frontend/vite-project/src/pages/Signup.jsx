import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { API_URL } from "@/lib/api"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'




const Signup = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({
        username: "",
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

         console.log(name, value)

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
       
        console.log(formData);
        try {
            setIsLoading(true);
           const data = await axios.post(`${API_URL}/api/user/register`,formData , {
            headers: {
              "Content-Type": "application/json",
            },
           });
           if(data.data.success){
          
            navigate('/verify');
            toast.success(data.data.message);

              setFormData({
                username: "",
                email: "",
                password: "",
            })
            
           }
            
            
            
        }  catch (error) {
    console.log(error.response?.data);

    toast.error(
        error.response?.data?.message || "Something went wrong"
    );

} finally {
    setIsLoading(false);
}
    };


return (
    <div className="relative w-full h-screen md:h-screen bg-blue-200 overflow-hidden ">
        <div className="min-h-screen flex flex-col to-muted/20">
            <div className="flex  flex-1 items-center justify-center">
                <div className="w-full max-w-sm items-center space-y-8 ">
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Create an account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email below to create your account
                        </p>

                    </div>

                    <Card className="w-full max-w-sm">
                        <CardHeader>
                            <CardTitle className="text-3xl mx-auto">Sign Up</CardTitle>
                            <CardDescription className="mx-auto">
                                Enter your email below to Get Started
                            </CardDescription>

                        </CardHeader>
                        <CardContent>
                         
                                <div className="flex flex-col gap-6">

                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Full Name</Label>
                                        <Input
                                            // id="name"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Enter you full name"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="abc@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">

                                        <Label htmlFor="password">Password</Label>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Password"
                                                className="pr-10"
                                            />

                                            <button
                                                type="button"
                                                variant="ghost"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5" />
                                                ) : (
                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>

                                    </div>
                                </div>
                           
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" onClick={handleSubmit}  className="w-full bg-blue-600 ">
                                {
                                    isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign Up"
                                }
                            </Button>
                                      
                        <p className="text-sm text-muted-foreground">
                                Already have an account?{" "}
                                <Link to="/login" className="text-blue-600 hover:underline">
                                    Login
                                </Link>
                            </p>
                           

                        </CardFooter>
                        
                    </Card>

                </div>

            </div>

        </div>
    </div>
)
}

export default Signup
