import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import CustomFormController from "../Components/customs/CustomFormController";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../Components/AuthModule/AuthHeader";
import AuthFooter from "../Components/AuthModule/AuthFooter";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import PropTypes from "prop-types";
import useUser from "../Hooks/UserHook";

const CustomIcon = ({ icon }) => {
  return (
    <Box w={8} h={4} mt={6} mb={6} borderRight={"1px solid rgba(0,0,0,0.2)"}>
      <Center>{icon}</Center>
    </Box>
  );
};

CustomIcon.propTypes = {
  icon: PropTypes.object,
};

const Registration = () => {
  const { signUp } = useUser();
  const navigate = useNavigate();

  const defaultProfileURL = `${window.location.origin}/default_profile.png`;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [feedback, setFeedback] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [loading, setLoading] = useState(false);

  const validatePasword = () => password === confirmPassword;

  const reset = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);

    if (validatePasword) {
      let form = new FormData();
      form.append("name", username.trim());
      form.append("email", email.trim());
      form.append("password", password.trim());
      form.append("url", defaultProfileURL);

      signUp(form, (status, feedback) => {
        switch (status) {
          case 200:
            navigate("/account", {
              replace: true,
              state: { id: feedback, password: password, message: "" },
            });
            reset();
            break;
          case 400:
            setFeedback("Please check your inputs.");
            break;
          default:
            setFeedback("Please try again later.");
            break;
        }
        setLoading(false);
      });
      return;
    }

    setPassword("");
    setConfirmPassword("");
    setPasswordError("Password doesn't match.");
    setConfirmPasswordError("Password doesn't match.");
  };

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
            h={"35rem"}
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
              <AuthHeader title={"Sign up"} />
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
                h={"inherit"}
                display={"flex"}
                flexDirection={"column"}
                mt={"1rem"}
              >
                <CustomFormController
                  isSignup={false}
                  type={"text"}
                  title={""}
                  value={username}
                  setValue={setUsername}
                  placeholder={"Username"}
                  errorMessage={nameError}
                  setEmailError={setNameError}
                  isError={false}
                  mt={5}
                  isRequired={false}
                >
                  <CustomIcon icon={<FaUserAlt color="teal" size={15} />} />
                </CustomFormController>
                <CustomFormController
                  isSignup={false}
                  type={"text"}
                  title={""}
                  value={email}
                  setValue={setEmail}
                  placeholder={"Email"}
                  errorMessage={emailError}
                  setErrorMessage={setEmailError}
                  isError={false}
                  mt={3}
                  isRequired={false}
                >
                  <CustomIcon icon={<MdEmail color="teal" size={15} />} />
                </CustomFormController>
                <CustomFormController
                  isSignup={false}
                  type={"password"}
                  title={""}
                  value={password}
                  setValue={setPassword}
                  placeholder={"Password"}
                  errorMessage={passwordError}
                  setErrorMessage={setPasswordError}
                  isError={false}
                  mt={3}
                  isRequired={false}
                >
                  <CustomIcon icon={<FaLock color="teal" size={15} />} />
                </CustomFormController>
                <CustomFormController
                  isSignup={false}
                  type={"password"}
                  title={""}
                  value={confirmPassword}
                  setValue={setConfirmPassword}
                  placeholder={"Confirm password"}
                  errorMessage={confirmPasswordError}
                  setErrorMessage={setConfirmPassword}
                  isError={false}
                  mt={3}
                  isRequired={false}
                >
                  <CustomIcon icon={<FaLock color="teal" size={15} />} />
                </CustomFormController>
                <Flex
                  w="100%"
                  columnGap={5}
                  rowGap={3}
                  mt={[10, 10, 12, 14]}
                  flexDirection={["column", "column", "row", "row"]}
                >
                  <Button
                    w="inherit"
                    isLoading={loading}
                    loadingText={"Signing In"}
                    bg={"teal"}
                    color={"white"}
                    _hover={{ bg: "teal" }}
                    onClick={(e) => handleSignup(e)}
                    disabled={
                      username === "" ||
                      email === "" ||
                      password === "" ||
                      password !== confirmPassword
                    }
                  >
                    <Text fontSize={[12, 12, 14, 14]}>Register</Text>
                  </Button>
                  <Button
                    w="inherit"
                    bg={"gray"}
                    color={"white"}
                    _hover={{
                      bg: "darkorange",
                    }}
                    onClick={() => navigate(-1)}
                  >
                    <Text fontSize={[12, 12, 14, 14]}>Back</Text>
                  </Button>
                </Flex>
              </Box>
              <AuthFooter />
            </Flex>
          </Box>
        </Center>
      </Box>
    </>
  );
};

export default Registration;
