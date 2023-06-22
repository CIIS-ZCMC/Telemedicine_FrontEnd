import {
  Grid,
  GridItem,
  Box,
  Text,
  Heading,
  Center,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import dennis from "../../assets/profile/dennis.jpg";

const CreditsJSON = [
  {
    index: 0,
    name: "Arzl James I. Lao",
    skills: "Tech Lead | Full-Stack Developer",
    url: "https://zcmc.vercel.app/static/media/lao.5eb13dfbcc556ccef76d.jpg",
    facebook: "https://www.facebook.com/arzl.james",
    linkedIn: "https://www.linkedin.com/in/arzljames/",
    github: "https://github.com/arzljames",
    isRow: false,
  },
  {
    index: 1,
    name: "Reenjay Caimor",
    skills: "Full-Stack Developer | Web Designer",
    url: "https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-6/352748531_2379196672255286_7570077573138465945_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeHro16HTodgp_KgfLPXsGV4f9egOB_o3ud_16A4H-je59HO7adAiz51L7QYCgNSBL7NK6bCoHoeWrwi5tOXM45b&_nc_ohc=CUPuF1OO38UAX8QplOH&_nc_ht=scontent.fdvo2-2.fna&oh=00_AfBBJpsjm2j8dWg3MPBn-YpcBGytTf5xZCLqZFEHJ3pJRQ&oe=6498C9B7",
    facebook: "https://www.facebook.com/reenjay.caimor",
    linkedIn: "https://www.linkedin.com/in/reenjay-caimor-b207b9245/",
    github: "https://github.com/reenjie",
    isRow: true,
  },
  {
    index: 2,
    name: "Krizelle Mae Falcasantos",
    skills: "Full-Stack Developer | Web Designer",
    url: "https://media.licdn.com/dms/image/C5603AQE0RvUAU4Falg/profile-displayphoto-shrink_800_800/0/1658394336794?e=1677110400&v=beta&t=uhJCCV4UHDrnuMxxW4-ls3B5G0bWp0zN91OlEap3UQo",
    facebook: "https://www.facebook.com/krizellemaebfalcasantos",
    linkedIn:
      "https://media.licdn.com/dms/image/C5603AQF5pCsvZKPxNA/profile-displayphoto-shrink_800_800/0/1661257980927?e=1692835200&v=beta&t=VwBS56O_z0JlP2naLoDWRCYDnyDlbcQLy_hN3BrVi_4",
    github: "https://github.com/krizellezcmc",
    isRow: true,
  },
  {
    index: 3,
    name: "Dennis N. Falcasantos",
    skills: "Full-Stack Developer",
    url: dennis,
    facebook: "https://www.facebook.com/Davidson848",
    linkedIn: "https://www.linkedin.com/in/dennis-falcasantos-233315230/",
    github: "https://github.com/aseyte2",
    isRow: false,
  },
  {
    index: 4,
    name: "Alyana Claire C. Barretto",
    skills: "Full-Stack Developer | Data Analyst",
    url: "https://media.licdn.com/dms/image/D5635AQEqfulSQAGamQ/profile-framedphoto-shrink_800_800/0/1669192283952?e=1688047200&v=beta&t=IOXzSBxCpjF25pblDV7jLQ7h-dHgh8eyCdXhX_bCgMY",
    facebook: "https://www.facebook.com/alyanaclaire.barretto",
    linkedIn: "https://www.linkedin.com/in/alyana-barretto-a34b1b147/",
    github: "https://github.com/alyb-zcmc",
    isRow: false,
  },
  {
    index: 5,
    name: "Tristan Jay L. Amit",
    skills: "Full-Stack Developer | Analyst",
    url: "https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-6/335400772_1197207080934390_5707157948584101116_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFChH71MTmow03rM0XCeFhH9NPY8cVnir_009jxxWeKv7ID5GSp7jCRd9S3X9tly4g-lkbhGjr8ikJzJbzHDfVM&_nc_ohc=_hNnpnSBXdUAX-pdTVQ&_nc_ht=scontent.fdvo2-2.fna&oh=00_AfBKvkJ1g5W4NgQUmX2NMXUYSjDjVxzbWLr9HfvPDx20zQ&oe=6498E71B",
    facebook: "https://www.facebook.com/profile.php?id=100077820308629",
    linkedIn: "https://www.linkedin.com/in/tristan-jay-amit-9a3ba51b8/",
    github: "https://github.com/TjayAmit",
    isRow: false,
  },
  {
    index: 6,
    name: "Kim Horace Dollar",
    skills: "Web Developer",
    url: "https://media.licdn.com/dms/image/C5603AQFTY4NJ5YtC4g/profile-displayphoto-shrink_800_800/0/1597425604662?e=1692835200&v=beta&t=ONanF5bfDhAEHwh0ARzMUxAolPYPv5xYzelAvxVn15k",
    facebook: "https://www.facebook.com/kimdeee",
    linkedIn: "https://www.linkedin.com/in/kim-horace-dolar-302984183/",
    github: "https://github.com/kimdee",
    isRow: false,
  },
  {
    index: 7,
    name: "Adrian Agcaoili",
    skills: "Web Developer | Project Manager",
    url: "https://media.licdn.com/dms/image/D4D03AQH4Cqr7bTv-Jg/profile-displayphoto-shrink_800_800/0/1678399800254?e=1692835200&v=beta&t=c-l_FERym-ctG49TXAV_jl9CY7Pqx0r7ZrvVqo1jHPA",
    facebook: "https://www.facebook.com/adrian.agcaoili",
    linkedIn: "https://www.linkedin.com/in/adrian-agcaoili/",
    github: "https://github.com/ZCMC-ADRIAN",
    isRow: false,
  },
];

const ProfileBox = (data) => {
  const dev = data.data;

  return (
    <Box
      marginBottom={40}
      w={300}
      h={480}
      rounded={6}
      _hover={{
        boxShadow: "dark-lg",
      }}
    >
      <Box p={"10px"}>
        <Box>
          <Image src={dev.url} w={360} h={300} rounded={6} />
        </Box>
        <Box mt={4}>
          <Heading size={"md"}>{dev.name}</Heading>
          <Text marginTop={2} size={30} color={"grey"}>
            {dev.skills}
          </Text>
          <Box marginTop={2}>
            <a href={dev.facebook} rel="noreferrer" target={"_blank"}>
              <IconButton
                mr={2}
                color={"grey"}
                _hover={{
                  color: "white",
                  bg: "#007aff",
                }}
                icon={<FaFacebookF />}
              />
            </a>
            <a href={dev.linkedIn} rel="noreferrer" target={"_blank"}>
              <IconButton
                mr={2}
                color={"grey"}
                _hover={{
                  color: "white",
                  bg: "#0a66c2",
                }}
                icon={<BsLinkedin />}
              />
            </a>
            <a href={dev.github} rel="noreferrer" target={"_blank"}>
              <IconButton
                mr={2}
                color={"grey"}
                _hover={{
                  color: "white",
                  bg: "#bb86fc",
                }}
                icon={<FaGithub />}
              />
            </a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const CustomGridItem = (data) => {
  const dev = data.data;
  if (dev.isRow) {
    return (
      <GridItem rowSpan={1} colSpan={[4, 2, 1]}>
        <ProfileBox data={dev} />;
      </GridItem>
    );
  }

  return (
    <GridItem colSpan={[4, 2, 1]}>
      <ProfileBox data={dev} />
    </GridItem>
  );
};

const Credits = () => {
  return (
    <>
      <Box p={8} w={"100%"}>
        <Center mt={10}>
          <Box
            w={"100%"}
            h={"100px"}
            textAlign={"center"}
            display="flex"
            flexDirection={"column"}
            justifyContent={"space-between"}
          >
            <Heading color={"#65806e"} fontSize={"45px"} fontWeight={"900"}>
              Meet our Dev Team
            </Heading>
            <Text color={"#75b687"} fontSize={"23px"}>
              We Are, Therefore we Develop
            </Text>
          </Box>
        </Center>
        <Center>
          <Grid
            mt={[70, 60, 50, 35]}
            templateRows={`repeat(2, 1fr)`}
            templateColumns={`repeat(4, 1fr)`}
            gap={20}
            overflow={"hidden"}
            p={30}
          >
            {CreditsJSON.map((data) => {
              return <CustomGridItem data={data} key={data.index} />;
            })}
          </Grid>
        </Center>
      </Box>
    </>
  );
};

export default Credits;
