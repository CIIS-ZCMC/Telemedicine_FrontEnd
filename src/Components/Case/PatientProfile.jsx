import { Text, Heading, Box, Image } from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState, useCallback } from "react";
import { GetRequest } from "../../Services/api";
import { Patient } from "../../Services/Paths";
import PropTypes from "prop-types";
import profileF from "../../assets/female_default_profile.jpg";
import profileM from "../../assets/male_default_profile.jpg";

const TextDisplay = ({ title, value }) => {
  return (
    <Box>
      <Text fontSize={14}>{title}:</Text>
      <Heading size="sm">{value}</Heading>
    </Box>
  );
};

TextDisplay.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
};

const PatientProfile = ({ id }) => {
  const [patient, setPatient] = useState([]);
  const [fetch, setFetch] = useState(true);

  const handleFetchInformation = useCallback(() => {
    GetRequest({ url: `${Patient}/${id}` })
      .then((res) => res.data)
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad response.");
        }

        const { data } = res;

        setPatient(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    if (fetch) {
      setFetch(false);
    }

    handleFetchInformation();

    return () => setFetch(false);
  }, [fetch, handleFetchInformation]);

  return (
    <Box
      h="22%"
      display="flex"
      flexDirection={["column", "column", "row", "row"]}
      columnGap={8}
      alignItems="start"
      p={2}
      mb={5}
    >
      <Box
        h="100%"
        display="flex"
        justifyContent={["center", "center", "start", "start"]}
        p={[2, 2, 0, 0]}
      >
        <Box w="10rem">
          <Image src={patient.gender === "FEMALE" ? profileF : profileM} />
        </Box>
      </Box>
      <Box
        display="flex"
        columnGap={12}
        rowGap={5}
        flexWrap="wrap"
        alignItems="end"
        pt="2"
        pr={3}
      >
        <TextDisplay
          title="Name (Last, First Mi)"
          value={`${patient.last_name}, ${patient.first_name}  ${patient.middle_name}.`}
        />
        <TextDisplay
          title="Age"
          value={`${
            new Date().getFullYear() - new Date(patient.birthday).getFullYear()
          }yrs (${moment(patient.birthday).format("L")})`}
        />
        <TextDisplay title="Sex" value={`${patient.gender}`} />
        <TextDisplay title="Civil Status" value={`${patient.civil_status}`} />
        <TextDisplay title="Contact" value={`${patient.contact}`} />
        <TextDisplay title="Birth place" value={`${patient.birthplace}`} />
        <TextDisplay title="Ethnicity" value={`${patient.ethnicity}`} />
        <TextDisplay title="Dialect" value={`${patient.dialect}`} />
        <TextDisplay
          title="Address (Street, Barangay, City)"
          value={`${patient.street}, ${patient.barangay}, ${patient.city}`}
        />
      </Box>
    </Box>
  );
};

PatientProfile.propTypes = {
  id: PropTypes.string,
};

export default PatientProfile;
