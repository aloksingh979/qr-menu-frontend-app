import { Link } from "react-router-dom";
import { useState } from "react";

const LandingPage = () => {
    const [restaurantName, setRestaurantName] = useState("");

    const features = [
        {
            icon: "📝",
            title: "Easy Menu Management",
            description: "Add, edit, and organize your menu items with categories, descriptions, and pricing."
        },
        {
            icon: "📱",
            title: "QR Code Generation",
            description: "Generate QR codes that link directly to your digital menu. Download and print instantly."
        },
        {
            icon: "📊",
            title: "Analytics Dashboard",
            description: "Track scans, popular items, and customer engagement in real-time."
        },
        {
            icon: "🔄",
            title: "Real-time Updates",
            description: "Update your menu instantly and changes reflect immediately for customers."
        },
        {
            icon: "🌍",
            title: "Multi-language Support",
            description: "Reach more customers with automatic translation capabilities."
        },
        {
            icon: "💳",
            title: "Payment Integration",
            description: "Accept payments directly through your digital menu with ease."
        }
    ];

    const handleGenerateQR = () => {
        if (restaurantName) {
            // Navigate to QR generation page
            window.location.href = `/generate`;
        }
    };

    return (
        <div className="animate-fadeInUp">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-[var(--accent-bg)] text-[var(--accent)] px-4 py-2 rounded-full text-sm mb-6">
                        <span className="font-medium">✨ New Feature</span>
                        <span>Analytics Dashboard Now Available</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[var(--text-h)] to-[var(--accent)] bg-clip-text text-transparent">
                        Create Digital Menus with QR Codes
                    </h1>

                    <p className="text-xl text-[var(--text)] mb-8 max-w-2xl mx-auto">
                        Transform your restaurant's menu into a digital experience.
                        Generate QR codes that customers can scan to view your menu on their phones.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <Link to="/generate" className="btn btn-primary text-lg px-8 py-3">
                            Generate QR Code
                        </Link>
                        <Link to="/menu/1" className="btn btn-secondary text-lg px-8 py-3">
                            View Demo Menu
                        </Link>
                    </div>

                    <div className="bg-[var(--code-bg)] rounded-lg p-4 max-w-md mx-auto">
                        <p className="text-sm text-[var(--text)] mb-2">Try it now - Example QR Code</p>
                        <div className="flex items-center justify-center gap-2">
                            <input
                                type="text"
                                placeholder="Enter restaurant name"
                                value={restaurantName}
                                onChange={(e) => setRestaurantName(e.target.value)}
                                className="flex-1 px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)]"
                            />
                            <button
                                onClick={handleGenerateQR}
                                className="btn btn-primary"
                            >
                                Generate
                            </button>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--accent)]/10 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl -z-10" />
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 border-t border-[var(--border)]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Everything you need to digitize your menu
                        </h2>
                        <p className="text-lg text-[var(--text)]">
                            Powerful features to help you manage your restaurant efficiently
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="card text-left group">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="font-semibold text-[var(--text-h)] mb-2 text-lg">
                                    {feature.title}
                                </h3>
                                <p className="text-[var(--text)] text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-4 bg-[var(--code-bg)]">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[var(--accent)] mb-2">10K+</div>
                            <div className="text-sm text-[var(--text)]">Restaurants</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[var(--accent)] mb-2">1M+</div>
                            <div className="text-sm text-[var(--text)]">QR Scans</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[var(--accent)] mb-2">99.9%</div>
                            <div className="text-sm text-[var(--text)]">Uptime</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[var(--accent)] mb-2">24/7</div>
                            <div className="text-sm text-[var(--text)]">Support</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="card">
                        <h2 className="text-3xl font-bold mb-4">
                            Ready to digitize your restaurant?
                        </h2>
                        <p className="text-lg text-[var(--text)] mb-6">
                            Join thousands of restaurants already using QR Menu SaaS
                        </p>
                        <Link to="/generate" className="btn btn-primary text-lg px-8 py-3">
                            Start Free Trial
                        </Link>
                        <p className="text-xs text-[var(--text)] mt-4">
                            No credit card required · Free 14-day trial
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;