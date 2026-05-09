import { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const AdminDashboard = () => {
    const [stats] = useState({
        totalOrders: 1247,
        totalRevenue: 45280,
        totalScans: 8923,
        activeMenus: 156,
    });

    // Revenue data (last 7 days)
    const revenueData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Revenue (₹)',
                data: [5200, 6800, 7500, 6200, 8900, 11200, 9800],
                borderColor: '#aa3bff',
                backgroundColor: 'rgba(170, 59, 255, 0.1)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    // Orders by category
    const ordersData = {
        labels: ['Appetizers', 'Main Course', 'Desserts', 'Beverages'],
        datasets: [
            {
                label: 'Orders',
                data: [342, 856, 234, 567],
                backgroundColor: [
                    'rgba(170, 59, 255, 0.8)',
                    'rgba(139, 47, 217, 0.8)',
                    'rgba(192, 132, 252, 0.8)',
                    'rgba(107, 99, 117, 0.8)',
                ],
                borderRadius: 8,
            },
        ],
    };

    // Scan activity (last 12 months)
    const scanData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'QR Scans',
                data: [450, 620, 780, 890, 1020, 1150, 1340, 1450, 1620, 1780, 1950, 2100],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const doughnutData = {
        labels: ['Dine-in', 'Takeaway', 'Delivery'],
        datasets: [
            {
                data: [45, 30, 25],
                backgroundColor: ['#aa3bff', '#c084fc', '#e9d5ff'],
                borderWidth: 0,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: 'var(--text)',
                },
            },
        },
        scales: {
            y: {
                grid: {
                    color: 'var(--border)',
                },
                ticks: {
                    color: 'var(--text)',
                },
            },
            x: {
                grid: {
                    color: 'var(--border)',
                },
                ticks: {
                    color: 'var(--text)',
                },
            },
        },
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-[var(--text)]">Welcome back! Here's what's happening with your business today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="stat-card">
                    <div className="flex items-center justify-between mb-4">
                        <div className="stat-icon">💰</div>
                        <span className="text-2xl font-bold text-[var(--accent)]">↑ 12%</span>
                    </div>
                    <div className="text-2xl font-bold text-[var(--text-h)]">₹{stats.totalRevenue.toLocaleString()}</div>
                    <div className="text-sm text-[var(--text)] mt-1">Total Revenue</div>
                </div>

                <div className="stat-card">
                    <div className="flex items-center justify-between mb-4">
                        <div className="stat-icon">📦</div>
                        <span className="text-2xl font-bold text-[var(--accent)]">↑ 8%</span>
                    </div>
                    <div className="text-2xl font-bold text-[var(--text-h)]">{stats.totalOrders.toLocaleString()}</div>
                    <div className="text-sm text-[var(--text)] mt-1">Total Orders</div>
                </div>

                <div className="stat-card">
                    <div className="flex items-center justify-between mb-4">
                        <div className="stat-icon">📱</div>
                        <span className="text-2xl font-bold text-[var(--accent)]">↑ 23%</span>
                    </div>
                    <div className="text-2xl font-bold text-[var(--text-h)]">{stats.totalScans.toLocaleString()}</div>
                    <div className="text-sm text-[var(--text)] mt-1">QR Scans</div>
                </div>

                <div className="stat-card">
                    <div className="flex items-center justify-between mb-4">
                        <div className="stat-icon">🍽️</div>
                        <span className="text-2xl font-bold text-[var(--accent)]">↑ 5%</span>
                    </div>
                    <div className="text-2xl font-bold text-[var(--text-h)]">{stats.activeMenus}</div>
                    <div className="text-sm text-[var(--text)] mt-1">Active Menus</div>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Revenue Trend */}
                <div className="chart-container">
                    <div className="chart-title">
                        <span>Revenue Trend</span>
                        <select className="text-sm bg-transparent border border-[var(--border)] rounded-lg px-2 py-1">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                            <option>Last 90 days</option>
                        </select>
                    </div>
                    <div style={{ height: '300px' }}>
                        <Line data={revenueData} options={chartOptions} />
                    </div>
                </div>

                {/* Orders by Category */}
                <div className="chart-container">
                    <div className="chart-title">
                        <span>Orders by Category</span>
                    </div>
                    <div style={{ height: '300px' }}>
                        <Bar data={ordersData} options={chartOptions} />
                    </div>
                </div>

                {/* Scan Activity */}
                <div className="chart-container">
                    <div className="chart-title">
                        <span>QR Scan Activity</span>
                        <span className="text-sm text-[var(--text)]">2024 Overview</span>
                    </div>
                    <div style={{ height: '300px' }}>
                        <Line data={scanData} options={chartOptions} />
                    </div>
                </div>

                {/* Order Distribution */}
                <div className="chart-container">
                    <div className="chart-title">
                        <span>Order Distribution</span>
                    </div>
                    <div style={{ height: '300px' }} className="flex items-center justify-center">
                        <Doughnut data={doughnutData} options={chartOptions} />
                    </div>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="chart-container">
                <div className="chart-title mb-4">
                    <span>Recent Orders</span>
                    <button className="text-sm text-[var(--accent)] hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { id: '#ORD-001', customer: 'John Smith', items: 3, total: 1249, status: 'Completed', time: '10 mins ago' },
                                { id: '#ORD-002', customer: 'Sarah Johnson', items: 2, total: 899, status: 'Processing', time: '25 mins ago' },
                                { id: '#ORD-003', customer: 'Mike Chen', items: 4, total: 2150, status: 'Completed', time: '1 hour ago' },
                                { id: '#ORD-004', customer: 'Emma Wilson', items: 1, total: 349, status: 'Pending', time: '2 hours ago' },
                                { id: '#ORD-005', customer: 'David Brown', items: 5, total: 2875, status: 'Completed', time: '3 hours ago' },
                            ].map((order) => (
                                <tr key={order.id}>
                                    <td className="font-mono text-sm">{order.id}</td>
                                    <td>{order.customer}</td>
                                    <td>{order.items} items</td>
                                    <td className="font-semibold">₹{order.total}</td>
                                    <td>
                                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
                      ${order.status === 'Completed' ? 'bg-green-500/10 text-green-600' :
                                                order.status === 'Processing' ? 'bg-blue-500/10 text-blue-600' :
                                                    'bg-yellow-500/10 text-yellow-600'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="text-sm text-[var(--text)]">{order.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;