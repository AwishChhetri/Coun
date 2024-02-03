import {
  Container,
  VStack,
  HStack,
  Button,
  Box,
  Text,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import {Link} from "react-router-dom"
import { Sidebar } from '../components/Sidebar.jsx';
import { LandingPage } from '../components/LandingPage.jsx';

export const Dash = () => {
  return (
    <Flex minH="100vh" bgGradient="linear(to-r, #f5f5dc, #ffffff)" color="black" direction="column">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Flex
        flex="1"
        direction="column"
        p={{ base: '4', md: '8' }}
        ml={{ base: '0', md: '300px' }} // Adjust margin for mobile view
      >
        {/* Main Content */}
        <Box p={{ base: '4', md: '6' }} bg="#fbd1a2" borderRadius="md" boxShadow="md" mb={{ base: '4', md: '0' }} id="PersonalityTest">
          {/* Feature */}
          <LandingPage />
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

      </Flex>
    </Flex>
  );
};
