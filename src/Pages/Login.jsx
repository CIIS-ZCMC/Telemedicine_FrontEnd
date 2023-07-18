import { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import CustomFormController from "../Components/customs/CustomFormController";
import { useNavigate } from "react-router-dom";
import { Flex, Box, Button, Center, Text } from "@chakra-ui/react";
import AuthHeader from "../Components/AuthModule/AuthHeader";
import AuthFooter from "../Components/AuthModule/AuthFooter";
import PropTypes from "prop-types";
import useUser from "../Hooks/UserHook";
import "../Style/auth.css";

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

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useUser();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const handleReset = () => {
    setName("");
    setPassword("");
  };

  const handleSignin = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);

    let form = new FormData();
    form.append("name", name.trim());
    form.append("password", password.trim());

    signIn(form, (status, feedback) => {
      switch (status) {
        case 200:
          handleReset();
          navigate(feedback);
          break;
        case 302:
          handleReset();
          navigate("/account", { state: feedback });
          break;
        case 403:
          setFeedback(feedback);
          break;
        case 401:
          setPassword("");
          setPasswordErrorMessage(feedback);
          break;
        case 404:
          setName("");
          setPassword("");
          setEmailErrorMessage(feedback);
          break;
        default:
          setFeedback("Please try again later.");
          break;
      }

      setLoading(false);
    });
  };

  const handleNavigateToRecovery = (e) => {
    e.preventDefault();
    navigate("/account-recovery");
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
            h={["30rem", "40rem", "30rem", "30rem"]}
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
              <AuthHeader title="Sign In" />
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
                  isSignup={false}
                  type={"text"}
                  value={name}
                  setValue={setName}
                  placeholder={"Username"}
                  mt={5}
                  errorMessage={emailErrorMessage}
                  setErrorMessage={setEmailErrorMessage}
                  isRequired={false}
                >
                  <CustomIcon icon={<FaUserAlt color="teal" size={15} />} />
                </CustomFormController>
                <CustomFormController
                  isSignup={false}
                  type={"password"}
                  value={password}
                  setValue={setPassword}
                  placeholder={"Password"}
                  errorMessage={passwordErrorMessage}
                  setErrorMessage={setPasswordErrorMessage}
                  mt={3}
                  isRequired={false}
                >
                  <CustomIcon icon={<FaLock color="teal" size={15} />} />
                </CustomFormController>
                <Button
                  color={"blackAlpha.500"}
                  bg="transparent"
                  mt={[4, 4, 6, 8]}
                  _hover={{
                    bg: "transparent",
                    color: "blackAlpha.700",
                  }}
                  _active={{ bg: "white", color: "gray" }}
                  onClick={(e) => handleNavigateToRecovery(e)}
                >
                  <Text fontWeight={400} fontSize={[13, 13, 14, 14]}>
                    Forgot password?
                  </Text>
                </Button>
                <Flex
                  w="100%"
                  columnGap={5}
                  rowGap={3}
                  mt={[4, 4, 4, 8]}
                  flexDirection={["column", "column", "row", "row"]}
                >
                  <Button
                    w="inherit"
                    isLoading={loading}
                    loadingText={"Signing In"}
                    bg={"teal"}
                    color={"white"}
                    _hover={{ bg: "teal" }}
                    onClick={(e) => handleSignin(e)}
                    disabled={name === "" || password === ""}
                  >
                    <Text fontSize={[12, 12, 14, 14]}>Login</Text>
                  </Button>
                  <Button
                    w="inherit"
                    bg={"gray.400"}
                    color={"white"}
                    _hover={{
                      bg: "gray",
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

export default Login;
