import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface LocationState {
  pickup: string
  drop: string
}

export default function CustomerBooking() {
  const location = useLocation()
  const navigate = useNavigate()

  const { pickup, drop } = location.state as LocationState

  const [fareEstimate, setFareEstimate] = useState<number | null>(null)
  const [distance, setDistance] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fare estimation from backend
    setTimeout(() => {
      setFareEstimate(120) // ₹120
      setDistance("8.2 km")
      setLoading(false)

      // Simulate driver match after 5s
      setTimeout(() => {
        navigate("/ride/status", {
          state: {
            pickup,
            drop,
            driverName: "Ravi Kumar",
            vehicle: "Honda City - KA05MN1234",
          },
        })
      }, 5000)
    }, 2000)
  }, [pickup, drop, navigate])

  const handleCancel = () => {
    navigate("/dashboard")
  }

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-semibold">Finding a Driver...</h2>

      <Card>
        <CardContent className="p-4 space-y-2">
          <div>
            <strong>Pickup:</strong> {pickup}
          </div>
          <div>
            <strong>Drop:</strong> {drop}
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex items-center space-x-2">
          <Loader2 className="animate-spin w-5 h-5 text-primary" />
          <span>Calculating fare and searching for nearby drivers...</span>
        </div>
      ) : (
        <Card>
          <CardContent className="p-4 space-y-2">
            <div>
              <strong>Distance:</strong> {distance}
            </div>
            <div>
              <strong>Estimated Fare:</strong> ₹{fareEstimate}
            </div>
          </CardContent>
        </Card>
      )}

      <Button variant="destructive" onClick={handleCancel}>
        Cancel Ride
      </Button>
    </div>
  )
}
