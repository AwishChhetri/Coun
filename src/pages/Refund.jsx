import React from 'react';
import { Box, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react';

export const RefundPolicy = () => {
  return (
    <Box p={8}>
      <Heading as="h2" mb={4}>
        Refund Policy
      </Heading>

      <Text>
        We want to ensure you are satisfied with your purchase. If you are not entirely satisfied, we're here to help.
      </Text>

      <Heading as="h3" mt={6} mb={2}>
        Refund Eligibility
      </Heading>

      <UnorderedList pl={4} mb={6}>
        <ListItem>To be eligible for a refund, your item must be unused and in the same condition that you received it.</ListItem>
        {/* Add more details as needed */}
      </UnorderedList>

      <Heading as="h3" mt={6} mb={2}>
        Refund Process
      </Heading>

      <UnorderedList pl={4} mb={6}>
        <ListItem>Please contact our customer service team to initiate the refund process.</ListItem>
        {/* Add more details as needed */}
      </UnorderedList>

      {/* Add more sections as needed */}

      <Text mt={6}>
        This Refund Policy was last updated on [Date].
      </Text>
    </Box>
  );
};

export default RefundPolicy;
