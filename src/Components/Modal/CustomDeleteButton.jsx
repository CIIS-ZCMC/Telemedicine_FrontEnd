import { IconButton } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { MdDeleteOutline } from "react-icons/md";
import CustomModalDelete from "../CustomModalDelete";
import PropTypes from "prop-types";

export const CustomDeleteButton = ({ title, id, fetch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton color={"red.400"} onClick={onOpen}>
        <MdDeleteOutline />
      </IconButton>
      <CustomModalDelete
        title={title}
        isOpen={isOpen}
        fetch={fetch}
        id={id}
        onClose={onClose}
      />
    </>
  );
};

CustomDeleteButton.propTypes = {
  title: PropTypes.function,
  id: PropTypes.integer,
  fetch: PropTypes.bool,
};

export default CustomDeleteButton;
