import { useState } from "react";
import { getOrdersByCustomer, getOrderById } from "../api/orders";
import { apiErrorMessage } from "../api/client";
import { LoadingState, EmptyState } from "../components/StateBlock";
import { IconSearch } from "../components/icons";

export default function Orders() {
  const [mode, setMode] = useState("customer"); // "customer" | "order"
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [orders, setOrders] = useState([]);

  async function handleSearch(e) {
    e.preventDefault();
    if (!value.trim()) return;
    setLoading(true);
    setError("");
    setSearched(true);
    try {
      if (mode === "customer") {
        const data = await getOrdersByCustomer(value.trim());
        setOrders(data);
      } else {
        const order = await getOrderById(value.trim());
        setOrders(order ? [order] : []);
      }
    } catch (err) {
      setOrders([]);
      setError(apiErrorMessage(err, "No matching order found."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="page-header">
        <div>
          <p className="eyebrow">Care operations</p>
          <h1>Care orders</h1>
          <p className="subtitle">Look up a booking by customer ID or order ID.</p>
        </div>
      </div>

      <div className="card card-pad mt-24" style={{ marginBottom: 24 }}>
        <form onSubmit={handleSearch}>
          <div className="flex gap-12" style={{ flexWrap: "wrap", alignItems: "flex-end" }}>
            <div className="field" style={{ marginBottom: 0, minWidth: 160 }}>
              <label htmlFor="lookup-mode">Look up by</label>
              <select id="lookup-mode" value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="customer">Customer ID</option>
                <option value="order">Order ID</option>
              </select>
            </div>
            <div className="field" style={{ marginBottom: 0, flex: 1, minWidth: 220 }}>
              <label htmlFor="lookup-value">{mode === "customer" ? "Customer ID" : "Order ID"}</label>
              <input
                id="lookup-value"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={mode === "customer" ? "e.g. 8f14e45f-..." : "e.g. 3a2b9c10-..."}
              />
            </div>
            <button className="btn btn-primary" type="submit" disabled={loading}>
              <IconSearch width={15} height={15} />
              {loading ? "Searching…" : "Search"}
            </button>
          </div>
        </form>
      </div>

      {error && <div className="banner banner-error">{error}</div>}

      {loading ? (
        <LoadingState label="Searching orders…" />
      ) : !searched ? (
        <div className="table-wrap">
          <EmptyState
            title="Search for a booking"
            message="Enter a customer ID to see every booking they've made, or an order ID to jump straight to one."
          />
        </div>
      ) : orders.length === 0 && !error ? (
        <div className="table-wrap">
          <EmptyState title="No orders found" message="Double-check the ID and try again." />
        </div>
      ) : orders.length > 0 ? (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Care recipient</th>
                <th>Booking for</th>
                <th>Age / Gender</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="cell-mono">{order.id}</td>
                  <td>
                    <div className="cell-primary">{order.customer_name}</div>
                    <div className="cell-muted cell-mono">{order.customer_id}</div>
                  </td>
                  <td>{order.care_recipient_name}</td>
                  <td>{order.booking_for}</td>
                  <td className="cell-muted">
                    {order.age} · {order.gender}
                  </td>
                  <td className="cell-muted">{order.mobile_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
}
