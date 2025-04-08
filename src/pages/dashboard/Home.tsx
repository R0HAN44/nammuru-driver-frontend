import LocationInput from "@/components/LocationInput"
import Map from "@/components/Map"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CustomerDashboard() {
  const [pickup, setPickup] = useState("")
  const [drop, setDrop] = useState("")
  const navigate = useNavigate()

  const handleBookRide = () => {
    // Optional: Validate fields
    navigate("/booking", { state: { pickup, drop } })
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Book a Ride</h1>
      <Map />

      <div className="space-y-2">
        <LocationInput label="Pickup Location" value={pickup} onChange={setPickup} />
        <LocationInput label="Drop Location" value={drop} onChange={setDrop} />
        <Button onClick={handleBookRide} className="w-full">
          Book Ride
        </Button>
      </div>
    </div>
  )
}
