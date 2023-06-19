import { Box, Container, useDisclosure } from "@chakra-ui/react";
import "../Style/App.css";
import { useState, useEffect } from "react";
import CustomTablePaginate from "../Components/CustomTablePaginate";
import useAuth from "../Hooks/AuthContext";
import { GetRequest } from "../API/api";
import { Specialization, User } from "../API/Paths";
import NewUser from "../Components/NewUser";

const Users = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [SpecializationData, setSpecializationData] = useState([]);
  const [users, setUsers] = useState([]);
  const [fetch, setFetch] = useState(false);
  const { search, setSearch } = useAuth();

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "PROFILE",
      accessor: "profile",
    },
    {
      Header: "NAME",
      accessor: "fullname",
    },
    {
      Header: "EMAIL",
      accessor: "email",
    },
    {
      Header: "ROLE",
      accessor: "role",
    },
    {
      Header: "STATUS",
      accessor: "status",
    },
    {
      Header: "ACTION",
      accessor: "action",
    },
  ];

  const handleFetchUser = async () => {
    GetRequest({ url: `${User}s` })
      .then((res) => res.data)
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
        const { status } = err;
        switch (status) {
          case 400:
            console.log("Can't complete request. try again later.");
            break;
          case 404:
            console.log("No record.");
            break;
          default:
            console.log("Can't process request. try again later.");
            break;
        }
      });
  };

  const serviceTypeData = async () => {
    GetRequest({ url: Specialization })
      .then((res) => res.data)
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

  const userJSONData = users.filter((filter) =>
    filter.fullname.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    serviceTypeData();
    handleFetchUser();
    setFetch(false);
  }, [fetch]);

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        if (fetch) {
          setFetch(false);
        }
        handleFetchUser();
      },
      fetch ? 0 : 30000
    );

    return () => clearInterval(intervalId);
  }, [fetch]);

  return (
    <>
      <Container maxW={"container.xxl"}>
        <Box mt={5} p={[0, 0, 2, 3]}>
          <CustomTablePaginate
            title={"Admin Doctor"}
            columns={columns}
            data={userJSONData}
            search={search}
            setSearch={setSearch}
            onOpen={onOpen}
            isModal={true}
          />
        </Box>
      </Container>

      <NewUser
        fetch={fetch}
        SpecializationData={SpecializationData}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default Users;
