"use client";

import ActivityChart from "@/components/ActivityChart";
import Header from "@/components/Header";
import KpiGrid from "@/app/dashboard/__components/KpiGrid";
import { useEffect, useState } from "react";
import InfoList from "./__components/InfoList";
import RealTimeInsights from "./__components/RealTimeInsights";
import { SeedingControlPanel } from "./__components/SeedingControlPanel";
import Sidebar from "./__components/Sidebar";
import { DashboardData } from "@/types/dashboardData";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        Error: {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center">
        No data available.
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="flex-1 p-6 overflow-y-auto">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <KpiGrid kpis={data.kpis} />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ActivityChart data={data.activityByTime} />

          <div className="space-y-6">
            <InfoList
              title="Matching TOP 5"
              items={data.matchingTop5.map((p) => ({ name: p.name }))}
            />
            <InfoList
              title="Meeting in Anticipation"
              items={data.meetingInAnticipation}
            />
          </div>
        </div>

        <RealTimeInsights insights={data.insights} />
        <SeedingControlPanel />
      </main>
    </div>
  );
}
