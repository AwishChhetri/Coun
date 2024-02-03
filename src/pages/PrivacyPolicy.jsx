import React from 'react';
import { Box, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react';

export const PrivacyPolicy = () => {
  return (
    <Box p={8}>
      <Heading as="h2" mb={4}>
        Privacy Policy
      </Heading>

      <Text>
        Your privacy is important to us. It is [Your Company Name]'s policy to respect your privacy regarding any information
        we may collect from you across our website, [website address], and other sites we own and operate.
      </Text>

      <Heading as="h3" mt={6} mb={2}>
        Information We Collect
      </Heading>

      <UnorderedList pl={4} mb={6}>
        <ListItem>We only collect information about you if we have a reason to do so, such as to provide our services, to communicate with you, or to make our services better.</ListItem>
        {/* Add more details as needed */}
      </UnorderedList>

      <Heading as="h3" mt={6} mb={2}>
        How We Use Your Information
      </Heading>

      <UnorderedList pl={4} mb={6}>
        <ListItem>We use the information we collect to provide, maintain, and improve our services, as well as to communicate with you and personalize our services.</ListItem>
        {/* Add more details as needed */}
      </UnorderedList>

      {/* Add more sections as needed */}

      <Text mt={6}>
        This Privacy Policy was last updated on [Date].
      </Text>
    </Box>
  );
};

