import ProjectDetail from "@/components/Project/ProjectDetail";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return <ProjectDetail projectId={id} />;
}
