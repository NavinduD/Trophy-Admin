import React from 'react';
import { Typography } from '@mui/material';
import "./dashboardScreen.css";
import { LineChart } from "@mui/x-charts/LineChart";
import SellerChart from "./chart";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PieChart } from "@mui/x-charts/PieChart";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

const DashboardContent = () => {
  return (
    <dev className="dashboardContainer">
      <div className="item1 gridBG">
        <span className="ecTitle">Empolyee Count</span>
        <span className="ecCount">300</span>
      </div>

      <div className="item2 gridBG">
        <div className="ecTitle">Coin Redeems</div>
        <div className="chart">
          <SellerChart />
        </div>
      </div>
      <div className="item3 gridBG">
        <div className="i3">
          <span className="ecTitle">Notifications</span>
          <NotificationsActiveIcon sx={{ color: "#fa9b46" }} />
        </div>
        <span className="hintTxt">No notifications</span>
      </div>
      <div className="item4 gridBG">
        <span className="ecTitle">Total Coins Distributed</span>
        <span className="ecCount">300</span>
      </div>
      <div className="item5 gridBG">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <span className="ecTitle">Event Calender</span>
          <DateCalendar />
        </LocalizationProvider>
      </div>
      <div className="item6 gridBG">
        <div className="ecTitle">Customer Satisfaction Insight</div>
        <div className="pieChart">
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "Very Satisfied" },
                  { id: 1, value: 15, label: "Satisfied" },
                  { id: 2, value: 20, label: "Neutral" },
                  { id: 3, value: 8, label: "Dissatisfied" },
                  { id: 4, value: 2, label: "Very Dissatisfied" },
                ],
              },
            ]}
            slotProps={{
              legend: {
                labelStyle: {
                  fontSize: 12,
                },
                itemMarkWidth: 13,
                itemMarkHeight: 8,
                markGap: 7,
                itemGap: 5,
              },
            }}
          />
        </div>
      </div>
      <div className="item7 gridBG item78">
        <span className="ecTitle">Add a Employee</span>
        <div className="btn">
          <ControlPointIcon sx={{ fontSize: 100, color: "#fa9b46" }} />
        </div>
      </div>
      <div className="item8 gridBG item78">
        <span className="ecTitle">Add a Event</span>
        <div className="btn">
          <ControlPointIcon sx={{ fontSize: 100, color: "#fa9b46" }} />
        </div>
      </div>
    </dev>
  );
};

export default DashboardContent;
