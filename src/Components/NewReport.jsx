import { useState } from "react";
import {
  Text,
  Grid,
  GridItem,
  Select,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";

import { toastposition, toastvariant } from "../Pages/Packages";
import CustomModal from "../Components/CustomModal";
import TextFormController from "../Components/TextFormController";
import { useToast } from "@chakra-ui/react";
import moment from "moment";
import { PostRequest } from "../Services/api";
import { Reports } from "../Services/Paths";
import PropTypes from "prop-types";

const NewReport = ({ isOpen, onClose, fetch, SpecializationData }) => {
  const title = "Generate Report";
  const [fromdate, setFromdate] = useState("");
  const [todate, setTodate] = useState("");
  const [fromage, setFromage] = useState("");
  const [toage, setToage] = useState("");
  const [sex, setSex] = useState("");
  const [referringHospital, setreferringHospital] = useState("");
  const [servicetype, setServiceType] = useState("");
  const toast = useToast();

  const resetState = () => {
    setFromage("");
    setFromdate("");
    setTodate("");
    setToage("");
    setToage("");
    setSex("");
    setreferringHospital("");
    setServiceType("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(fromage) >= Number(toage)) {
      toast({
        title:
          "To-Attribute on Age Range should be Greater than the From-Attribute  Example: 20 - 26",
        position: toastposition,
        variant: toastvariant,
        status: "error",
        isClosable: true,
      });
    } else {
      let bodyForm = new FormData();
      bodyForm.append("FK_hospital_ID", referringHospital);
      bodyForm.append("FK_specializations_ID", servicetype);
      bodyForm.append("FK_user_ID", 1);
      bodyForm.append("report_AgeFrom", fromage);
      bodyForm.append("report_AgeTo", toage);
      bodyForm.append("report_DateFrom", fromdate);
      bodyForm.append("report_DateTo", todate);
      bodyForm.append("report_Sex", sex);

      PostRequest({ url: Reports })
        .then((res) => {
          if (!res.statusText === "OK") {
            throw new Error("Bad response.", { cause: res });
          }

          onClose();
          resetState();
          fetch(true);
          toast({
            title: "Report Generated",
            position: toastposition,
            variant: toastvariant,
            status: "success",
            isClosable: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <CustomModal
        title={title}
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={handleSubmit}
        hasProfile={false}
        isNew={true}
        btntitle={"Generate"}
      >
        <Text fontWeight={"bold"} color={"blue.700"} mb={2} fontSize={"15px"}>
          Date Range
        </Text>
        <Grid templateColumns="repeat(6, 1fr)" gap={6}>
          <GridItem w="100%" colSpan={[6, 6, 6, 3]}>
            <Text mb={2} color={"red.400"}>
              From :{" "}
              <Text color={"blue.400"}>
                {moment(fromdate).format("DD-MM-YYYY")}
              </Text>
            </Text>
            <TextFormController
              title={"From Date"}
              value={fromdate}
              setValue={setFromdate}
              isRequired={true}
              isType="fromdate"
              compare={moment().format("YYYY-MM-DD")}
            />
          </GridItem>

          <GridItem w="100%" colSpan={[6, 6, 6, 3]}>
            <Text mb={2} color={"red.400"}>
              To :{" "}
              <Text color={"blue.400"}>
                {moment(todate).format("DD-MM-YYYY")}
              </Text>
            </Text>
            <TextFormController
              title={"To Date"}
              value={todate}
              setValue={setTodate}
              isRequired={true}
              isType="todate"
              compare={fromdate}
            />
          </GridItem>
        </Grid>

        <Text
          fontWeight={"bold"}
          color={"blue.700"}
          fontSize={"15px"}
          mb={2}
          mt={2}
        >
          Age Range (0 - 0 Yrs Old)
        </Text>
        <Grid templateColumns="repeat(6, 1fr)" gap={6}>
          <GridItem w="100%" colSpan={[6, 6, 6, 3]}>
            <TextFormController
              title={"From"}
              value={fromage}
              setValue={setFromage}
              isRequired={true}
            />
          </GridItem>

          <GridItem w="100%" colSpan={[6, 6, 6, 3]}>
            <TextFormController
              title={"To"}
              value={toage}
              setValue={setToage}
              isRequired={true}
            />
          </GridItem>
        </Grid>

        <FormControl mt={2}>
          <FormLabel fontSize={14}>Sex</FormLabel>
          <Select
            fontSize={14}
            focusBorderColor={"gray.400"}
            bg={"gray.100"}
            placeholder="- Please Select -"
            onChange={(e) => {
              setSex(e.target.value);
            }}
          >
            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>
          </Select>
        </FormControl>

        <FormControl mt={2}>
          <FormLabel fontSize={14}>Service Type</FormLabel>
          <Select
            fontSize={14}
            focusBorderColor={"gray.400"}
            bg={"gray.100"}
            placeholder="- Please Select -"
            onChange={(e) => {
              setServiceType(e.target.value);
            }}
          >
            {SpecializationData.map((row, index) => {
              return (
                <option key={index} value={row.PK_specializations_ID}>
                  {row.specializations_Title}
                </option>
              );
            })}
          </Select>
        </FormControl>
      </CustomModal>
    </>
  );
};

NewReport.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.bool,
  fetch: PropTypes.bool,
  SpecializationData: PropTypes.object,
};

export default NewReport;
