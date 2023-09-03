import {
  Box,
  Select,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import StatisticTable from "./StatisticTable";

const BarChartComponent = () => {
  const data = [
    {
      month: "Jan",
      case: 25,
      patient: 25,
    },
    {
      month: "Feb",
      case: 50,
      patient: 45,
    },
    {
      month: "Mar",
      case: 75,
      patient: 70,
    },
    {
      month: "Apr",
      case: 100,
      patient: 80,
    },
    {
      month: "May",
      case: 125,
      patient: 110,
    },
    {
      month: "Jun",
      case: 25,
      patient: 12,
    },
    {
      month: "Jul",
      case: 75,
      patient: 60,
    },
    {
      month: "Aug",
      case: 202,
      patient: 70,
    },
    {
      month: "Sep",
      case: 110,
      patient: 509,
    },
    {
      month: "Oct",
      case: 20,
      patient: 18,
    },
    {
      month: "Nov",
      case: 200,
      patient: 30,
    },
    {
      month: "Dec",
      case: 245,
      patient: 50,
    },
  ];
  return (
    <Box>
      <Tabs variant="enclosed">
        <TabList>
          <Box w="100%">
            <Select w="10rem" placeholder="2023">
              <option value="option1">2022</option>
              <option value="option2">2023</option>
            </Select>
          </Box>
          <Tab>Graph</Tab>
          <Tab>Table</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <BarChart width={1100} height={380} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="case" fill="#8884d8" />
              <Bar dataKey="patient" fill="#82ca9d" />
            </BarChart>
          </TabPanel>
          <TabPanel>
            <StatisticTable />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default BarChartComponent;
