import useCase from "./CaseContext";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GetRequest } from "../../API/api";
import { Patient } from "../../API/Paths";
import { CustomPatient } from "./CustomPatient";
import PropTypes from "prop-types";
import CustomSelect from "./CustomSelect";
import RowGridItem from "./RowGridItem";
import CustomGrid from "./CustomGrid";
import ColumnGridItem from "./ColumnGridItem";

const PatientInformation = ({ isUpdate, patientID }) => {
  // const [patientData, setPatientData] = useState([]);
  // const [serviceData, setServiceData] = useState([]);
  const [allpatient, setallpatient] = useState([]);

  const {
    setFK_specializations_ID,
    FK_specializations_ID,
    cases_Temperature,
    setCases_Temperature,
    cases_Respiratory,
    setCases_Respiratory,
    cases_Heart,
    setCases_Heart,
    cases_Blood,
    setCases_Blood,
    cases_Oxygen,
    setCases_Oxygen,
    cases_Weight,
    setCases_Weight,
    cases_Height,
    setCases_Height,
    specializations,
  } = useCase();

  const handleFetch = async () => {
    // GetRequest({ url: `${Patient}s` })
    //   .then((res) => {
    //     if (!res.statusText === "OK") {
    //       throw new Error("Bad response.", { cause: res });
    //     }
    //     setPatientData(res.data.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // GetRequest({ url: `${Specialization}s` })
    //   .then((res) => {
    //     if (!res.statusText === "OK") {
    //       throw new Error("Bad response.", { cause: res });
    //     }

    //     setServiceData(res.data.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    GetRequest({ url: `${Patient}/hospital` }).then((res) => {
      if (!res.statusText === "OK") {
        throw new Error("Bad response.", { cause: res });
      }

      setallpatient(res.data.data);
    });
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <CustomGrid title={"Personal Information"} column={1}>
      <Box>
        <CustomPatient
          isUpdate={isUpdate}
          patientID={patientID}
          patientdata={allpatient}
        />
      </Box>
      <Box mt={3}>
        <CustomSelect
          title="Service Type"
          json={specializations}
          isRow={false}
          setValue={setFK_specializations_ID}
          isRequired={true}
          defval={FK_specializations_ID}
        />
        <ColumnGridItem
          title={"Temperature(°C)"}
          value={cases_Temperature}
          setValue={setCases_Temperature}
          isRequired={true}
        />
        <RowGridItem
          title={"Respiratory Rate"}
          value={cases_Respiratory}
          setValue={setCases_Respiratory}
          isRequired={true}
        />
        <ColumnGridItem
          title={"Heart Rate"}
          value={cases_Heart}
          setValue={setCases_Heart}
          isRequired={true}
        />
        <ColumnGridItem
          title={"Blood Pressure"}
          value={cases_Blood}
          setValue={setCases_Blood}
          isRequired={true}
        />
        <ColumnGridItem
          title={"Oxygen Saturation"}
          value={cases_Oxygen}
          setValue={setCases_Oxygen}
          isRequired={true}
        />
        <RowGridItem
          title={"Weight (KG)"}
          value={cases_Weight}
          setValue={setCases_Weight}
          isRequired={true}
        />
        <ColumnGridItem
          title={"Height (CM)"}
          value={cases_Height}
          setValue={setCases_Height}
          isRequired={true}
        />
      </Box>
    </CustomGrid>
  );
};

PatientInformation.propTypes = {
  isUpdate: PropTypes.bool,
  patientID: PropTypes.string,
};

export default PatientInformation;
