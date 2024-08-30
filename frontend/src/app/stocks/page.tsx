import { auth } from "@/auth";
import DashboardPage from "@/components/dashboard/DashboardPage";

// Import the new SearchBar component
import React from "react";

const Dashboard = async() => {
  const session = await auth();
  return (
    <DashboardPage userId={session?.user.id as string} />
  );
};

export default Dashboard;
