import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashAlt, FaUserLock } from "react-icons/fa";
import { MdVisibility, MdVisibilityOff, MdPassword } from "react-icons/md";
import { BsShieldLockFill } from "react-icons/bs";
import SelectionComponention from "../../Components/Selection/SelectionComponent";
import ProfileDetails from "./ProfileDetails";
import ProfileMyChats from "./ProfileMyChats";
import PropTypes from "prop-types";
import useUser from "../../Hooks/useUserHook";
import useProfile from "../../Hooks/Profile.Hook";
import useHospital from "../../Hooks/useHospitalHook";
import useSpecialization from "../../Hooks/useSpecializationHook";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const styles = [
  {
    title: "Update Account",
    background: "teal",
    color: "white",
    icon: <AiFillEdit size={20} />,
    minWidth: "5rem",
    maxWidth: "15rem",
  },
  {
    title: "Change Password",
    background: "teal",
    color: "white",
    icon: <BsShieldLockFill size={20} />,
    minWidth: "5rem",
    maxWidth: "15rem",
  },
  {
    title: "Deactive Account",
    description:
      "To continue deactivating your account\nyou must enter your password to validate\n that it is you.",
    background: "orange",
    color: "white",
    icon: <FaUserLock size={20} />,
    minWidth: "5rem",
    maxWidth: "15rem",
  },
  {
    title: "Delete Account",
    description:
      "To continue deleting your account\nyou must enter your password to validate\n that it is you.\nThis will permanently delete your account.",
    background: "red",
    color: "white",
    icon: <FaTrashAlt size={20} />,
    minWidth: "5rem",
    maxWidth: "15rem",
  },
];

const profileAlert = {
  success: {
    icon: "success",
    title: "Success!",
    text: "Profile Updated!",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Exit",
  },
  error: {
    icon: "error",
    title: "Error!",
    text: "An error occurred.",
    confirmButtonColor: "#d33",
    confirmButtonText: "OK",
  },
};

const passwordAlert = {
  success: {
    icon: "success",
    title: "Success!",
    text: "Password Updated!",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Exit",
  },
  error: {
    icon: "error",
    title: "Error!",
    text: "An error occurred.",
    confirmButtonColor: "#d33",
    confirmButtonText: "OK",
  },
};

const deactiveAlert = {
  success: {
    icon: "success",
    title: "Success!",
    text: "Account Deactivated!",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Exit",
  },
  error: {
    icon: "error",
    title: "Error!",
    text: "An error occurred.",
    confirmButtonColor: "#d33",
    confirmButtonText: "OK",
  },
};

const deleteAlert = {
  success: {
    icon: "success",
    title: "Success!",
    text: "Account Deactivated!",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Exit",
  },
  error: {
    icon: "error",
    title: "Error!",
    text: "An error occurred.",
    confirmButtonColor: "#d33",
    confirmButtonText: "OK",
  },
};

const ModalComponent = ({ title, child, isOpen, onClose, callBack }) => {
  return (
    <Modal isOpen={isOpen} isCentered="true">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{child}</ModalBody>
        <ModalFooter>
          <Flex w="15rem" justifyContent="space-around">
            <Button
              bg="teal"
              color="white"
              boxShadow="md"
              _hover={{ bg: "teal", color: "white" }}
              onClick={(e) => callBack(e, title)}
            >
              Proceed
            </Button>
            <Button
              bg="white"
              color="gray"
              boxShadow="md"
              _hover={{ bg: "gray", color: "white" }}
              onClick={() => onClose()}
            >
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

ModalComponent.propTypes = {
  title: PropTypes.string,
  child: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  callBack: PropTypes.func,
};

const ButtonComponent = ({
  title,
  color,
  background,
  icon,
  minWidth,
  maxWidth,
  callBack,
}) => {
  return (
    <Button
      width={minWidth}
      height="2.4rem"
      background={"white"}
      boxShadow="lg"
      color={background}
      rounded={20}
      _hover={{
        background,
        color,
        width: maxWidth,
        "& > div": {
          display: "inline-block",
          overflow: "hidden",
          whiteSpace: "nowrap",
        },
      }}
      onClick={(e) => callBack(e, title)}
      columnGap={5}
      overflow="hidden"
      transition="width 0.3s ease-in-out, background 0.24s ease-in, color 0.24s ease-in"
    >
      {icon} <Box display="none">{title}</Box>
    </Button>
  );
};

ButtonComponent.propTypes = {
  title: PropTypes.string,
  color: PropTypes.object,
  background: PropTypes.object,
  icon: PropTypes.object,
  minWidth: PropTypes.string,
  maxWidth: PropTypes.string,
  callBack: PropTypes.func,
};

const Container = ({ flex, children }) => {
  return (
    <Box
      w="inherit"
      h="inherit"
      bg="white"
      boxShadow="lg"
      flex={flex}
      m={5}
      rounded={10}
    >
      {children}
    </Box>
  );
};

Container.propTypes = {
  flex: PropTypes.number,
  children: PropTypes.object,
};

const AlertComponent = (props) => {
  return Swal.fire({
    icon: props.icon,
    title: props.title,
    text: props.text,
    confirmButtonColor: props.confirmButtonColor,
    confirmButtonText: props.confirmButtonText,
  });
};

const PasswordInputComponent = ({ title, placeholder, value, setValue }) => {
  const [show, setShow] = useState(false);

  return (
    <InputGroup size="md">
      <InputLeftElement pointerEvents="none">
        <MdPassword color="teal" />
      </InputLeftElement>
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder={placeholder}
        focusBorderColor="teal"
        value={value}
        onChange={(e) =>
          title === null
            ? setValue(e.target.value)
            : setValue(e.target.value, title)
        }
      />
      <InputRightElement width="4.5rem" onClick={() => setShow(!show)}>
        {show ? (
          <MdVisibility size={"22px"} color="#718096" />
        ) : (
          <MdVisibilityOff size={"22px"} color="#718096" />
        )}
      </InputRightElement>
    </InputGroup>
  );
};

PasswordInputComponent.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
};

const PasswordInputModal = ({ description }) => {
  const { password, setPassword } = useProfile();

  return (
    <Box>
      <Text fontSize={13} mb={5}>
        {description}
      </Text>
      <PasswordInputComponent
        placeholder="Enter Password"
        value={password}
        setValue={setPassword}
      />
    </Box>
  );
};

PasswordInputModal.propTypes = {
  description: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
};

const ChangePasswordModal = ({ description }) => {
  const { passwordInfo, setPasswordInfo } = useProfile();

  const components = [
    {
      title: "oldPassword",
      placeholder: "Old Password",
    },
    {
      title: "newPassword",
      placeholder: "New Password",
    },
    {
      title: "confirmedPassword",
      placeholder: "Confirm Password",
    },
  ];

  return (
    <Box>
      <Text
        fontSize={13}
        mb={5}
        color={passwordInfo["misMatch"] ? "red" : "black"}
      >
        {passwordInfo["misMatch"] ? "Password doesn't match" : description}
      </Text>
      <Flex rowGap={5} flexDirection="column">
        {components.map((value, index) => (
          <PasswordInputComponent
            key={index}
            {...value}
            value={passwordInfo[value.title]}
            setValue={setPasswordInfo}
          />
        ))}
      </Flex>
    </Box>
  );
};

ChangePasswordModal.propTypes = {
  description: PropTypes.string,
};

const InputComponent = ({ title, placeholder, value, setValue, data }) => {
  if (title === "hospital" || title === "specialization") {
    return (
      <SelectionComponention
        label={title}
        value={value}
        setValue={setValue}
        data={data}
      />
    );
  }

  function getType() {
    switch (title) {
      case "birthday":
        return "date";
      case "contact":
        return "number";
      default:
        return "text";
    }
  }

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={getType()}
        placeholder={placeholder}
        focusBorderColor="teal"
        value={title === "birthday" ? value.toISOString().slice(0, 10) : value}
        onChange={(e) =>
          title === null
            ? setValue(e.target.value)
            : title === "birthday"
            ? setValue(e.target.valueAsDate, title) // Handle date value
            : setValue(e.target.value, title)
        }
      />
    </InputGroup>
  );
};

InputComponent.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  child: PropTypes.object,
  data: PropTypes.object,
};

const UpdateProfileModal = ({ description }) => {
  const { profileInfo, setProfileInfo } = useProfile();
  const { hospitals } = useHospital();
  const { specializations } = useSpecialization();

  const components = [
    {
      title: "firstname",
      placeholder: "First Name",
    },
    {
      title: "middlename",
      placeholder: "Middle Name",
    },
    {
      title: "lastname",
      placeholder: "Last Name",
    },
    {
      title: "sex",
      placeholder: "Select Sex",
    },
    {
      title: "birthday",
      placeholder: "Date of Birth",
    },
    {
      title: "address",
      placeholder: "Address(Street, Barangay, City)",
    },
    {
      title: "contact",
      placeholder: "Contact Number",
    },
    {
      title: "position",
      placeholder: "Position (Ex. Doctor)",
    },
    {
      title: "hospital",
      placeholder: "Select Hospital",
    },
    {
      title: "specialization",
      placeholder: "Select Specialization",
    },
  ];

  function getDatas(title) {
    switch (title) {
      case "hospital":
        return hospitals;
      case "specialization":
        return specializations;
      default:
        return null;
    }
  }

  return (
    <Box>
      <Text fontSize={13} mb={5} color={"black"}>
        {description}
      </Text>
      <Flex flexWrap="wrap" rowGap={5} columnGap={5}>
        {components.map((value, index) => (
          <InputComponent
            key={index}
            {...value}
            value={profileInfo[value.title]}
            setValue={setProfileInfo}
            data={getDatas(value.title)}
          />
        ))}
      </Flex>
    </Box>
  );
};

UpdateProfileModal.propTypes = {
  description: PropTypes.string,
};

const ModalBodyComponent = ({ title }) => {
  const { profileInfo, passwordInfo } = useProfile();

  switch (title) {
    case styles[0].title:
      return <UpdateProfileModal description={profileInfo.description} />;
    case styles[1].title:
      return <ChangePasswordModal description={passwordInfo.description} />;
    case styles[2].title:
      return <PasswordInputModal description={styles[1].description} />;
    case styles[3].title:
      return <PasswordInputModal description={styles[2].description} />;
    default:
      return <Box>404</Box>;
  }
};

ModalBodyComponent.propTypes = {
  title: PropTypes.string,
};

const Profile = () => {
  const { signOut } = useUser();
  const { hospitals, getHospital } = useHospital();
  const { specializations, getSpecialization } = useSpecialization();
  const {
    deactivateAccount,
    deleteAccount,
    password,
    passwordInfo,
    setPasswordInfo,
    profileInfo,
    updatePassword,
    updateProfile,
  } = useProfile();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");

  function handleProceed(e, title) {
    onClose();
    switch (title) {
      case styles[0].title:
        handleProfileUpdate(e);
        break;
      case styles[1].title:
        handlePasswordUpdate(e);
        break;
      case styles[2].title:
        handleDeactivateAccount(e);
        break;
      case styles[3].title:
        handleDeleteAccount(e);
        break;
      default:
        console.log("Something went wrong...");
    }
  }

  function handleOpenModal(e, title) {
    e.preventDefault();
    setTitle(title);
    onOpen();
  }

  function handleSignOut() {
    signOut((status, feedback) => {
      switch (status) {
        case 200:
          console.log("Signing out..");
          break;
        default:
          console.log(feedback);
      }
    });
  }

  function handleProfileUpdate(e) {
    e.preventDefault();

    let form = new FormData();
    Object.keys(profileInfo).forEach((key) => {
      if (key !== "description") {
        form.append(key, profileInfo[key]);
      }
    });

    updateProfile(form, (status, feedback) => {
      switch (status) {
        case 200:
          console.log(feedback);
          AlertComponent(profileAlert["success"]);
          break;
        default:
          console.log(feedback);
          AlertComponent(profileAlert["error"]);
      }
    });
  }

  function handlePasswordUpdate(e) {
    e.preventDefault();

    if (passwordInfo["newPassword"] !== passwordInfo["confirmedPassword"]) {
      setPasswordInfo(true, "misMatch");
      setPasswordInfo("", "newPassword");
      setPasswordInfo("", "confirmedPassword");
      return;
    }

    let form = new FormData();
    form.append("oldPassword", passwordInfo["oldPassword"].trim());
    form.append("newPassword", passwordInfo["newPassword"].trim());

    updatePassword(form, (status, feedback) => {
      switch (status) {
        case 200:
          console.log(feedback);
          AlertComponent(passwordAlert["success"]);
          break;
        default:
          console.log(feedback);
          AlertComponent(passwordAlert["error"]);
      }
    });
  }

  function handleDeactivateAccount(e) {
    e.preventDefault();

    console.log("Called deactivate");
    deactivateAccount(password, (status, feedback) => {
      switch (status) {
        case 200:
          console.log(feedback);
          AlertComponent(deactiveAlert["success"], handleSignOut);
          break;
        default:
          console.log(feedback);
          AlertComponent(...deactiveAlert["error"]);
      }
    });
  }

  function handleDeleteAccount() {
    AlertComponent(deleteAlert["success"]);
    deleteAccount(password, (status, feedback) => {
      switch (status) {
        case 200:
          console.log(feedback);
          AlertComponent(...deleteAlert["success"], handleSignOut);
          break;
        default:
          console.log(feedback);
          AlertComponent(...deleteAlert["error"]);
      }
    });
  }

  useEffect(() => {
    if (hospitals.length === 0) {
      getHospital();
    }

    if (specializations.length === 0) {
      getSpecialization();
    }
  }, []);

  return (
    <Box w="100%" h="90%" position="relative">
      <Flex w="100%" h="100%">
        <Container flex={2}>
          <ProfileDetails />
          <Flex mt={10} justifyContent="space-between" mr={10}>
            <Box flex={2}></Box>
            <Flex flex={2} justifyContent="space-around" gap={1}>
              {styles.map((style, index) => (
                <ButtonComponent
                  key={index}
                  {...style}
                  callBack={handleOpenModal}
                />
              ))}
            </Flex>
          </Flex>
        </Container>
        <Container flex={1}>
          <ProfileMyChats />
        </Container>
      </Flex>
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        child={<ModalBodyComponent title={title} />}
        callBack={handleProceed}
      />
    </Box>
  );
};

export default Profile;
