import {
  Box,
  Button,
  Center,
  Flex,
  Text,
  Grid,
  GridItem,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import AuthBackground from "../Components/AuthModule/AuthBackground";
import AuthHeader from "../Components/AuthModule/AuthHeader";
import AuthFooter from "../Components/AuthModule/AuthFooter";
import CustomFormController from "../Components/customs/CustomFormController";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { PostRequest } from "../API/api";
import { Auth } from "../API/Paths";
import { HiEmojiSad } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import RecoveryCode from "./User/RecoveryCode";
import NewPassword from "./User/NewPassword";
import "../Style/App.css";

const PasswordRecovery = () => {
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState("");

  const [btnLabel, setBtnLabel] = useState("Send Code");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [validate, setValidate] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [code, setCode] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);

    if (btnLabel !== "Send Code") {
      return;
    }

    const trimEmail = email.trim();
    PostRequest({ url: `${Auth}/recovery` }, { email: trimEmail })
      .then((res) => res.data)
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad response", { cause: res });
        }

        setValidate(true);
        setBtnLabel("Validate Code");
      })
      .catch((err) => {
        const {
          response: {
            status,
            data: { message },
          },
        } = err;

        switch (status) {
          case 400:
            console.log(message);
            break;
          default:
            console.log(message);
            break;
        }
      })
      .finally(() => setLoading(false));
  };

  const handleValidateResetCode = (e) => {
    e.preventDefault();
    if (btnLabel !== "Validate Code") {
      return;
    }

    setLoading(true);
    const trimEmail = email.trim();
    const trimCode = code.trim();
    PostRequest(
      { url: `${Auth}/recovery-validate` },
      { email: trimEmail, code: trimCode }
    )
      .then((res) => {
        console.log(res);
        if (res.statusText !== "OK") {
          throw new Error("Bad response", { cause: res });
        }

        setSuccess(true);
        setBtnLabel("Submit");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmitNewPassword = (e) => {
    e.preventDefault();

    setLoading(true);
    if (btnLabel !== "Submit") {
      return;
    }
    const trimEmail = email.trim();
    const trimConfirmPassword = confirmPassword;
    const trimPassword = newPassword;

    if (trimConfirmPassword !== trimPassword) {
      return;
    }

    PostRequest(
      { url: `${Auth}/reset-password` },
      { password: trimPassword, email: trimEmail }
    )
      .then((res) => res.data)
      .then((res) => {
        if (!res.statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        setBtnLabel("Success");
        setResetSuccess(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const handleNavigateToLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <>
      <Box
        w={"100%"}
        h={"100vh"}
        bg={"rgba(0,0,0,0.1)"}
        position={"absolute"}
        backgroundImage={"linear-gradient(#B0F3F1,#FFCFDF)"}
      >
        <Box
          display={["block", "block", "none", "none"]}
          textAlign="center"
          pt={3}
          pb={2}
          letterSpacing={4}
        >
          <Heading size={"lg"} color="teal">
            ZCMC REGIONAL TELEMEDICINE CENTER
          </Heading>
        </Box>
        <Box
          w={["100%", "100%", "70%", "60%"]}
          h={["80%", "80%", "70%", "70%"]}
          left={"50%"}
          top={"50%"}
          transform="translate(-50%, -50%)"
          position={"absolute"}
          boxShadow={["none", "none", "2xl", "2xl"]}
          rounded={15}
          overflow={"hidden"}
        >
          <Grid
            templateRows={"repeat(1, 1fr)"}
            templateColumns="repeat(12, 1fr)"
          >
            <GridItem rowSpan={1} colSpan={[12, 12, 12, 7]}>
              <AuthBackground />
            </GridItem>
            <GridItem rowSpan={[1, 1, 1, 0]} colSpan={[12, 12, 12, 5]}>
              <Box
                w={"100%"}
                h={"100%"}
                bg={[
                  "transparent",
                  "transparent",
                  "whiteAlpha.900",
                  "whiteAlpha.600",
                ]}
              >
                <Flex
                  flexDirection={"column"}
                  justifyContent={"space-between"}
                  pl={10}
                  pt={[2, 2, 0, 8]}
                  pr={10}
                  pb={3}
                  h={["70vh", "70vh", "50vh", "70vh"]}
                >
                  <AuthHeader title="Recover Account" />
                  <Box
                    w={"inherit"}
                    h={"inherit"}
                    display={"flex"}
                    flexDirection={"column"}
                    mt={"4rem"}
                  >
                    <Box
                      bg="red"
                      pl={2}
                      pr={2}
                      rounded={5}
                      color="white"
                      display={feedback === "" ? "none" : "block"}
                    >
                      <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        columnGap={2}
                      >
                        <Flex alignItems="center" columnGap={2}>
                          <HiEmojiSad size={25} />
                          <Text fontSize={[12, 12, 14, 14]}>{feedback}</Text>
                        </Flex>
                        <IconButton
                          bg="red"
                          _hover={{ bg: "red" }}
                          _active={{ bg: "red" }}
                          icon={<IoClose size={30} />}
                          onClick={() => setFeedback("")}
                        />
                      </Flex>
                    </Box>
                    <Text fontSize={12} color={"grey"}>
                      {validate === false && success === false
                        ? `A recovery link will be sent to your email that is binded
                      with your account. Upon submitting open your Gmail app on
                      your phone or signin you Gmail account in Google chome and
                      check your inbox for recovery Link. Click the link and it
                      will redirect to a change password to update your account
                      password.`
                        : `A code has been sent to your email  ${email}. 
                        Enter the code to validate.`}
                    </Text>
                    {validate && success & resetSuccess ? null : validate &&
                      success === false ? (
                      <RecoveryCode setCode={setCode} />
                    ) : validate === false && success === false ? (
                      <CustomFormController
                        isSignup={false}
                        type={"text"}
                        title={""}
                        value={email}
                        setValue={setEmail}
                        placeholder={"Email"}
                        errorMessage={""}
                        isError={false}
                        mt={5}
                      >
                        <Box
                          w={8}
                          h={4}
                          mt={6}
                          mb={6}
                          borderRight={"1px solid rgba(0,0,0,0.2)"}
                        >
                          <Center>
                            <MdEmail color="teal" size={15} />
                          </Center>
                        </Box>
                      </CustomFormController>
                    ) : (
                      <NewPassword
                        newPassword={newPassword}
                        setNewPassword={setNewPassword}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                      />
                    )}

                    {resetSuccess ? null : (
                      <Button
                        isLoading={loading}
                        loadingText={"Signing In"}
                        mt={14}
                        bg={"teal"}
                        color={"white"}
                        _hover={{ bg: "teal" }}
                        onClick={(e) => {
                          if (validate && success) {
                            handleSubmitNewPassword(e);
                            return;
                          }

                          if (validate) {
                            handleValidateResetCode(e);
                            return;
                          }

                          handleClick(e);
                        }}
                      >
                        <Text>{btnLabel}</Text>
                      </Button>
                    )}
                    <Button
                      bg={resetSuccess ? "teal" : "gray"}
                      color={"white"}
                      mt={3}
                      _hover={{
                        bg: "darkorange",
                      }}
                      onClick={(e) => handleNavigateToLogin(e)}
                    >
                      <Text>{resetSuccess ? "Go to Login" : "Back"}</Text>
                    </Button>
                  </Box>
                  <AuthFooter />
                </Flex>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default PasswordRecovery;