import { IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { PutRequest } from "../Services/api";
import { User } from "../Services/Paths";
import { BiReset } from "react-icons/bi";
import { MdOutlineMessage } from "react-icons/md";

import CustomEditButton from "./Modal/CustomEditButton";
import CustomDeleteButton from "./Modal/CustomDeleteButton";
import PropTypes from "prop-types";

const Actions = ({
  title,
  fetch,
  SpecializationData,
  hospitalData,
  cellvalue,
  row,
  data,
  user,
  id,
}) => {
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    PutRequest({ url: `${User}/reset` }, { email: row.email })
      .then((res) => res.data)
      .then((res) => {
        if (!res.statusText === "OK") {
          throw new Error("Bad response", { cause: res });
        }

        console.log("Password Reset.");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {title === "Admin Doctor" ? (
        <>
          <IconButton
            className="btn-message"
            fontSize={17}
            fontWeight={"normal"}
            color={"blue.400"}
            onClick={() => handleResetPassword()}
          >
            <BiReset />
          </IconButton>
        </>
      ) : null}
      {title === "Case" || title === "Archived Case" ? (
        <>
          <IconButton
            className="btn-message"
            fontSize={17}
            fontWeight={"normal"}
            color={"blue.400"}
            onClick={() => {
              console.log(data);
              navigate("/case/case-view", {
                state: {
                  data: cellvalue,
                  rawData: data.filter(
                    (x) => x.PK_cases_ID === cellvalue.PK_cases_ID
                  ),
                },
              });
            }}
          >
            <MdOutlineMessage />
          </IconButton>
        </>
      ) : null}

      {title !== "Archived Case" && user.user_role === "External Doctor" ? (
        <CustomEditButton
          title={title}
          data={cellvalue}
          fetch={fetch}
          rawData={data}
          SpecializationData={SpecializationData}
          hospitalData={hospitalData}
          row={row}
        />
      ) : null}

      {(title === "Navigator" && user.user_role === "Admin") ||
      user.user_role === "Super Admin" ? (
        <CustomEditButton
          title={title}
          data={cellvalue}
          fetch={fetch}
          rawData={data}
          SpecializationData={SpecializationData}
          hospitalData={hospitalData}
          row={row}
        />
      ) : null}
      {title !== "User" ? (
        <CustomDeleteButton fetch={fetch} title={title} id={[cellvalue]} />
      ) : null}
    </>
  );
};

Actions.propTypes = {
  title: PropTypes.string,
  fetch: PropTypes.bool,
  SpecializationData: PropTypes.string,
  hospitalData: PropTypes.string,
  cellvalue: PropTypes.string,
  row: PropTypes.integer,
  data: PropTypes.object,
  user: PropTypes.object,
  id: PropTypes.number,
};

export default Actions;
