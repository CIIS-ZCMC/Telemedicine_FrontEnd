import TextFormController from "../../Components/TextFormController";
import { GridItem } from "@chakra-ui/react";
import PropTypes from "prop-types";

const RowGridItem = ({ title, value, setValue, colSpan, isType, max }) => {
  return (
    <GridItem rowSpan={1} colSpan={colSpan}>
      <TextFormController
        title={title}
        value={value}
        setValue={setValue}
        isRequired={true}
        DateOnly={true}
        isType={isType}
        max={max}
      />
    </GridItem>
  );
};

RowGridItem.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.function,
  colSpan: PropTypes.object,
  isType: PropTypes.bool,
  max: PropTypes.int,
};

export default RowGridItem;
