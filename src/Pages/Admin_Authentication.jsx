import { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import LoginHeader from "../Components/customs/LoginHeader";
import CustomFormController from "../Components/customs/CustomFormController";
import useAuth from "../Hooks/AuthContext";
import "../Style/App.css";
import { Flex, Box, Button, Grid, GridItem, Center } from "@chakra-ui/react";
import { PostRequest } from "../Services/api";
import { Auth } from "../Services/Paths";

const AdminAuthentication = () => {
  const {
    setUser,
    name,
    setName,
    password,
    setPassword,
    isErrorEmail,
    isErrorPassword,
  } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let formData = new FormData();
    formData.append("name", name);
    formData.append("password", password);

    PostRequest({ url: `${Auth}/sadmin` }, formData)
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad response.", { cause: res });
        }
        const json = res.data.data;
        setUser(json);
        sessionStorage.setItem("token", json["token"]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <Flex
        h={"100vh"}
        display={"flex"}
        justifyContent={"center"}
        bg={"#f7f5f9"}
        rounded={8}
      >
        <Box
          w={"27rem"}
          h={"27rem"}
          overflow="hidden"
          className="authbox"
          m={"auto"}
          bg={"white"}
        >
          <LoginHeader isSignup={false} />
          <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
            <Grid
              templateRows={`repeat(2, 1fr)`}
              templateColumns={`repeat(1, 1fr)`}
              gap={2}
              overflow={"hidden"}
            >
              <GridItem rowSpan={3} colSpan={[2, 1]}>
                <CustomFormController
                  title={"Username"}
                  type={"Text"}
                  value={name}
                  placeholder={`Enter username`}
                  setValue={setName}
                  errorMessage={` Email is required.`}
                  isError={isErrorEmail}
                >
                  <Box
                    w={8}
                    h={4}
                    mt={6}
                    mb={6}
                    borderRight={"1px solid #e0e0e0"}
                  >
                    <Center>
                      <FaUserAlt color="#1f894c" size={15} />
                    </Center>
                  </Box>
                </CustomFormController>
                <CustomFormController
                  title={"Password"}
                  type={"password"}
                  value={password}
                  placeholder={`Enter password`}
                  setValue={setPassword}
                  errorMessage={`Password is required.`}
                  isError={isErrorPassword}
                >
                  <Box
                    w={8}
                    h={4}
                    mt={6}
                    mb={6}
                    borderRight={"1px solid #e0e0e0"}
                  >
                    <Center>
                      <FaLock color="#1f894c" size={15} />
                    </Center>
                  </Box>
                </CustomFormController>
              </GridItem>
            </Grid>
            <Button
              isLoading={loading}
              loadingText={"Submitting"}
              type={"submit"}
              value={"Submit"}
              marginTop="30px"
              width={"100%"}
              bg={"rgb(28, 180, 93)"}
              _hover={{
                bg: "primary.800",
              }}
              color="white"
            >
              {"Sign Ins"}
            </Button>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default AdminAuthentication;
