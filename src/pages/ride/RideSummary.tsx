import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface RideSummaryState {
  driverName: string
  fare: number
  pickup: string
  drop: string
  duration: string
}

export default function RideSummary() {
  const location = useLocation()
  const navigate = useNavigate()
  const { driverName, fare, pickup, drop, duration } = location.state as RideSummaryState

  const [rating, setRating] = useState(0)

  const handleRate = (star: number) => {
    setRating(star)
    // You can call backend API here to submit the rating
  }

  const handleDone = () => {
    navigate("/dashboard")
  }

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-semibold">Ride Summary</h2>

      <Card>
        <CardContent className="p-4 space-y-2">
          <div><strong>Driver:</strong> {driverName}</div>
          <div><strong>Pickup:</strong> {pickup}</div>
          <div><strong>Drop:</strong> {drop}</div>
          <div><strong>Duration:</strong> {duration}</div>
          <div><strong>Total Fare:</strong> ₹{fare}</div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <p className="font-medium">Rate Your Driver</p>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 cursor-pointer ${star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
              onClick={() => handleRate(star)}
            />
          ))}
        </div>
      </div>

      <Button onClick={handleDone}>Done</Button>
    </div>
  )
}
