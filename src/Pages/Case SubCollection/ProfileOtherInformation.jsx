import useCase from "./CaseContext";
import {
  Flex,
  Box,
  Button,
  Grid,
  GridItem,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { TiAttachment } from "react-icons/ti";
import { MdCancel } from "react-icons/md";
import RowGridItem from "./RowGridItem";
import CustomGrid from "./CustomGrid";
import ColumnGridItem from "./ColumnGridItem";

const PatientOtherInformation = () => {
  const {
    cases_CC,
    setCases_CC,
    cases_HPI,
    setCases_HPI,
    cases_PMH,
    setCases_PMH,
    cases_ROS,
    setCases_ROS,
    cases_PE,
    setCases_PE,
    cases_WI,
    setCases_WI,
    cases_IMD,
    setCases_IMD,
    cases_Reason,
    setCases_Reason,
    cases_Remarks,
    setCases_Remarks,
    setFileLimit,
    selectedFiles,
    setSelectedFiles,
    sms,
    SetSms,
  } = useCase();

  const Max_Count = 5;
  const handleFileUpload = (files) => {
    const uploaded = [...selectedFiles];
    let limitExceeded = false;

    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === Max_Count) setFileLimit(true);
        if (uploaded.length > Max_Count) {
          console.log(`you can only add maximum file of ${Max_Count} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });

    if (!limitExceeded) {
      setSelectedFiles(uploaded);
      if (sms == "" || sms == null) {
        SetSms("File Attacthments");
      }
    }
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleFileUpload(chosenFiles);
  };

  return (
    <CustomGrid title={"Details"} row={2} column={1}>
      <RowGridItem
        title={"Chief Complaint"}
        value={cases_CC}
        setValue={setCases_CC}
        textArea={true}
        isRequired={true}
      />
      <ColumnGridItem
        title={"Pertinent History of Present Illness"}
        value={cases_HPI}
        setValue={setCases_HPI}
        textArea={true}
        isRequired={true}
      />
      <ColumnGridItem
        title={"Pertinent Past Medical History"}
        value={cases_PMH}
        setValue={setCases_PMH}
        textArea={true}
        isRequired={true}
      />
      <ColumnGridItem
        title={"Pertinent Review of Systems"}
        value={cases_ROS}
        setValue={setCases_ROS}
        textArea={true}
        isRequired={true}
      />
      <RowGridItem
        title={"Pertinent PE Findings"}
        value={cases_PE}
        setValue={setCases_PE}
        textArea={true}
        isRequired={true}
      />
      <ColumnGridItem
        title={"Working Impression"}
        value={cases_WI}
        setValue={setCases_WI}
        textArea={true}
        isRequired={true}
      />
      <ColumnGridItem
        title={"Initial Management Done"}
        value={cases_IMD}
        setValue={setCases_IMD}
        textArea={true}
        isRequired={true}
      />
      <ColumnGridItem
        title={"Reason for Referral"}
        value={cases_Reason}
        setValue={setCases_Reason}
        textArea={true}
        isRequired={true}
      />
      <ColumnGridItem
        title={"Paraclinical"}
        value={cases_Remarks}
        setValue={setCases_Remarks}
        textArea={true}
        isRequired={true}
      />
      <Box>
        <Box>
          <Grid templateColumns="repeat(5, 1fr)" gap={2} mt={4}>
            {Array.prototype.slice.call(selectedFiles).map((e, key) => {
              return (
                <GridItem w="100%" key={key} colSpan={[5, 5, 2, 1]}>
                  <Box
                    bg={"blackAlpha.200"}
                    p={1}
                    fontSize={13}
                    color={"blue.900"}
                    textAlign={"center"}
                    borderRadius={"5"}
                    cursor={"pointer"}
                    border={"1px solid"}
                    borderColor={"gray.400"}
                    className={"attacheditems"}
                  >
                    <Flex>
                      <TiAttachment
                        style={{
                          fontSize: "22px",
                          marginRight: "2px",
                        }}
                      />
                      {e.name}
                    </Flex>
                  </Box>
                </GridItem>
              );
            })}
          </Grid>
        </Box>

        <Stack direction={"row"} mt={10}>
          <Spacer />
          <Box>
            <Stack direction={["column", "row"]}>
              {selectedFiles.length >= 1 ? (
                <>
                  <Button
                    variant={"outline"}
                    size="sm"
                    fontWeight={"normal"}
                    color={"red.300"}
                    onClick={() => {
                      setSelectedFiles([]);
                    }}
                  >
                    Cancel{" "}
                    <MdCancel style={{ marginLeft: "3px", fontSize: "20px" }} />
                  </Button>
                </>
              ) : (
                <Button
                  variant={"outline"}
                  size="sm"
                  bg={"gray.200"}
                  color={"gray.600"}
                  fontWeight={"normal"}
                  onClick={() => {
                    document.getElementById("file").click();
                  }}
                >
                  <IoDocumentAttachOutline
                    style={{ fontSize: "20px", marginRight: "3px" }}
                  />
                  Attach File{" "}
                </Button>
              )}

              <input
                type={"file"}
                id="file"
                name="image"
                style={{ display: "none" }}
                multiple={true}
                onChange={handleFileEvent}
              />
            </Stack>
          </Box>
        </Stack>
      </Box>
    </CustomGrid>
  );
};

export default PatientOtherInformation;
