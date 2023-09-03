import { useEffect, useState } from "react";
import { Box, Wrap } from "@chakra-ui/react";
import useSpecialization from "../../Hooks/useSpecializationHook";
import SpecializationCardSkeleton from "./SpecializationCardSkeleton";
import SpecializationCard from "./SpecializationCard";

const Specialization = () => {
  const { specializations, getSpecialization } = useSpecialization();
  const [loading, setLoading] = useState(true);

  function fetchSpecializationData() {
    getSpecialization((status, feedback) => {
      switch (status) {
        case 200:
          console.log(feedback);
          break;
        default:
          console.log(feedback);
      }
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchSpecializationData();
  }, []);

  if (loading) {
    return (
      <Box w="100%" h="100%">
        <Wrap p={7} spacing="2.2rem">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
            <SpecializationCardSkeleton key={index} />
          ))}
        </Wrap>
      </Box>
    );
  }

  if (!loading && specializations === null) {
    return (
      <Box w="100%" h="100%">
        No Record.
      </Box>
    );
  }

  return (
    <Box w="100%" h="100%">
      <Wrap p={7} spacing="2.2rem">
        {specializations.map((specialization, index) => (
          <SpecializationCard key={index} {...specialization} />
        ))}
      </Wrap>
    </Box>
  );
};

export default Specialization;
