import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

export function Card(props) {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.700')}
      py='8'
      px={{ base: '4', md: '10' }}
      shadow='base'
      rounded={{ sm: 'lg' }}
      {...props}
    />
  );
}
