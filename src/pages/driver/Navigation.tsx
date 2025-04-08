import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const ride = {
  customerName: "Rohan J",
  pickup: "MG Road",
  drop: "Indiranagar",
  distance: "3.5 km",
  eta: "8 min",
}

export default function DriverNavigation() {
  const [stage, setStage] = useState<"toPickup" | "toDrop" | "completed">("toPickup")

  const nextStage = () => {
    if (stage === "toPickup") setStage("toDrop")
    else if (stage === "toDrop") setStage("completed")
  }

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-semibold">Navigation</h2>

      {stage === "completed" ? (
        <Card>
          <CardContent className="p-4 space-y-2">
            <p className="text-green-600 font-semibold">✅ Ride Completed!</p>
            <p>Thank you for completing the ride.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-4 space-y-2">
            <p className="font-medium">
              {stage === "toPickup" ? "Heading to Pickup Location" : "Heading to Drop Location"}
            </p>
            <p>Customer: {ride.customerName}</p>
            <p>From: {ride.pickup}</p>
            <p>To: {ride.drop}</p>
            <p>Distance: {ride.distance}</p>
            <p>ETA: {ride.eta}</p>

            <Button className="mt-3" onClick={nextStage}>
              {stage === "toPickup"
                ? "Reached Pickup"
                : stage === "toDrop"
                ? "Complete Ride"
                : "Done"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
