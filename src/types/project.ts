export interface Scene {
  id: number;
  description: string;
  background_prompt: string;
  background_path: string;
  character_prompts: string[];
  character_paths: string[];
}

export interface Project {
  id: number;
  title: string;
  story_text: string;
  duration_sec: number;
  status: string;
  created_at: string;
  scenes: Scene[];
}

export interface CreateProjectRequest {
  title: string;
  story_text: string;
  duration_sec?: number;
}
