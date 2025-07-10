"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { adminStorage, type AdminData, type Pastor } from "@/lib/admin-storage"
import { Plus, Edit, Trash2, Save } from "lucide-react"

export default function AdminPage() {
  const [adminData, setAdminData] = useState<AdminData | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem("admin-auth")
    if (auth === "true") {
      setIsAuthenticated(true)
      setAdminData(adminStorage.getData())
    }
  }, [])

  const handleLogin = () => {
    // Simple password check - in production, use proper authentication
    if (password === "admin123") {
      setIsAuthenticated(true)
      localStorage.setItem("admin-auth", "true")
      setAdminData(adminStorage.getData())
    } else {
      alert("Invalid password")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("admin-auth")
    setPassword("")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
            <p className="text-sm text-gray-600 text-center">Demo password: admin123</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!adminData) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <Tabs defaultValue="pastors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pastors">Pastors</TabsTrigger>
            <TabsTrigger value="worship">Worship Leaders</TabsTrigger>
            <TabsTrigger value="youth">Youth Pastors</TabsTrigger>
            <TabsTrigger value="activities">Weekly Activities</TabsTrigger>
          </TabsList>

          <TabsContent value="pastors">
            <PastorsManager data={adminData} onUpdate={setAdminData} />
          </TabsContent>

          <TabsContent value="worship">
            <WorshipLeadersManager data={adminData} onUpdate={setAdminData} />
          </TabsContent>

          <TabsContent value="youth">
            <YouthPastorsManager data={adminData} onUpdate={setAdminData} />
          </TabsContent>

          <TabsContent value="activities">
            <WeeklyActivitiesManager data={adminData} onUpdate={setAdminData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function PastorsManager({ data, onUpdate }: { data: AdminData; onUpdate: (data: AdminData) => void }) {
  const [editingPastor, setEditingPastor] = useState<Pastor | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const handleSave = (pastor: Pastor) => {
    const updatedData = { ...data }
    if (isAdding) {
      updatedData.pastors.push({ ...pastor, id: Date.now().toString() })
    } else {
      const index = updatedData.pastors.findIndex((p) => p.id === pastor.id)
      if (index !== -1) {
        updatedData.pastors[index] = pastor
      }
    }
    adminStorage.updatePastors(updatedData.pastors)
    onUpdate(updatedData)
    setEditingPastor(null)
    setIsAdding(false)
  }

  const handleDelete = (id: string) => {
    const updatedData = { ...data }
    updatedData.pastors = updatedData.pastors.filter((p) => p.id !== id)
    adminStorage.updatePastors(updatedData.pastors)
    onUpdate(updatedData)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pastors</h2>
        <Button
          onClick={() => {
            setIsAdding(true)
            setEditingPastor({ id: "", name: "", title: "", bio: "", image: "", email: "", phone: "" })
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Pastor
        </Button>
      </div>

      {(editingPastor || isAdding) && (
        <PastorForm
          pastor={editingPastor}
          onSave={handleSave}
          onCancel={() => {
            setEditingPastor(null)
            setIsAdding(false)
          }}
        />
      )}

      <div className="grid gap-4">
        {data.pastors.map((pastor) => (
          <Card key={pastor.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{pastor.name}</h3>
                  <p className="text-gray-600">{pastor.title}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {pastor.email} | {pastor.phone}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setEditingPastor(pastor)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(pastor.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function PastorForm({
  pastor,
  onSave,
  onCancel,
}: { pastor: Pastor | null; onSave: (pastor: Pastor) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState<Pastor>(
    pastor || { id: "", name: "", title: "", bio: "", image: "", email: "", phone: "" },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{pastor?.id ? "Edit Pastor" : "Add Pastor"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              required
            />
          </div>
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="/placeholder.svg?height=300&width=300"
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

// Similar components for WorshipLeadersManager, YouthPastorsManager, and WeeklyActivitiesManager
function WorshipLeadersManager({ data, onUpdate }: { data: AdminData; onUpdate: (data: AdminData) => void }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Worship Leaders</h2>
      <p className="text-gray-600">Manage worship leaders and their information.</p>
      {/* Implementation similar to PastorsManager */}
    </div>
  )
}

function YouthPastorsManager({ data, onUpdate }: { data: AdminData; onUpdate: (data: AdminData) => void }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Youth Pastors</h2>
      <p className="text-gray-600">Manage youth pastors and their information.</p>
      {/* Implementation similar to PastorsManager */}
    </div>
  )
}

function WeeklyActivitiesManager({ data, onUpdate }: { data: AdminData; onUpdate: (data: AdminData) => void }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Weekly Activities</h2>
      <p className="text-gray-600">Manage weekly church activities and schedules.</p>
      {/* Implementation similar to PastorsManager */}
    </div>
  )
}
