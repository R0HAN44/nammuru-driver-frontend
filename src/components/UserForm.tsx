import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function UserForm() {
  // Initialize form
  const form = useForm({
    defaultValues: {
      profileImage: "",
      name: "",
      email: "",
      phoneNumber: "",
      gender: "male",
      kyc: {
        Aadhaar: "",
        DLNumber: "",
      },
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBytes, setImageBytes] = useState<Uint8Array | null>(null);


  // Handle Image Upload
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        if (reader.result) {
          const dataUrl = reader.result.toString();
          const base64String = dataUrl.split(",")[1]; // Extract Base64
          
          setImagePreview(dataUrl); // Set preview
          form.setValue("profileImage", base64String); // Set Base64 image in form state
        }
      };
  
      reader.readAsDataURL(file); // Read file as DataURL
    }
  };

  // Form Submission
  // Form Submission
const onSubmit = async (data: any) => {
    if (!data.profileImage) {
      console.error("No image selected");
      return;
    }
    
    // No need to convert again - data.profileImage is already a Base64 string
    const payload = {
      ...data,
      profileImage: data.profileImage, // Already a Base64 string
    };
    console.log(payload);
    
    // Your fetch code here...
  };
  

  return (
    <Card className="max-w-lg mx-auto mt-10 p-6 shadow-lg border">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Profile Image Upload */}
            <FormField
              control={form.control}
              name="profileImage"
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
              name="phoneNumber"
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
            <FormField
              control={form.control}
              name="kyc.Aadhaar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aadhaar</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* KYC Document Number */}
            <FormField
              control={form.control}
              name="kyc.DLNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DL Number</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
