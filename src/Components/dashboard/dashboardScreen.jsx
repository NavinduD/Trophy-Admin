import React from 'react';
import { Typography } from '@mui/material';
import "./dashboardScreen.css";
import { LineChart } from "@mui/x-charts/LineChart";

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
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
          />
        </div>
      </div>
      <div className="item3 gridBG"></div>
      <div className="item4 gridBG">
        <span className="ecTitle">Total Coins Distributed</span>
        <span className="ecCount">300</span>
      </div>
    </dev>
  );
};

export default DashboardContent;
