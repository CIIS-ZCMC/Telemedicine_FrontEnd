import { Text, Grid } from "@chakra-ui/react";
import PropTypes from "prop-types";

const CustomGrid = ({ title, row, column, children }) => {
  return (
    <>
      <Text mt={10} fontSize={18} color={"grey"} fontWeight={"500"}>
        {title}
      </Text>
      <Grid
        mt={3}
        templateRows={`repeat(${row}, 1fr)`}
        templateColumns={`repeat(${column}, 1fr)`}
        gap={2}
        overflow={"hidden"}
      >
        {children}
      </Grid>
    </>
  );
};

CustomGrid.propTypes = {
  title: PropTypes.string,
  row: PropTypes.object,
  column: PropTypes.object,
  children: PropTypes.object,
};

export default CustomGrid;
