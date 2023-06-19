import { Box, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const CaseMainInformationComponent = ({ header, data }) => {
  return (
    <Box mt={5}>
      <Box
        maxW={[250, 250, 350, 350]}
        pl={2}
        pt={1}
        bg="gray"
        color="white"
        borderTopLeftRadius={8}
        borderTopRightRadius={30}
      >
        <Text fontSize={[12, 12, 18, 18]}>{header.toLocaleUpperCase()}</Text>
      </Box>
      <Box
        border="1px solid gray"
        p={2}
        borderBottomRadius={8}
        borderRightRadius={8}
      >
        <Text fontSize={[12, 12, 18, 18]}>{data}</Text>
      </Box>
    </Box>
  );
};

CaseMainInformationComponent.propTypes = {
  header: PropTypes.string,
  data: PropTypes.object,
};

export default CaseMainInformationComponent;
