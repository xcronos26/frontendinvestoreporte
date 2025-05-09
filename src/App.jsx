import React, { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Center,
  FormControl,
  Divider,
  Input,
  FormLabel,
  HStack,
  Button,
  Select,
  Text,
  Checkbox,
  CheckboxGroup,
  VStack,
  Textarea,
  RadioGroup,
  Radio,
  ChakraProvider,
  Stack,
  Tooltip,
  Circle,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { FaWhatsapp, FaLinkedin, FaInstagramSquare } from 'react-icons/fa';
import axios from 'axios';


function App() {
  


  return (
    <Box height="10vh">
      <Center
        as="header"
        height={176}
        bg="teal.500"
        color="white"
        backgroundColor={'#072AC8'}
        fontWeight="bold"
        fontSize="4xl"
        paddingBottom="8"
        flexDirection="column"
      >
        Bem-vindo{nome && ','} {nome}, ao Investor Report
        <Text fontSize="2xl" fontWeight="normal" mt={2}>
          {step === 1 ? 'Agora você está preenchendo os dados iniciais de sua Startup' :
            step === 2 ? 'Nessa etapa você vai adicionar os dados do negócio!' :
              step === 3 ? 'Nessa etapa você vai adicionar o perfil do cliente!' :
                step === 4 ? 'Estamos quase lá!' :
                  step === 5 ? 'Nessa etapa você vai adicionar as tecnologias que são utilizadas!' :
                    step === 6 ? 'Agora você vai colocar os dados do mercado!' :
                      step === 7 ? 'Agora são os dados financeiros da Startup!' :
                        step === 8 ? 'Ao completar os campos sobre os dados financeiros da Startup você chega ao fim!' :
                          step === 9 ? 'Muito obrigado por preencher o formulário!' : ''}
        </Text>
      </Center>

      <Flex align="center" justify="center" bg="blackAlpha.200" height="calc(100vh - 150px)">
        <Center
          width="100%"
          maxWidth={840}
          bg="white"
          top={120}
          position="absolute"
          borderRadius={5}
          padding="6"
          boxShadow="0 1px 2px #ccc"
        >

          


        </Center>
      </Flex>
    </Box>
  );
}

export default App;