import TextFormController from "../../Components/TextFormController";
import { GridItem } from "@chakra-ui/react";
import PropTypes from "prop-types";

const RowGridItem = ({ title, value, setValue, textArea, isRequired }) => {
  return (
    <GridItem rowSpan={1} colSpan={[4, 4, 2, 1]}>
      <TextFormController
        title={title}
        value={value}
        setValue={setValue}
        textArea={textArea}
        isRequired={isRequired}
      />
    </GridItem>
  );
};

RowGridItem.propTypes = {
  title: PropTypes.string,
  value: PropTypes.object,
  setValue: PropTypes.function,
  textArea: PropTypes.bool,
  isRequired: PropTypes.bool,
};

export default RowGridItem;
