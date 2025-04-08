import { Card, CardContent } from "@/components/ui/card"

const mockHistory = [
  {
    id: "1",
    pickup: "MG Road",
    drop: "Indiranagar",
    fare: 145,
    date: "2025-04-01 5:30 PM",
    driver: "Ravi Sharma",
  },
  {
    id: "2",
    pickup: "Koramangala",
    drop: "HSR Layout",
    fare: 112,
    date: "2025-03-30 2:10 PM",
    driver: "Amit Raj",
  },
]

export default function RideHistory() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Ride History</h2>

      {mockHistory.map((ride) => (
        <Card key={ride.id}>
          <CardContent className="p-4 space-y-1">
            <div className="font-medium">{ride.pickup} → {ride.drop}</div>
            <div>Fare: ₹{ride.fare}</div>
            <div>Date: {ride.date}</div>
            <div>Driver: {ride.driver}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
