import React from "react";
import { PieChart, Pie, Tooltip, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight, Package, Users, DollarSign, WarehouseIcon as Inventory } from 'lucide-react';

const pieData = [
  { name: "Pending", value: 40 },
  { name: "Shipped", value: 30 },
  { name: "Delivered", value: 20 },
  { name: "Canceled", value: 10 },
];
const pieColors = ["#4338ca", "#3b82f6", "#22c55e", "#ef4444"];

const lineData = [
  { month: "Jan", sales: 4000, traffic: 2400 },
  { month: "Feb", sales: 3000, traffic: 1398 },
  { month: "Mar", sales: 2000, traffic: 9800 },
  { month: "Apr", sales: 2780, traffic: 3908 },
  { month: "May", sales: 1890, traffic: 4800 },
  { month: "Jun", sales: 2390, traffic: 3800 },
  { month: "Jul", sales: 3490, traffic: 4300 },
];

const kpiData = [
  { label: "Total Sales", value: "$5,000", icon: DollarSign, change: 12.5 },
  { label: "Total Orders", value: "200", icon: Package, change: -5.0 },
  { label: "Active Users", value: "120", icon: Users, change: 8.2 },
  { label: "Inventory Value", value: "$20,000", icon: Inventory, change: 3.1 },
];

const recentOrders = [
  { id: 1, customer: "John Doe", date: "2024-12-01", status: "Pending", total: "$150" },
  { id: 2, customer: "Jane Smith", date: "2024-12-02", status: "Shipped", total: "$200" },
  { id: 3, customer: "Mike Johnson", date: "2024-12-03", status: "Delivered", total: "$75" },
  { id: 4, customer: "Emily Davis", date: "2024-12-04", status: "Canceled", total: "$50" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pie Chart */}
          <ChartCard title="Order Status Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Line Chart */}
          <ChartCard title="Sales and Traffic Trends">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#4338ca" strokeWidth={2} />
                <Line type="monotone" dataKey="traffic" stroke="#22c55e" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">Recent Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">#{order.id}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">{order.customer}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">{order.date}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const KPICard = ({ label, value, icon: Icon, change }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="text-gray-500">{label}</div>
      <Icon className="text-gray-400" size={24} />
    </div>
    <div className="text-3xl font-bold text-gray-800 mb-2">{value}</div>
    <div className={`flex items-center text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
      {change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
      <span className="ml-1">{Math.abs(change)}%</span>
      <span className="ml-1 text-gray-500">vs last month</span>
    </div>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h3 className="text-xl font-semibold mb-6 text-gray-800">{title}</h3>
    {children}
  </div>
);

const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'canceled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

export default Dashboard;

