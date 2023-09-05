import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { toastposition, toastvariant } from "../../Pages/Packages";
import CustomModal from "../CustomModal";
import TextFormController from "../TextFormController";
import { PutRequest } from "../../Services/api";
import { Specialization } from "../../Services/Paths";
import PropTypes from "prop-types";

export const SpecializationModal = ({
  title,
  isOpen,
  onClose,
  data,
  fetch,
}) => {
  const toast = useToast();

  const [specialization, setSpecialization] = useState(
    data === null ? "" : data.specializations_Title
  );
  const [description, setDescription] = useState(
    data === null ? "" : data.specializations_Description
  );

  const onSave = (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append("PK_specializations_ID", data.PK_specializations_ID);
    bodyFormData.append("specializations_Title", specialization);
    bodyFormData.append("specializations_Description", description);

    PutRequest({ url: Specialization }, bodyFormData)
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad response.", { cause: res });
        }
        fetch(true);
        onClose();

        toast({
          title: "Updated Successfully!",
          position: toastposition,
          variant: toastvariant,
          status: "success",
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <CustomModal
        title={title}
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={onSave}
        hasProfile={false}
        isNew={false}
        btntitle={"Update"}
      >
        <TextFormController
          title={"Specialization"}
          value={specialization}
          setValue={setSpecialization}
          isRequired={true}
        />

        <TextFormController
          title={"Description"}
          value={description}
          setValue={setDescription}
          isRequired={true}
          textArea={true}
        />
      </CustomModal>
    </>
  );
};

SpecializationModal.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.bool,
  data: PropTypes.object,
  fetch: PropTypes.bool,
};

export default SpecializationModal;
