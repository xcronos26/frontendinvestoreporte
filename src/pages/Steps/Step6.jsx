import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Flex,
  Box,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Button,
  Text,
  Textarea,
  Tooltip,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Step6() {
  const [mercado, setMercado] = useState('');
  const [concorrentes, setConcorrentes] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const currentStep = localStorage.getItem('currentStep');
    if (currentStep && Number(currentStep) > 6) {
      navigate(`/Step${currentStep}`);
    }
    focusLastField();
  }, []);

  const handleFocus = (event) => {
    const id = event.target.id;
    if (id) {
      localStorage.setItem('lastFocusedField', id);
    }
  };

  const focusLastField = () => {
    const lastFocusedField = localStorage.getItem('lastFocusedField');
    if (lastFocusedField) {
      const field = document.getElementById(lastFocusedField);
      if (field) {
        field.focus();
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = {
        usuario_id: 1, // Substituir pelo ID real do usuário
        tam_sam_som: mercado,
        concorrentes,
      };

      console.log('Dados a serem enviados:', data);
      const response = await axios.post('http://127.0.0.1:3333/formulario/step6', data);
      console.log('Step 6 salvo com sucesso:', response.data);
      
      localStorage.setItem('currentStep', 7); // Atualiza o step no localStorage
      navigate('/Step7'); // Avança para o próximo passo
    } catch (error) {
      console.error('Erro ao salvar Step 6:', error.response?.data || error.message);
      alert('Erro ao enviar os dados. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const prevStep = () => {
    navigate('/Step5');
  };

  return (
    <Box height="10vh">
      <Center
        as="header"
        height={176}
        bg="teal.500"
        color="white"
        backgroundColor="#072AC8"
        fontWeight="bold"
        fontSize="4xl"
        paddingBottom="8"
        flexDirection="column"
      >
        Investor Report
        <Text fontSize="2xl" fontWeight="normal" mt={2}>
          Agora você vai colocar os dados do mercado!
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
              <FormLabel>
                Descreva o tamanho do seu mercado indicando seu TAM, SAM e SOM
                <Tooltip
                  label={
                    <Box textAlign="left">
                      <strong>TAM</strong>: Total Addressable Market (Mercado Totalmente Endereçável).<br />
                      <strong>SAM</strong>: Serviceable Available Market (Mercado Disponível Endereçável).<br />
                      <strong>SOM</strong>: Serviceable Obtainable Market (Mercado Disponível Obtível).
                    </Box>
                  }
                  aria-label="tooltip"
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: '20px',
                      height: '20px',
                      backgroundColor: 'gray',
                      borderRadius: '50%',
                      textAlign: 'center',
                      cursor: 'pointer',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      lineHeight: '20px',
                    }}
                  >
                    ?
                  </span>
                </Tooltip>
              </FormLabel>
              <Textarea
                id="mercado"
                placeholder="Exemplo: TAM - X bilhões, SAM - Y milhões, SOM - Z milhões"
                value={mercado}
                onChange={(e) => setMercado(e.target.value)}
                onFocus={handleFocus}
              />
            </Box>

            <Box width="100%">
              <FormLabel>Liste seus principais concorrentes</FormLabel>
              <Textarea
                id="concorrentes"
                placeholder="Exemplo: Empresa A, Empresa B, Empresa C..."
                value={concorrentes}
                onChange={(e) => setConcorrentes(e.target.value)}
                onFocus={handleFocus}
              />
            </Box>

            <HStack spacing="4" marginTop={4}>
              <Button
                onClick={prevStep}
                bg="blue"
                color="white"
                _hover={{ bg: 'white', color: 'blue', border: '2px solid blue' }}
              >
                Anterior
              </Button>
              <Button
                onClick={handleSubmit}
                bg="blue"
                color="white"
                isLoading={loading}
                _hover={{ bg: 'white', color: 'blue', border: '2px solid blue' }}
              >
                Próximo
              </Button>
            </HStack>
          </FormControl>
        </Center>
      </Flex>
    </Box>
  );
}

export default Step6;
