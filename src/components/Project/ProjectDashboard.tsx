"use client";

import { Button } from "@/components/ui/button";
import { useGetProjectsQuery } from "@/redux/features/project/projectApi";
import { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";
import { Film, Loader2, Sparkles } from "lucide-react";
import ProjectsNavbar from "./ProjectsNavbar";
import { useState } from "react";
import CreateProjectDialog from "./CreateProjectDialog";
import AnimatedBackground from "../Animations/AnimatedBackground";

export default function ProjectDashboard() {
  const { data: projects = [], isLoading, isError } = useGetProjectsQuery();
  const [openNewProjectDialog, setOpenNewProjectDialog] = useState(false);

  return (
    <>
      <ProjectsNavbar />

      <main className="min-h-screen bg-background">
        <AnimatedBackground>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
                  My Projects
                  <Sparkles className="w-8 h-8 text-yellow-500" />
                </h1>
                <p className="text-foreground mt-2">
                  Turn your stories into animated magic
                </p>
              </div>

              <Button
                onClick={() => setOpenNewProjectDialog(true)}
                size="lg"
                className="bg-primary shadow-lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Create New Project
              </Button>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 animate-spin text-accent mb-4" />
                <p className="text-accent">Loading your projects...</p>
              </div>
            )}

            {/* Error State */}
            {isError && (
              <div className="text-center py-20">
                <p className="text-red-600">
                  Failed to load projects. Please try again.
                </p>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !isError && projects.length === 0 && (
              <div className="text-center py-20">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                  <Film className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  No projects yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start your first animation journey!
                </p>
                <Button
                  className="bg-primary shadow-lg"
                  onClick={() => setOpenNewProjectDialog(true)}
                  size="lg"
                >
                  Create Your First Project
                </Button>
              </div>
            )}

            {/* Projects Grid */}
            {!isLoading && !isError && projects.length > 0 && (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project: Project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        </AnimatedBackground>
      </main>

      {openNewProjectDialog && (
        <CreateProjectDialog
          open={openNewProjectDialog}
          onOpenChange={() => setOpenNewProjectDialog(false)}
        />
      )}
    </>
  );
}
