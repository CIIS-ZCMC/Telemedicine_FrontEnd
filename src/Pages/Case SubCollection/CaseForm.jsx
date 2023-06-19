import { useNavigate } from "react-router-dom";
import { TitleColor } from "../Packages";
import useCase from "./CaseContext";
import {
  Text,
  Flex,
  Container,
  Box,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import PatientOtherInformation from "./ProfileOtherInformation";
import PatientInformation from "./PatientInformation";
import PropTypes from "prop-types";

const CaseForm = () => {
  const location = useLocation();
  const [fetch, setFetch] = useState(true);

  const CasesData = useMemo(
    () => (location.state ? location.state.data : []),
    [location.state]
  );

  const EditCase = useState(CasesData);
  const Title = "Case Form";
  const navigate = useNavigate();

  const {
    setFK_patients_ID,
    setFK_specializations_ID,
    setCases_Temperature,
    setCases_Respiratory,
    setCases_Heart,
    setCases_Blood,
    setCases_Oxygen,
    setCases_Weight,
    setCases_Height,
    setCases_CC,
    setCases_HPI,
    setCases_PMH,
    setCases_ROS,
    setCases_PE,
    setCases_WI,
    setCases_IMD,
    setCases_Reason,
    setCases_Remarks,
    setPK_cases_ID,
    registerCase,
    updateCase,
  } = useCase();

  const initStates = useCallback(
    ({
      PK_cases_ID,
      PK_patients_ID,
      FK_specializations_ID,
      cases_Temperature,
      cases_Respiratory,
      cases_Heart,
      cases_Blood,
      cases_Oxygen,
      cases_Weight,
      cases_Height,
      cases_CC,
      cases_HPI,
      cases_PMH,
      cases_ROS,
      cases_PE,
      cases_WI,
      cases_IMD,
      cases_Reason,
      cases_Remarks,
    }) => {
      try {
        setPK_cases_ID(PK_cases_ID);
        setFK_patients_ID(PK_patients_ID);
        setFK_specializations_ID(FK_specializations_ID);
        setCases_Temperature(cases_Temperature);
        setCases_Respiratory(cases_Respiratory);
        setCases_Heart(cases_Heart);
        setCases_Blood(cases_Blood);
        setCases_Oxygen(cases_Oxygen);
        setCases_Weight(cases_Weight);
        setCases_Height(cases_Height);
        setCases_CC(cases_CC);
        setCases_HPI(cases_HPI);
        setCases_PMH(cases_PMH);
        setCases_ROS(cases_ROS);
        setCases_PE(cases_PE);
        setCases_WI(cases_WI);
        setCases_IMD(cases_IMD);
        setCases_Reason(cases_Reason);
        setCases_Remarks(cases_Remarks);
      } catch (e) {
        console.log(e);
      }
    },
    [
      setPK_cases_ID,
      setFK_patients_ID,
      setFK_specializations_ID,
      setCases_Temperature,
      setCases_Respiratory,
      setCases_Heart,
      setCases_Blood,
      setCases_Oxygen,
      setCases_Weight,
      setCases_Height,
      setCases_CC,
      setCases_HPI,
      setCases_PMH,
      setCases_ROS,
      setCases_PE,
      setCases_WI,
      setCases_IMD,
      setCases_Reason,
      setCases_Remarks,
    ]
  );

  initStates.propTypes = {
    PK_cases_ID: PropTypes.string,
    PK_patients_ID: PropTypes.string,
    FK_specializations_ID: PropTypes.string,
    cases_Temperature: PropTypes.float,
    cases_Respiratory: PropTypes.float,
    cases_Heart: PropTypes.float,
    cases_Blood: PropTypes.float,
    cases_Oxygen: PropTypes.float,
    cases_Weight: PropTypes.float,
    cases_Height: PropTypes.float,
    cases_CC: PropTypes.string,
    cases_HPI: PropTypes.string,
    cases_PMH: PropTypes.string,
    cases_ROS: PropTypes.string,
    cases_PE: PropTypes.string,
    cases_WI: PropTypes.string,
    cases_IMD: PropTypes.string,
    cases_Reason: PropTypes.string,
    cases_Remarks: PropTypes.string,
  };

  useEffect(() => {
    try {
      if (fetch) {
        setFetch(false);
        if (CasesData !== null) {
          initStates(...EditCase[0]);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [fetch, initStates, CasesData, EditCase]);

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <>
      <Container maxW={"container.xxl"}>
        <Box mt={10} p={[0, 0, 5, 10]}>
          <Box className="table-head">
            <Text fontSize={20} color={TitleColor} fontWeight={"900"}>
              {Title}
            </Text>
          </Box>
          <Box mt={2}>
            <form onSubmit={CasesData.length >= 1 ? updateCase : registerCase}>
              <Grid templateColumns="repeat(8, 1fr)" gap={4}>
                <GridItem w="100%" colSpan={[8, 8, 4, 3]}>
                  <PatientInformation
                    isUpdate={CasesData.length >= 1 ? true : false}
                    patientID={
                      CasesData.length >= 1 ? EditCase[0].PK_patients_ID : ""
                    }
                  />
                </GridItem>
                <GridItem w="100%" colSpan={[8, 8, 4, 5]}>
                  <PatientOtherInformation />
                </GridItem>
              </Grid>

              <Box w={"100%"} mt={10}>
                <Flex columnGap={5} justifyContent={"end"}>
                  <Button
                    variant={"solid"}
                    colorScheme={"gray"}
                    color={"gray.700"}
                    fontSize={14}
                    fontWeight={"normal"}
                    onClick={handleClick}
                  >
                    <Text>Back</Text>
                  </Button>

                  <Button
                    variant={"solid"}
                    fontSize={14}
                    fontWeight={"normal"}
                    colorScheme={"green"}
                    type="submit"
                  >
                    <Text>Save</Text>
                  </Button>
                </Flex>
              </Box>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CaseForm;
