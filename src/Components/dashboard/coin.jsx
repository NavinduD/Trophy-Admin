import React, { useState } from "react";
import "./CoinRedeemHistory.css";

const CoinRedeemHistory = () => {
  const [history, setHistory] = useState([
    {
      date: "2024-09-01",
      name: "John Doe",
      coins: 20,
      type: "Canteen Voucher",
      status: "Completed",
      details: "Used for lunch at the canteen.",
    },
    {
      date: "2024-09-02",
      name: "Jane Smith",
      coins: 30,
      type: "Reserved Parking",
      status: "Completed",
      details: "Reserved for event day.",
    },
    {
      date: "2024-09-03",
      name: "Alice Johnson",
      coins: 50,
      type: "Gift",
      status: "Completed",
      details: "Gifted to a colleague.",
    },
    {
      date: "2024-09-04",
      name: "Bob Brown",
      coins: 15,
      type: "Electric Vehicle Charging",
      status: "Pending",
      details: "Charging at station.",
    },
    {
      date: "2024-09-05",
      name: "Charlie Davis",
      coins: 25,
      type: "Basketball Court Reservation",
      status: "Completed",
      details: "Reserved for team practice.",
    },
    {
      date: "2024-09-06",
      name: "Diana Green",
      coins: 40,
      type: "Fitness Class Pass",
      status: "Completed",
      details: "Attended yoga class.",
    },
    {
      date: "2024-09-07",
      name: "Ethan White",
      coins: 10,
      type: "Pool Table Reservation",
      status: "Completed",
      details: "Reserved for a game night.",
    },
    {
      date: "2024-09-08",
      name: "Fiona Black",
      coins: 35,
      type: "Coffee Shop Voucher",
      status: "Completed",
      details: "Enjoyed coffee with colleagues.",
    },
    {
      date: "2024-09-09",
      name: "George Adams",
      coins: 45,
      type: "Gift",
      status: "Pending",
      details: "Gifted to a colleague.",
    },
    {
      date: "2024-09-10",
      name: "Hannah Lewis",
      coins: 55,
      type: "Canteen Voucher",
      status: "Completed",
      details: "Used for lunch at the canteen.",
    },
  ]);

  const [filters, setFilters] = useState({
    dateRange: "",
    employeeName: "",
    redemptionType: "",
  });

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredHistory = history.filter((item) => {
    return (
      (!filters.dateRange || item.date === filters.dateRange) &&
      (!filters.employeeName || item.name.includes(filters.employeeName)) &&
      (!filters.redemptionType || item.type === filters.redemptionType)
    );
  });

  const exportToCSV = () => {
    const csvData = [
      ["Date", "Employee Name", "Coins Redeemed", "Redemption Type", "Status"],
      ...filteredHistory.map((item) => [
        item.date,
        item.name,
        item.coins,
        item.type,
        item.status,
      ]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvData.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "coin_redeem_history.csv");
    document.body.appendChild(link);

    link.click();
  };

  const handleViewClick = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <div className="coin-redeem-history-page">
      <h2 className="coin-redeem-history-title">Coin Redeem History</h2>
      <div className="coin-redeem-history-summary">
        <p>
          Total Coins Redeemed:{" "}
          {filteredHistory.reduce((sum, item) => sum + item.coins, 0)}
        </p>
        <p>Total Redemption Transactions: {filteredHistory.length}</p>
      </div>

      <div className="coin-redeem-history-filters">
        <input
          type="date"
          name="dateRange"
          onChange={handleFilterChange}
          className="coin-redeem-history-filter-input"
        />
        <input
          type="text"
          name="employeeName"
          onChange={handleFilterChange}
          placeholder="Employee Name"
          className="coin-redeem-history-filter-input"
        />
        <select
          name="redemptionType"
          onChange={handleFilterChange}
          className="coin-redeem-history-filter-select"
        >
          <option value="">All Types</option>
          <option value="Canteen Voucher">Canteen Voucher</option>
          <option value="Reserved Parking">Reserved Parking</option>
          <option value="Gift">Gift</option>
          <option value="Electric Vehicle Charging">
            Electric Vehicle Charging
          </option>
          <option value="Basketball Court Reservation">
            Basketball Court Reservation
          </option>
          <option value="Fitness Class Pass">Fitness Class Pass</option>
          <option value="Pool Table Reservation">Pool Table Reservation</option>
          <option value="Coffee Shop Voucher">Coffee Shop Voucher</option>
        </select>
        <button className="coin-redeem-history-filter-button">
          Apply Filters
        </button>
      </div>

      <table className="coin-redeem-history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Employee Name</th>
            <th>Coins Redeemed</th>
            <th>Redemption Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredHistory.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.name}</td>
              <td>{item.coins}</td>
              <td>{item.type}</td>
              <td>{item.status}</td>
              <td>
                <button
                  className="coin-redeem-history-action-button"
                  onClick={() => handleViewClick(item)}
                >
                  View
                </button>
                <button className="coin-redeem-history-action-button">
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="coin-redeem-history-export-button"
        onClick={exportToCSV}
      >
        Export to CSV
      </button>

      {modalVisible && (
        <div className="coin-redeem-history-modal">
          <div className="coin-redeem-history-modal-content">
            <span
              className="coin-redeem-history-modal-close"
              onClick={closeModal}
            >
              &times;
            </span>
            <h3>Redemption Details</h3>
            <p>
              <strong>Date:</strong> {selectedItem.date}
            </p>
            <p>
              <strong>Employee Name:</strong> {selectedItem.name}
            </p>
            <p>
              <strong>Coins Redeemed:</strong> {selectedItem.coins}
            </p>
            <p>
              <strong>Redemption Type:</strong> {selectedItem.type}
            </p>
            <p>
              <strong>Status:</strong> {selectedItem.status}
            </p>
            <p>
              <strong>Details:</strong> {selectedItem.details}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinRedeemHistory;
