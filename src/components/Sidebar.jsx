import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/logo.png';
import {
  VStack,
  HStack,
  Spacer,
  Box,
  Avatar,
  Text,
  Image,
  Button,
  Flex,
  IconButton,
  useMediaQuery,
} from '@chakra-ui/react';
import {
  FaComment,
  FaHome,
  FaBars,
  FaTimes,
  FaFileAlt,
  FaUser,
  FaBrain,
  FaCalendarAlt,
  FaSignOutAlt,
  FaTools,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa';
import axios from 'axios';
import { useUser } from '../userContext.jsx';

export const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Change the default value to false
  const [isMobile] = useMediaQuery('(max-width: 600px)');
  const { userId } = useUser();
  const [userData, setUserData] = useState(null);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`/userdata/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    if (userId) {
      getUserData();
    }
  }, [userId]);

  return (
    <>
      {isSidebarOpen && (
        <Flex
          direction={isMobile ? 'column' : 'row'}
          align="start"
          spacing="4"
          bg="teal.600"
          p="4"
          boxShadow="md"
          position="fixed"
          h={{ base: '100vh', md: '100vh' }}
          minW="250px"
          maxW={isMobile ? '80%' : '250px'}
          zIndex="100"
        >
          {isMobile && (
            <IconButton
              icon={<FaTimes />}
              size="md"
              aria-label="Close Sidebar"
              onClick={handleCloseSidebar}
              position="absolute"
              top="4"
              right="4"
            />
          )}
          <VStack align="start" mt={4} spacing="4" w="100%">
            <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
              <Avatar size="md" name={userData && userData.name} src="https://api.dicebear.com/7.x/notionists/svg" boxShadow="md" />
              <Text mt={4} fontSize="xl" fontWeight="bold" color="white" pl={2}>
                {userData && userData.name}
              </Text>
            </Box>
            <Button colorScheme="teal" variant="solid" size="md" w="100%" leftIcon={<FaHome />}>
              <Link to="/intake-form">Dashboard</Link>
            </Button>
            <Button colorScheme="teal" variant="solid" size="md" w="100%" leftIcon={<FaUser />}>
              <Link to="/personality-test">Personality Test</Link>
            </Button>
            <Button colorScheme="teal" variant="solid" size="md" w="100%" leftIcon={<FaBrain />}>
              <Link to="/assessment">Mental Assessment</Link>
            </Button>
            <Button colorScheme="teal" variant="solid" size="md" w="100%" leftIcon={<FaCalendarAlt />}>
              <Link to="/appointment">Book Session</Link>
            </Button>
            <Button colorScheme="teal" variant="solid" size="md" w="100%" leftIcon={<FaComment />}>
              <Link to="/dash">AI Counsellor</Link>
            </Button>

            <Spacer />

            <VStack>
              <HStack mt={{ base: '270', md: '130' }}>
                <Image src={image} alt="Logo" boxSize="50px" objectFit="cover" borderRadius="full" />
              </HStack>
              <HStack>
                <Text fontSize="md" color="white">
                  Eunoia
                </Text>
              </HStack>
              <HStack>
                <FaFacebook size={18} color="white" />
                <FaInstagram size={18} color="white" />
                <FaLinkedin size={18} color="white" />
              </HStack>
              <HStack align="start" mt={4} spacing="4">
                <Button variant="solid" size="sm" w="100%" leftIcon={<FaSignOutAlt />}>
                  <Link to="/">Logout</Link>
                </Button>
                <Button variant="solid" size="sm" w="100%" leftIcon={<FaTools />}>
                  <Link to="/settings">Settings</Link>
                </Button>
              </HStack>
            </VStack>
          </VStack>
        </Flex>
      )}

      {isMobile && (
        <IconButton
          icon={<FaBars />}
          size="md"
          aria-label="Toggle Sidebar"
          onClick={handleToggleSidebar}
          position="fixed"
          top="4"
          right="4"
          zIndex="99"
        />
      )}
    </>
  );
};
