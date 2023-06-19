import { Text, Grid, GridItem } from "@chakra-ui/react";
import "../Style/App.css";
import { useState } from "react";
import { toastposition, toastvariant } from "../Pages/Packages";
import TextFormController from "../Components/TextFormController";
import CustomModal from "../Components/CustomModal";
import { useToast } from "@chakra-ui/react";
import useAuth from "../Hooks/AuthContext";
import { PostRequest } from "../API/api";
import { Hospital } from "../API/Paths";
import PropTypes from "prop-types";

const NewHospital = ({ isOpen, onClose, fetch }) => {
  const { url } = useAuth();
  const toast = useToast();
  const title = "Hospital";
  const [hospital_Name, setHospital_Name] = useState("");
  const [hospital_Street, setHospital_Street] = useState("");
  const [hospital_Barangay, setHospital_Barangay] = useState("");
  const [hospital_City, setHospital_City] = useState("");

  const [hospital_url, setHospital_url] = useState("");
  const [hospital_imgPath, setHospital_imgPath] = useState("");
  const [hospital_FilePath, setHospital_FilePath] = useState("");
  const [loader, setloader] = useState(false);

  const resetState = () => {
    setHospital_Name("");
    setHospital_Street("");
    setHospital_Barangay("");
    setHospital_City("");
    setHospital_url("");
    setHospital_imgPath("");
    setHospital_FilePath("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let bodyFormData = new FormData();
    setloader(true);
    bodyFormData.append("hospital_Name", hospital_Name);
    bodyFormData.append("hospital_Street", hospital_Street);
    bodyFormData.append("hospital_Barangay", hospital_Barangay);
    bodyFormData.append("hospital_City", hospital_City);
    bodyFormData.append(
      "hospital_url",
      hospital_url === null ? url : hospital_url
    );
    bodyFormData.append("profile", hospital_FilePath);

    PostRequest({ url: Hospital }, bodyFormData)
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad response", { cause: res });
        }

        onClose();
        fetch(true);
        setloader(false);
        toast({
          title: "Added Successfully!",
          position: toastposition,
          variant: toastvariant,
          status: "success",
          isClosable: true,
        });
        resetState();
      })
      .catch((err) => {
        console.log(err);
        onClose();
        fetch(true);
        setloader(false);
        toast({
          title: "file upload unsuccessfull!",
          position: toastposition,
          variant: toastvariant,
          status: "error",
          isClosable: true,
        });
        resetState();
      });
  };

  const setLogo = (path) => {
    setHospital_imgPath(URL.createObjectURL(path.target.files[0]));
    setHospital_FilePath(path.target.files[0]);
  };

  return (
    <>
      <CustomModal
        title={title}
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={handleSubmit}
        hasProfile={true}
        isNew={true}
        btntitle={"Save"}
        logo={hospital_imgPath}
        setLogo={setLogo}
        loader={loader}
      >
        <TextFormController
          title={"Hospital name"}
          value={hospital_Name}
          setValue={setHospital_Name}
          isRequired={true}
        />
        <Text fontWeight={"bold"} mt={5}>
          Address
        </Text>
        <TextFormController
          title={"Street"}
          value={hospital_Street}
          setValue={setHospital_Street}
          isRequired={true}
        />
        <Grid templateColumns="repeat(2, 1fr)" mt={3} gap={5}>
          <GridItem w="100%">
            <TextFormController
              title={"Barangay"}
              value={hospital_Barangay}
              setValue={setHospital_Barangay}
              isRequired={true}
            />
          </GridItem>
          <GridItem w="100%">
            <TextFormController
              title={"City / Municipality"}
              value={hospital_City}
              setValue={setHospital_City}
              isRequired={true}
            />
          </GridItem>
        </Grid>
        <Text fontWeight={"bold"} mt={10}>
          Hospital Picture
        </Text>
      </CustomModal>
    </>
  );
};

NewHospital.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.bool,
  fetch: PropTypes.bool,
};

export default NewHospital;
