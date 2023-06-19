import { Box, useToast, Grid, GridItem, Center } from "@chakra-ui/react";
import "../Style/App.css";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import CustomModal from "../Components/CustomModal";
import { toastposition, toastvariant } from "../Pages/Packages";
import CustomFormController from "../Components/customs/CustomFormController";
import useAuth from "../Hooks/AuthContext";
import { PostRequest } from "../API/api";
import PropTypes from "prop-types";

const NewDoctor = ({ isOpen, onClose, users }) => {
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
    url,
  } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validate = users.filter((x) => x.email === email);

    if (validate.length >= 1) {
      toast({
        title: "Email Already Exist!",
        position: toastposition,
        variant: toastvariant,
        status: "error",
        isClosable: true,
      });
    } else {
      setLoader(true);
      let bodyFormData = new FormData();
      bodyFormData.append("name", name);
      bodyFormData.append("email", email);
      bodyFormData.append("password", password);
      bodyFormData.append("profile", url);
      bodyFormData.append("profile_FirstName", doctors_FirstName);
      bodyFormData.append("profile_LastName", doctors_LastName);

      PostRequest({ url: "api/signup2" }, bodyFormData)
        .then((res) => res.data)
        .then((res) => {
          console.log(res);
          if (!res.statusText === "OK") {
            throw new Error("Bad response.", { cause: res });
          }

          toast({
            title: "Success!",
            position: toastposition,
            variant: toastvariant,
            status: "success",
            isClosable: true,
          });
        })
        .catch((err) => {
          const { status } = err;
          switch (status) {
            case 400:
              console.log("Something went wrong!");
              break;
            default:
              console.log("Problem encounter. try again later.");
              break;
          }
        });

      setLoader(false);
    }
  };

  return (
    <>
      <CustomModal
        title={"New Navigator"}
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={handleSubmit}
        hasProfile={false}
        isNew={true}
        btntitle={"Save"}
        loader={loader}
      >
        <Grid
          templateRows={`repeat( 5 , 1fr)`}
          templateColumns={`repeat( 1 , 1fr)`}
          gap={2}
          overflow={"hidden"}
        >
          <GridItem rowSpan={5} colSpan={[2, 1]}>
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

NewDoctor.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.bool,
  users: PropTypes.object,
};

export default NewDoctor;
