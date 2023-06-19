import { Box, Grid, GridItem, useToast, Center } from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "../Style/App.css";
import { useState } from "react";
import { toastposition, toastvariant } from "../Pages/Packages";
import CustomFormController from "../Components/customs/CustomFormController";
import CustomModal from "../Components/CustomModal";
import useAuth from "../Hooks/AuthContext";
import { SelectionSpecialization } from "../Components/CustomSelection";
import PropTypes from "prop-types";

const NewUser = ({ isOpen, onClose, fetch }) => {
  const title = "New Doctor";
  const toast = useToast();
  const [loader, setLoader] = useState(false);

  const {
    email,
    setEmail,
    password,
    setPassword,
    doctors_FirstName,
    setDoctors_FirstName,
    doctors_LastName,
    setDoctors_LastName,
    name,
    setName,
    isErrorFN,
    isErrorEmail,
    isErrorPassword,
    resetState,
    registerAdminDoctor,
    FK_specializations_ID,
    setFK_specializations_ID,
  } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoader(true);
    const res = await registerAdminDoctor();

    if (res !== "success") {
      toast({
        title: "Something went wrong",
        position: toastposition,
        variant: toastvariant,
        status: "error",
        isClosable: true,
      });
    }

    if (res === "success") {
      onClose();
      toast({
        title: "New admin created",
        position: toastposition,
        variant: toastvariant,
        status: "success",
        isClosable: true,
      });
      resetState();
      fetch(true);
    }
    setLoader(false);
  };

  return (
    <>
      <CustomModal
        title={title}
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={handleSubmit}
        hasProfile={false}
        isNew={true}
        btntitle={"Save"}
        loader={loader}
      >
        <Grid
          templateRows={`repeat( 2 , 1fr)`}
          templateColumns={`repeat( 2 , 1fr)`}
          gap={2}
          overflow={"hidden"}
        >
          <GridItem rowSpan={2} colSpan={[2, 1]}>
            <CustomFormController
              isSignup={true}
              title={"First name"}
              type={"Text"}
              value={doctors_FirstName}
              placeholder={`Enter First Name `}
              setValue={setDoctors_FirstName}
              errorMessage={`First name is required.`}
              isError={isErrorFN}
            >
              <Box w={8} h={4} mt={6} mb={6} borderRight={"1px solid #e0e0e0"}>
                <Center>
                  <FaUserAlt color="#1f894c" size={15} />
                </Center>
              </Box>
            </CustomFormController>
            <CustomFormController
              isSignup={true}
              title={"Last name"}
              type={"Text"}
              value={doctors_LastName}
              placeholder={`Enter Last name`}
              setValue={setDoctors_LastName}
              errorMessage={`Last name is required.`}
              isError={isErrorPassword}
            >
              <Box w={8} h={4} mt={6} mb={6} borderRight={"1px solid #e0e0e0"}>
                <Center>
                  <FaLock color="#1f894c" size={15} />
                </Center>
              </Box>
            </CustomFormController>
            <SelectionSpecialization
              title={"Specialization"}
              value={FK_specializations_ID}
              setValue={setFK_specializations_ID}
              mt={5}
            />
          </GridItem>
          <GridItem rowSpan={3} colSpan={[2, 1]}>
            <CustomFormController
              isSignup={true}
              title={"Email"}
              type={"email"}
              value={email}
              placeholder={"Enter email"}
              setValue={setEmail}
              errorMessage={"Email is required."}
              isError={isErrorEmail}
            >
              <MdEmail color="#1f894c" />
            </CustomFormController>
            <CustomFormController
              isSignup={true}
              title={"Username"}
              type={"text"}
              value={name}
              placeholder={"Enter username"}
              setValue={setName}
              errorMessage={"Username is required."}
              isError={isErrorEmail}
            >
              <FaUserAlt color="#1f894c" />
            </CustomFormController>
            <CustomFormController
              isSignup={true}
              title={"Password"}
              type={"password"}
              value={password}
              placeholder={"Enter password"}
              setValue={setPassword}
              errorMessage={"Password is required."}
              isError={isErrorPassword}
            >
              <FaLock color="#1f894c" />
            </CustomFormController>
          </GridItem>
        </Grid>
      </CustomModal>
    </>
  );
};

NewUser.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.bool,
  fetch: PropTypes.bool,
  users: PropTypes.object,
};

export default NewUser;
