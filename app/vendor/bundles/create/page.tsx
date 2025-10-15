"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface BundleItem {
  name: string
  quantity: string
  unit: string
}

export default function CreateBundlePage() {
  const [bundleData, setBundleData] = useState({
    name: "",
    description: "",
    price: "",
    type: "kitchen",
  })

  const [items, setItems] = useState<BundleItem[]>([{ name: "", quantity: "", unit: "kg" }])

  const addItem = () => {
    setItems([...items, { name: "", quantity: "", unit: "kg" }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, field: keyof BundleItem, value: string) => {
    const newItems = [...items]
    newItems[index][field] = value
    setItems(newItems)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Bundle data:", { ...bundleData, items })
    alert("Bundle created successfully!")
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="space-y-6">
          {/* Back Button */}
          <Button variant="ghost" asChild>
            <Link href="/vendor/bundles">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Bundles
            </Link>
          </Button>

          {/* Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Create New Bundle</h1>
            <p className="text-muted-foreground">Add a new product bundle to your inventory</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the bundle details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Bundle Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Essential Kitchen Bundle"
                    value={bundleData.name}
                    onChange={(e) => setBundleData({ ...bundleData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what's included and why it's valuable..."
                    rows={4}
                    value={bundleData.description}
                    onChange={(e) => setBundleData({ ...bundleData, description: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (NGN)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="50000"
                      value={bundleData.price}
                      onChange={(e) => setBundleData({ ...bundleData, price: e.target.value })}
                      min="0"
                      step="100"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Bundle Type</Label>
                    <Select
                      value={bundleData.type}
                      onValueChange={(value) => setBundleData({ ...bundleData, type: value })}
                    >
                      <SelectTrigger id="type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kitchen">Kitchen</SelectItem>
                        <SelectItem value="farm">Farm</SelectItem>
                        <SelectItem value="livestock">Livestock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bundle Items */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Bundle Items</CardTitle>
                    <CardDescription>Add items included in this bundle</CardDescription>
                  </div>
                  <Button type="button" size="sm" onClick={addItem}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-3 items-end">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor={`item-name-${index}`}>Item Name</Label>
                      <Input
                        id={`item-name-${index}`}
                        placeholder="e.g., Rice"
                        value={item.name}
                        onChange={(e) => updateItem(index, "name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="w-24 space-y-2">
                      <Label htmlFor={`item-quantity-${index}`}>Quantity</Label>
                      <Input
                        id={`item-quantity-${index}`}
                        placeholder="10"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, "quantity", e.target.value)}
                        required
                      />
                    </div>
                    <div className="w-24 space-y-2">
                      <Label htmlFor={`item-unit-${index}`}>Unit</Label>
                      <Select value={item.unit} onValueChange={(value) => updateItem(index, "unit", value)}>
                        <SelectTrigger id={`item-unit-${index}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="L">L</SelectItem>
                          <SelectItem value="pcs">pcs</SelectItem>
                          <SelectItem value="bags">bags</SelectItem>
                          <SelectItem value="cans">cans</SelectItem>
                          <SelectItem value="set">set</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {items.length > 1 && (
                      <Button type="button" size="icon" variant="outline" onClick={() => removeItem(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Create Bundle
              </Button>
              <Button type="button" variant="outline" className="flex-1 bg-transparent" asChild>
                <Link href="/vendor/bundles">Cancel</Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
