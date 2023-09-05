import axios from 'axios'
import { useEffect, useState } from "react";
import { Badge,Box,Button,Divider, Flex, Heading,Wrap,Text,Select, useDisclosure } from "@chakra-ui/react";
import useSpecialization from "../../Hooks/useSpecializationHook";
import SpecializationCardSkeleton from "./SpecializationCardSkeleton";
import SpecializationCard from "./SpecializationCard";
import ModalComponent from "../../Components/ModalComponent/ModalComponent";
import InputCalendarComponent from "../Calendar/InputCalendarComponent";
import { MdAddCircle } from "react-icons/md";
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

const Card = ({ title, value, hasDivider }) => {
  return (
    <>
      <Badge
        display="flex"
        gap={5}
        alignItems="center"
        p={2}
        pl={5}
        pr={5}
        bg="transparent"
      >
        <Heading size="sm" color="blackAlpha.800">
          {value}
        </Heading>
        <Heading size="xs" color="blackAlpha.700">
          {title}
        </Heading>
      </Badge>
      {hasDivider ? (
        <Divider borderLeft="1px solid gray" width={0} height={4} />
      ) : null}
    </>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
  hasDivider: PropTypes.bool,
};

const Specialization = () => {
  const REGISTRATION_MODAL = "Register Specialization";
  const UPDATE_MODAL = "Update Specialization";
  const DELETE_MODAL = "Delete Specialization";

  const {isOpen, onOpen, onClose} = useDisclosure();
  const [title, setTitle] = useState(REGISTRATION_MODAL);
  const [filter, setFilter] = useState(1);

  const { 
    specializations, 
    getSpecialization, 
    registerSpecialization, 
    updateSpecialization, 
    deleteSpecialization 
  } = useSpecialization();
  const [loading, setLoading] = useState(true);

  const filterOptions = ["All", "Pending", "De-Activated"];
  const [specialization, setSpecialization] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(true);

  const cardStyles = [
    {
      title: "Pending",
      value: 5,
    },
    {
      title: "De-Activated",
      value: 2,
    },
    {
      title: "Active",
      value: 108,
    },
  ];

  const formStyle = [
    {
      label: "Name",
      placeholder: "Enter name",
      type: "text",
      value: name,
      setValue: setName,
      mt: 4,
    },
    {
      label: "Description",
      placeholder: "Enter description",
      type: "text",
      value: description,
      setValue: setDescription,
      mt: 4,
    },
  ];
  

  const statusOption = [
    {
      value: 1,
      label: 'Active'
    }, 
    {
      value: 2,
      label: 'In Active'
    },
  ]

  function intializeRegistrationModal() {
    setTitle(REGISTRATION_MODAL);
    onOpen();
  }

  function initializeCardUpdateModal(e, id, name, description, status)
  {
    e.preventDefault();
    setTitle(UPDATE_MODAL);
    setSpecialization(id);
    setName(name)
    setDescription(description)
    setStatus(status ==='Active');
    onOpen();
  }
  

  function initializeCardDeleteModal(e, id)
  {
    e.preventDefault();
    setTitle(DELETE_MODAL);
    setSpecialization(id);
    onOpen();
  }
  

  function onSave(e)
  {
    e.preventDefault();

    switch(title)
    {
      case REGISTRATION_MODAL: 
        registerSpecialization({
          'name': title,
          'description':description,
          'status':status,
        }, (status, feedback) => {
          switch(status)
          {
            case 200:
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: feedback,
                showConfirmButton: false,
                timer: 1500
              })
              break;
            case 401:
              console.log('UnAuthorized.');
              break;
            default:
              console.log('Bawi next life.');
              break;
          }
        });
        break;
      case UPDATE_MODAL:  
        updateSpecialization(
          specialization,
          {
          'name': title,
          'description':description,
          'status':status,
          }, (status, feedback) => {
          switch(status)
          {
            case 200:
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: feedback,
                showConfirmButton: false,
                timer: 1500
              })
              break;
            case 401:
              console.log('UnAuthorized.');
              break;
            default:
              console.log('Bawi next life.');
              break;
          }
        });
        break;
      case DELETE_MODAL: 
        deleteSpecialization(
          specialization,(status, feedback) => {
          switch(status)
          {
            case 200:
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: feedback,
                showConfirmButton: false,
                timer: 1500
              })
              break;
            case 401:
              console.log('UnAuthorized.');
              break;
            default:
              console.log('Bawi next life.');
              break;
          }
        });
        break;
      default: 
        console.log('No Action Happen.');
        break;
    }
  }


  function closeModal()
  {
    setName('');
    setDescription('');
    setSpecialization(null);
    onClose();
  }

  function fetchSpecializationData(cancelToken) {
    getSpecialization(cancelToken.token,(status, feedback) => {
      switch (status) {
        case 200:
          console.log(feedback);
          break;
        default:
          console.log(feedback);
      }
      setLoading(false);
    });
  }

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    fetchSpecializationData(cancelToken);

    return () => cancelToken.cancel();
  }, []);

  if (loading) {
    return (
      <Box w="100%" h="100%">
        <Wrap p={7} spacing="2.2rem">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
            <SpecializationCardSkeleton key={index} />
          ))}
        </Wrap>
      </Box>
    );
  }

  if (!loading && specializations === null) {
    return (
      <Box w="100%" h="100%">
        No Record.
      </Box>
    );
  }

  return (
    <Box p={5}>
      <Flex
        w="100%"
        h="5rem"
        p={5}
        rounded={8}
        boxShadow="md"
        bg="white"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex gap={14} alignItems="center">
          <Heading size="md" color="teal">
            Summary Record
          </Heading>
          <Flex gap={2} alignItems="center">
            {cardStyles.map((value, index) => (
              <Card
                key={index}
                {...value}
                hasDivider={index < cardStyles.length - 1}
              />
            ))}
          </Flex>
        </Flex>
        <Flex gap={5} alignItems="center">
          <Button
            bg="teal"
            color="white"
            size="sm"
            leftIcon={<MdAddCircle size={24} />}
            _hover={{ bg: "teal" }}
            onClick={() => intializeRegistrationModal()}
          >
            Add Specialization
          </Button>
          <Box w="10rem">
            <Select
              size="sm"
              variant="filled"
              focusBorderColor="teal"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {filterOptions.map((value, index) => (
                <option key={index} value={index}>
                  {value}
                </option>
              ))}
            </Select>
          </Box>
        </Flex>
      </Flex>
      <Wrap p={7} pl={0} pr={0} spacing="2.2rem">
        {specializations.map((specialization, index) => (
          <SpecializationCard key={index} {...specialization} onUpdate={initializeCardUpdateModal} onDelete={initializeCardDeleteModal} />
        ))}
      </Wrap>
        <ModalComponent
          isOpen={isOpen}
          onClose={closeModal}
          title={title}
          footer={<Flex gap={5}>
            <Button size="sm" onClick={() => closeModal()}>
              Cancel
            </Button>
            <Button
              size="sm"
              bg={DELETE_MODAL?'red' :"teal"}
              color="white"
              onClick={e => onSave(e)}
            >
            {DELETE_MODAL ? "Proceed": " Save" }
            </Button>
          </Flex>}
          >
            {
              title === REGISTRATION_MODAL || title === UPDATE_MODAL ? 
              <>
                {formStyle.map((value, index) => (
                  <InputCalendarComponent key={index} {...value} />
                ))}
              {title===UPDATE_MODAL? <Box marginTop={5}>
                  <Text>Status</Text>
                  <Select
                    size="sm"
                    variant="filled"
                    focusBorderColor="teal"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {statusOption.map((value, index) => (
                      <option key={index} value={index}>
                        {value.label}
                      </option>
                    ))}
                  </Select>
                </Box>: null }
              </>: <Text>You are about to delete this specialization. </Text> 
            }
          </ModalComponent>
    </Box>
  );
};

export default Specialization;
