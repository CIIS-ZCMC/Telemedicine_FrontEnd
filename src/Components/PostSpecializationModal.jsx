import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { toastposition, toastvariant } from "../Pages/Packages";
import CustomModal from "../Components/CustomModal";
import { SelectionSpecialization } from "../Components/CustomSelection";
import { Specialization } from "../Services/Paths";
import { PutRequest } from "../Services/api";
import PropTypes from "prop-types";

const PostSpecializationModal = ({ isOpen, onClose, caseID }) => {
  const title = "ADD Specialization";
  const [FK_specializations_ID, setFK_specializations_ID] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("FK_specializations_ID", FK_specializations_ID);
    formData.append("FK_cases_ID", caseID);

    PutRequest({ url: `${Specialization}case/add` })
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad response.", { cause: res });
        }
        onClose();
        fetch(true);

        toast({
          title: "Added Successfully!",
          position: toastposition,
          variant: toastvariant,
          status: "success",
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Failed to add specialization!",
          position: toastposition,
          variant: toastvariant,
          status: "error",
          isClosable: true,
        });
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
        <SelectionSpecialization
          title={"Specialization"}
          value={FK_specializations_ID}
          setValue={setFK_specializations_ID}
          mt={5}
        />
      </CustomModal>
    </>
  );
};

PostSpecializationModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.bool,
  caseID: PropTypes.string,
};

export default PostSpecializationModal;
