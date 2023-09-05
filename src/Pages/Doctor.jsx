import { Box, Container, useDisclosure } from "@chakra-ui/react";
import "../Style/App.css";
import { useState, useMemo, useEffect } from "react";
import CustomTablePaginate from "../Components/CustomTablePaginate";
import useAuth from "../Hooks/AuthContext";
import { GetRequest } from "../Services/api";
import { Specialization, Doctor } from "../Services/Paths";
import NewDoctor from "../Components/NewDoctor";

const Doctors = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fetch, setFetch] = useState(false);

  const [SpecializationData, setSpecializationData] = useState([]);
  const hospitalData = useState([]);
  const users = useState([]);
  const [doctor, setDoctor] = useState([]);
  const { search, setSearch } = useAuth();

  const handleFetchDoctor = async () => {
    GetRequest({ url: Doctor })
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad response.", { cause: res });
        }
        setDoctor(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const serviceTypeData = async () => {
    GetRequest({ url: Specialization })
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        setSpecializationData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filtered = doctor.filter(
    (filter) =>
      filter.profile_LastName.toLowerCase().includes(search.toLowerCase()) ||
      filter.profile_FirstName.toLowerCase().includes(search.toLowerCase()) ||
      filter.email.toLowerCase().includes(search.toLowerCase()) ||
      filter.hospitals.toLowerCase().includes(search.toLowerCase())
  );

  //check if theres a changes. then update the data
  useEffect(() => {
    serviceTypeData();
    handleFetchDoctor();
    setFetch(false);
  }, [fetch]);

  const column = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "PROFILE",
        accessor: "profile",
      },
      {
        Header: "FIRST NAME",
        accessor: "profile_FirstName",
      },
      {
        Header: "LAST NAME",
        accessor: "profile_LastName",
      },
      {
        Header: "POSITION",
        accessor: "profile_position",
      },
      {
        Header: "EMAIL",
        accessor: "email",
      },
      {
        Header: "HOSPITAL",
        accessor: "hospitals",
      },
      {
        Header: "STATUS",
        accessor: "status",
      },
      {
        Header: "ACTION",
        accessor: "action",
      },
    ],
    []
  );

  return (
    <>
      <Container maxW={"container.xxl"}>
        <Box mt={5} p={[0, 0, 2, 3]}>
          <CustomTablePaginate
            title={"Navigator"}
            columns={column}
            data={filtered}
            SpecializationData={SpecializationData}
            hospitalData={hospitalData}
            fetch={setFetch}
            search={search}
            setSearch={setSearch}
            onOpen={onOpen}
            isModal={true}
          />
        </Box>
      </Container>
      <NewDoctor
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        fetch={setFetch}
        users={users}
        isModal={true}
      />
    </>
  );
};

export default Doctors;
