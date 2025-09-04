"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Zap, Users, MapPin, MessageSquare, ArrowRight, Star, TrendingUp } from "lucide-react"
import BookingPage from "@/components/booking-page"
import VillageHubMap from "@/components/village-hub-map"
import DriverDashboard from "@/components/driver-dashboard"
import SustainabilityPage from "@/components/sustainability-page"
import SMSBookingDemo from "@/components/sms-booking-demo"

export default function WelcomePage() {
  const [currentPage, setCurrentPage] = useState<"welcome" | "booking" | "map" | "driver" | "sustainability" | "sms">(
    "welcome",
  )

  if (currentPage === "booking") {
    return <BookingPage onBack={() => setCurrentPage("welcome")} />
  }

  if (currentPage === "map") {
    return <VillageHubMap onBack={() => setCurrentPage("welcome")} />
  }

  if (currentPage === "driver") {
    return <DriverDashboard onBack={() => setCurrentPage("welcome")} />
  }

  if (currentPage === "sustainability") {
    return <SustainabilityPage onBack={() => setCurrentPage("welcome")} />
  }

  if (currentPage === "sms") {
    return <SMSBookingDemo onBack={() => setCurrentPage("welcome")} />
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <header className="px-6 py-8 text-center bg-gradient-to-b from-card to-background">
        <div className="flex items-center justify-center gap-3 mb-4 animate-scale-in">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-primary">GrameenMiles</h1>
            <Badge variant="secondary" className="mt-1 text-xs">
              <Star className="w-3 h-3 mr-1" />
              4.8 Rating
            </Badge>
          </div>
        </div>
        <p className="text-xl font-medium text-muted-foreground max-w-sm mx-auto leading-relaxed">
          Affordable, Green & Shared Rural Mobility
        </p>
      </header>

      <div className="px-6 mb-8 animate-slide-up">
        <Card className="relative overflow-hidden bg-gradient-to-br from-card via-background to-card border-2 border-primary/10 shadow-xl">
          <div className="p-8 text-center">
            <img
              src="/placeholder.svg?height=220&width=320"
              alt="Farmer with EV cart and solar charging"
              className="w-full max-w-sm mx-auto rounded-xl mb-6 shadow-lg"
            />
            <div className="flex justify-center gap-6 mb-6">
              <div className="flex items-center gap-2 text-primary">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="font-semibold">Solar Powered</span>
              </div>
              <div className="flex items-center gap-2 text-secondary">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <span className="font-semibold">Shared Rides</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="px-6 mb-8">
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-6 text-center bg-gradient-to-b from-primary/5 to-primary/10 border-primary/20 hover:shadow-lg transition-all duration-300">
            <div className="text-3xl font-bold text-primary mb-2">40%</div>
            <div className="text-sm font-medium text-muted-foreground">Cost Saved</div>
            <TrendingUp className="w-4 h-4 text-primary mx-auto mt-2" />
          </Card>
          <Card className="p-6 text-center bg-gradient-to-b from-secondary/5 to-secondary/10 border-secondary/20 hover:shadow-lg transition-all duration-300">
            <div className="text-3xl font-bold text-secondary mb-2">Zero</div>
            <div className="text-sm font-medium text-muted-foreground">Emissions</div>
            <Leaf className="w-4 h-4 text-secondary mx-auto mt-2" />
          </Card>
          <Card className="p-6 text-center bg-gradient-to-b from-primary/5 to-primary/10 border-primary/20 hover:shadow-lg transition-all duration-300">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm font-medium text-muted-foreground">Villages</div>
            <MapPin className="w-4 h-4 text-primary mx-auto mt-2" />
          </Card>
        </div>
      </div>

      <div className="px-6 space-y-4 mb-8">
        <Button
          className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg btn-hover-lift"
          onClick={() => setCurrentPage("booking")}
        >
          <Users className="w-6 h-6 mr-3" />
          Book a Ride
          <ArrowRight className="w-5 h-5 ml-3" />
        </Button>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-14 border-2 border-secondary text-secondary hover:bg-secondary/10 bg-transparent font-semibold btn-hover-lift"
            onClick={() => setCurrentPage("map")}
          >
            <MapPin className="w-5 h-5 mr-2" />
            Find Hubs
          </Button>

          <Button
            variant="outline"
            className="h-14 border-2 border-primary/30 text-primary hover:bg-primary/10 bg-transparent font-semibold btn-hover-lift"
            onClick={() => setCurrentPage("sms")}
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            SMS Booking
          </Button>
        </div>
      </div>

      <div className="px-6 mb-8">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-6">How It Works</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-background border-border/50">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl flex items-center justify-center mb-4 shadow-md">
              <MapPin className="w-6 h-6 text-secondary-foreground" />
            </div>
            <h3 className="font-bold text-base mb-3">Choose Hub</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Select pickup and drop village hubs</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-background border-border/50">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mb-4 shadow-md">
              <Users className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-bold text-base mb-3">Share Cart</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Pool with others to reduce costs</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-background border-border/50">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl flex items-center justify-center mb-4 shadow-md">
              <Zap className="w-6 h-6 text-secondary-foreground" />
            </div>
            <h3 className="font-bold text-base mb-3">Green Travel</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Solar-powered electric carts</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-background border-border/50">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mb-4 shadow-md">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-bold text-base mb-3">Save Money</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Up to 40% cheaper than solo rides</p>
          </Card>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border shadow-2xl">
        <div className="flex justify-around p-4">
          <button
            className="flex flex-col items-center gap-2 text-primary transition-all duration-200 hover:scale-105"
            onClick={() => setCurrentPage("booking")}
          >
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Book</span>
          </button>
          <button
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-secondary transition-all duration-200 hover:scale-105"
            onClick={() => setCurrentPage("map")}
          >
            <div className="w-10 h-10 bg-muted/10 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Map</span>
          </button>
          <button
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-secondary transition-all duration-200 hover:scale-105"
            onClick={() => setCurrentPage("driver")}
          >
            <div className="w-10 h-10 bg-muted/10 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Drive</span>
          </button>
          <button
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-secondary transition-all duration-200 hover:scale-105"
            onClick={() => setCurrentPage("sustainability")}
          >
            <div className="w-10 h-10 bg-muted/10 rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Impact</span>
          </button>
          <button
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-secondary transition-all duration-200 hover:scale-105"
            onClick={() => setCurrentPage("sms")}
          >
            <div className="w-10 h-10 bg-muted/10 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">SMS</span>
          </button>
        </div>
      </div>
    </div>
  )
}
