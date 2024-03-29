import "./logs.scss";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { Circle } from "@mui/icons-material";
import { LogsTable } from "../../components/logs/LogsTable";
import { RealTime } from "../../components/logs/RealTime";
import { Review } from "../../components/logs/Review";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Logs = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Log" {...a11yProps(0)} />
          <Tab label="Real-Time-Monitaling" {...a11yProps(1)} />
          <Tab label="review" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <LogsTable />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <RealTime />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Review />
      </CustomTabPanel>
    </div>
  );
};

export default Logs;
