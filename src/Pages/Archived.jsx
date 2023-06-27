import { Box, Container } from "@chakra-ui/react";
import CustomTablePaginate from "../Components/CustomTablePaginate";
import { useState, useEffect } from "react";
import useAuth from "../Hooks/AuthContext";
import { GetRequest } from "../API/api";
import { Case } from "../API/Paths";

const Archived = () => {
  const [fetch, setFetch] = useState(true);
  const [cases, setCases] = useState([]);
  const { search, setSearch } = useAuth();
  const Title = "Archived Case";
  const handleClick = () => {};

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Case #",
      accessor: "case_number",
    },
    {
      Header: "PATIENTS",
      accessor: "patient",
    },
    {
      Header: "Hospital",
      accessor: "hospital_Name",
    },
    {
      Header: "GENDER",
      accessor: "sex",
    },
    {
      Header: "STATUS",
      accessor: "case_status",
    },
    {
      Header: "ACTION",
      accessor: "action",
    },
  ];

  const handleFetch = () => {
    GetRequest({ url: `${Case}/archived` })
      .then((res) => res.data)
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad response.", { cause: res });
        }
        const { data } = res;

        if (JSON.parse(localStorage.getItem("archived")) !== null) {
          const items = JSON.parse(localStorage.getItem("archived"));
          const newData = data;

          if (items.length === newData.length) {
            return;
          }
        }

        localStorage.setItem("archived", JSON.stringify(data));
        setCases(data);
      })
      .catch((err) => {
        switch (err) {
          case 400:
            console.log("Process can't complete. try again later.");
            break;
          case 401:
            console.log("Un-Authorized.");
            break;
          case 404:
            console.log("No record found.");
            break;
          default:
            console.log("Can't process right now. try again later.");
            break;
        }
      });
  };

  useEffect(() => {
    if (fetch && localStorage.getItem("archived") !== null) {
      setCases(JSON.parse(localStorage.getItem("archived")));
    }

    const intervalId = setInterval(
      () => {
        if (fetch) {
          setFetch(false);
        }
        handleFetch();
      },
      fetch ? 0 : 30000
    );

    return () => clearInterval(intervalId);
  }, [fetch]);

  return (
    <>
      <Container maxW={"container.xxl"}>
        <Box mt={[5, 5, 8, 5]} p={[0, 0, 3, 5]}>
          <CustomTablePaginate
            title={Title}
            columns={columns}
            data={cases}
            fetch={setFetch}
            search={search}
            handleClick={handleClick}
            setSearch={setSearch}
          />
        </Box>
      </Container>
    </>
  );
};

export default Archived;
