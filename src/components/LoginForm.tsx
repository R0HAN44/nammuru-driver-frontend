import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { cApi, dApi } from "@/api/axios";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const LoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCustomer, setIsCustomer] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      phone_number: phoneNumber,
      password: password,
    };
    try {
      setLoading(true);
      let res;
      if(isCustomer) {
        res = await cApi.post('/login', payload);
      }else{
        res = await dApi.post('/login', payload);
      }

      const token = res.headers['token'] || res.headers['Authorization'];
      if (token) {
        localStorage.setItem("token", token);
        toast.success("Login Successful");
        navigate("/");
      } else {
        toast.error("Login failed: Token missing.");
      }
    } catch (error) {
      console.error('API error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm p-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-center">Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <RadioGroup
              value={isCustomer ? "customer" : "driver"}
              onValueChange={(val) => setIsCustomer(val === "customer")}
              className="flex flex-row gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="customer" id="customer" />
                <Label htmlFor="customer">Customer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="driver" id="driver" />
                <Label htmlFor="driver">Driver</Label>
              </div>
            </RadioGroup>
            <Input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full"
            />

            <Input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />

            <Button type="submit" className="w-full" disabled={loading}>
              Login
            </Button>
            <p
              onClick={() => navigate("/signup")}
              className="text-blue-600 hover:underline cursor-pointer text-center"
            >
              Don't have an account?
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
