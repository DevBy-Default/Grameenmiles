"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Zap, Users, Battery, Clock, Truck } from "lucide-react"

interface VillageHubMapProps {
  onBack: () => void
}

interface CartData {
  id: string
  status: "available" | "charging" | "in-use" | "maintenance"
  batteryLevel: number
  capacity: number
  currentPassengers: number
  estimatedReturn?: number
  type: "passenger" | "goods" | "mixed"
}

interface HubData {
  id: string
  name: string
  position: { x: number; y: number }
  carts: CartData[]
  solarStatus: "active" | "low" | "offline"
}

const VILLAGE_HUBS: HubData[] = [
  {
    id: "dhaka",
    name: "Dhaka Central",
    position: { x: 45, y: 30 },
    carts: [
      { id: "cart-1", status: "available", batteryLevel: 85, capacity: 6, currentPassengers: 0, type: "passenger" },
      {
        id: "cart-2",
        status: "in-use",
        batteryLevel: 60,
        capacity: 6,
        currentPassengers: 4,
        estimatedReturn: 25,
        type: "passenger",
      },
      { id: "cart-3", status: "charging", batteryLevel: 45, capacity: 8, currentPassengers: 0, type: "mixed" },
    ],
    solarStatus: "active",
  },
  {
    id: "chittagong",
    name: "Chittagong Port",
    position: { x: 75, y: 55 },
    carts: [
      { id: "cart-4", status: "available", batteryLevel: 92, capacity: 4, currentPassengers: 0, type: "goods" },
      { id: "cart-5", status: "available", batteryLevel: 78, capacity: 6, currentPassengers: 0, type: "passenger" },
    ],
    solarStatus: "active",
  },
  {
    id: "sylhet",
    name: "Sylhet Tea Hub",
    position: { x: 65, y: 25 },
    carts: [
      {
        id: "cart-6",
        status: "in-use",
        batteryLevel: 40,
        capacity: 8,
        currentPassengers: 6,
        estimatedReturn: 45,
        type: "mixed",
      },
      { id: "cart-7", status: "maintenance", batteryLevel: 0, capacity: 6, currentPassengers: 0, type: "passenger" },
    ],
    solarStatus: "low",
  },
  {
    id: "rajshahi",
    name: "Rajshahi Silk",
    position: { x: 25, y: 40 },
    carts: [
      { id: "cart-8", status: "available", batteryLevel: 88, capacity: 6, currentPassengers: 0, type: "passenger" },
      { id: "cart-9", status: "charging", batteryLevel: 65, capacity: 4, currentPassengers: 0, type: "goods" },
    ],
    solarStatus: "active",
  },
  {
    id: "khulna",
    name: "Khulna Shrimp",
    position: { x: 35, y: 65 },
    carts: [{ id: "cart-10", status: "available", batteryLevel: 95, capacity: 8, currentPassengers: 0, type: "mixed" }],
    solarStatus: "active",
  },
]

const getStatusColor = (status: CartData["status"]) => {
  switch (status) {
    case "available":
      return "bg-primary"
    case "charging":
      return "bg-accent"
    case "in-use":
      return "bg-blue-500"
    case "maintenance":
      return "bg-destructive"
    default:
      return "bg-muted"
  }
}

const getStatusText = (status: CartData["status"]) => {
  switch (status) {
    case "available":
      return "Available"
    case "charging":
      return "Charging"
    case "in-use":
      return "In Use"
    case "maintenance":
      return "Maintenance"
    default:
      return "Unknown"
  }
}

export default function VillageHubMap({ onBack }: VillageHubMapProps) {
  const [selectedHub, setSelectedHub] = useState<HubData | null>(null)

  const totalCarts = VILLAGE_HUBS.reduce((sum, hub) => sum + hub.carts.length, 0)
  const availableCarts = VILLAGE_HUBS.reduce(
    (sum, hub) => sum + hub.carts.filter((cart) => cart.status === "available").length,
    0,
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center gap-4 p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-serif font-bold text-primary">Village Hub Map</h1>
          <p className="text-sm text-muted-foreground">
            {availableCarts} of {totalCarts} carts available
          </p>
        </div>
      </header>

      {/* Map View */}
      <div className="p-4">
        <Card className="relative h-80 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 overflow-hidden">
          {/* Map Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" className="text-primary">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Village Hubs */}
          {VILLAGE_HUBS.map((hub) => (
            <div
              key={hub.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `${hub.position.x}%`, top: `${hub.position.y}%` }}
              onClick={() => setSelectedHub(hub)}
            >
              {/* Hub Icon */}
              <div className="relative">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-background">
                  <MapPin className="w-4 h-4 text-primary-foreground" />
                </div>

                {/* Solar Status Indicator */}
                <div
                  className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border border-background ${
                    hub.solarStatus === "active"
                      ? "bg-green-400"
                      : hub.solarStatus === "low"
                        ? "bg-yellow-400"
                        : "bg-red-400"
                  }`}
                />

                {/* Available Carts Count */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <Badge variant="secondary" className="text-xs px-1 py-0 h-4">
                    {hub.carts.filter((cart) => cart.status === "available").length}
                  </Badge>
                </div>
              </div>

              {/* Hub Label */}
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <div className="bg-background/90 backdrop-blur-sm rounded px-2 py-1 text-xs font-medium shadow-sm">
                  {hub.name}
                </div>
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 text-xs">
            <div className="font-medium mb-2">Legend</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>Solar Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span>Solar Low</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs px-1 py-0 h-4">
                  2
                </Badge>
                <span>Available Carts</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Hub Details */}
      {selectedHub && (
        <div className="p-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif font-bold text-lg">{selectedHub.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="w-4 h-4" />
                  Solar:{" "}
                  {selectedHub.solarStatus === "active"
                    ? "Active"
                    : selectedHub.solarStatus === "low"
                      ? "Low Power"
                      : "Offline"}
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedHub(null)}>
                Close
              </Button>
            </div>

            <div className="space-y-3">
              {selectedHub.carts.map((cart) => (
                <div key={cart.id} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(cart.status)}`} />
                    <div>
                      <div className="font-medium text-sm">
                        Cart {cart.id.split("-")[1]}
                        <Badge variant="outline" className="ml-2 text-xs">
                          {cart.type === "passenger" ? (
                            <Users className="w-3 h-3" />
                          ) : cart.type === "goods" ? (
                            <Truck className="w-3 h-3" />
                          ) : (
                            <div className="flex gap-1">
                              <Users className="w-3 h-3" />
                              <Truck className="w-3 h-3" />
                            </div>
                          )}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {getStatusText(cart.status)}
                        {cart.status === "in-use" && cart.estimatedReturn && (
                          <span className="ml-2 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {cart.estimatedReturn}min
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm">
                      <Battery className="w-4 h-4" />
                      {cart.batteryLevel}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {cart.currentPassengers}/{cart.capacity} seats
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedHub.carts.filter((cart) => cart.status === "available").length > 0 && (
              <Button className="w-full mt-4">Book Cart from {selectedHub.name}</Button>
            )}
          </Card>
        </div>
      )}

      {/* Quick Stats */}
      <div className="p-4">
        <div className="grid grid-cols-4 gap-3">
          <Card className="p-3 text-center">
            <div className="text-lg font-bold text-primary">{availableCarts}</div>
            <div className="text-xs text-muted-foreground">Available</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-lg font-bold text-blue-500">
              {VILLAGE_HUBS.reduce((sum, hub) => sum + hub.carts.filter((cart) => cart.status === "in-use").length, 0)}
            </div>
            <div className="text-xs text-muted-foreground">In Use</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-lg font-bold text-accent-foreground">
              {VILLAGE_HUBS.reduce(
                (sum, hub) => sum + hub.carts.filter((cart) => cart.status === "charging").length,
                0,
              )}
            </div>
            <div className="text-xs text-muted-foreground">Charging</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-lg font-bold text-primary">
              {VILLAGE_HUBS.filter((hub) => hub.solarStatus === "active").length}
            </div>
            <div className="text-xs text-muted-foreground">Solar Active</div>
          </Card>
        </div>
      </div>
    </div>
  )
}
