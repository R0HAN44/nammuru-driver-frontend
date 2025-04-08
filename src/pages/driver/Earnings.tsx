import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

type Ride = {
  id: string
  date: string
  pickup: string
  drop: string
  fare: number
  distance: string
}

const sampleRides: Ride[] = [
  {
    id: "1",
    date: "2025-04-05",
    pickup: "MG Road",
    drop: "Indiranagar",
    fare: 150,
    distance: "4.2 km",
  },
  {
    id: "2",
    date: "2025-04-04",
    pickup: "Jayanagar",
    drop: "Whitefield",
    fare: 300,
    distance: "10.1 km",
  },
]

export default function DriverEarnings() {
  const [rides, setRides] = useState<Ride[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    // In real project, you'd fetch from API
    setRides(sampleRides)
    setTotal(sampleRides.reduce((acc, ride) => acc + ride.fare, 0))
  }, [])

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-semibold">Earnings</h2>
      <Card>
        <CardContent className="p-4">
          <p className="text-lg font-bold text-green-600">Total: ₹{total}</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {rides.map((ride) => (
          <Card key={ride.id}>
            <CardContent className="p-4 space-y-1">
              <p className="text-sm text-gray-500">{ride.date}</p>
              <p className="font-medium">
                {ride.pickup} ➡️ {ride.drop}
              </p>
              <p>Distance: {ride.distance}</p>
              <p>Fare: ₹{ride.fare}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
