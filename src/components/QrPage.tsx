import { QRCodeCanvas } from "qrcode.react";
import { useParams } from "react-router-dom";
import { useState } from "react";

const QrPage = () => {
    const { restaurantId } = useParams();
    const [copied, setCopied] = useState(false);

    // Use restaurantId from params or default to 1
    const menuUrl = `${import.meta.env.VITE_APP_URL || window.location.origin
        }/menu/${restaurantId || 1}`;

    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(menuUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleDownloadQR = () => {
        const canvas = document.querySelector("canvas");
        if (canvas) {
            const link = document.createElement("a");
            link.download = `qr-code-restaurant-${restaurantId || 1}.png`;
            link.href = canvas.toDataURL();
            link.click();
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Your QR Code is Ready!
                </h1>
                <p className="text-lg text-[var(--text)]">
                    Scan this code with your phone's camera to view the menu
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* QR Code Section */}
                <div className="card text-center">
                    <div className="mb-6">
                        <div className="inline-block p-4 bg-white rounded-xl shadow-lg">
                            <QRCodeCanvas
                                value={menuUrl}
                                size={250}
                                bgColor="#ffffff"
                                fgColor="#000000"
                                level="H"
                                includeMargin={true}
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={handleDownloadQR}
                            className="btn btn-primary w-full"
                        >
                            📥 Download QR Code
                        </button>
                        <p className="text-xs text-[var(--text)]">
                            Print this QR code and display it at your restaurant
                        </p>
                    </div>
                </div>

                {/* Menu URL Section */}
                <div className="card">
                    <h2 className="text-xl font-semibold mb-4">
                        Menu Link
                    </h2>
                    <p className="text-sm text-[var(--text)] mb-3">
                        Share this link directly with your customers:
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                        <input
                            type="text"
                            value={menuUrl}
                            readOnly
                            className="flex-1 px-3 py-2 bg-[var(--code-bg)] border border-[var(--border)] rounded-lg text-sm font-mono"
                        />
                        <button
                            onClick={handleCopyUrl}
                            className="btn btn-secondary whitespace-nowrap"
                        >
                            {copied ? "✅ Copied!" : "📋 Copy"}
                        </button>
                    </div>

                    <div className="pt-4 border-t border-[var(--border)]">
                        <h3 className="font-medium mb-2">Quick Actions</h3>
                        <div className="flex flex-col gap-2">
                            <a
                                href={menuUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline text-center"
                            >
                                🔗 Open Menu in Browser
                            </a>
                            <button
                                onClick={() => {
                                    if (window.navigator.share) {
                                        window.navigator.share({
                                            title: "Restaurant Menu",
                                            text: "Check out our digital menu!",
                                            url: menuUrl,
                                        });
                                    } else {
                                        handleCopyUrl();
                                    }
                                }}
                                className="btn btn-outline"
                            >
                                📱 Share Menu
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tips Section */}
            <div className="mt-12 card">
                <h3 className="font-semibold mb-3">💡 Pro Tips</h3>
                <ul className="space-y-2 text-sm text-[var(--text)]">
                    <li>• Place QR codes on tables, at the entrance, or on takeout bags</li>
                    <li>• Update your menu anytime - changes will reflect immediately</li>
                    <li>• Track scan analytics to see which items are most popular</li>
                    <li>• Add special offers or discounts visible only through the QR code</li>
                </ul>
            </div>

            {/* Back Button */}
            <div className="mt-8 text-center">
                <a href="/" className="text-[var(--accent)] hover:underline">
                    ← Back to Home
                </a>
            </div>
        </div>
    );
};

export default QrPage;  