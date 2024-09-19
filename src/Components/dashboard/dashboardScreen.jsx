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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(Rank, Name, Redeems, Department, Email_Address) {
  return { Rank, Name, Redeems, Department, Email_Address };
}

const rows = [
  createData(
    1,
    "Daniel Foster",
    5159,
    "Finance",
    "daniel.foster@finance.company.com"
  ),
  createData(
    2,
    "Henry Lawson",
    4237,
    "Sales",
    "henry.lawson@sales.company.com"
  ),
  createData(
    3,
    "James Mitchell",
    3262,
    "Operations",
    "james.mitchell@operations.company.com"
  ),
  createData(
    4,
    "Sophia Reynolds",
    3105,
    "HR",
    "sophia.reynolds@hr.company.com"
  ),
  createData(
    5,
    "Emma Richardson",
    3056,
    "Administration",
    "emma.richardson@hr.company.com"
  ),
];

const DashboardContent = () => {
  return (
    <div className="dashboardContainer">
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
      <div className="item9 gridBG">
        <span className="ecTitle">Top Empolyees</span>
        <div className="table">
          <TableContainer>
            <Table sx={{ minWidth: "100%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Rank</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Redeems</TableCell>
                  <TableCell align="center">Department</TableCell>
                  <TableCell align="center">Email Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.Rank}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.Rank}
                    </TableCell>
                    <TableCell align="center">{row.Name}</TableCell>
                    <TableCell align="center">{row.Redeems}</TableCell>
                    <TableCell align="center">{row.Department}</TableCell>
                    <TableCell align="center">{row.Email_Address}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
