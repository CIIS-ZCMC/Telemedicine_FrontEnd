import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import PropTypes from "prop-types";

const InputCalendarComponent = ({
  label,
  placeholder,
  type,
  value,
  setValue,
  mt,
}) => {
  return (
    <FormControl mt={mt}>
      <FormLabel>{label}</FormLabel>
      <Input
        placeholder={placeholder}
        type={type}
        focusBorderColor="teal"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </FormControl>
  );
};

InputCalendarComponent.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  mt: PropTypes.number,
};

export default InputCalendarComponent;
