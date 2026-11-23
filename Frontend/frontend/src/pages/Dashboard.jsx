
import { useEffect, useState } from "react";
import { getDashboardOverview } from "../services/dashboardService";


function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const data = await getDashboardOverview();

                if (data.success) {
                    setStats(data.data);
                } else {
                    setError("Failed to load dashboard data.");
                }
            } catch (err) {
                console.error("Dashboard fetch error:", err);
                setError("Unable to load dashboard overview.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <p className="text-slate-400">Loading dashboard...</p>;
    }

    if (error) {
        return <p className="text-red-400">{error}</p>;
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Dashboard
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                    Monitor your API usage and manage your API infrastructure.
                </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard title="Total API Keys" value={stats.totalApiKeys} />
                <StatCard title="Total Requests" value={stats.totalRequests} />
                <StatCard title="Successful Requests" value={stats.successfulRequests} />
                <StatCard title="Rate Limited Requests" value={stats.rateLimitedRequests} />
            </div>
        </div>
    );
}

function StatCard({ title, value }) {
    return (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">{title}</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
                {value}
            </h2>
        </div>
    );
}

export default Dashboard;
