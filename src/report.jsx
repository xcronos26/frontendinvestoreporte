import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Button, FormControl, FormLabel, Input, Textarea, NumberInput, NumberInputField, Select, Stack, Heading, SimpleGrid, useColorModeValue 
} from "@chakra-ui/react";
import axios from 'axios';

const StartupForm = () => {
  const navigate = useNavigate(); // Usando o React Router para navegação
  const primaryColor = "#072AC8";
  const accentColor = "#2A9D8F";
  const backgroundColor = useColorModeValue("", "gray.700");

  // Estado para capturar os dados
  const [nome, setNome] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [ano, setAno] = useState(new Date().getFullYear());
  const [mes, setMes] = useState('');
  const [contato, setContato] = useState('');
  const [mrr, setMrr] = useState('');
  const [faturamento, setFaturamento] = useState('');
  const [despesas, setDespesas] = useState('');
  const [caixa, setCaixa] = useState('');
  const [cashBurn, setCashBurn] = useState('');
  const [runway, setRunway] = useState('');
  const [valuation, setValuation] = useState('');
  const [clientes, setClientes] = useState('');
  const [cac, setCac] = useState('');
  const [churn, setChurn] = useState('');
  const [ltv, setLtv] = useState('');
  const [boasNoticias, setBoasNoticias] = useState('');
  const [masNoticias, setMasNoticias] = useState('');
  const [ajuda, setAjuda] = useState('');
  const [usuarioId, setUsuarioId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Recupera o ID do localStorage ao carregar o componente
    const id = localStorage.getItem('form_id');
    if (id) {
      setUsuarioId(id);
    }
  }, []);

  const handleSubmit = async () => {
    if (!usuarioId) {
      alert("Usuário não identificado. Por favor, faça login.");
      return;
    }

    // Validação simples
    if (!nome || !responsavel || !mes || !ano || !contato) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    const data = {
      nome,
      responsavel,
      ano,
      mes,
      contato,
      mrr,
      faturamento,
      despesas,
      caixa,
      cashBurn,
      runway,
      valuation,
      clientes,
      cac,
      churn,
      ltv,
      boasNoticias,
      masNoticias,
      ajuda,
      usuario_id: usuarioId,
    };

    try {
      const response = await axios.post(`http://localhost:4000/api/submit/${usuarioId}`, data);
      if (response.status === 201) {
        setSuccessMessage("Formulário enviado com sucesso!");

        const hoje = new Date();
        const dataComMaisUmMes = new Date(hoje);
        dataComMaisUmMes.setMonth(dataComMaisUmMes.getMonth() + 1);

        const dia = String(dataComMaisUmMes.getDate()).padStart(2, '0');
        const mes = String(dataComMaisUmMes.getMonth() + 1).padStart(2, '0');
        const ano = String(dataComMaisUmMes.getFullYear()).slice(-2);

        alert(`Formulario enviado com sucesso! \nPara mantermos os seus dados atualizados, responda esse investor report no dia: \n${dia}/${mes}/${ano} \n Anote na sua agenda!`);
        window.history.back();

        setTimeout(() => setSuccessMessage(''), 3000); // Limpa a mensagem após 3 segundos

        // Limpa os campos
        setNome('');
        setResponsavel('');
        setAno(new Date().getFullYear());
        setMes('');
        setContato('');
        setMrr('');
        setFaturamento('');
        setDespesas('');
        setCaixa('');
        setCashBurn('');
        setRunway('');
        setValuation('');
        setClientes('');
        setCac('');
        setChurn('');
        setLtv('');
        setBoasNoticias('');
        setMasNoticias('');
        setAjuda('');
      } else {
        alert("Houve um erro ao enviar o formulário.");
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário", error);
      alert("Erro ao enviar o formulário. Tente novamente mais tarde.");
    }
  };

  return (
    <Box py={10} bg={backgroundColor} borderRadius="lg" boxShadow="lg" maxW="800px" mx="auto" position="relative">
      <Button
        size="sm"
        colorScheme="gray"
        onClick={() => navigate(-1)}  // Voltar para a página anterior
        position="absolute"
        top="0"
        left="0"
        ml={4}
        bg={primaryColor}
        color="white"
        _hover={{
          bg: "#0547A1",
          transform: "scale(1.05)",
        }}
        transition="all 0.2s ease-in-out"
      >
        Voltar
      </Button>

      <Heading as="h1" mb={6} textAlign="center" color={primaryColor}>
        Report da Startup
      </Heading>
      <Box borderWidth="1px" borderRadius="lg" p={6} bg="white" boxShadow="md">
        <Stack spacing={6}>
          {/* Informações Básicas */}
          <Heading as="h2" size="md">Informações Básicas</Heading>
          <SimpleGrid columns={[1, 2]} spacing={4}>
            <FormControl isRequired>
              <FormLabel color={primaryColor}>Nome da Startup</FormLabel>
              <Input
                placeholder="Digite o nome da startup"
                focusBorderColor={accentColor}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color={primaryColor}>Nome da pessoa responsável</FormLabel>
              <Input
                placeholder="Digite o nome do responsável"
                focusBorderColor={accentColor}
                value={responsavel}
                onChange={(e) => setResponsavel(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color={primaryColor}>Ano que está sendo respondido</FormLabel>
              <Select
                placeholder="Selecione o ano"
                focusBorderColor={accentColor}
                value={ano}
                onChange={(e) => setAno(e.target.value)}
              >
                {Array.from({ length: 101 }, (_, i) => 2000 + i).map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel color={primaryColor}>Mês que está sendo respondido</FormLabel>
              <Select
                placeholder="Selecione o mês"
                focusBorderColor={accentColor}
                value={mes}
                onChange={(e) => setMes(e.target.value)}
              >
                {["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"].map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel color={primaryColor}>Email e número para contato</FormLabel>
              <Input
                placeholder="Digite o email e número para contato"
                focusBorderColor={accentColor}
                value={contato}
                onChange={(e) => setContato(e.target.value)}
              />
            </FormControl>
          </SimpleGrid>

          {/* Dados Financeiros */}
          <Heading as="h2" size="md">Dados Financeiros</Heading>
          <SimpleGrid columns={[1, 2]} spacing={4}>
            <FormControl isRequired>
              <FormLabel color={primaryColor}>MRR</FormLabel>
              <NumberInput
                min={0}
                precision={2}
                focusBorderColor={accentColor}
                value={mrr}
                onChange={(value) => setMrr(value)}
              >
                <NumberInputField placeholder="Ex: 20000.00" />
              </NumberInput>
            </FormControl>

            <FormControl isRequired>
              <FormLabel color={primaryColor}>Faturamento YTD</FormLabel>
              <NumberInput
                min={0}
                precision={2}
                focusBorderColor={accentColor}
                value={faturamento}
                onChange={(value) => setFaturamento(value)}
              >
                <NumberInputField placeholder="Ex: 120000.00" />
              </NumberInput>
            </FormControl>

            <FormControl isRequired>
              <FormLabel color={primaryColor}>Despesas</FormLabel>
              <NumberInput
                min={0}
                precision={2}
                focusBorderColor={accentColor}
                value={despesas}
                onChange={(value) => setDespesas(value)}
              >
                <NumberInputField placeholder="Ex: 60000.00" />
              </NumberInput>
            </FormControl>

            <FormControl isRequired>
              <FormLabel color={primaryColor}>Dinheiro em caixa</FormLabel>
              <NumberInput
                min={0}
                precision={2}
                focusBorderColor={accentColor}
                value={caixa}
                onChange={(value) => setCaixa(value)}
              >
                <NumberInputField placeholder="Ex: 500000.00" />
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel color={primaryColor}>Cash Burn</FormLabel>
              <NumberInput
                min={0}
                precision={2}
                focusBorderColor={accentColor}
                value={cashBurn}
                onChange={(value) => setCashBurn(value)}
              >
                <NumberInputField placeholder="Ex: 10000.00" />
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel color={primaryColor}>Runway</FormLabel>
              <Input
                placeholder="Ex: 12 meses"
                focusBorderColor={accentColor}
                value={runway}
                onChange={(e) => setRunway(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel color={primaryColor}>Valuation da última rodada</FormLabel>
              <Input
                placeholder="Ex: R$10.000.000"
                focusBorderColor={accentColor}
                value={valuation}
                onChange={(e) => setValuation(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel color={primaryColor}>Quantidade de clientes</FormLabel>
              <Input
                placeholder="Ex: 10 clientes"
                focusBorderColor={accentColor}
                value={clientes}
                onChange={(e) => setClientes(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel color={primaryColor}>CAC</FormLabel>
              <NumberInput
                min={0}
                precision={2}
                focusBorderColor={accentColor}
                value={cac}
                onChange={(value) => setCac(value)}
              >
                <NumberInputField placeholder="Ex: 3500.00" />
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel color={primaryColor}>Churn</FormLabel>
              <Input
                placeholder="Ex: 5%"
                focusBorderColor={accentColor}
                value={churn}
                onChange={(e) => setChurn(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel color={primaryColor}>LTV</FormLabel>
              <Input
                placeholder="Ex: R$35.000"
                focusBorderColor={accentColor}
                value={ltv}
                onChange={(e) => setLtv(e.target.value)}
              />
            </FormControl>
          </SimpleGrid>

          {/* Notícias */}
          <Heading as="h2" size="md">Notícias</Heading>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel color={primaryColor}>Boas notícias</FormLabel>
              <Textarea
                placeholder="Compartilhe boas notícias"
                focusBorderColor={accentColor}
                value={boasNoticias}
                onChange={(e) => setBoasNoticias(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel color={primaryColor}>Más notícias</FormLabel>
              <Textarea
                placeholder="Compartilhe más notícias"
                focusBorderColor={accentColor}
                value={masNoticias}
                onChange={(e) => setMasNoticias(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel color={primaryColor}>Como podemos ajudar?</FormLabel>
              <Textarea
                placeholder="Nos diga como podemos ajudar"
                focusBorderColor={accentColor}
                value={ajuda}
                onChange={(e) => setAjuda(e.target.value)}
              />
            </FormControl>
          </Stack>

          {/* Botão Enviar */}
          <Button
            colorScheme="blue"
            size="lg"
            w="full"
            bg={primaryColor}
            onClick={handleSubmit}

          >
            Enviar
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default StartupForm;
