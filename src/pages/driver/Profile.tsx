import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"

export default function DriverProfile() {
  const navigate = useNavigate()
  const [name, setName] = useState("Rohan J")
  const [email] = useState("driver@example.com")
  const [phone] = useState("+91 9876543210")
  const [vehicle, setVehicle] = useState("KA-01-AB-1234")

  const handleLogout = () => {
    // Clear auth token in real app
    navigate("/login")
  }

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-semibold">Driver Profile</h2>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div>
            <Label className="block mb-1">Full Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <Label className="block mb-1">Email</Label>
            <Input value={email} disabled />
          </div>

          <div>
            <Label className="block mb-1">Phone</Label>
            <Input value={phone} disabled />
          </div>

          <div>
            <Label className="block mb-1">Vehicle Number</Label>
            <Input value={vehicle} onChange={(e) => setVehicle(e.target.value)} />
          </div>

          <Button className="mt-3 w-full">Update Profile</Button>

          <Button
            variant="destructive"
            className="mt-4 w-full"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
