import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const mockBooking = {
  id: "ride123",
  pickup: "HSR Layout",
  drop: "MG Road",
  fare: 220,
  status: "Searching", // Searching | Accepted | Ongoing | Completed
  driver: {
    name: "Raj Verma",
    vehicle: "KA-05-XY-5678",
    phone: "+91 98765 43210",
  },
}

export default function BookingStatus() {
  const [ride, setRide] = useState(mockBooking)

  // Simulate ride progressing through stages
  useEffect(() => {
    const steps = ["Searching", "Accepted", "Ongoing", "Completed"]
    let index = 0
    const interval = setInterval(() => {
      index++
      if (index < steps.length) {
        setRide((r) => ({ ...r, status: steps[index] }))
      } else {
        clearInterval(interval)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleCancel = () => {
    setRide({ ...ride, status: "Cancelled" })
  }

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-semibold">Booking Status</h2>

      <Card>
        <CardContent className="p-4 space-y-2">
          <p>Status: <span className="font-medium">{ride.status}</span></p>
          <p>Pickup: {ride.pickup}</p>
          <p>Drop: {ride.drop}</p>
          <p>Fare: ₹{ride.fare}</p>

          {ride.status !== "Searching" && ride.status !== "Cancelled" && (
            <div className="mt-3">
              <p>🚗 Driver: {ride.driver.name}</p>
              <p>Vehicle: {ride.driver.vehicle}</p>
              <p>Phone: {ride.driver.phone}</p>
            </div>
          )}

          {ride.status === "Searching" && (
            <Button variant="destructive" className="mt-4" onClick={handleCancel}>
              Cancel Booking
            </Button>
          )}

          {ride.status === "Completed" && (
            <p className="text-green-600 font-medium mt-3">✅ Ride Completed. Thank you!</p>
          )}

          {ride.status === "Cancelled" && (
            <p className="text-red-600 font-medium mt-3">❌ Booking Cancelled</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
