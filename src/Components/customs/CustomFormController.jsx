import React from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import "../../Style/App.css";
import PropTypes from "prop-types";

const CustomFormController = ({
  isSignup,
  title,
  type,
  value,
  placeholder,
  setValue,
  isError,
  children,
  mt,
  isRequired,
}) => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <FormControl
        marginTop={mt}
        isInvalid={isError}
        border={"red"}
        isRequired={isRequired}
      >
        <FormLabel fontSize={"14"} fontWeight="500" color={"#272727"}>
          {title}
        </FormLabel>
        <InputGroup>
          {isSignup ? null : (
            <InputLeftElement pointerEvents="none">{children}</InputLeftElement>
          )}
          <Input
            onPaste={(e) => (type === "password" ? e.preventDefault() : null)}
            type={type !== "password" ? type : show ? "text" : type}
            value={value}
            placeholder={placeholder}
            fontSize={13}
            bg="white"
            boxShadow="sm"
            focusBorderColor={"rgba(0, 128, 128,0.5)"}
            onChange={(e) => setValue(e.target.value)}
          />
          {type === "password" ? (
            <InputRightElement width="3rem" onClick={() => setShow(!show)}>
              {show ? (
                <MdVisibility size={"22px"} color="#718096" />
              ) : (
                <MdVisibilityOff size={"22px"} color="#718096" />
              )}
            </InputRightElement>
          ) : null}
        </InputGroup>
      </FormControl>
    </>
  );
};

CustomFormController.propTypes = {
  isSignup: PropTypes.bool,
  title: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  setValue: PropTypes.function,
  isError: PropTypes.bool,
  children: PropTypes.object,
  mt: PropTypes.float,
  isRequired: PropTypes.bool,
};

export default CustomFormController;
