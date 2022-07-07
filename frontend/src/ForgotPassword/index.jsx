import {
  Button,
  Center,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Card } from '../components/Card';
import { Layout } from '../components/Layout';
import { useAuth } from '../context';
import { ChakraProvider } from '@chakra-ui/react';

const ForgotContainer = styled.div`
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #07ab82;

  @media screen and (max-width: 768px) {
    height: 1100px;
  }

  @media screen and (max-width: 480px) {
    height: 1300px;
  }
 `;
export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState('');

  return (
    <ChakraProvider>
    <ForgotContainer>
      <Layout>
        <Heading textAlign="center" my={12}>
          Forgot password
        </Heading>
        <Card maxW="md" mx="auto" mt={4}>
          <chakra.form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                forgotPassword(email);
                toast({
                  description: `An email is sent to ${email} for password reset instructions.`,
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                });
              } catch (error) {
                console.log(error.message);
                toast({
                  description: error.message,
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                });
              }
            }}
          >
            <Stack spacing="6">
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <Button type="submit" colorScheme="green" size="lg" fontSize="md">
                Submit
              </Button>
            </Stack>
          </chakra.form>
          <br />
          <Center>
            <Button variant="link" colorScheme="black" onClick={() => navigate('../login' , { replace: true })}>
              Login
            </Button>
          </Center>
        </Card>
      </Layout>
    </ForgotContainer>
    </ChakraProvider>
  );
}
