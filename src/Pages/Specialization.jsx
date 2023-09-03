import { useEffect, useCallback } from "react";
import { useState } from "react";
import { Box, Container, useDisclosure } from "@chakra-ui/react";
import CustomTablePaginate from "../Components/CustomTablePaginate";
import { GetRequest } from "../API/api";
import { Specialization } from "../API/Paths";
import useAuth from "../Hooks/AuthContext";
import NewSpecialization from "../Components/NewSpecialization";

const Specializations = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fetch, setFetch] = useState(true);
  const [specializations, setSpecializations] = useState([]);
  const { search, setSearch } = useAuth();

  const handleFetchSpecialization = useCallback(async () => {
    try {
      const res = await GetRequest({ url: Specialization });
      if (res.statusText !== "OK") {
        throw new Error("Bad response.", { cause: res });
      }
      const { data } = res;
      if (data.length === specializations.length) {
        return;
      }
      setSpecializations(data);
    } catch (err) {
      console.log(err);
    }
  }, [specializations]);

  const filtered = specializations.filter(
    (filter) =>
      filter.title.toLowerCase().includes(search.toLowerCase()) ||
      filter.description.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (fetch) {
        setFetch(false);
      }
      handleFetchSpecialization();
    }, [fetch ? 0 : 40000]);

    return () => clearInterval(intervalId);
  }, [fetch, handleFetchSpecialization]);

  const Title = "Specialization";

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "SPECIALIZATION",
      accessor: "title",
    },
    {
      Header: "DOCTORS",
      accessor: "doctors",
    },
    {
      Header: "ACTIVE",
      accessor: "spestatus",
    },
    {
      Header: "ACTION",
      accessor: "action",
    },
  ];

  return (
    <>
      <Container maxW={"container.xxl"}>
        <Box mt={[5, 5, 8, 5]} p={[0, 0, 3, 10]}>
          <CustomTablePaginate
            title={Title}
            columns={columns}
            fetch={setFetch}
            data={filtered}
            search={search}
            setSearch={setSearch}
            isModal={true}
            onOpen={onOpen}
          />
        </Box>
      </Container>
      <NewSpecialization isOpen={isOpen} onClose={onClose} fetch={setFetch} />
    </>
  );
};

export default Specializations;
