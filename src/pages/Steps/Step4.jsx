import React, { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Button,
  Select,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Step4({ usuario_id }) {
  // Variáveis de estado para step 4
  const [estrategiaAquisicao, setEstrategiaAquisicao] = useState('');
  const [baseClientes, setBaseClientes] = useState('');
  const [planoCrescimento, setPlanoCrescimento] = useState('');
  const [maiorDesafio, setMaiorDesafio] = useState('');
  const [step, setStep] = useState(4);

  const navigate = useNavigate();

  useEffect(() => {
    const currentStep = localStorage.getItem('currentStep');
    if (currentStep && Number(currentStep) > 4) {
      navigate(`/Step${currentStep}`);
    }

    // Preencher os campos com os dados do localStorage se existir
    const step3Data = JSON.parse(localStorage.getItem('step3Data')) || {};
    setEstrategiaAquisicao(step3Data.estrategia_aquisicao || '');
    setBaseClientes(step3Data.base_clientes || '');
    setPlanoCrescimento(step3Data.plano_crescimento || '');
    setMaiorDesafio(step3Data.maior_desafio || '');
  }, []);

  const nextStep = async () => {
    try {
      const data = {
        usuario_id: 1,
        estrategia_aquisicao: estrategiaAquisicao,
        base_clientes: baseClientes,
        plano_crescimento: planoCrescimento,
        maior_desafio: maiorDesafio,
      };
      console.log('Dados a serem enviados:', data);
      
      // Salvar os dados no localStorage antes de avançar
      localStorage.setItem('step4Data', JSON.stringify(data));

      const response = await axios.post('http://127.0.0.1:3333/steps/step4', data);
      console.log(response.data);
      localStorage.setItem('currentStep', 5);  // Salvar o próximo passo no localStorage
      navigate('/Step5');
    } catch (error) {
      console.error('Erro ao salvar Step 4:', error.response ? error.response.data : error);
    }
  };

  const prevStep = () => {
    navigate('/Step3');
  };

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
        Investor Report
        <Text fontSize="2xl" fontWeight="normal" mt={2}>
          Estamos quase lá! Complete as informações sobre crescimento e desafios.
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
          <FormControl display="flex" flexDirection="column" gap="4">
            <Box width="100%">
              <FormLabel>Qual sua estratégia de aquisição de clientes?</FormLabel>
              <Textarea
                placeholder="Descreva sua estratégia de aquisição de clientes"
                value={estrategiaAquisicao}
                onChange={(e) => setEstrategiaAquisicao(e.target.value)}
              />
            </Box>

            <Box width="100%">
              <FormLabel>Qual o tamanho da sua base de clientes?</FormLabel>
              <Select
                placeholder="Selecione uma opção"
                value={baseClientes}
                onChange={(e) => setBaseClientes(e.target.value)}
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={`${i * 10 + 1} à ${(i + 1) * 10}`}>{`${i * 10 + 1} à ${(i + 1) * 10}`}</option>
                ))}
                <option value="+100">+100</option>
              </Select>
            </Box>

            <Box width="100%">
              <FormLabel>Como está estruturado seu plano de crescimento?</FormLabel>
              <Textarea
                placeholder="Descreva seu plano de crescimento"
                value={planoCrescimento}
                onChange={(e) => setPlanoCrescimento(e.target.value)}
              />
            </Box>

            <Box width="100%">
              <FormLabel>Qual seu maior desafio e como pretende resolvê-lo?</FormLabel>
              <Textarea
                placeholder="Descreva seu maior desafio e como pretende resolvê-lo"
                value={maiorDesafio}
                onChange={(e) => setMaiorDesafio(e.target.value)}
              />
            </Box>

            <HStack spacing="4">
              <Button marginTop={4} colorScheme="teal" onClick={prevStep} bg="blue" color="white" _hover={{ bg: "white", color: "blue", border: "2px solid blue" }}>
                Anterior
              </Button>
              <Button marginTop={4} colorScheme="teal" onClick={nextStep} bg="blue" color="white" _hover={{ bg: "white", color: "blue", border: "2px solid blue" }}>
                Próximo
              </Button>
            </HStack>
          </FormControl>
        </Center>
      </Flex>
    </Box>
  );
}

export default Step4;
