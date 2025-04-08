import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface RideStatusLocation {
  pickup: string
  drop: string
  driverName: string
  vehicle: string
}

export default function RideStatus() {
  const location = useLocation()
  const navigate = useNavigate()

  const { pickup, drop, driverName, vehicle } = location.state as RideStatusLocation

  const [rideStatus, setRideStatus] = useState("Driver is arriving...")
  const [rideStarted, setRideStarted] = useState(false)

  useEffect(() => {
    // Mock status changes
    const timer = setTimeout(() => {
      setRideStatus("Ride in progress")
      setRideStarted(true)

      // Simulate ride completion
      setTimeout(() => {
        navigate("/ride/summary", {
          state: {
            driverName,
            fare: 120,
            pickup,
            drop,
            duration: "18 min",
          },
        })
      }, 7000)
    }, 5000)

    return () => clearTimeout(timer)
  }, [navigate, driverName, pickup, drop])

  const handleCancel = () => {
    navigate("/dashboard")
  }

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-semibold">Your Ride</h2>

      <Card>
        <CardContent className="p-4 space-y-2">
          <div><strong>Driver:</strong> {driverName}</div>
          <div><strong>Vehicle:</strong> {vehicle}</div>
          <div><strong>Pickup:</strong> {pickup}</div>
          <div><strong>Drop:</strong> {drop}</div>
          <div><strong>Status:</strong> {rideStatus}</div>
        </CardContent>
      </Card>

      {!rideStarted && (
        <Button variant="destructive" onClick={handleCancel}>
          Cancel Ride
        </Button>
      )}
    </div>
  )
}
