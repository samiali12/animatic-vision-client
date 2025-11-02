"use client";

import { useCreateProjectMutation } from "@/redux/features/project/projectApi";
import { CreateProjectRequest } from "@/types/project";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Sparkles } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { toast } from "react-toastify";

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateProjectDialog = ({
  open,
  onOpenChange,
}: CreateProjectDialogProps) => {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectRequest>({});

  const onSubmit = async (data: CreateProjectRequest) => {
    try {
      await createProject(data).unwrap();
      onOpenChange(false);
      toast.success("Project is created successfully");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Something wrong happening while creating project");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            Create New Project
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Turn your story into a 2D animated clip. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 mt-4"
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Project Title
            </Label>
            <Input
              id="title"
              placeholder="My Epic Adventure"
              {...register("title", { required: "Title is required" })}
              className="w-full"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="story" className="text-sm font-medium">
              Story Text
            </Label>
            <Textarea
              id="story"
              placeholder="Once upon a time in a magical forest..."
              rows={6}
              {...register("story_text", {
                required: "Story text is required",
              })}
              className="w-full resize-none"
            />
            {errors.story_text && (
              <p className="text-sm text-red-500">
                {errors.story_text.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration" className="text-sm font-medium">
              Duration (seconds)
            </Label>
            <Input
              id="duration"
              type="number"
              min="10"
              max="30"
              defaultValue={25}
              {...register("duration_sec")}
              className="w-full"
            />
            <p className="text-xs text-gray-500">Between 10 and 30 seconds</p>
          </div>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Create Project
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;
