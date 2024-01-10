import React from 'react'
import { ChakraProvider, Container, Flex, Box, Text } from '@chakra-ui/react';

function Dash(props) {
  return (
        <ChakraProvider>
          <Container maxW="container.xl" p={4}>
            <Flex
              
              
              overflow="hidden"
              direction={{ base: 'column', md: 'row' }}
            >
              {/* User Profile Column */}
              <Box w={{ base: '100%', md: '20%' }} pr={4} bg={props.secondary} m = {2} borderRadius="lg">
                {/* Add your user profile content here */}
                <Text fontSize="lg">User Profile</Text>
                {/* Add more user profile components as needed */}
              </Box>
    
              {/* Main Content Area */}
              <Flex w={{ base: '100%', md: '80%' }} direction="column">
                {/* Budget Column (2x as tall as Ledger) */}
                <Box
                  flex={{ base: '1', md: '2' }}
                  bg={props.secondary}
                  p={4}
                  borderRadius="lg"
                  mb={{ base: '4', md: '0' }}
                  m = {2}
                >
                  <Text fontSize="lg">Budget</Text>
                  {/* Add your budget components here */}
                </Box>
    
                {/* Ledger Column */}
                <Box
                  flex="1"
                  bg={props.secondary}
                  p={4}
                  borderRadius="lg"
                  m = {2}
                >
                  <Text fontSize="lg">Ledger</Text>
                  {/* Add your ledger components here */}
                </Box>
              </Flex>
            </Flex>
          </Container>
        </ChakraProvider>
  )
}

export default Dash
