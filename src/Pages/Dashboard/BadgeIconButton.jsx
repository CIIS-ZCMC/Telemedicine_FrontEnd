import { Box, IconButton, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const BadgeIconButton = ({
  value,
  btnColor,
  btnBgColor,
  hoverColor,
  children,
  onClick,
}) => {
  return (
    <IconButton
      bg={"transparent"}
      color={btnColor}
      _hover={{
        bg: "transparent",
        color: { btnBgColor },
        transform: "scale(1.2, 1.2)",
        "& #badge-text-element": {
          bg: hoverColor,
        },
      }}
      onClick={() => onClick()}
      icon={
        <Box position="relative">
          <Box
            id="badge-text-element"
            w="1.2rem"
            h="1.2rem"
            borderRadius={25}
            bg={btnBgColor}
            position="absolute"
            color="white"
            top={-1}
            right={-3}
            boxShadow="md"
            p={1}
          >
            <Text fontSize={10} fontWeight={800}>
              {value}
            </Text>
          </Box>
          {children}
        </Box>
      }
    />
  );
};

BadgeIconButton.propTypes = {
  value: PropTypes.number,
  btnColor: PropTypes.string,
  btnBgColor: PropTypes.string,
  hoverColor: PropTypes.string,
  children: PropTypes.object,
  onClick: PropTypes.func,
};

export default BadgeIconButton;
