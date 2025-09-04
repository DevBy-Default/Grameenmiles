"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Leaf, Users, TrendingDown, TreePine, Coins, Briefcase, Heart, Sun, Droplets } from "lucide-react"

interface SustainabilityPageProps {
  onBack: () => void
}

interface AnimatedStatProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

function AnimatedStat({ value, suffix = "", prefix = "", duration = 2000, className = "" }: AnimatedStatProps) {
  const [currentValue, setCurrentValue] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCurrentValue(Math.floor(value * easeOutQuart))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    const timer = setTimeout(() => {
      animate()
    }, 200)

    return () => clearTimeout(timer)
  }, [value, duration])

  return (
    <span className={className}>
      {prefix}
      {currentValue.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function SustainabilityPage({ onBack }: SustainabilityPageProps) {
  const [activeSection, setActiveSection] = useState<"impact" | "community" | "environment">("impact")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center gap-4 p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-serif font-bold text-primary">Our Impact</h1>
          <p className="text-sm text-muted-foreground">Building sustainable rural communities</p>
        </div>
      </header>

      {/* Hero Section with Rural Illustration */}
      <div className="p-4">
        <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-yellow-50 dark:from-green-950 dark:to-yellow-950">
          <div className="p-6 text-center">
            <img
              src="/placeholder.svg?height=180&width=280"
              alt="Farmer with solar-powered EV cart in rural setting"
              className="w-full max-w-xs mx-auto rounded-lg mb-4"
            />
            <h2 className="text-xl font-serif font-bold text-primary mb-2">Transforming Rural Mobility</h2>
            <p className="text-sm text-muted-foreground">
              Empowering communities through sustainable, affordable transportation
            </p>
          </div>
        </Card>
      </div>

      {/* Key Impact Stats */}
      <div className="p-4">
        <h3 className="text-lg font-serif font-bold mb-4">Key Achievements</h3>
        <div className="grid grid-cols-1 gap-4">
          {/* Cost Reduction */}
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <Coins className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <div className="text-3xl font-bold text-primary mb-1">
                  <AnimatedStat value={40} suffix="%" />
                </div>
                <div className="font-medium text-primary mb-1">Cost Reduced for Farmers</div>
                <div className="text-sm text-muted-foreground">
                  Saving ৳<AnimatedStat value={2340} /> per month on average
                </div>
              </div>
            </div>
          </Card>

          {/* Zero Emissions */}
          <Card className="p-6 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  <AnimatedStat value={0} /> Emission Rides
                </div>
                <div className="font-medium text-green-600 mb-1">100% Solar Powered</div>
                <div className="text-sm text-muted-foreground">
                  <AnimatedStat value={12500} /> kg CO₂ prevented this year
                </div>
              </div>
            </div>
          </Card>

          {/* Local Jobs */}
          <Card className="p-6 bg-accent/10 border-accent/30">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <div className="text-3xl font-bold text-accent-foreground mb-1">
                  <AnimatedStat value={1250} />
                </div>
                <div className="font-medium text-accent-foreground mb-1">Local Jobs Created</div>
                <div className="text-sm text-muted-foreground">Drivers, mechanics, and support staff employed</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="p-4">
        <div className="flex gap-2 mb-4">
          <Button
            variant={activeSection === "impact" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveSection("impact")}
          >
            Impact
          </Button>
          <Button
            variant={activeSection === "community" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveSection("community")}
          >
            Community
          </Button>
          <Button
            variant={activeSection === "environment" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveSection("environment")}
          >
            Environment
          </Button>
        </div>

        {/* Impact Section */}
        {activeSection === "impact" && (
          <div className="space-y-4">
            <Card className="p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-primary" />
                Transportation Cost Reduction
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Fuel Savings</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Maintenance Costs</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Shared Ride Benefits</span>
                    <span>40%</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-3">Monthly Farmer Savings</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    ৳<AnimatedStat value={3200} />
                  </div>
                  <div className="text-xs text-muted-foreground">Before GrameenMiles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ৳<AnimatedStat value={1920} />
                  </div>
                  <div className="text-xs text-muted-foreground">After GrameenMiles</div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Community Section */}
        {activeSection === "community" && (
          <div className="space-y-4">
            <Card className="p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Community Benefits
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Healthcare Access</div>
                    <div className="text-sm text-muted-foreground">
                      <AnimatedStat value={85} />% faster emergency response times
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">Market Access</div>
                    <div className="text-sm text-muted-foreground">
                      <AnimatedStat value={60} />% increase in farmer market reach
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">Social Connectivity</div>
                    <div className="text-sm text-muted-foreground">
                      Connecting <AnimatedStat value={500} />+ villages daily
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-r from-primary/5 to-accent/5">
              <div className="text-center">
                <img
                  src="/placeholder.svg?height=120&width=200"
                  alt="Rural community at solar charging station"
                  className="w-full max-w-xs mx-auto rounded-lg mb-3"
                />
                <div className="text-sm text-muted-foreground">
                  "GrameenMiles has transformed how we connect with neighboring villages and access essential services."
                </div>
                <div className="text-xs font-medium mt-2">- Local Community Leader</div>
              </div>
            </Card>
          </div>
        )}

        {/* Environment Section */}
        {activeSection === "environment" && (
          <div className="space-y-4">
            <Card className="p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <TreePine className="w-5 h-5 text-green-600" />
                Environmental Impact
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-green-600">
                    <AnimatedStat value={12500} />
                    kg
                  </div>
                  <div className="text-xs text-muted-foreground">CO₂ Prevented</div>
                </div>

                <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-blue-600">
                    <AnimatedStat value={8500} />L
                  </div>
                  <div className="text-xs text-muted-foreground">Fuel Saved</div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Sun className="w-5 h-5 text-yellow-500" />
                Solar Energy Usage
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Solar Coverage</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Energy Efficiency</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="text-center mt-4">
                  <div className="text-2xl font-bold text-yellow-600">
                    <AnimatedStat value={45000} />
                    kWh
                  </div>
                  <div className="text-sm text-muted-foreground">Clean energy generated this year</div>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
              <div className="text-center">
                <img
                  src="/placeholder.svg?height=120&width=200"
                  alt="Solar charging station in rural landscape"
                  className="w-full max-w-xs mx-auto rounded-lg mb-3"
                />
                <div className="text-sm font-medium text-green-700 dark:text-green-300">
                  Equivalent to planting <AnimatedStat value={625} /> trees annually
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="p-4 pb-20">
        <Card className="p-6 bg-primary/5 border-primary/20 text-center">
          <h3 className="font-serif font-bold text-lg text-primary mb-2">Join the Green Revolution</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Be part of sustainable rural mobility and help build a greener future for our communities.
          </p>
          <Button className="w-full">
            <Leaf className="w-4 h-4 mr-2" />
            Start Your Sustainable Journey
          </Button>
        </Card>
      </div>
    </div>
  )
}
