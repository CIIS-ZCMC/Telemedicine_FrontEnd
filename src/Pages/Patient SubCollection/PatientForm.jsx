import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { TitleColor } from "../Packages";
import usePatient from "./PatientContext";
import {
  Text,
  Flex,
  Container,
  Box,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import PersonalInformation from "./PersonalInformation";
import AddressInformation from "./AddressInformation";
import PropTypes from "prop-types";
import GurdianInformation from "./GuardianInformation";

const PatientForm = () => {
  const location = useLocation();
  const json = location.state;
  const [fetch, setFetch] = useState(true);
  // const Title = "Patient Form";
  const { registerPatient, updatePatient } = usePatient();
  const navigate = useNavigate();

  const {
    setPK_patients_ID,
    setPatients_FirstName,
    setPatients_MiddleName,
    setPatients_LastName,
    setPatients_Contact,
    setPatients_Gender,
    setPatients_Birthday,
    setPatients_CivilStatus,
    setGuardians_Name,
    setGuardians_Relationship,
    setGuardians_ContactNo,
    setPatients_Street,
    setPatients_Barangay,
    setPatients_City,
    setPatients_Ethnicity,
    setPatients_Dialect,
    setPatients_BirthPlace,
    registerStatus,
    updateStatus,
  } = usePatient();

  const handleClick = () => {
    navigate("/patients");
  };

  const initPatientdata = useCallback(
    ({
      PK_patients_ID,
      patients_FirstName,
      patients_LastName,
      patients_MiddleName,
      patients_Contact,
      patients_Gender,
      patients_Birthday,
      patients_CivilStatus,
      guardians_Name,
      guardians_Relationship,
      guardians_ContactNo,
      patients_Street,
      patients_Barangay,
      patients_City,
      patients_Ethnicity,
      patients_Dialect,
      patients_BirthPlace,
    }) => {
      try {
        setPK_patients_ID(PK_patients_ID);
        setPatients_FirstName(patients_FirstName);
        setPatients_LastName(patients_LastName);
        setPatients_MiddleName(patients_MiddleName);
        setPatients_Contact(patients_Contact);
        setPatients_Gender(patients_Gender);
        setPatients_Birthday(patients_Birthday);
        setPatients_CivilStatus(patients_CivilStatus);
        setGuardians_Name(guardians_Name);
        setGuardians_Relationship(guardians_Relationship);
        setGuardians_ContactNo(guardians_ContactNo);
        setPatients_Street(patients_Street);
        setPatients_Barangay(patients_Barangay);
        setPatients_City(patients_City);
        setPatients_Ethnicity(patients_Ethnicity);
        setPatients_Dialect(patients_Dialect);
        setPatients_BirthPlace(patients_BirthPlace);
      } catch (e) {
        console.log(e);
      }
    },
    [
      setPK_patients_ID,
      setPatients_FirstName,
      setPatients_LastName,
      setPatients_MiddleName,
      setPatients_Contact,
      setPatients_Gender,
      setPatients_Birthday,
      setPatients_CivilStatus,
      setGuardians_Name,
      setGuardians_Relationship,
      setGuardians_ContactNo,
      setPatients_Street,
      setPatients_Barangay,
      setPatients_City,
      setPatients_Ethnicity,
      setPatients_Dialect,
      setPatients_BirthPlace,
    ]
  );

  initPatientdata.propTypes = {
    PK_patients_ID: PropTypes.function,
    patients_FirstName: PropTypes.bool,
    patients_LastName: PropTypes.integer,
    patients_MiddleName: PropTypes.function,
    patients_Contact: PropTypes.bool,
    patients_Gender: PropTypes.integer,
    patients_Birthday: PropTypes.object,
    patients_CivilStatus: PropTypes.integer,
    guardians_Name: PropTypes.function,
    guardians_Relationship: PropTypes.bool,
    guardians_ContactNo: PropTypes.integer,
    patients_Street: PropTypes.function,
    patients_Barangay: PropTypes.bool,
    patients_City: PropTypes.integer,
    patients_Ethnicity: PropTypes.object,
    patients_Dialect: PropTypes.integer,
    patients_BirthPlace: PropTypes.integer,
  };

  useEffect(() => {
    if (fetch) {
      setFetch(false);
      const data = json.data;
      if (data !== null) {
        initPatientdata(...data[0]);
      }
    }
  }, [fetch, json.data, initPatientdata]);

  return (
    <Container maxW={"container.xxl"}>
      <Box mt={10} p={[0, 0, 5, 10]}>
        <Box className="table-head">
          <Text fontSize={18} color={TitleColor} fontWeight={"900"}>
            {"Register Patient"}
          </Text>
        </Box>
        <Box>
          <form onSubmit={json === null ? registerPatient : updatePatient}>
            <Grid templateColumns="repeat(8, 1fr)" gap={6}>
              <GridItem w="100%" colSpan={[8, 8, 8, 4]}>
                <PersonalInformation />
                <AddressInformation />
              </GridItem>
              <GridItem w="100%" colSpan={[8, 8, 8, 4]}>
                <GurdianInformation />
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
                  isLoading={json === null ? registerStatus : updateStatus}
                  loadingText={json === null ? "Saving" : "Updating"}
                  type={"submit"}
                  variant={"solid"}
                  fontSize={14}
                  fontWeight={"normal"}
                  colorScheme={"green"}
                >
                  <Text>{"Save"}</Text>
                </Button>
              </Flex>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default PatientForm;
