import { useState } from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { toastposition, toastvariant } from "../../Pages/Packages";
import TextFormController from "../TextFormController";
import CustomModal from "../CustomModal";
import { PutRequest } from "../../Services/api";
import PropTypes from "prop-types";

const DoctorEditModal = ({ isOpen, onClose, data, fetch, row }) => {
  const [status, setStatus] = useState(false);

  const toast = useToast();

  const [email, SetEmail] = useState(row.email);

  const [verify, setVerify] = useState(
    data.status === 1 ? "Active" : "Dissabled"
  );

  const hospital = useState(row.hospitals);

  const [name, setName] = useState(
    `${row.profile_FirstName} ${row.profile_LastName}`
  );

  const [exist, setExist] = useState(false);

  const onSave = (e) => {
    e.preventDefault();
    if (status) {
      return;
    }

    setStatus(true);

    PutRequest(
      { url: `api/approved/user` },
      {
        id: row.id,
        status: verify,
      }
    )
      .then((res) => res.data)
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad response.", { cause: res });
        }
        onClose();
        fetch(true);

        toast({
          title: "Account Updated.",
          position: toastposition,
          variant: toastvariant,
          status: "success",
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "Something went wrong",
          position: toastposition,
          variant: toastvariant,
          status: "error",
          isClosable: true,
        });
      });
    setStatus(false);
  };

  return (
    <>
      <CustomModal
        title={"Update Doctor"}
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={(e) => onSave(e)}
        hasProfile={false}
        isNew={false}
        btntitle={"Update"}
      >
        <form>
          <FormControl mt={2}>
            <TextFormController
              title={"Name"}
              value={name}
              setValue={setName}
              isRequired={true}
              isDisabled={true}
            />
          </FormControl>

          <FormControl mt={2}>
            <TextFormController
              title={"Email"}
              value={email}
              setValue={SetEmail}
              setexist={setExist}
              isRequired={false}
              isDisabled={true}
            />
            {exist && (
              <span
                style={{
                  color: "#D7777A",
                  fontSize: "13px",
                  fontWeight: "normal",
                }}
              >
                Email Already Exist!
              </span>
            )}
          </FormControl>

          <FormControl mt={2}>
            <TextFormController
              title={"Hospital"}
              value={hospital}
              setValue={SetEmail}
              setexist={setExist}
              isRequired={false}
              isDisabled={true}
            />
          </FormControl>

          <FormControl mt={2}>
            <FormLabel fontSize={14}>Account Status</FormLabel>
            <Select
              fontSize={14}
              focusBorderColor={"gray.400"}
              bg={"gray.100"}
              placeholder={"- Please Select -"}
              onChange={(e) => {
                setVerify(e.target.value);
              }}
              value={verify}
              required
            >
              <option value={1}>Active</option>
              <option value={2}>Dissabled</option>
            </Select>
          </FormControl>
        </form>
      </CustomModal>
    </>
  );
};

DoctorEditModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.bool,
  data: PropTypes.object,
  fetch: PropTypes.bool,
  row: PropTypes.object,
};

export default DoctorEditModal;
