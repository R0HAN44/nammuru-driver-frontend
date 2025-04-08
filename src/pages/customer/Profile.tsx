import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Profile() {
  const [name, setName] = useState("Rohan J")
  const [email, setEmail] = useState("rohan@example.com")
  const [phone, setPhone] = useState("9876543210")

  const handleUpdate = () => {
    alert("Profile updated!")
    // Ideally, you'd call backend API here
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-semibold">Profile</h2>

      <Card>
        <CardContent className="p-4 space-y-3">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />

          <Button onClick={handleUpdate}>Update</Button>
        </CardContent>
      </Card>

      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}
