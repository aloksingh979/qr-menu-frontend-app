import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
    LayoutDashboard,
    Utensils,
    QrCode,
    Menu,
    X,
    LogOut,
    Settings,
    Bell,
    User,
} from 'lucide-react';

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { path: "/menu/1", icon: Utensils, label: "Menu Manager" },
        { path: "/generate", icon: QrCode, label: "QR Generator" },
    ];

    const isActive = (path: string) => location.pathname === path ||
        (path === "/menu/1" && location.pathname.startsWith("/menu/"));

    return (
        <div className="app-container">
            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">Q</span>
                        </div>
                        <span className="font-semibold text-[var(--text-h)] text-lg">QR Menu</span>
                    </div>

                    <nav className="space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive(item.path)
                                    ? "bg-[var(--accent-bg)] text-[var(--accent)]"
                                    : "text-[var(--text)] hover:bg-[var(--code-bg)]"
                                    }`}
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="border-t border-[var(--border)] pt-4">
                            <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text)] hover:bg-[var(--code-bg)] w-full transition-all">
                                <Settings size={20} />
                                <span>Settings</span>
                            </button>
                            <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-500/10 w-full transition-all">
                                <LogOut size={20} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="main-content">
                {/* Top Bar */}
                <header className="app-header">
                    <div className="flex items-center justify-between px-6 py-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-[var(--code-bg)]"
                        >
                            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>

                        <div className="flex items-center gap-4 ml-auto">
                            <button className="p-2 rounded-lg hover:bg-[var(--code-bg)] relative">
                                <Bell size={20} />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center">
                                    <User size={16} className="text-white" />
                                </div>
                                <div className="hidden md:block">
                                    <div className="text-sm font-medium">Admin User</div>
                                    <div className="text-xs text-[var(--text)]">Restaurant Owner</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main>{children}</main>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default AppLayout;