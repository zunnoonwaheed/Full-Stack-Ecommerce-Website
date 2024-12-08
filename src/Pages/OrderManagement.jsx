import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { 
  Package, 
  ShoppingCart, 
  Truck, 
  CheckCircle2 
} from 'lucide-react';
import './OrderManagement.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    { 
      id: 1, 
      status: 'Pending', 
      customer: 'John Doe', 
      amount: '$100', 
      email: 'john.doe@example.com' 
    },
    { 
      id: 2, 
      status: 'Shipped', 
      customer: 'Jane Smith', 
      amount: '$200', 
      email: 'jane.smith@example.com' 
    },
    { 
      id: 3, 
      status: 'Delivered', 
      customer: 'Sam Wilson', 
      amount: '$150', 
      email: 'sam.wilson@example.com' 
    },
    { 
      id: 4, 
      status: 'Pending', 
      customer: 'Lucy Brown', 
      amount: '$250', 
      email: 'lucy.brown@example.com' 
    },
    { 
      id: 5, 
      status: 'Shipped', 
      customer: 'Mike White', 
      amount: '$120', 
      email: 'mike.white@example.com' 
    },
  ]);

  const [filter, setFilter] = useState({ status: 'All', customer: '', amount: '' });
  const [loading, setLoading] = useState(false);

  const handleFilterChange = (e, type) => {
    const value = e.target.value;
    setFilter(prevFilter => ({
      ...prevFilter,
      [type]: value,
    }));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const filteredOrders = orders.filter((order) => {
    return (
      (filter.status === 'All' || order.status === filter.status) &&
      order.customer.toLowerCase().includes(filter.customer.toLowerCase()) &&
      order.amount.includes(filter.amount)
    );
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending':
        return <ShoppingCart className={`status-icon pending`} />;
      case 'Shipped':
        return <Truck className={`status-icon shipped`} />;
      case 'Delivered':
        return <CheckCircle2 className={`status-icon delivered`} />;
      default:
        return <Package className={`status-icon`} />;
    }
  };

  return (
    <div className="order-management-enhanced">
      <aside className="sidebar-enhanced">
        <div className="sidebar-header">
          <h2>Order Filters</h2>
        </div>
        <div className="filter-section">
          <label htmlFor="status-filter">Order Status</label>
          <select
            id="status-filter"
            className="filter-select"
            onChange={(e) => handleFilterChange(e, 'status')}
            value={filter.status}
          >
            <option value="All">All Orders</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        <div className="filter-section">
          <label htmlFor="customer-filter">Customer Name</label>
          <input
            id="customer-filter"
            type="text"
            className="filter-input"
            value={filter.customer}
            onChange={(e) => handleFilterChange(e, 'customer')}
            placeholder="Search customer"
          />
        </div>
        <div className="filter-section">
          <label htmlFor="amount-filter">Order Amount</label>
          <input
            id="amount-filter"
            type="text"
            className="filter-input"
            value={filter.amount}
            onChange={(e) => handleFilterChange(e, 'amount')}
            placeholder="Search by amount"
          />
        </div>
      </aside>

      <main className="main-content-enhanced">
        <div className="orders-header">
          <h1>Order Management</h1>
          <Package size={32} />
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="orders-grid">
            {filteredOrders.map((order) => (
              <animated.div
                key={order.id}
                className={`order-card ${order.status.toLowerCase()}`}
                style={useSpring({ 
                  opacity: 1, 
                  transform: 'translateY(0px)', 
                  from: { opacity: 0, transform: 'translateY(20px)' }, 
                  delay: 200 
                })}
              >
                <div className="order-card-header">
                  <span className="order-number">Order #{order.id}</span>
                  <div className="order-status-icon">
                    {getStatusIcon(order.status)}
                    <span className={`order-status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="order-card-body">
                  <div className="order-customer">
                    <h3>{order.customer}</h3>
                    <p>{order.email}</p>
                  </div>
                  <div className="order-details">
                    <div className="order-amount">{order.amount}</div>
                  </div>
                </div>
              </animated.div>
            ))}
          </div>
        ) : (
          <p className="no-orders-message">No orders found for the selected filters.</p>
        )}
      </main>
    </div>
  );
};

export default OrderManagement;