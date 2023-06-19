import TextFormController from "../../Components/TextFormController";
import { GridItem } from "@chakra-ui/react";
import PropTypes from "prop-types";

const ColumnGridItem = ({ title, value, setValue, colSpan, textArea }) => {
  return (
    <GridItem colSpan={colSpan}>
      <TextFormController
        title={title}
        value={value}
        setValue={setValue}
        isRequired={true}
        textArea={textArea}
      />
    </GridItem>
  );
};

ColumnGridItem.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.function,
  colSpan: PropTypes.object,
  textArea: PropTypes.bool,
};

export default ColumnGridItem;
