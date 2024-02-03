import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flex,
  Box,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { Sidebar } from '../components/Sidebar.jsx';
import { UserProfile } from '../pages/UserProfile.jsx';

export const IntakeForm = () => {
  const [isMobile] = useMediaQuery('(max-width: 600px)');

  return (
    <Flex direction={isMobile ? 'column' : 'row'} minH="100vh" bgGradient="linear(to-r, #89f7fe, #66a6ff)" color="white">
      {/* Sidebar */}
      {isMobile ? null : <Sidebar />}
      {isMobile && <Sidebar />}
      {/* Main Content */}
      <Flex flex="1" direction="column" p="4" ml={isMobile ? '0' : '300px'}>
        {/* Main Content */}
        <Box p="4" bg="white" borderRadius="md" boxShadow="md" mb="4" id="IntakeForm">
          {/* Questions */}
          <UserProfile />
        </Box>

        {/* Footer component */}
        <Box
          textAlign="center"
          p="2"
          mt={{ base: 5, md: 5 }}
          bg="gray.100"
          borderRadius="md"
          boxShadow="md"
          ml={{ base: 1, md: 300 }}
          mr={{ base: 1, md: 300 }}
          mb={{ base: 5, md: 5 }}
        >
          <Text fontSize="sm" color="gray.500" display="inline" mr={3}>
            <Link as={Link} to="/terms">
              Terms and Conditions
            </Link>
          </Text>
          <Text fontSize="sm" color="gray.500" display="inline" mr={3}>
            <Link as={Link} to="/privacy">
              Privacy policy
            </Link>
          </Text>
          <Text fontSize="sm" color="gray.500" display="inline">
            <Link as={Link} to="/refund">
              Refund policy
            </Link>
          </Text>

          <Text fontSize="sm" color="gray.700" mt={{ base: 2, md: 0 }} display="block">
            <Link as={Link} to="/" textDecoration="none" color="gray.700">
              &copy;2024 Eunoia. All rights reserved.
            </Link>
          </Text>
        </Box>

        {/* Sidebar for mobile view */}
        
      </Flex>
    </Flex>
  );
};
