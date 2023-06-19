import { GridItem, FormControl, FormLabel, Select } from "@chakra-ui/react";
import PropTypes from "prop-types";

const CustomSelect = ({ title, json, isRow, defval, setValue, isRequired }) => {
  const handleSelect = (value) => setValue(value);

  if (isRow) {
    return (
      <GridItem rowSpan={1} colSpan={[4, 4, 2, 1]}>
        <FormControl>
          <FormLabel>{title}</FormLabel>
          <Select
            fontSize={14}
            focusBorderColor={"gray.400"}
            bg={"gray.100"}
            placeholder="- Please Select -"
            onChange={(e) => handleSelect(e.target.value)}
            required={isRequired}
            value={defval}
          >
            {json.map((value) => {
              return (
                <option key={value.id} value={value.id}>
                  {value.name}
                </option>
              );
            })}
          </Select>
        </FormControl>
      </GridItem>
    );
  }
  return (
    <GridItem colSpan={[4, 4, 2, 1]}>
      <FormControl>
        <FormLabel>{title}</FormLabel>
        <Select
          fontSize={14}
          focusBorderColor={"gray.400"}
          bg={"gray.100"}
          placeholder="- Please Select -"
          onChange={(e) => handleSelect(e.target.value)}
          required={isRequired}
          value={defval}
        >
          {json.map((value) => {
            return (
              <option key={value.id} value={value.id}>
                {value.name}
              </option>
            );
          })}
        </Select>
      </FormControl>
    </GridItem>
  );
};

CustomSelect.propTypes = {
  title: PropTypes.string,
  json: PropTypes.object,
  isRow: PropTypes.bool,
  defval: PropTypes.object,
  setValue: PropTypes.function,
  isRequired: PropTypes.bool,
};

export default CustomSelect;
