import { Box, Container, useDisclosure } from "@chakra-ui/react";
import "../Style/App.css";
import { useEffect, useState } from "react";
import CustomTablePaginate from "../Components/CustomTablePaginate";
import useAuth from "../Hooks/AuthContext";
import { GetRequest } from "../API/api";
import { Hospital } from "../API/Paths";
import NewHospital from "../Components/NewHospital";

const Hospitals = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hospitals, setHospitals] = useState([]);
  const Title = "Hospital";
  const [fetch, setFetch] = useState(true);
  const { search, setSearch } = useAuth();

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "NAME",
      accessor: "name",
    },
    {
      Header: "STREET",
      accessor: "street",
    },
    {
      Header: "BARANGAY",
      accessor: "barangay",
    },
    {
      Header: "CITY",
      accessor: "city",
    },
    {
      Header: "ACTION",
      accessor: "action",
    },
  ];

  const handleFetchHospital = () => {
    GetRequest({ url: Hospital })
      .then((res) => res.data)
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        const { data } = res;

        setHospitals(data);
      })
      .catch((err) => {
        const { status, message } = err;

        switch (status) {
          case 400:
            console.log(message);
            break;
          case 404:
            console.log("No record Found.");
            break;
          default:
            console.log(message);
            break;
        }
      });
  };

  const filtered = hospitals.filter((filter) =>
    filter.hospital_Name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        if (fetch) {
          setFetch(false);
        }

        handleFetchHospital();
      },
      fetch ? 0 : 50000
    );

    return () => clearInterval(intervalId);
  }, [fetch]);

  return (
    <>
      <Container maxW={"container.xxl"}>
        <Box mt={[5, 5, 8, 5]} p={[0, 0, 3, 10]}>
          <CustomTablePaginate
            title={Title}
            columns={columns}
            data={filtered}
            fetch={setFetch}
            search={search}
            setSearch={setSearch}
            onOpen={onOpen}
            isModal={true}
          />
        </Box>
      </Container>
      <NewHospital isOpen={isOpen} onClose={onClose} fetch={setFetch} />
    </>
  );
};

export default Hospitals;
