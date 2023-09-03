import { Box, Button, Center, Flex, Text, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SelectionHospital,
  SelectionSpecialization,
} from "../Components/CustomSelection";
import AuthHeader from "../Components/AuthModule/AuthHeader";
import AuthFooter from "../Components/AuthModule/AuthFooter";
import { useLocation } from "react-router-dom";
import CustomFormController from "../Components/customs/CustomFormController";
import useUser from "../Hooks/useUserHook";

const AccountRegistration = () => {
  const { registerAccount } = useUser();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState("");

  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [hospital, setHospital] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [position, setPosition] = useState("");

  const [fnameError, setFnameError] = useState("");
  const [mnameError, setMnameError] = useState("");
  const [lnameError, setLnameError] = useState("");

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigateToLogin = (e) => {
    e.preventDefault();
    localStorage.removeItem("id");
    navigate("/login", { replace: true });
  };

  const resetState = () => {
    setFname("");
    setMname("");
    setLname("");
  };

  const handleUserInformation = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);

    let form = new FormData();
    form.append("id", localStorage.getItem("id"));
    form.append("firstname", fname.trim());
    form.append("middlename", mname.trim());
    form.append("lastname", lname.trim());
    form.append("hospital", hospital.trim());
    form.append("position", position.trim());
    form.append("specialization", specialization.trim());

    registerAccount(form, (status, feedback) => {
      switch (status) {
        case 200:
          localStorage.removeItem("id");
          resetState();
          setSuccess(true);
          setFeedback(feedback);
          setLoading(false);
          break;
        default:
          setFeedback(feedback);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    if (state !== undefined) {
      localStorage.setItem("id", state);
      return;
    }

    if (
      localStorage.getItem("id") === null ||
      localStorage.getItem("id") === undefined
    ) {
      navigate("/login", { replace: true });
    }

    return () => localStorage.removeItem("id");
  }, [state, navigate]);

  return (
    <>
      <Box
        w={"100%"}
        h={"100vh"}
        bg={["white", "white", "rgba(0,0,0,0.04)", "rgba(0,0,0,0.04)"]}
      >
        <Center h="100vh">
          <Box
            w={"30rem"}
            h={hospital === 1 ? "45rem" : "40rem"}
            bg={["transparent", "transparent", "white", "white"]}
            rounded={10}
            boxShadow={["none", "none", "lg", "lg"]}
            overflow="hidden"
          >
            <Flex
              h="inherit"
              flexDirection={"column"}
              justifyContent={"space-between"}
              pl={10}
              pt={[2, 2, 5, 8]}
              pr={10}
              pb={3}
            >
              <AuthHeader title={"User information"} />
              {feedback === "" ? null : (
                <Box
                  h={"10%"}
                  pl={2}
                  pr={2}
                  rounded={5}
                  color="red"
                  display={feedback === "2" ? "none" : "block"}
                >
                  <Center h="100%">
                    <Text fontSize={[12, 12, 14, 14]}>{feedback}</Text>
                  </Center>
                </Box>
              )}
              <Box
                w={"inherit"}
                display={"flex"}
                flexDirection={"column"}
                mt={feedback === "" ? "2rem" : "1.1rem"}
              >
                <CustomFormController
                  isSignup={true}
                  type={"text"}
                  title={""}
                  value={fname}
                  setValue={setFname}
                  placeholder={"First name"}
                  errorMessage={fnameError}
                  setErrorMessage={setFnameError}
                  mt={3}
                  isRequired={false}
                />
                <CustomFormController
                  isSignup={true}
                  type={"text"}
                  title={""}
                  value={mname}
                  setValue={setMname}
                  placeholder={"Middle name"}
                  errorMessage={mnameError}
                  setErrorMessage={setMnameError}
                  mt={3}
                  isRequired={false}
                />
                <CustomFormController
                  isSignup={true}
                  type={"text"}
                  title={""}
                  value={lname}
                  setValue={setLname}
                  placeholder={"Last name"}
                  errorMessage={lnameError}
                  setErrorMessage={setLnameError}
                  mt={3}
                  isRequired={false}
                />
                <Select
                  mt={5}
                  bg="white"
                  focusBorderColor="rgba(0, 128, 128,0.5)"
                  placeholder="Position"
                  onChange={(e) => {
                    setPosition(e.target.value);
                  }}
                >
                  <option>Nurse </option>
                  <option>Doctor </option>
                </Select>
                <SelectionHospital
                  value={hospital}
                  setValue={setHospital}
                  mt={5}
                />
                {hospital === "1" ? (
                  <SelectionSpecialization
                    value={specialization}
                    setValue={setSpecialization}
                    mt={5}
                  />
                ) : null}
                {success ? (
                  <Button
                    mt={14}
                    bg={"teal"}
                    color={"white"}
                    _hover={{ bg: "teal" }}
                    onClick={(e) => navigateToLogin(e)}
                  >
                    <Text>{success ? "Go to Login" : "Save"}</Text>
                  </Button>
                ) : (
                  <Button
                    isLoading={loading}
                    loadingText={"Saving"}
                    mt={14}
                    bg={"teal"}
                    color={"white"}
                    _hover={{ bg: "teal" }}
                    isDisabled={
                      fname === "" ||
                      mname === "" ||
                      lname === "" ||
                      hospital === ""
                    }
                    onClick={(e) => handleUserInformation(e)}
                  >
                    <Text>{success ? "Go to Login" : "Save"}</Text>
                  </Button>
                )}
              </Box>
              <AuthFooter />
            </Flex>
          </Box>
        </Center>
      </Box>
    </>
  );
};

export default AccountRegistration;
