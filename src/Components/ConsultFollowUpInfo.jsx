import { Box, Text, Divider } from "@chakra-ui/react";
import PropTypes from "prop-types";

const ConsultFollowUpInfo = ({ followups }) => {
  return (
    <div>
      <Box
        mt={5}
        border={"1px"}
        borderColor={"gray.300"}
        borderRadius={10}
        bg={"gray.100"}
        p={5}
        shadow={"lg"}
        transition={"all ease-in 1s"}
      >
        <Text fontWeight={"bold"} fontSize={14} p={2}>
          0 Follow Ups
        </Text>
        <Divider />
        <Box height={200} overflowY={"scroll"}>
          {followups.map((e) => {
            return (
              <>
                <Box
                  p={2}
                  shadow={"md"}
                  border={"1px"}
                  borderColor={"gray.300"}
                  borderRadius={5}
                  mt={2}
                  fontSize={14}
                >
                  {e.title}

                  <span
                    style={{ float: "right", fontSize: "10px", color: "gray" }}
                  >
                    {e.date}
                  </span>
                </Box>
              </>
            );
          })}
        </Box>
      </Box>
    </div>
  );
};

ConsultFollowUpInfo.propTypes = {
  followups: PropTypes.object,
};

export default ConsultFollowUpInfo;
