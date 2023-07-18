import { Select, FormControl } from "@chakra-ui/react";
import PropTypes from "prop-types";

const SelectionComponention = ({ label, value, setValue, data }) => {
  return (
    <FormControl>
      <Select
        bg="white"
        boxShadow="sm"
        fontSize={14}
        focusBorderColor={"rgba(0, 128, 128, 0.5)"}
        placeholder={`- Please Select ${label} -`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      >
        {data.map((data) => {
          return (
            <option key={data.id} value={data.id}>
              {data.name}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};

SelectionComponention.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  data: PropTypes.object,
};

export default SelectionComponention;
