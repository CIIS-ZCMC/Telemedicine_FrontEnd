import usePatient from "./PatientContext";
import { GridItem, FormControl, FormLabel, Select } from "@chakra-ui/react";
import CustomGrid from "./CustomGridItem";
import ColumnGridItem from "./CustomGridItem";
import RowGridItem from "./RowGridItem";

const GurdianInformation = () => {
  const {
    guardians_Name,
    setGuardians_Name,
    guardians_Relationship,
    setGuardians_Relationship,
    guardians_ContactNo,
    setGuardians_ContactNo,
  } = usePatient();

  return (
    <CustomGrid title={"Guardian"} row={1} column={1}>
      <RowGridItem
        colSpan={[4, 4, 4, 2, 1]}
        title={"Guardian name"}
        value={guardians_Name}
        setValue={setGuardians_Name}
        textArea={false}
      />
      <GridItem colSpan={[4, 4, 4, 2, 1]}>
        <FormControl isRequired>
          <FormLabel>Relation</FormLabel>
          <Select
            fontSize={14}
            marginLeft={""}
            focusBorderColor={"gray.400"}
            placeholder="- Please Select -"
            bg={"gray.100"}
            required
            onChange={(e) => setGuardians_Relationship(e.target.value)}
            value={guardians_Relationship}
          >
            <option>Mother</option>
            <option>Father</option>
            <option>GrandMother</option>
            <option>GrandFather</option>
            <option>Aunt</option>
            <option>Uncle</option>
            <option>Brother</option>
            <option>Sister</option>
            <option>Other</option>
          </Select>
        </FormControl>
      </GridItem>
      <ColumnGridItem
        colSpan={[4, 4, 4, 2, 1]}
        title={"Contact"}
        value={guardians_ContactNo}
        setValue={setGuardians_ContactNo}
        textArea={false}
      />
    </CustomGrid>
  );
};

export default GurdianInformation;
