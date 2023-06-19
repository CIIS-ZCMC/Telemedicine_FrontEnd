import { Box, Container, useDisclosure } from "@chakra-ui/react";
import CustomTablePaginate from "../Components/CustomTablePaginate";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/AuthContext";
import { useEffect, useState } from "react";
import { GetRequest } from "../API/api";
import { Case } from "../API/Paths";
import CaseConsent from "../Components/CaseConsent";

const Cases = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [dissable, setDissable] = useState(true);
  const [fetch, setFetch] = useState(true);
  const { search, setSearch } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Title = "Case";

  const redirect = () => {
    navigate("/case/form");
  };

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
      Header: "SERVICE",
      accessor: "specialization",
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
    GetRequest({ url: Case })
      .then((res) => res.data)
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        const { data } = res;

        if (JSON.parse(localStorage.getItem("cases")) !== null) {
          const items = JSON.parse(localStorage.getItem("cases"));
          const newData = data;

          if (items.length === newData.length) {
            return;
          }
        }

        localStorage.setItem("cases", JSON.stringify(data));
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

  const filtered = cases.filter((filter) =>
    filter.case_status === 2
      ? null
      : filter.case_number
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        filter.patient
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        filter.specialization
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        filter.sex.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        filter.hospital_Name
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
  );

  useEffect(() => {
    if (fetch && JSON.parse(localStorage.getItem("cases"))) {
      setCases(JSON.parse(localStorage.getItem("cases")));
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
            data={filtered}
            fetch={setFetch}
            search={search}
            onOpen={onOpen}
            setSearch={setSearch}
            isModal={true}
          />
        </Box>
        <CaseConsent
          isOpen={isOpen}
          onClose={onClose}
          dissable={dissable}
          setDissable={setDissable}
          redirect={redirect}
        />
      </Container>
    </>
  );
};

export default Cases;
