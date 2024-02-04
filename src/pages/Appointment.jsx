import {
  Container,
  VStack,
  HStack,
  Button,
  Box,
  Text,
  Flex,
} from '@chakra-ui/react';
import {  Link } from "react-router-dom";
import { Sidebar } from "../components/Sidebar.jsx"
import { Booking } from '../components/Booking.jsx';

export const Appointment = () => {
  return (
    <Flex minH="100vh" bgGradient="linear(to-r, #89f7fe, #66a6ff)" color="white" direction="column">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Flex
        flex="1"
        direction="column"
        p={{ base: '2', md: '4' }} // Adjust padding for mobile view
      >
        {/* Main Content */}
        
          {/* Feature */}
          <Booking />
        

        {/* Footer component */}

        
        <Box
          textAlign="center"
          p="2"
          mt={{ base: 5, md: 5 }}
          bg="gray.100"
          borderRadius="md"
          boxShadow="md"
          ml={{ base: 1, md: 500 }}
          mr={{ base: 1, md: 500 }}
          mb={{ base: 5, md: 5 }}
          fontSize={{ base: "xs", md: "sm" }}
        >
          <Text  color="gray.500" display="inline" mr={3}>
            <Link as={Link} to="/terms">
              Terms and Conditions
            </Link>
          </Text>
          <Text  color="gray.500" display="inline" mr={3}>
            <Link as={Link} to="/privacy">
              Privacy policy
            </Link>
          </Text>
          <Text  color="gray.500" display="inline">
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

      </Flex>
    </Flex>
  );
};
