import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const ModalComponent = ({
  title,
  initialRef,
  isOpen,
  onClose,
  children,
  footer,
}) => {
  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="teal">{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

ModalComponent.propTypes = {
  title: PropTypes.string,
  initialRef: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.object,
  footer: PropTypes.object,
};

export default ModalComponent;
