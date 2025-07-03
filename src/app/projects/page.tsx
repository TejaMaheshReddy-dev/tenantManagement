"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, ArrowUpDown, CreditCard } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface Project {
  id: string
  name: string
  state: string
  status: "active" | "inactive" | "pending"
  created_date: string
}

export default function ProjectsPage() {
  const searchParams = useSearchParams()
  const tenantId = searchParams.get("tenant_id")

  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [stateFilter, setStateFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [isLoading, setIsLoading] = useState(true)

  // Mock API call
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        const mockProjects: Project[] = [
          { id: "proj-1", name: "Project A", state: "California", status: "active", created_date: "2024-01-15" },
          { id: "proj-2", name: "Project B", state: "Texas", status: "pending", created_date: "2024-02-20" },
          { id: "proj-3", name: "Project C", state: "California", status: "inactive", created_date: "2024-03-10" },
          { id: "proj-4", name: "Project D", state: "New York", status: "active", created_date: "2024-01-05" },
          { id: "proj-5", name: "Project E", state: "Florida", status: "active", created_date: "2024-02-28" },
        ]
        setProjects(mockProjects)
        setFilteredProjects(mockProjects)
        setIsLoading(false)
      }, 500)
    }

    fetchProjects()
  }, [tenantId])

  // Filter and sort projects
  useEffect(() => {
    let filtered = projects.filter(
      (project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.state.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    if (stateFilter !== "all") {
      filtered = filtered.filter((project) => project.state === stateFilter)
    }

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "state":
          return a.state.localeCompare(b.state)
        case "date":
          return new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
        default:
          return 0
      }
    })

    setFilteredProjects(filtered)
  }, [projects, searchTerm, stateFilter, sortBy])

  const uniqueStates = Array.from(new Set(projects.map((p) => p.state)))

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto p-6">
          <div className="text-center">Loading projects...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-muted-foreground">Tenant ID: {tenantId}</p>
          </div>
          <Link href="/payment">
            <Button>
              <CreditCard className="mr-2 h-4 w-4" />
              Upgrade Plan
            </Button>
          </Link>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={stateFilter} onValueChange={setStateFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {uniqueStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="state">State</SelectItem>
              <SelectItem value="date">Date Created</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <Badge
                    variant={
                      project.status === "active" ? "default" : project.status === "pending" ? "secondary" : "outline"
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
                <CardDescription>{project.state}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Created: {new Date(project.created_date).toLocaleDateString()}
                </p>
                <div className="mt-4 flex gap-2">
                  <Link href={`/questions?project_id=${project.id}`}>
                    <Button variant="outline" size="sm">
                      Questions
                    </Button>
                  </Link>
                  <Link href={`/chat?project_id=${project.id}`}>
                    <Button variant="outline" size="sm">
                      Chat
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
