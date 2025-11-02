import { Project } from "@/types/project";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Clock, Film } from "lucide-react";
import { useRouter } from "next/navigation";

const ProjectCard = ({ project }: { project: Project }) => {
  const router = useRouter();
  const handleProjectDetailRoute = (id: number) => {
    router.push(`/dashboard/${id}`);
  };

  return (
    <Card
      onClick={() => handleProjectDetailRoute(project.id)}
      className="group rounded-xl bg-card p-6 shadow-xl ring-1 ring-primary/20 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
    >
      <div className="relative">
        <div className="bg-card h-48 flex items-center justify-center">
          <Film className="w-16 h-16 text-accent opacity-50" />
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <Badge className={`bg-accent px-2 py-1 text-white capitalize`}>
            {project.status}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl line-clamp-1 group-hover:text-primary transition">
          {project.title}
        </CardTitle>
        <CardDescription className="flex items-center space-x-1 text-sm">
          <Clock className="w-4 h-4" />
          <span>
            {project.duration_sec}s •{" "}
            {new Date(project.created_at).toLocaleDateString()}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-secondary line-clamp-2 mb-4">
          {project.story_text}
        </p>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
