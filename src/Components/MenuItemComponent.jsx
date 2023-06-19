import { Box, Text, Heading, MenuItem } from "@chakra-ui/react";
import PropTypes from "prop-types";

const MenuItemComponent = ({ data }) => {
  return (
    <MenuItem w={"14rem"} _hover={{ bg: "white" }}>
      <Box
        w="200px"
        boxShadow="md"
        p={2}
        rounded={5}
        _hover={{ bg: "lightgreen" }}
      >
        <Box display="flex" justifyContent={"space-between"}>
          <Heading size="sm">{data.id}</Heading>
          <Box
            bg={
              data.status === 1 ? "grey" : data.status === 3 ? "red" : "green"
            }
            pl={3}
            pr={3}
            rounded={8}
            boxShadow="sm"
          >
            <Text fontSize={12} fontWeight={600} color="white">
              {data.status === 1
                ? "PENDING"
                : data.status === 3
                ? "DONE"
                : "ACTIVE"}
            </Text>
          </Box>
        </Box>
        <Box mt={2}>
          <Text fontSize={12}>{data.name}</Text>
        </Box>
      </Box>
    </MenuItem>
  );
};

MenuItemComponent.propTypes = {
  data: PropTypes.object,
};

export default MenuItemComponent;
