"use client";

import {
  useGenerateSegmentsMutation,
  useGetProjectQuery,
} from "@/redux/features/project/projectApi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Film, Sparkles, Play, Edit3, Clock } from "lucide-react";
import Link from "next/link";
import { Scene } from "@/types/project";
import Image from "next/image";
import { useState } from "react";

const ProjectDetail = ({ projectId }: { projectId: string }) => {
  const {
    data: project,
    isLoading,
    isError,
    refetch,
  } = useGetProjectQuery(Number(projectId));
  const [generateSegments] = useGenerateSegmentsMutation();

  const [generatingBg, setGeneratingBg] = useState<number | null>(null);
  const [generatingChar, setGeneratingChar] = useState<string | null>(null);

  const generateBackground = async (sceneId: number) => {
    setGeneratingBg(sceneId);
  };

  const generateCharacter = async (sceneId: number, index: number) => {
    const key = `${sceneId}-${index}`;
    setGeneratingChar(key);
  };

  const handleGenerateSegments = (id: number) => {
    try {
      generateSegments({ projectId: id }).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Project not found
          </h2>
          <Link href="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-secondary border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard" className="text-primary-foreground">
                <Button variant="ghost" size="sm">
                  ← Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-primary-foreground line-clamp-1">
                {project.title}
              </h1>
              <Badge
                className={`bg-accent px-2 py-1 shadow-sm text-primary-foreground capitalize`}
              >
                {project.status}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-primary-foreground flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {project.duration_sec}s
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Story Preview */}
        <Card className="mb-8 bg-card ring-1 ring-primary/20">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <Edit3 className="w-5 h-5" />
              Story
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-card-foreground leading-relaxed whitespace-pre-wrap">
              {project.story_text}
            </p>
          </CardContent>
        </Card>

        {/* Action Bar */}
        <div className="flex justify-center mb-10">
          {project.status === "draft" && (
            <Button
              size="lg"
              className="shadow-md hover:shadow-lg"
              onClick={() => handleGenerateSegments(Number(projectId))}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Segment into Scenes
            </Button>
          )}
          {project.status === "segmented" && (
            <Button size="lg" className="bg-secondary">
              <Play className="w-5 h-5 mr-2" />
              Generate Animation
            </Button>
          )}
          {project.status === "completed" && (
            <Button size="lg" className="bg-accent">
              <Film className="w-5 h-5 mr-2" />
              Play Video
            </Button>
          )}
        </div>

        {/* Scenes Grid */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Film className="w-6 h-6 text-foreground" />
            Scenes ({project.scenes?.length || 0})
          </h2>

          {project.scenes && project.scenes.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {project.scenes.map((scene: Scene, index: number) => (
                <Card
                  key={scene.id}
                  className="overflow-hidden hover:shadow-lg transition"
                >
                  {/* Scene Header */}
                  <div className="bg-linear-to-br from-indigo-100 to-purple-100 h-40 flex items-center justify-center">
                    <div className="text-center">
                      <div className="bg-white bg-opacity-80 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                        <span className="text-xl font-bold text-indigo-600">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-700">
                        Scene {index + 1}
                      </p>
                    </div>
                  </div>

                  <CardContent className="pt-4 space-y-4">
                    {/* Description */}
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {scene.description}
                    </p>

                    {/* Background */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-600">
                          Background
                        </span>
                        {scene.background_path ? (
                          <Badge variant="secondary" className="text-xs">
                            Done
                          </Badge>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => generateBackground(scene.id)}
                            disabled={generatingBg === scene.id}
                          >
                            {generatingBg === scene.id ? (
                              <>
                                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                Generating...
                              </>
                            ) : (
                              "Generate BG"
                            )}
                          </Button>
                        )}
                      </div>
                      {scene.background_path && (
                        <div className="mt-2">
                          <Image
                            src={scene.background_path}
                            alt="Background"
                            width={400}
                            height={100}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>

                    {/* Characters */}
                    <div className="space-y-3 pt-2 border-t">
                      <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Characters ({scene.character_prompts?.length || 0})
                      </h4>

                      {scene.character_prompts?.length > 0 ? (
                        <div className="space-y-3">
                          {scene.character_prompts.map(
                            (prompt: string, i: number) => {
                              const path = scene.character_paths?.[i];
                              const isGenerating =
                                generatingChar === `${scene.id}-${i}`;

                              return (
                                <div
                                  key={i}
                                  className="flex items-center justify-between gap-2"
                                >
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-700 truncate">
                                      {prompt.split(",")[0]}
                                    </p>
                                  </div>

                                  {path ? (
                                    <div className="flex items-center gap-2">
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        Ready
                                      </Badge>
                                      <Image
                                        src={path}
                                        alt={`Char ${i + 1}`}
                                        width={60}
                                        height={60}
                                        className="w-12 h-12 object-contain rounded"
                                      />
                                    </div>
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        generateCharacter(scene.id, i)
                                      }
                                      disabled={isGenerating}
                                    >
                                      {isGenerating ? (
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                      ) : (
                                        `Char ${i + 1}`
                                      )}
                                    </Button>
                                  )}
                                </div>
                              );
                            }
                          )}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-500 italic">
                          No characters detected
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mx-auto mb-4" />
              <p className="text-gray-500">
                No scenes yet. Click &quot;Split into Scenes&quot; to begin.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
