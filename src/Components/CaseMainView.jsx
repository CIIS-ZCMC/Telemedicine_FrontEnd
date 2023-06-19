import {
  Text,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  Box,
  Flex,
  Grid,
  GridItem,
  Divider,
  useDisclosure,
  ModalContent,
} from "@chakra-ui/react";
import { TbEdit } from "react-icons/tb";
import PropTypes from "prop-types";

const CaseMainView = ({
  name,
  lname,
  fname,
  mname,
  sex,
  birthday,
  age,
  civilstatus,
  religion,
  guardian,
  relation,
  street,
  barangay,
  city,
  birthplace,
  ethnicity,
  dialect,
  contactno,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Text
        className="patient__Name"
        color={"#2D82D7"}
        textTransform={"uppercase"}
        onClick={onOpen}
      >
        {name}
      </Text>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent h="auto" w={["100vw", "100vw", "50vw", "50vw"]}>
          <ModalHeader fontSize={"2rem"}>Patient Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack p={"30px"} rowGap={"10px"}>
              <Box p={"5"} borderRadius={"5"} border={"1px solid #d3d3d3"}>
                <Flex>
                  <Text fontSize={"md"} fontWeight={"bold"} pr={"2px"}>
                    Personal Information
                  </Text>
                  <TbEdit />
                </Flex>
                <Grid
                  templateColumns={[
                    "1fr 1fr",
                    "1fr 1fr",
                    "1fr 1fr 1fr",
                    "1fr 1fr 1fr",
                  ]}
                  rowGap={10}
                  pt={"3"}
                >
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>Last name</Text>
                    <Text fontWeight={"bold"}>{lname}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>First name</Text>
                    <Text fontWeight={"bold"}>{fname}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>Middle name</Text>
                    <Text fontWeight={"bold"}>{mname}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>Sex</Text>
                    <Text fontWeight={"bold"}>{sex}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>BIRTHDAY</Text>
                    <Text fontWeight={"bold"}>{birthday}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>AGE</Text>
                    <Text fontWeight={"bold"}>{age}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>CIVIL STATUS</Text>
                    <Text fontWeight={"bold"}>{civilstatus}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>RELIGION</Text>
                    <Text fontWeight={"bold"}>{religion}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>GUARDIAN</Text>
                    <Text fontWeight={"bold"}>{guardian}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>RELATION</Text>
                    <Text fontWeight={"bold"}>{relation}</Text>
                  </GridItem>
                </Grid>
              </Box>
              <Box p={"5"} borderRadius={"5"} border={"1px solid #d3d3d3"}>
                <Text fontSize={"md"} fontWeight={"bold"}>
                  Address
                </Text>
                <Grid
                  templateColumns={[
                    "1fr 1fr",
                    "1fr 1fr",
                    "1fr 1fr 1fr",
                    "1fr 1fr 1fr",
                  ]}
                  rowGap={10}
                  pt={"3"}
                >
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>STREET</Text>
                    <Text fontWeight={"bold"}>{street}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>BARANGAY</Text>
                    <Text fontWeight={"bold"}>{barangay}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>CITY/MUNICIPALITY</Text>
                    <Text fontWeight={"bold"}>{city}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>BIRTH PLACE</Text>
                    <Text fontWeight={"bold"}>{birthplace}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>ETHNICITY</Text>
                    <Text fontWeight={"bold"}>{ethnicity}</Text>
                  </GridItem>
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>DIALECT</Text>
                    <Text fontWeight={"bold"}>{dialect}</Text>
                  </GridItem>
                </Grid>
              </Box>
              <Box p={"5"} borderRadius={"5"} border={"1px solid #d3d3d3"}>
                <Text fontSize={"md"} fontWeight={"bold"}>
                  Address
                </Text>
                <Grid
                  templateColumns={[
                    "1fr 1fr",
                    "1fr 1fr",
                    "1fr 1fr 1fr",
                    "1fr 1fr 1fr",
                  ]}
                  rowGap={10}
                  pt={"3"}
                >
                  <GridItem w="100%" h="10">
                    <Text fontSize={"sm"}>{contactno}</Text>
                    <Text fontWeight={"bold"}>+639758519398</Text>
                  </GridItem>
                </Grid>
              </Box>
            </Stack>
            <Divider />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

CaseMainView.propTypes = {
  name: PropTypes.string,
  lname: PropTypes.string,
  fname: PropTypes.string,
  mname: PropTypes.string,
  sex: PropTypes.string,
  birthday: PropTypes.string,
  age: PropTypes.string,
  civilstatus: PropTypes.string,
  religion: PropTypes.string,
  guardian: PropTypes.string,
  relation: PropTypes.string,
  street: PropTypes.string,
  barangay: PropTypes.string,
  city: PropTypes.string,
  birthplace: PropTypes.string,
  ethnicity: PropTypes.string,
  dialect: PropTypes.string,
  contactno: PropTypes.string,
};

export default CaseMainView;
