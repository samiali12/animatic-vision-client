import { apiSlice } from "@/redux/api/apiSlice";
import { CreateProjectRequest, Project } from "@/types/project";

interface StorySegmentation {
  id: number;
  description: string;
  background_prompt: string;
}

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => "/projects",
    }),

    createProject: builder.mutation<Project, CreateProjectRequest>({
      query: (data) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),
    }),

    getProject: builder.query<Project, number>({
      query: (id) => `/projects/${id}`,
    }),

    generateSegments: builder.mutation<
      StorySegmentation[],
      { projectId: number }
    >({
      query: ({ projectId }) => ({
        url: `projects/segment`,
        method: "POST",
        body: { projectId },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetProjectQuery,
  useGenerateSegmentsMutation,
} = projectApi;
