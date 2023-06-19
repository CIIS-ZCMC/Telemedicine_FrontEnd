import { useState, useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";
import CustomTablePaginate from "../Components/CustomTablePaginate";
import { Log } from "../API/Paths";
import { GetRequest } from "../API/api";

const HistoryLogs = () => {
  const [search, setSearch] = useState("");
  const [logs, setLogs] = useState([]);
  const [fetch, setFetch] = useState(true);

  const Title = "History Logs";

  const handleFetchLogs = async () => {
    GetRequest({ url: Log })
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        setLogs(res.dat.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setFetch(false);
    handleFetchLogs();
  }, [fetch]);

  const columns = [
    {
      Header: "ID",
      accessor: "PK_logs_ID",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Table Name",
      accessor: "table_Name",
    },
    {
      Header: "Request Type",
      accessor: "method_type",
    },
    {
      Header: "Status",
      accessor: "status",
    },
  ];

  return (
    <>
      <Container maxW={"container.xxl"}>
        <Box mt={[5, 5, 8, 5]} p={[0, 0, 3, 10]}>
          <CustomTablePaginate
            title={Title}
            columns={columns}
            data={logs}
            search={search}
            setSearch={setSearch}
            isModal={true}
          />
        </Box>
      </Container>
    </>
  );
};

export default HistoryLogs;
