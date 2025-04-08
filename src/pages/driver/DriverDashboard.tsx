import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

const mockRequests = [
  {
    id: "r1",
    pickup: "MG Road",
    drop: "Indiranagar",
    fare: 120,
    user: "Rohan",
  },
]

export default function DriverDashboard() {
  const [online, setOnline] = useState(true)
  const [activeRide, setActiveRide] = useState<any>(null)
  const [rideRequests, setRideRequests] = useState(mockRequests)
  const [earnings, setEarnings] = useState(1345)

  const handleAccept = (ride: any) => {
    setActiveRide(ride)
    setRideRequests([])
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Driver Dashboard</h2>
        <div className="flex items-center space-x-2">
          <span>{online ? "Online" : "Offline"}</span>
          <Switch checked={online} onCheckedChange={setOnline} />
        </div>
      </div>

      <Card>
        <CardContent className="p-4 space-y-2">
          <div className="text-lg font-medium">Total Earnings</div>
          <div className="text-2xl font-bold">₹{earnings}</div>
        </CardContent>
      </Card>

      {activeRide ? (
        <Card>
          <CardContent className="p-4 space-y-1">
            <p className="font-medium">Current Ride:</p>
            <p>Pickup: {activeRide?.pickup}</p>
            <p>Drop: {activeRide?.drop}</p>
            <p>Fare: ₹{activeRide?.fare}</p>
            <Button
              className="mt-2"
              onClick={() => {
                setEarnings((prev) => prev + activeRide?.fare)
                setActiveRide(null)
              }}
            >
              Mark Complete
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <h3 className="text-lg font-medium">Ride Requests</h3>
          {rideRequests.length === 0 ? (
            <p className="text-gray-500">No new requests.</p>
          ) : (
            rideRequests.map((req) => (
              <Card key={req.id}>
                <CardContent className="p-4 space-y-1">
                  <p>User: {req.user}</p>
                  <p>Pickup: {req.pickup}</p>
                  <p>Drop: {req.drop}</p>
                  <p>Fare: ₹{req.fare}</p>
                  <Button onClick={() => handleAccept(req)}>Accept Ride</Button>
                </CardContent>
              </Card>
            ))
          )}
        </>
      )}
    </div>
  )
}
