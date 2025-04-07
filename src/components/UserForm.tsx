import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { cApi, dApi } from '@/api/axios';
import { toast } from "sonner"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";


export default function UserForm() {
  // Initialize form
  const form = useForm({
    defaultValues: {
      profile_image: "",
      name: "",
      email: "",
      phone_number: "",
      gender: "male",
      kyc: {
        aadhaar: "",
        dl_number: "",
      },
      password: "",
    },
  });

  const navigate = useNavigate()

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBytes, setImageBytes] = useState<Uint8Array | null>(null);
  const [loading , setLoading] = useState(false);
  const [isCustomer, setIsCustomer] = useState(true);

  // Handle Image Upload
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const maxSize = 100 * 1024; // 100 KB

      if (file.size > maxSize) {
        alert("Image size must be less than 100 KB");
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          const dataUrl = reader.result.toString();
          const base64String = dataUrl.split(",")[1];

          setImagePreview(dataUrl);
          form.setValue("profile_image", base64String);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  // Form Submission
  const onSubmit = async (data: any) => {
    if (!data.password && !data.name && !data.email && !data.phone_number) {
      console.error("No data selected");
      return;
    }

    const payload = {
      ...data,
      profileImage: data.profileImage,
    };
    console.log(payload);

    try {
      setLoading(true);
      let res;
      if(isCustomer) {
        res = await cApi.post('/register', payload);
      }else{
        res = await dApi.post('/register', payload);
      }
      if(res){
        toast("Registration Successful")
        navigate("/login");
      }
    } catch (error) {
      console.error('API B error:', error);
    } finally {
      setLoading(false);
    }

  };


  return (
    <Card className="max-w-lg mx-auto mt-10 p-6 shadow-lg border">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            
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
            <FormField
              control={form.control}
              name="profile_image"
              render={() => (
                <FormItem>
                  <FormLabel>Profile Image</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" onChange={handleImageChange} />
                  </FormControl>
                  {imagePreview && <img src={imagePreview} alt="Profile" className="w-24 h-24 rounded-full mt-2" />}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input type="email" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl><Input type="tel" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* KYC Document Type */}
           {!isCustomer && <FormField
              control={form.control}
              name="kyc.aadhaar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aadhaar</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />}

            {!isCustomer && <FormField
              control={form.control}
              name="kyc.dl_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DL Number</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />}
            <FormField
              disabled={loading}
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full">Submit</Button>
            <p
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline cursor-pointer text-center"
            >
              Already have an account?
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}