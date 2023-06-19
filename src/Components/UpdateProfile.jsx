import "../Style/App.css";
import "../Style/Sidebar.css";
import { Grid, GridItem, useToast } from "@chakra-ui/react";
import useAuth from "../Hooks/AuthContext";
import { useState } from "react";
import CustomModal from "./CustomModal";
import { toastposition, toastvariant } from "../Pages/Packages";
import PropTypes from "prop-types";

const UpdateProfile = ({ isOpen, onClose }) => {
  const title = "Change Profile Picture";
  const toast = useToast();
  const [loader, setLoader] = useState(false);

  const { resetState, registerStaff } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoader(true);

    const res = await registerStaff();

    if (res !== "successs") {
      toast({
        title: "Something went wrong!",
        position: toastposition,
        variant: toastvariant,
        status: "error",
        isClosable: true,
      });
    }

    if (res === "success") {
      onClose();
      toast({
        title: "Navigator registered!.",
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
          templateRows={`repeat( 1 , 1fr)`}
          templateColumns={`repeat( 2 , 1fr)`}
          gap={2}
          overflow={"hidden"}
        >
          <GridItem rowSpan={1} colSpan={1}></GridItem>
        </Grid>
      </CustomModal>
    </>
  );
};

UpdateProfile.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.bool,
};

export default UpdateProfile;
