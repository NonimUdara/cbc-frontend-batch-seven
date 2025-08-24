export default function AdminAddnewProduct() {
    return (
        <div className="w-full h-full p-6 bg-primary min-h-screen flex justify-center">
            <div className="w-full max-w-7xl bg-white rounded-2xl shadow-xl p-4">
                <h1 className="text-2xl font-bold text-secondary mb-6">Add New Product</h1>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            placeholder="Enter product name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            placeholder="Enter product price"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Labeled Price</label>
                        <input
                            type="number"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            placeholder="Enter labeled price"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            placeholder="Enter product category"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            placeholder="Enter image URL"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-dark transition duration-300"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
}