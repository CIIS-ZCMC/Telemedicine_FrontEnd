import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import PatientProfile from "./PatientProfile";
import { GetRequest } from "../../API/api";
import { Case } from "../../API/Paths";
import CaseParaclinicalFiles from "./CaseParaclinicalFiles";
import BodyInformation from "./BodyInformation";
import CaseMainInformation from "./CaseMainInformation";
import CaseReferrerInformation from "./CaseRefererinformation";
import PropTypes from "prop-types";

const CaseInformation = ({ id, data }) => {
  const [caseinformation, setCaseInformation] = useState([]);
  const [fetch, setFetch] = useState(false);

  const handleFetch = () => {
    GetRequest({ url: `${Case}/c/${id}` })
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad response.", { cause: res });
        }
        const {
          data: { data },
        } = res;
        setCaseInformation(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (fetch) {
      setFetch(false);
    }
    // https://zcmc-telemedserver.online/api/case/c/673
    handleFetch();

    return () => setFetch(false);
  }, [fetch]);

  return (
    <Box w="inherit" pl={5}>
      <Box
        h={["45vh", "50vh", "94vh", "94vh"]}
        overflow={"auto"}
        pt={10}
        pb={[0, 0, 10, 10]}
      >
        <CaseReferrerInformation data={data} caseinfo={caseinformation} />
        <PatientProfile id={id} />
        <Box pt={5} pr={5}>
          <BodyInformation case={caseinformation} />
          <CaseMainInformation case={caseinformation} />
          <CaseParaclinicalFiles id={id} />
        </Box>
      </Box>
    </Box>
  );
};

CaseInformation.propTypes = {
  id: PropTypes.string,
  data: PropTypes.object,
};

export default CaseInformation;
