import { useState, useEffect } from "react";
import { Box, Text, Container, Flex, useDisclosure } from "@chakra-ui/react";

import { TitleColor } from "./Packages";
import CustomTablePaginate from "../Components/CustomTablePaginate";
import { TbFileReport } from "react-icons/tb";
import { GetRequest } from "../Services/api";
import { Reports, Hospital, Specialization } from "../Services/Paths";
import NewReport from "../Components/NewReport";

const Report = () => {
  const [search, setSearch] = useState("");
  const [fetch, setFetch] = useState(false);
  const [reports, setReports] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [SpecializationData, setSpecializationData] = useState([]);
  const [hospitalData, setHospitalData] = useState([]);

  const handleFetchReport = async () => {
    GetRequest({ url: Reports })
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad response.", { cause: res });
        }
        setReports(res.data.data);
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

    GetRequest({ url: Hospital })
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad response.", { cause: res });
        }
        setHospitalData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //check if theres a changes. then update the data
  useEffect(() => {
    handleFetchReport();
    serviceTypeData();
    setFetch(false);
  }, [fetch]);

  const Title = "Report";

  const columns = [
    {
      Header: "ID",
      accessor: "report_No",
    },
    {
      Header: "NAME",
      accessor: "username",
    },
    {
      Header: "DATE",
      accessor: "created_at",
    },
    {
      Header: "LAST MODIFIED",
      accessor: "updated_at",
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
          <Flex color={TitleColor} columnGap={2}>
            <TbFileReport fontSize={40} fontWeight={"900"} ml={5} />
            <Text fontSize={30} color={TitleColor} fontWeight={"900"}>
              {Title}
            </Text>
          </Flex>

          <Box mt={"2rem"}>
            <CustomTablePaginate
              title={Title}
              columns={columns}
              SpecializationData={SpecializationData}
              hospitalData={hospitalData}
              data={reports}
              fetch={setFetch}
              search={search}
              setSearch={setSearch}
              onOpen={onOpen}
              isModal={true}
            />
          </Box>
        </Box>
      </Container>
      <NewReport
        isOpen={isOpen}
        SpecializationData={SpecializationData}
        hospitalData={hospitalData}
        onClose={onClose}
        fetch={setFetch}
      />
    </>
  );
};

export default Report;
