import { Box, Center, Flex, WrapItem, Skeleton } from "@chakra-ui/react";
import { FaHospitalAlt } from "react-icons/fa";

const HospitalCard = () => {
  const buttonSkeleton = {
    element: [
      {
        component: <Skeleton w="6.5rem" h="1.7rem" rounded={12} />,
      },
      {
        component: <Skeleton w="3rem" h="1.7rem" rounded={12} />,
      },
      {
        component: <Skeleton w="3rem" h="1.7rem" rounded={12} />,
      },
    ],
  };

  return (
    <WrapItem>
      <Box
        w="16rem"
        h="19rem"
        rounded={10}
        bg="white"
        boxShadow="lg"
        overflow="hidden"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        cursor="pointer"
      >
        <Box h="100%" overflow="hidden" bg="blackAlpha.100">
          <Center h="100%">
            <FaHospitalAlt size={70} color="gray" />
          </Center>
        </Box>
        <Box
          h="100%"
          pl={3}
          pr={3}
          pt={3}
          pb={2}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box>
            <Skeleton h={4} />
            <Skeleton h={3.5} mt={2} />
            <Flex w="100%" mt={5} p={0} justifyContent="between" gap={8}>
              <Skeleton w="inherit" h={7} />
              <Skeleton w="inherit" h={7} />
            </Flex>
          </Box>

          <Flex justifyContent="end" gap={5} pt={3} pr={3}>
            {buttonSkeleton.element.map((button) => button.component)}
          </Flex>
        </Box>
      </Box>
    </WrapItem>
  );
};

export default HospitalCard;
