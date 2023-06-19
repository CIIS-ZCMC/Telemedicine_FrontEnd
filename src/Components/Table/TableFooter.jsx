import { Box, Text, Flex, IconButton, Tooltip } from "@chakra-ui/react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons";
import PropTypes from "prop-types";

const TableFooter = ({
  gotoPage,
  canPreviousPage,
  previousPage,
  nextPage,
  canNextPage,
  pageIndex,
  pageOptions,
  pageCount,
}) => {
  return (
    <Flex justifyContent={"end"} mt={5}>
      <Box id="">
        <Tooltip label="First Page">
          <IconButton
            bg="white"
            fontSize="20px"
            border="1px solid gray"
            rounded={100}
            onClick={() => gotoPage(0)}
            isDisabled={!canPreviousPage}
            icon={<ArrowLeftIcon h={3} w={3} />}
            mr={4}
          />
        </Tooltip>
        <Tooltip label="Previous Page">
          <IconButton
            bg="white"
            fontSize="20px"
            border="1px solid gray"
            rounded={100}
            onClick={previousPage}
            isDisabled={!canPreviousPage}
            icon={<ChevronLeftIcon h={6} w={6} />}
          />
        </Tooltip>
      </Box>

      <Box bg={"white.200"} p={2} borderRadius={5}>
        <Flex>
          <Box fontSize={13}>Page</Box>
          <Text fontWeight="bold" fontSize={13} ml={2} as="span">
            {pageIndex + 1}
          </Text>
          <Box ml={2} fontSize={13} w={"2rem"}>
            of
          </Box>

          <Text fontSize={13} fontWeight="bold" as="span">
            {pageOptions.length}
          </Text>
        </Flex>
      </Box>

      <Box id="">
        <Tooltip label="Next Page">
          <IconButton
            bg="white"
            fontSize="20px"
            border="1px solid gray"
            rounded={100}
            onClick={nextPage}
            isDisabled={!canNextPage}
            icon={<ChevronRightIcon h={6} w={6} />}
          />
        </Tooltip>
        <Tooltip label="Last Page">
          <IconButton
            bg="white"
            fontSize="20px"
            border="1px solid gray"
            rounded={100}
            onClick={() => gotoPage(pageCount - 1)}
            isDisabled={!canNextPage}
            icon={<ArrowRightIcon h={3} w={3} />}
            ml={4}
          />
        </Tooltip>
      </Box>
    </Flex>
  );
};

TableFooter.propTypes = {
  gotoPage: PropTypes.function,
  canPreviousPage: PropTypes.bool,
  previousPage: PropTypes.integer,
  nextPage: PropTypes.function,
  canNextPage: PropTypes.bool,
  pageIndex: PropTypes.integer,
  pageOptions: PropTypes.object,
  pageCount: PropTypes.integer,
};

export default TableFooter;
