"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Battery,
  Zap,
  Users,
  Package,
  MapPin,
  Clock,
  IndianRupee,
  TrendingUp,
  Sun,
  CheckCircle,
  Star,
  Leaf,
} from "lucide-react"

interface DriverDashboardProps {
  onBack: () => void
}

interface Booking {
  id: string
  type: "passenger" | "goods" | "mixed"
  from: string
  to: string
  passengers: number
  fare: number
  status: "pending" | "active" | "completed"
  scheduledTime: string
  estimatedDuration: number
  customerName: string
  customerRating?: number
}

const SAMPLE_BOOKINGS: Booking[] = [
  {
    id: "B001",
    type: "passenger",
    from: "Dhaka Central",
    to: "Chittagong Port",
    passengers: 3,
    fare: 180,
    status: "active",
    scheduledTime: "2:30 PM",
    estimatedDuration: 45,
    customerName: "Rahman Family",
  },
  {
    id: "B002",
    type: "goods",
    from: "Sylhet Tea Hub",
    to: "Dhaka Central",
    passengers: 0,
    fare: 250,
    status: "pending",
    scheduledTime: "4:00 PM",
    estimatedDuration: 60,
    customerName: "Tea Export Co.",
  },
  {
    id: "B003",
    type: "mixed",
    from: "Rajshahi Silk",
    to: "Khulna Shrimp",
    passengers: 2,
    fare: 320,
    status: "pending",
    scheduledTime: "5:15 PM",
    estimatedDuration: 75,
    customerName: "Silk Traders + Family",
  },
]

const EARNINGS_DATA = {
  today: 850,
  week: 4200,
  month: 18500,
  totalRides: 127,
  avgRating: 4.8,
  completionRate: 96,
}

export default function DriverDashboard({ onBack }: DriverDashboardProps) {
  const [activeTab, setActiveTab] = useState("bookings")
  const [batteryLevel, setBatteryLevel] = useState(78)
  const [solarStatus, setSolarStatus] = useState<"charging" | "full" | "low">("charging")
  const [bookings, setBookings] = useState(SAMPLE_BOOKINGS)

  const handleAcceptBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === bookingId ? { ...booking, status: "active" as const } : booking)),
    )
  }

  const handleCompleteBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === bookingId ? { ...booking, status: "completed" as const } : booking)),
    )
  }

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "pending":
        return "bg-accent text-accent-foreground"
      case "active":
        return "bg-primary text-primary-foreground"
      case "completed":
        return "bg-green-500 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getSolarStatusColor = () => {
    switch (solarStatus) {
      case "charging":
        return "text-green-500"
      case "full":
        return "text-primary"
      case "low":
        return "text-yellow-500"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center gap-4 p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-serif font-bold text-primary">Driver Dashboard</h1>
          <p className="text-sm text-muted-foreground">Cart #247 - Dhaka Central Hub</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm">
            <Battery className="w-4 h-4" />
            {batteryLevel}%
          </div>
        </div>
      </header>

      {/* Quick Status Cards */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Battery className="w-5 h-5 text-primary" />
                <span className="font-medium">Battery</span>
              </div>
              <span className="text-lg font-bold">{batteryLevel}%</span>
            </div>
            <Progress value={batteryLevel} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {batteryLevel > 80 ? "Excellent range" : batteryLevel > 50 ? "Good for local trips" : "Consider charging"}
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sun className={`w-5 h-5 ${getSolarStatusColor()}`} />
                <span className="font-medium">Solar</span>
              </div>
              <Badge variant="outline" className={getSolarStatusColor()}>
                {solarStatus === "charging" ? "Charging" : solarStatus === "full" ? "Full" : "Low"}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Zap className="w-4 h-4" />
              {solarStatus === "charging" ? "+2.5kW" : solarStatus === "full" ? "Ready" : "0.8kW"}
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="performance">Stats</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Today's Rides</h3>
              <Badge variant="secondary">{bookings.filter((b) => b.status === "active").length} Active</Badge>
            </div>

            {bookings.map((booking) => (
              <Card key={booking.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      {booking.type === "passenger" ? (
                        <Users className="w-4 h-4 text-primary" />
                      ) : booking.type === "goods" ? (
                        <Package className="w-4 h-4 text-primary" />
                      ) : (
                        <div className="flex gap-0.5">
                          <Users className="w-3 h-3 text-primary" />
                          <Package className="w-3 h-3 text-primary" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{booking.customerName}</div>
                      <div className="text-xs text-muted-foreground">#{booking.id}</div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>
                      {booking.from} → {booking.to}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {booking.scheduledTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {booking.passengers} passengers
                    </div>
                    <div className="flex items-center gap-1 font-medium text-primary">
                      <IndianRupee className="w-4 h-4" />
                      {booking.fare}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {booking.status === "pending" && (
                    <>
                      <Button size="sm" className="flex-1" onClick={() => handleAcceptBooking(booking.id)}>
                        Accept Ride
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        Decline
                      </Button>
                    </>
                  )}
                  {booking.status === "active" && (
                    <Button size="sm" className="w-full" onClick={() => handleCompleteBooking(booking.id)}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete Ride
                    </Button>
                  )}
                  {booking.status === "completed" && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      Completed - ৳{booking.fare} earned
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-4 mt-4">
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">৳{EARNINGS_DATA.today}</div>
                <div className="text-xs text-muted-foreground">Today</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">৳{EARNINGS_DATA.week}</div>
                <div className="text-xs text-muted-foreground">This Week</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">৳{EARNINGS_DATA.month}</div>
                <div className="text-xs text-muted-foreground">This Month</div>
              </Card>
            </div>

            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Earnings Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Passenger Rides (65%)</span>
                  <span className="font-medium">৳12,025</span>
                </div>
                <Progress value={65} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm">Goods Transport (25%)</span>
                  <span className="font-medium">৳4,625</span>
                </div>
                <Progress value={25} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm">Mixed Rides (10%)</span>
                  <span className="font-medium">৳1,850</span>
                </div>
                <Progress value={10} className="h-2" />
              </div>
            </Card>

            <Card className="p-4 bg-accent/10 border-accent">
              <div className="flex items-center gap-2 mb-2">
                <Sun className="w-5 h-5 text-accent-foreground" />
                <span className="font-medium">Solar Savings</span>
              </div>
              <div className="text-2xl font-bold text-accent-foreground mb-1">৳2,340</div>
              <div className="text-sm text-muted-foreground">Saved on fuel costs this month through solar charging</div>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-2xl font-bold">{EARNINGS_DATA.avgRating}</span>
                </div>
                <div className="text-xs text-muted-foreground">Average Rating</div>
              </Card>

              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">{EARNINGS_DATA.completionRate}%</div>
                <div className="text-xs text-muted-foreground">Completion Rate</div>
              </Card>

              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">{EARNINGS_DATA.totalRides}</div>
                <div className="text-xs text-muted-foreground">Total Rides</div>
              </Card>

              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-green-500 mb-1">98%</div>
                <div className="text-xs text-muted-foreground">On-Time Rate</div>
              </Card>
            </div>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">5-Star Driver</div>
                    <div className="text-xs text-muted-foreground">Maintained 4.8+ rating for 30 days</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Eco Champion</div>
                    <div className="text-xs text-muted-foreground">100% solar-powered rides this week</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Community Helper</div>
                    <div className="text-xs text-muted-foreground">Completed 100+ rides</div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
