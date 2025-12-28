import { useState, useEffect } from "react";
import axios from "axios";

interface Book {
  title: string;
  author: string;
  price: number;
  url: string; // Assuming the image URL is stored here
}

interface Order {
  _id: string;
  createdAt: string;
  status: string;
  quantity: number;
  totalPrice: number;
  book: Book;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch orders for the logged-in user
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/get-user-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data.data); // Store fetched orders in state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  // Filter orders based on search query
  const filteredOrders = orders.filter((order) =>
    order.book?.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-10">
      <h1 className="text-4xl font-bold text-purple-400 mb-8">Your Orders</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Orders by Book Title"
          className="block w-full p-3 mb-4 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 bg-white shadow-md flex flex-col items-center"
            >
              <div className="w-24 h-24 mb-4 overflow-hidden rounded-lg">
                <img
                  src={order.book?.url || "/default-book-image.png"} // Default image if none is provided
                  alt={order.book?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-zinc-800">{order.book?.title}</h3>
              <p className="text-sm text-zinc-600 mb-2">{order.book?.author}</p>
              <p className="text-sm text-zinc-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-md font-medium text-purple-500">{order.status}</p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-4">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
}
