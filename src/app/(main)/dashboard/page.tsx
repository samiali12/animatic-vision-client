import ProjectDashboard from "@/components/Project/ProjectDashboard";

export const metadata = {
  title: `Project Dashboard | Animatic Vision`,
  description: `View and manage your animation projecs.`,
};

const DashboardPage = () => {
  return (
    <div>
      <ProjectDashboard />
    </div>
  );
};

export default DashboardPage;
