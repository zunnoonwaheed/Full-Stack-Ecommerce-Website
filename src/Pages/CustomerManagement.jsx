import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Search, Mail, MapPin, ShoppingBag, MessageCircle } from 'lucide-react';
import './CustomerManagement.css';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      profilePicture: 'https://i.pravatar.cc/150?img=1',
      address: '123 Main St, Cityville',
      purchaseHistory: [
        { product: 'Laptop', date: '2024-01-15', amount: '$1200' },
        { product: 'Smartphone', date: '2024-03-12', amount: '$800' }
      ],
      queries: [
        { query: 'My order is delayed.', status: 'Open' },
        { query: 'Product damaged on arrival.', status: 'Closed' }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      profilePicture: 'https://i.pravatar.cc/150?img=2',
      address: '456 Oak St, Townsville',
      purchaseHistory: [
        { product: 'Headphones', date: '2024-02-20', amount: '$200' },
        { product: 'Smartwatch', date: '2024-04-05', amount: '$300' }
      ],
      queries: [
        { query: 'Received wrong product.', status: 'Open' }
      ]
    }
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 800 }
  });

  const handleRespondToQuery = (customerId, queryIndex, response) => {
    const updatedCustomers = customers.map(customer => {
      if (customer.id === customerId) {
        const updatedQueries = [...customer.queries];
        updatedQueries[queryIndex] = {
          ...updatedQueries[queryIndex],
          status: 'Resolved',
          response: response
        };
        return { ...customer, queries: updatedQueries };
      }
      return customer;
    });
    setCustomers(updatedCustomers);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <animated.div style={fadeIn} className="customer-management-container">
      <header className="header">
        <h1>Customer Management</h1>
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="content-wrapper">
        <aside className="customer-list">
          <h2>Customers</h2>
          <div className="customer-cards">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className={`customer-card ${selectedCustomer?.id === customer.id ? 'selected' : ''}`}
                onClick={() => setSelectedCustomer(customer)}
              >
                <img
                  src={customer.profilePicture}
                  alt={`${customer.name}'s profile`}
                  className="profile-picture"
                />
                <div className="customer-card-details">
                  <h3>{customer.name}</h3>
                  <p>{customer.email}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="customer-details-container">
          {selectedCustomer ? (
            <>
              <section className="customer-info">
                <img
                  src={selectedCustomer.profilePicture}
                  alt={`${selectedCustomer.name}'s profile`}
                  className="profile-picture-large"
                />
                <div className="customer-info-details">
                  <h2>{selectedCustomer.name}</h2>
                  <p><Mail size={16} /> {selectedCustomer.email}</p>
                  <p><MapPin size={16} /> {selectedCustomer.address}</p>
                </div>
              </section>

              <section className="purchase-history">
                <h3><ShoppingBag size={20} /> Purchase History</h3>
                <ul>
                  {selectedCustomer.purchaseHistory.map((purchase, index) => (
                    <li key={index} className="purchase-item">
                      <span className="purchase-product">{purchase.product}</span>
                      <span className="purchase-date">{purchase.date}</span>
                      <span className="purchase-amount">{purchase.amount}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="customer-queries">
                <h3><MessageCircle size={20} /> Customer Support Queries</h3>
                <ul className="queries-list">
                  {selectedCustomer.queries.map((query, index) => (
                    <li key={index} className={`query-item ${query.status.toLowerCase()}`}>
                      <p className="query-text">{query.query}</p>
                      <p className="query-status">Status: {query.status}</p>
                      {query.status === 'Open' && (
                        <div className="query-response">
                          <textarea
                            placeholder="Respond to the query"
                            onBlur={(e) =>
                              handleRespondToQuery(selectedCustomer.id, index, e.target.value)
                            }
                          />
                          <button onClick={() => handleRespondToQuery(selectedCustomer.id, index, 'Resolved')}>
                            Mark as Resolved
                          </button>
                        </div>
                      )}
                      {query.status === 'Resolved' && query.response && (
                        <p className="query-response-text">Response: {query.response}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            </>
          ) : (
            <div className="no-customer-selected">
              <h2>Select a customer to view details</h2>
            </div>
          )}
        </main>
      </div>
    </animated.div>
  );
};

export default CustomerManagement;

