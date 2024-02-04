import React from 'react';
import { Container, Box, Text, VStack, Image } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import Login from "../components/Login.jsx";
import SignUp from "../components/SignUp.jsx";
import '../pages/HomePage.css';
import logo from '../assets/logo.png';

export const HomePage = () => {
  return (
    <div className="Home">
      <Container maxW="xl" centerContent>
        <Box
          display={"flex"}
          justifyContent="center"
          p={3}
          w="100%"
          m="40px 0 15px 0"
        >
          <VStack spacing={4}>
            <Image src={logo} alt="Logo" boxSize="100px" objectFit="cover" borderRadius="full" />
            <Text
            ml="2"
            colorScheme="yellow"
            variant="outline"
            fontSize={{ base: 'xl', md: '3xl' }}
            textTransform="uppercase"
          >
            Eunoia
          </Text>
          </VStack>
        </Box>

        <Box bg="gray.100" w='100%' p={4} borderRadius='lg' borderWidth="1px">
          <Tabs variant='soft-rounded'>
            <TabList>
              <Tab width="50%">Login</Tab>
              <Tab width="50%">Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <SignUp />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>

      <Box
  position="fixed"
  bottom="0"
  left="0"
  right="0"
  textAlign="center"
  p="2"
  bg="gray.100"
  borderRadius="md"
  boxShadow="md"
  ml={{ base: 5, md: 500 }}
  mr={{ base: 5, md: 500 }}
  mb={{ base: 5, md: 5 }}
  fontSize={{ base: "xs", md: "sm" }}
>
  <Text   fontSize={{ base: "xs", md: "sm" }}  color="gray.500" display="inline" mr={3}>
    <Link to="/terms" >Terms & Conditions</Link>
  </Text>
  <Text  fontSize={{ base: "xs", md: "sm" }}  color="gray.500" display="inline" mr={3}>
    <Link to="/privacy">Privacy policy</Link>
  </Text>
  <Text   fontSize={{ base: "xs", md: "sm" }}  color="gray.500" display="inline">
    <Link to="/refund">Refund policy</Link>
  </Text>

  <Text fontSize="sm" color="gray.700" mt={{ base: 2, md: 0 }} display="block">
    <Link to="/" textDecoration="none" color="gray.700">
      &copy;2024 Eunoia. All rights reserved.
    </Link>
  </Text>
</Box>

    </div>
  );
};
