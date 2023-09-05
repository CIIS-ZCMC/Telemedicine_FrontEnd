import { useState } from "react";
import { toastposition, toastvariant } from "../Pages/Packages";
import TextFormController from "../Components/TextFormController";
import CustomModal from "../Components/CustomModal";
import { useToast } from "@chakra-ui/react";
import { PostRequest } from "../Services/api";
import { Specialization } from "../Services/Paths";
import PropTypes from "prop-types";

const NewSpecialization = ({ isOpen, onClose, fetch }) => {
  const title = "New Specialization";
  const [tittle, setSpecialization] = useState("");
  const [des, setDescription] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("specialiations_Title", tittle);
    formData.append("specialiations_Description", des);

    PostRequest(
      { url: Specialization },
      {
        specializations_Title: tittle,
        specializations_Description: des,
      }
    )
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad response.", { cause: res });
        }
        onClose();
        setSpecialization("");
        setDescription("");
        fetch(true);

        toast({
          title: "Added Successfully!",
          position: toastposition,
          variant: toastvariant,
          status: "success",
          isClosable: true,
        });
        console.log("success");
      })
      .catch((err) => {
        toast({
          title: "Failed to add specialization!",
          position: toastposition,
          variant: toastvariant,
          status: "error",
          isClosable: true,
        });
        console.log(err);
      });
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
      >
        <TextFormController
          title={"Specialization"}
          value={tittle}
          setValue={setSpecialization}
          isRequired={true}
        />

        <TextFormController
          title={"Description"}
          value={des}
          setValue={setDescription}
          isRequired={true}
          textArea={true}
        />
      </CustomModal>
    </>
  );
};

NewSpecialization.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.bool,
  fetch: PropTypes.bool,
};

export default NewSpecialization;
