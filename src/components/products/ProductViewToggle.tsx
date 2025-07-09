"use client"

import { Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductViewToggleProps {
  viewMode: "grid" | "list"
  onChange: (mode: "grid" | "list") => void
}

export function ProductViewToggle({ viewMode, onChange }: ProductViewToggleProps) {
  return (
    <div className="flex border rounded-lg">
      <Button
        variant={viewMode === "grid" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("grid")}
        className="rounded-r-none"
      >
        <Grid className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("list")}
        className="rounded-l-none"
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  )
}
