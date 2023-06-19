import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import "../Style/Table.css";
import PropTypes from "prop-types";

function Searchfield({ search, currsearch, placeholder }) {
  return (
    <div>
      <Box mb={2} mt={2}>
        <InputGroup id="searchbg">
          <InputLeftElement pointerEvents="none" color={"gray.500"}>
            <AiOutlineSearch />
          </InputLeftElement>
          <Input
            id="searchfield"
            placeholder={placeholder}
            fontSize={14}
            focusBorderColor={"green"}
            outline={"none"}
            value={search}
            onChange={(e) => currsearch(e.target.value)}
          />
        </InputGroup>
      </Box>
    </div>
  );
}

Searchfield.propTypes = {
  search: PropTypes.string,
  currsearch: PropTypes.function,
  placeholder: PropTypes.string,
};

export default Searchfield;
