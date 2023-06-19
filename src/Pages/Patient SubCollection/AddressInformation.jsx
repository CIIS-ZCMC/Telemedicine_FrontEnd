import usePatient from "./PatientContext";
import CustomGrid from "./CustomGrid";
import ColumnGridItem from "./CustomGridItem";
import RowGridItem from "./RowGridItem";

const AddressInformation = () => {
  const {
    patients_Street,
    setPatients_Street,
    patients_Barangay,
    setPatients_Barangay,
    patients_City,
    setPatients_City,
    patients_Ethnicity,
    setPatients_Ethnicity,
    patients_Dialect,
    setPatients_Dialect,
    patients_BirthPlace,
    setPatients_BirthPlace,
  } = usePatient();

  return (
    <CustomGrid title={"Address"} row={2} column={2}>
      <RowGridItem
        title={"Street"}
        value={patients_Street}
        setValue={setPatients_Street}
        colSpan={[4, 4, 4, 2, 2]}
        textArea={false}
      />
      <ColumnGridItem
        colSpan={[4, 4, 4, 2, 1]}
        title={"Barangay"}
        value={patients_Barangay}
        setValue={setPatients_Barangay}
        textArea={false}
      />
      <ColumnGridItem
        colSpan={[4, 4, 4, 2, 1]}
        title={"City"}
        value={patients_City}
        setValue={setPatients_City}
        textArea={false}
      />
      <ColumnGridItem
        colSpan={[4, 4, 4, 2, 2]}
        title={"Place of Birth"}
        value={patients_BirthPlace}
        setValue={setPatients_BirthPlace}
        textArea={true}
      />
      <RowGridItem
        colSpan={[4, 4, 4, 2, 1]}
        title={"Ethnicity"}
        value={patients_Ethnicity}
        setValue={setPatients_Ethnicity}
        textArea={false}
      />
      <ColumnGridItem
        colSpan={[4, 4, 4, 2, 1]}
        title={"Dialect"}
        value={patients_Dialect}
        setValue={setPatients_Dialect}
        textArea={false}
      />
    </CustomGrid>
  );
};

export default AddressInformation;
