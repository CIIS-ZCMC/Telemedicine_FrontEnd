import usePatient from "./PatientContext";
import moment from "moment";
import { GridItem, FormControl, FormLabel, Select } from "@chakra-ui/react";
import CustomGrid from "./CustomGridItem";
import ColumnGridItem from "./CustomGridItem";
import RowGridItem from "./RowGridItem";

const PersonalInformation = () => {
  const {
    patients_FirstName,
    setPatients_FirstName,
    patients_MiddleName,
    setPatients_MiddleName,
    patients_LastName,
    setPatients_LastName,
    patients_Contact,
    setPatients_Contact,
    patients_Gender,
    setPatients_Gender,
    patients_Birthday,
    setPatients_Birthday,
    patients_CivilStatus,
    setPatients_CivilStatus,
  } = usePatient();

  return (
    <CustomGrid title={"Personal Information"} column={3}>
      <RowGridItem
        title={"First name"}
        value={patients_FirstName}
        setValue={setPatients_FirstName}
        colSpan={[3, 3, 3, 3, 1]}
        textArea={false}
      />

      <ColumnGridItem
        colSpan={[3, 3, 3, 3, 1]}
        title={"Middle name"}
        value={patients_MiddleName}
        setValue={setPatients_MiddleName}
        textArea={false}
      />
      <ColumnGridItem
        colSpan={[3, 3, 3, 3, 1]}
        title={"Last name"}
        value={patients_LastName}
        setValue={setPatients_LastName}
        textArea={false}
      />
      <GridItem colSpan={[3, 3, 3, 3, 1]}>
        <FormControl isRequired>
          <FormLabel>Sex</FormLabel>
          <Select
            fontSize={14}
            focusBorderColor={"gray.400"}
            placeholder="- Please Select -"
            bg={"gray.100"}
            onChange={(e) => setPatients_Gender(e.target.value)}
            value={patients_Gender}
            required
          >
            <option>MALE</option>
            <option>FEMALE</option>
          </Select>
        </FormControl>
      </GridItem>
      <RowGridItem
        title={"Date of Birth"}
        colSpan={[3, 3, 3, 3, 2]}
        value={patients_Birthday}
        setValue={setPatients_Birthday}
        DateOnly={true}
        isType="birthday"
        textArea={false}
        max={moment().format("m-d-Y")}
      />
      <GridItem colSpan={[3, 3, 3, 3, 1]}>
        <FormControl isRequired>
          <FormLabel>Civil Status</FormLabel>
          <Select
            fontSize={14}
            focusBorderColor={"gray.400"}
            placeholder="- Please Select -"
            required
            bg={"gray.100"}
            onChange={(e) => setPatients_CivilStatus(e.target.value)}
            value={patients_CivilStatus}
          >
            <option>Single</option>
            <option>Married</option>
            <option>Divorced</option>
            <option>Widowed</option>
          </Select>
        </FormControl>
      </GridItem>
      <ColumnGridItem
        colSpan={[3, 3, 3, 3, 2]}
        title={"Contact no."}
        value={patients_Contact}
        setValue={setPatients_Contact}
        textArea={false}
      />
    </CustomGrid>
  );
};

export default PersonalInformation;
