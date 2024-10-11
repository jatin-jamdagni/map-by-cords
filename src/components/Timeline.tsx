"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"

interface Location {
  id: number
  latitude: number
  longitude: number
  timestamp: string
  address: string
}

interface TimelineProps {
  locations: Location[]
  onSelectLocation: (location: Location) => void
}

export default function Timeline({ locations, onSelectLocation }: TimelineProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    onSelectLocation(locations[currentIndex])
  }, [currentIndex, locations, onSelectLocation])

  const handleSliderChange = (value: number[]) => {
    setCurrentIndex(value[0])
  }

  const formatTimestamp = (timestamp: string) => {
    return format(new Date(timestamp), "MMM d, yyyy HH:mm:ss")
  }

  return (
    <Card className="mt-4">
      <CardContent className="pt-6">
        <Slider
          min={0}
          max={locations.length - 1}
          step={1}
          value={[currentIndex]}
          onValueChange={handleSliderChange}
          className="mb-4"
        />
        <div className="text-center">
          <p className="text-lg font-semibold">
            {formatTimestamp(locations[currentIndex].timestamp)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {locations[currentIndex].address}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}