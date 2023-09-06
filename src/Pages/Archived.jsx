import { Box, Text } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useCase from "../Hooks/useCase";
import CardComponent from "../Components/Case List/CardComponent";

const Archived = () => {
  const [fetch, setFetch] = useState(true);
  const { archiveCases, getCase } = useCase();
  const collection = "archive";

  const handleFetch = () => {
    getCase(collection, (status, feedback) => {
      console.log(`status:${status}, feedback:${feedback}`);
    });
  };

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        if (fetch) {
          setFetch(false);
        }
        handleFetch();
      },
      fetch ? 0 : 30000
    );

    return () => clearInterval(intervalId);
  }, [fetch]);

  if (fetch) {
    return <Text>Fetching...</Text>;
  }

  return (
    <Box
      w="100%"
      h="100%"
      overflow="hidden"
      bg="#f5f7f9"
      pt={10}
      pl={5}
      pr={5}
      pb={5}
      display="flex"
      flexWrap="wrap"
      columnGap={5}
    >
      {archiveCases.map((value, index) => (
        <CardComponent key={index} {...value} />
      ))}
    </Box>
  );
};

export default Archived;
