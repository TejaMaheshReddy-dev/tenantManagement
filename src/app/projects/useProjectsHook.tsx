import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Project {
  id: string;
  name: string;
  state: string;
  status: "active" | "inactive" | "pending";
  created_date: string;
}

function useProjectsHook() {
  const searchParams = useSearchParams();
  const tenantId = searchParams.get("tenant_id");

  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [isLoading, setIsLoading] = useState(true);

  // Mock API call
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockProjects: Project[] = [
          {
            id: "proj-1",
            name: "Project A",
            state: "California",
            status: "active",
            created_date: "2024-01-15",
          },
          {
            id: "proj-2",
            name: "Project B",
            state: "Texas",
            status: "pending",
            created_date: "2024-02-20",
          },
          {
            id: "proj-3",
            name: "Project C",
            state: "California",
            status: "inactive",
            created_date: "2024-03-10",
          },
          {
            id: "proj-4",
            name: "Project D",
            state: "New York",
            status: "active",
            created_date: "2024-01-05",
          },
          {
            id: "proj-5",
            name: "Project E",
            state: "Florida",
            status: "active",
            created_date: "2024-02-28",
          },
        ];
        setProjects(mockProjects);
        setFilteredProjects(mockProjects);
        setIsLoading(false);
      }, 500);
    };

    fetchProjects();
  }, [tenantId]);

  // Filter and sort projects
  useEffect(() => {
    let filtered = projects.filter(
      (project: any) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.state.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (stateFilter !== "all") {
      filtered = filtered.filter(
        (project: any) => project.state === stateFilter
      );
    }

    // Sort projects
    filtered.sort((a: any, b: any) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "state":
          return a.state.localeCompare(b.state);
        case "date":
          return (
            new Date(b.created_date).getTime() -
            new Date(a.created_date).getTime()
          );
        default:
          return 0;
      }
    });

    setFilteredProjects(filtered);
  }, [projects, searchTerm, stateFilter, sortBy]);

  const uniqueStates = Array.from(new Set(projects.map((p: any) => p.state)));

  return {
    isLoading,
    tenantId,
    searchTerm,
    stateFilter,
    setStateFilter,
    uniqueStates,
    sortBy,
    filteredProjects,
    setSearchTerm,
    setSortBy,
  };
}

export default useProjectsHook;
