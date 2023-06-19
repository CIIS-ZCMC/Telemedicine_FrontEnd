import { Avatar, Badge, Box, Text, Tr, Td, Flex } from "@chakra-ui/react";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import CustomViewButton from "../Modal/CustomViewModal";
import useAuth from "../../Hooks/AuthContext";
import PropTypes from "prop-types";
import Actions from "../Actions";
import avatageImage from "../../assets/default_profile.png";

const TableRow = ({
  title,
  page,
  pageIndex,
  data,
  SpecializationData,
  hospitalData,
  prepareRow,
  props,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { user_role } = user;

  const handleClick = (e, data) => {
    e.preventDefault();
    if (props.title.toLowerCase().includes("case")) {
      navigate("/case-view", { state: data });
    }
  };

  return (
    <>
      {page.map((row, i) => {
        prepareRow(row);
        return (
          <Tr
            key={i}
            onClick={(e) => handleClick(e, row.original)}
            className="td"
            {...row.getRowProps()}
          >
            {row.cells.map((cell, i) => {
              return (
                <Td key={i} textAlign="center" {...cell.getCellProps()}>
                  {cell.column.id === "action" ? (
                    <Flex columnGap={3}>
                      {title === "Patient" || title === "User" ? (
                        <CustomViewButton
                          title={title}
                          data={data}
                          id={[cell.row.values]}
                        />
                      ) : (
                        ""
                      )}
                      {title === "Case" ? (
                        user.user_role === "Super Admin" ||
                        user.user_role === "Admin" ? (
                          /* Restrict Admin */
                          <>
                            <Actions
                              title={title}
                              cellvalue={cell.row.values}
                              fetch={fetch}
                              rawData={data}
                              SpecializationData={SpecializationData}
                              hospitalData={hospitalData}
                              row={row.values}
                              props={props}
                              user={user}
                            />
                          </>
                        ) : (
                          <>
                            <Actions
                              title={title}
                              cellvalue={cell.row.values}
                              fetch={fetch}
                              rawData={data}
                              SpecializationData={SpecializationData}
                              hospitalData={hospitalData}
                              row={row.values}
                              props={props}
                              user={user}
                            />
                          </>
                        )
                      ) : (
                        <>
                          <Actions
                            title={title}
                            cellvalue={cell.row.values}
                            fetch={fetch}
                            rawData={data}
                            SpecializationData={SpecializationData}
                            hospitalData={hospitalData}
                            row={row.values}
                            props={props}
                            user={user}
                          />
                        </>
                      )}
                    </Flex>
                  ) : cell.column.Header === "ID" ? (
                    <Box display="flex" columnGap={3}>
                      <Text>{cell.row.values.id}</Text>
                      {!!row.original.notif &&
                      row.original.notif !== 1 &&
                      user_role !== "External Doctor" ? (
                        <Badge fontSize={10} colorScheme={"green"}>
                          New message
                        </Badge>
                      ) : (
                        ""
                      )}
                      {!!row.original.notif &&
                      row.original.case_status === 0 &&
                      user_role !== "External Doctor" ? (
                        <Badge fontSize={10} colorScheme={"green"}>
                          New Case
                        </Badge>
                      ) : (
                        ""
                      )}
                    </Box>
                  ) : cell.column.id === "profile" ? (
                    <>
                      <Avatar
                        size="sm"
                        src={
                          cell.row.values.profile === "NONE"
                            ? avatageImage
                            : cell.row.values.profile
                        }
                      />
                    </>
                  ) : cell.column.id === "case_status" ? (
                    <>
                      <Badge
                        variant="subtle"
                        colorScheme={
                          cell.row.values.case_status === 0
                            ? "red"
                            : cell.row.values.case_status === 1
                            ? "green"
                            : "blue"
                        }
                      >
                        {cell.row.values.case_status === 0
                          ? "Pending"
                          : cell.row.values.case_status !== 1
                          ? "Done"
                          : "Active"}
                      </Badge>
                    </>
                  ) : cell.column.id === "specializations_Title" ? (
                    <Text fontWeight={"bold"}>
                      {cell.row.values.specializations_Title}
                    </Text>
                  ) : cell.column.id === "created_at" ? (
                    moment(cell.row.values.created_at).format("MMM DD, YYYY")
                  ) : cell.column.id === "updated_at" ? (
                    moment(cell.row.values.updated_at).format("MMM DD, YYYY")
                  ) : cell.column.id === "hospital_Name" ? (
                    <Text fontWeight={"bold"} textTransform={"uppercase"}>
                      {cell.row.values.hospital_Name}
                    </Text>
                  ) : cell.column.Header === "ID" ? (
                    <Text fontWeight={"bold"} color={"green.600"}>
                      {pageIndex === 0 ? ++i : (1 + i) * pageIndex}s
                    </Text>
                  ) : cell.column.id === "status" ? (
                    <Text fontWeight={"bold"} color={"green.600"}>
                      {cell.row.values.status === 1
                        ? "ACTIVE"
                        : cell.row.values.status === 2
                        ? "DISSABLED"
                        : "PENDING"}
                    </Text>
                  ) : (
                    cell.render("Cell")
                  )}
                </Td>
              );
            })}
          </Tr>
        );
      })}
    </>
  );
};

TableRow.propTypes = {
  props: PropTypes.object,
  title: PropTypes.string,
  page: PropTypes.integer,
  pageIndex: PropTypes.integer,
  prepareRow: PropTypes.function,
  data: PropTypes.object,
  SpecializationData: PropTypes.object,
  hospitalData: PropTypes.object,
};

export default TableRow;
