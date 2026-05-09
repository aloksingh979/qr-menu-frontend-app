import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
    Plus,
    Edit2,
    Trash2,
    Save,
    X,
    Search,
    ChevronLeft,
    ChevronRight,
    Download,
} from 'lucide-react';

interface MenuItem {
    id: number;
    name: string;
    price: number;
    category: string;
    menu_id: number;
    description?: string;
    isAvailable?: boolean;
}

const API_URL = import.meta.env.VITE_API_URL;

const MenuPage = () => {
    const { restaurantId } = useParams();
    const [menu, setMenu] = useState<MenuItem[]>([]);
    const [form, setForm] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
        menu_id: 1,
    });
    const [editingId, setEditingId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const itemsPerPage = 10;

    const fetchMenu = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/menu/${restaurantId}`);
            setMenu(res.data);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Failed to load menu. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [restaurantId]);

    useEffect(() => {
        fetchMenu();
    }, [restaurantId, fetchMenu]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.name.trim() || !form.price || !form.category) {
            setError("Please fill in all required fields");
            return;
        }

        try {
            setLoading(true);
            if (editingId) {
                await axios.put(`${API_URL}/menu-item/${editingId}`, {
                    name: form.name,
                    price: Number(form.price),
                    category: form.category,
                    description: form.description,
                });
            } else {
                await axios.post(`${API_URL}/menu-item`, {
                    ...form,
                    price: Number(form.price),
                });
            }

            setForm({ name: "", price: "", category: "", description: "", menu_id: 1 });
            setEditingId(null);
            setError("");
            setShowForm(false);
            fetchMenu();
        } catch (err) {
            console.error(err);
            setError("Failed to save item. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this item?")) return;

        try {
            setLoading(true);
            await axios.delete(`${API_URL}/menu-item/${id}`);
            fetchMenu();
        } catch (err) {
            console.error(err);
            setError("Failed to delete item. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item: MenuItem) => {
        setForm({
            name: item.name,
            price: String(item.price),
            category: item.category,
            description: item.description || "",
            menu_id: item.menu_id,
        });
        setEditingId(item.id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Filter and search
    const filteredMenu = menu.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Pagination
    const totalPages = Math.ceil(filteredMenu.length / itemsPerPage);
    const paginatedMenu = filteredMenu.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const categories = ["all", ...new Set(menu.map(item => item.category))];

    // Export to CSV
    const exportToCSV = () => {
        const headers = ["Name", "Price", "Category", "Description"];
        const csvData = menu.map(item => [item.name, item.price, item.category, item.description || ""]);
        const csv = [headers, ...csvData].map(row => row.join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `menu-${restaurantId}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Menu Management</h1>
                    <p className="text-[var(--text)]">Manage your restaurant menu items</p>
                </div>
                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditingId(null);
                        setForm({ name: "", price: "", category: "", description: "", menu_id: 1 });
                    }}
                    className="btn btn-primary flex items-center gap-2"
                >
                    <Plus size={18} />
                    {showForm ? "Close Form" : "Add New Item"}
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-600 dark:text-red-400 flex items-center justify-between">
                    <span>{error}</span>
                    <button onClick={() => setError("")} className="text-red-600">
                        <X size={18} />
                    </button>
                </div>
            )}

            {/* Form Section */}
            {showForm && (
                <div className="card mb-6">
                    <h2 className="text-lg font-semibold mb-4">
                        {editingId ? "Edit Menu Item" : "Add New Menu Item"}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Item Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="e.g., Margherita Pizza"
                                className="w-full px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)] transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Price (₹) *</label>
                            <input
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                placeholder="e.g., 499"
                                className="w-full px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)] transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Category *</label>
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)] transition-colors"
                            >
                                <option value="">Select category</option>
                                <option value="Appetizers">Appetizers</option>
                                <option value="Main Course">Main Course</option>
                                <option value="Desserts">Desserts</option>
                                <option value="Beverages">Beverages</option>
                                <option value="Specials">Specials</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Item description..."
                                rows={1}
                                className="w-full px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                            />
                        </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button onClick={handleSubmit} disabled={loading} className="btn btn-primary flex items-center gap-2">
                            <Save size={18} />
                            {loading ? "Saving..." : editingId ? "Update Item" : "Add Item"}
                        </button>
                        <button
                            onClick={() => {
                                setShowForm(false);
                                setEditingId(null);
                                setForm({ name: "", price: "", category: "", description: "", menu_id: 1 });
                            }}
                            className="btn btn-secondary flex items-center gap-2"
                        >
                            <X size={18} />
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Toolbar */}
            <div className="flex flex-wrap gap-4 mb-6 justify-between items-center">
                <div className="flex flex-wrap gap-3">
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text)]" />
                        <input
                            type="text"
                            placeholder="Search items..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)] w-64"
                        />
                    </div>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)]"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat === "all" ? "All Categories" : cat}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex gap-2">
                    <button onClick={exportToCSV} className="btn btn-secondary flex items-center gap-2">
                        <Download size={18} />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Menu Table */}
            {loading && !menu.length ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[var(--accent)] border-t-transparent"></div>
                    <p className="mt-4 text-[var(--text)]">Loading menu...</p>
                </div>
            ) : paginatedMenu.length === 0 ? (
                <div className="text-center py-12 card">
                    <p className="text-[var(--text)]">No menu items found. Add your first item!</p>
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedMenu.map((item) => (
                                    <tr key={item.id}>
                                        <td className="font-medium">{item.name}</td>
                                        <td>
                                            <span className="inline-flex px-2 py-1 rounded-full text-xs bg-[var(--accent-bg)] text-[var(--accent)]">
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="font-semibold text-[var(--accent)]">₹{item.price}</td>
                                        <td className="text-sm text-[var(--text)] max-w-md truncate">
                                            {item.description || "—"}
                                        </td>
                                        <td>
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="action-btn action-btn-edit"
                                                    title="Edit item"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="action-btn action-btn-delete"
                                                    title="Delete item"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-between items-center mt-6">
                            <div className="text-sm text-[var(--text)]">
                                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                                {Math.min(currentPage * itemsPerPage, filteredMenu.length)} of {filteredMenu.length} items
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="btn btn-secondary px-3 py-1 disabled:opacity-50"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <span className="px-4 py-1 bg-[var(--accent-bg)] rounded-lg">
                                    {currentPage} / {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="btn btn-secondary px-3 py-1 disabled:opacity-50"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MenuPage;