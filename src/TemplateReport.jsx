import { Grid, Box, Text, Flex, Button } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function InvestorReportView({ id, onBack }) {
  const [dados, setDados] = useState({
    nome: '',
    responsavel: '',
    mes: '',
    contato: '',
    mrr: '',
    faturamento: '',
    despesas: '',
    caixa: '',
    cashBurn: '',
    runway: '',
    valuation: '',
    clientes: '',
    cac: '',
    churn: '',
    ltv: '',
    boasNoticias: '',
    masNoticias: '',
    ajuda: '',
  });

  const [graficos, setGraficos] = useState({
    mrr: [],
    faturamento: [],
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchReportData = async (id) => {
    if (!id) {
      setError('ID inválido. Não é possível buscar dados.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/formulario/form_investorreport/${id}`);
      setDados(response.data || {});
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao buscar dados.');
    }
  };

  const fetchGraficosData = async (id) => {
    if (!id) {
      setError('ID inválido. Não é possível buscar dados.');
      return;
    }

    try {
      const responseGraficos = await axios.get(`http://localhost:3000/formulario/getGraficos/${id}`);
      setGraficos({
        mrr: responseGraficos.data.map(item => item.mrr),
        faturamento: responseGraficos.data.map(item => item.faturamento),
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao buscar dados.');
    }
  };

  useEffect(() => {
    if (id) {
      fetchReportData(id);
      fetchGraficosData(id);
    }
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/lista');
    }
  };

  const mrrData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'MRR (R$)',
        data: graficos.mrr,
        backgroundColor: '#072AC8',
      },
    ],
  };

  const faturamentoData = {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029'],
    datasets: [
      {
        label: 'Faturamento (R$)',
        data: graficos.faturamento,
        backgroundColor: '#1E90FF',
      },
    ],
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bg="gray.50">
      <Box
        p={4}
        bg="white"
        width="210mm"
        height="297mm"
        border="1px solid gray"
        display="flex"
        flexDirection="column"
        overflowY="auto"
      >
        <Flex gap={4} mb={4} display={{ base: 'flex', print: 'none' }}>
          <Button onClick={handleBack} colorScheme="blue" mr={2}>Voltar</Button>
          <Button onClick={handlePrint} colorScheme="blue">Imprimir</Button>
        </Flex>

        <Text fontSize="2xl" fontWeight="bold" mb={4} color="#072AC8">Relatório de Investidor</Text>

        {/* Informações principais */}
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">NOME</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.nome || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">RESPONSÁVEL</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.responsavel || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">CONTATO</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.contato || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">MÊS</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.mes || 'N/A'}</Box>
          </Box>
        </Grid>

        {/* Dados financeiros */}
        <Text fontSize="lg" fontWeight="bold" mt={4} color="#072AC8">Dados Financeiros</Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={2}>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">MRR</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.mrr || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">FATURAMENTO</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.faturamento || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">DESPESAS</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.despesas || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">CAIXA</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.caixa || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">CASH BURN</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.cashBurn || 'N/A'}</Box>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">RUNWAY</Text>
            <Box bg="gray.200" p={2} borderRadius="md">{dados.runway || 'N/A'}</Box>
          </Box>
        </Grid>

        {/* Notícias */}
        <Text fontSize="lg" fontWeight="bold" mt={4} color="#072AC8">Notícias e Informações</Text>
        <Box mt={2}>
          <Text fontSize="md" fontWeight="bold" color="#072AC8">BOAS NOTÍCIAS</Text>
          <Box bg="gray.200" p={2} borderRadius="md">{dados.boasNoticias || 'N/A'}</Box>
        </Box>
        <Box mt={2}>
          <Text fontSize="md" fontWeight="bold" color="#072AC8">MÁS NOTÍCIAS</Text>
          <Box bg="gray.200" p={2} borderRadius="md">{dados.masNoticias || 'N/A'}</Box>
        </Box>
        <Box mt={2}>
          <Text fontSize="md" fontWeight="bold" color="#072AC8">AJUDA NECESSÁRIA</Text>
          <Box bg="gray.200" p={2} borderRadius="md">{dados.ajuda || 'N/A'}</Box>
        </Box>

        {/* Gráficos */}
        <Text fontSize="lg" fontWeight="bold" mt={8} mb={4} color="#072AC8">Análises</Text>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">Gráfico de MRR</Text>
            <Bar data={mrrData} options={{ responsive: true, maintainAspectRatio: true }} />
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2} color="#072AC8">Gráfico de Faturamento Anual</Text>
            <Bar data={faturamentoData} options={{ responsive: true, maintainAspectRatio: true }} />
          </Box>
        </Grid>

        {error && (
          <Box mt={4} p={3} bg="red.300" borderRadius="md" color="white">
            {error}
          </Box>
        )}
      </Box>


    </Box>

  );
}

export default InvestorReportView;
