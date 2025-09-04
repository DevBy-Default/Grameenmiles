"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Users, Package, Truck, MapPin, Clock, IndianRupee } from "lucide-react"

interface BookingPageProps {
  onBack: () => void
}

const VILLAGE_HUBS = [
  "Dhaka Central Hub",
  "Chittagong Port Hub",
  "Sylhet Tea Hub",
  "Rajshahi Silk Hub",
  "Khulna Shrimp Hub",
  "Barisal Rice Hub",
  "Rangpur Potato Hub",
  "Mymensingh Cotton Hub",
]

const RIDE_TYPES = [
  { id: "passenger", label: "Passenger", icon: Users, baseRate: 15 },
  { id: "goods", label: "Goods", icon: Package, baseRate: 25 },
  { id: "both", label: "Both", icon: Truck, baseRate: 35 },
]

export default function BookingPage({ onBack }: BookingPageProps) {
  const [rideType, setRideType] = useState<string>("")
  const [pickupHub, setPickupHub] = useState<string>("")
  const [dropHub, setDropHub] = useState<string>("")
  const [showConfirmation, setShowConfirmation] = useState(false)

  const calculateFare = () => {
    if (!rideType || !pickupHub || !dropHub) return 0
    const selectedType = RIDE_TYPES.find((type) => type.id === rideType)
    const baseRate = selectedType?.baseRate || 0
    const distance = Math.floor(Math.random() * 20) + 5 // Simulated distance
    return baseRate + distance * 2
  }

  const handleBookRide = () => {
    setShowConfirmation(true)
  }

  const fare = calculateFare()
  const estimatedTime = Math.floor(Math.random() * 30) + 15 // 15-45 minutes

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-primary mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground">Your EV cart is on the way</p>
          </div>

          <Card className="p-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Ride Type</span>
                <span className="font-medium capitalize">{rideType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">From</span>
                <span className="font-medium">{pickupHub}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">To</span>
                <span className="font-medium">{dropHub}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Fare</span>
                <span className="font-bold text-primary">৳{fare}</span>
              </div>
              <div className="flex items-center justify-between border-t pt-4">
                <span className="text-sm text-muted-foreground">Arrival Time</span>
                <div className="flex items-center gap-1 text-accent-foreground font-medium">
                  <Clock className="w-4 h-4" />
                  {estimatedTime} minutes
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-3">
            <Button className="w-full" onClick={() => setShowConfirmation(false)}>
              Track Cart Location
            </Button>
            <Button variant="outline" className="w-full bg-transparent" onClick={onBack}>
              Book Another Ride
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center gap-4 p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-serif font-bold text-primary">Book a Ride</h1>
      </header>

      <div className="p-4 space-y-6">
        {/* Ride Type Selection */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Choose Ride Type</h2>
          <div className="grid grid-cols-3 gap-3">
            {RIDE_TYPES.map((type) => {
              const Icon = type.icon
              return (
                <Card
                  key={type.id}
                  className={`p-4 cursor-pointer transition-all ${
                    rideType === type.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setRideType(type.id)}
                >
                  <div className="text-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                        rideType === type.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-medium">{type.label}</div>
                    <div className="text-xs text-muted-foreground">৳{type.baseRate}+</div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Hub Selection */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Select Village Hubs</h2>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Pickup Hub</label>
            <Select value={pickupHub} onValueChange={setPickupHub}>
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <SelectValue placeholder="Choose pickup location" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {VILLAGE_HUBS.map((hub) => (
                  <SelectItem key={hub} value={hub}>
                    {hub}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Drop Hub</label>
            <Select value={dropHub} onValueChange={setDropHub}>
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent-foreground" />
                  <SelectValue placeholder="Choose drop location" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {VILLAGE_HUBS.filter((hub) => hub !== pickupHub).map((hub) => (
                  <SelectItem key={hub} value={hub}>
                    {hub}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Fare Estimate */}
        {fare > 0 && (
          <Card className="p-4 bg-accent/10 border-accent">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Estimated Fare</span>
              <div className="flex items-center gap-1 text-xl font-bold text-primary">
                <IndianRupee className="w-5 h-5" />
                {fare}
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />~{estimatedTime} min
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                Shared ride
              </div>
            </div>
            <div className="mt-3 p-3 bg-primary/5 rounded-lg">
              <div className="text-sm text-primary font-medium">💡 Sharing saves you ৳{Math.floor(fare * 0.4)}!</div>
              <div className="text-xs text-muted-foreground mt-1">This fare is 40% cheaper than solo rides</div>
            </div>
          </Card>
        )}

        {/* Book Button */}
        <Button
          className="w-full h-14 text-lg font-semibold"
          disabled={!rideType || !pickupHub || !dropHub}
          onClick={handleBookRide}
        >
          {fare > 0 ? `Book Ride - ৳${fare}` : "Select Options to Book"}
        </Button>

        {/* Additional Info */}
        <Card className="p-4 bg-card/50">
          <h3 className="font-medium mb-2">What happens next?</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Cart will arrive at pickup hub in {estimatedTime} minutes</li>
            <li>• You'll share the ride with other passengers/goods</li>
            <li>• Pay the driver upon arrival at destination</li>
            <li>• Rate your experience to help the community</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
