import { Avatar, Badge, Box, Text, Tr, Td, Flex } from "@chakra-ui/react";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import CustomViewButton from "../Modal/CustomViewModal";
import useUser from "../../Hooks/UserHook";
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
  const { user } = useUser();
  const navigate = useNavigate();
  const { user_role } = user;

  const handleViewCase = (e, id) => {
    e.preventDefault();
    try {
      navigate("/case-view", { state: id });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {page.map((row, index) => {
        const rowID = row.cells[0].value;
        prepareRow(row);
        return (
          <Tr
            key={index}
            onClick={(e) => handleViewCase(e, rowID)}
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
                              data={data}
                              SpecializationData={SpecializationData}
                              hospitalData={hospitalData}
                              row={row.values}
                              props={props}
                              user={user}
                              id={rowID}
                            />
                          </>
                        ) : (
                          <>
                            <Actions
                              title={title}
                              cellvalue={cell.row.values}
                              fetch={fetch}
                              data={data}
                              SpecializationData={SpecializationData}
                              hospitalData={hospitalData}
                              row={row.values}
                              props={props}
                              user={user}
                              id={rowID}
                            />
                          </>
                        )
                      ) : (
                        <>
                          <Actions
                            title={title}
                            cellvalue={cell.row.values}
                            fetch={fetch}
                            data={data}
                            SpecializationData={SpecializationData}
                            hospitalData={hospitalData}
                            row={row.values}
                            props={props}
                            user={user}
                            id={rowID}
                          />
                        </>
                      )}
                    </Flex>
                  ) : cell.column.Header === "ID" ? (
                    <Box display="flex" columnGap={3}>
                      <Text>{++index + pageIndex * 10}</Text>
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
