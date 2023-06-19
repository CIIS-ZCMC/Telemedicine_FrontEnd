import { Box } from "@chakra-ui/react";
import {
  FaTemperatureLow,
  FaHeartbeat,
  FaLungs,
  FaWeight,
} from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { SiOxygen } from "react-icons/si";
import { GiBodyHeight } from "react-icons/gi";
import PatientMedicalBodyInformation from "./PatientMedicalBodyInformation";
import PropTypes from "prop-types";

const BodyInformation = ({
  cases_Temperature,
  cases_Respiratory,
  cases_Heart,
  cases_Blood,
  cases_Oxygen,
  cases_Weight,
  cases_Height,
}) => {
  return (
    <Box w="inherit" display="flex" flexWrap="wrap" columnGap={5} rowGap={5}>
      <PatientMedicalBodyInformation
        title="Temperature"
        value={cases_Temperature}
        icon={<FaTemperatureLow size="24" color="skyblue" />}
      />
      <PatientMedicalBodyInformation
        title="Respiratory Rate"
        value={cases_Respiratory}
        icon={<FaLungs size="24" color="green" />}
      />
      <PatientMedicalBodyInformation
        title="Heart Rate"
        value={cases_Heart}
        icon={<FaHeartbeat size="24" color="red" />}
      />
      <PatientMedicalBodyInformation
        title="Blood Pressure"
        value={cases_Blood}
        icon={<MdBloodtype size="24" color="darkred" />}
      />
      <PatientMedicalBodyInformation
        title="Oxygen Saturation"
        value={cases_Oxygen}
        icon={<SiOxygen size="24" color="darkgreen" />}
      />
      <PatientMedicalBodyInformation
        title="Weight"
        value={cases_Weight}
        icon={<FaWeight size="24" color="gray" />}
      />
      <PatientMedicalBodyInformation
        title="Height"
        value={cases_Height}
        icon={<GiBodyHeight size="24" color="gray" />}
      />
    </Box>
  );
};

BodyInformation.propTypes = {
  cases_Temperature: PropTypes.string,
  cases_Respiratory: PropTypes.string,
  cases_Heart: PropTypes.icon,
  cases_Blood: PropTypes.string,
  cases_Oxygen: PropTypes.string,
  cases_Weight: PropTypes.icon,
  cases_Height: PropTypes.icon,
};

export default BodyInformation;
