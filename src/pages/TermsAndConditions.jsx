import React from 'react';
import { Box, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react';

export const TermsAndConditions = () => {
  return (
    <Box p={8}>
      <Heading as="h2" mb={4}>
        Terms and Conditions
      </Heading>

      <Text>
        Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by
        the following terms and conditions of use, which together with our privacy policy govern [Your Company Name]'s
        relationship with you in relation to this website. If you disagree with any part of these terms and conditions,
        please do not use our website.
      </Text>

      <Heading as="h3" mt={6} mb={2}>
        The use of this website is subject to the following terms of use:
      </Heading>

      <UnorderedList pl={4} mb={6}>
        <ListItem>The content of the pages of this website is for your general information and use only. It is subject to change without notice.</ListItem>
        <ListItem>This website uses cookies to monitor browsing preferences. If you do allow cookies to be used, the following personal information may be stored by us for use by third parties.</ListItem>
        <ListItem>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness, or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors, and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</ListItem>
        {/* Add more terms as needed */}
      </UnorderedList>

      <Heading as="h3" mt={6} mb={2}>
        Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable.
      </Heading>

      {/* Add more sections as needed */}

      <Text mt={6}>
        This Terms and Conditions page was last updated on [Date].
      </Text>
    </Box>
  );
};


