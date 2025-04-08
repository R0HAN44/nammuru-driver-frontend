import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const ride = {
  customerName: "Rohan J",
  pickup: "MG Road",
  drop: "Indiranagar",
  fare: 150,
}

export default function DriverRideStatus() {
  const [status, setStatus] = useState("Ongoing")
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (status === "Ongoing") setTimer((t) => t + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [status])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs < 10 ? "0" : ""}${secs}s`
  }

  const handleComplete = () => {
    setStatus("Completed")
  }

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-semibold">Ride Status</h2>

      <Card>
        <CardContent className="p-4 space-y-2">
          <p className="text-sm text-gray-500">Status: {status}</p>
          <p>Customer: {ride.customerName}</p>
          <p>Pickup: {ride.pickup}</p>
          <p>Drop: {ride.drop}</p>
          <p>Fare: ₹{ride.fare}</p>

          {status === "Ongoing" && (
            <div>
              <p className="mt-2 text-sm text-gray-500">Duration: {formatTime(timer)}</p>
              <Button className="mt-4" onClick={handleComplete}>
                Complete Ride
              </Button>
            </div>
          )}

          {status === "Completed" && (
            <p className="text-green-600 mt-3 font-medium">✅ Ride Completed Successfully</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
