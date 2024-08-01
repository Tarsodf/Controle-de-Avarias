document.addEventListener('DOMContentLoaded', function() {
    // Seleciona os elementos do DOM
    const loginContainer = document.getElementById('loginContainer');
    const avariaContainer = document.getElementById('avariaContainer');
    const loginForm = document.getElementById('loginForm');
    const avariaForm = document.getElementById('avariaForm');
    const empresaSelect = document.getElementById('empresa');
    const equipamentoSelect = document.getElementById('equipamento');
    const tipoAvariaSelect = document.getElementById('tipo_avaria');
    const numeroFrota = document.getElementById('frota');
    const numeroSerie = document.getElementById('numero_serie');

    // Define avarias por tipo de equipamento
    const avariasPorEquipamento = {
        Amineo: [
            'Falha de Comunicação',
            'Tampa da Impressora',
            'Sem Som',
            'Horário Adiantado ou Atrasado',
            'Não Muda as Paragens',
            'Não Imprime Bilhete',
            'Troca de Cablagem',
            'Perda de Conectividade',
            'Falha no SAM',
            'Pino de Conexão'
        ],
        Reflex: [
            'Não Muda as Paragens',
            'Não Envia Contas',
            'Não Lê Andantes',
            'Falha de Impressora',
            'Não Inicia'
        ],
        Gateway: [
            'Falha de Envio de Contas',
            'Equipamento Não Liga',
            'Não Muda as Paragens'
        ],
        Connect: [
            'Falha de Envio de Contas',
            'Equipamento Não Liga',
            'Perda de Conectividade'
        ]
    };

    // Define os equipamentos baseados na empresa
    const equipamentosPorEmpresa = {
        'Ave Mobilidade': 'Amineo',
        'Aveiro Bus': 'Amineo',
        'Tamega e Sousa': 'Amineo',
        'Tuba': '',
        'Transdev Norte': '',
        'Verde Minho Transporte': '',
        'Cavado': 'Connect',
        'Empresa Horteleira do Geres': '',
        'Avic': ''
    };

    // Adiciona o evento de submissão ao formulário de login
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Simula um login bem-sucedido
        const login = document.getElementById('ilogin').value;
        const senha = document.getElementById('isenha').value;

        
        if (login && senha) {
            loginContainer.style.display = 'none';
            avariaContainer.style.display = 'block';
        } else {
            alert('Por favor, insira login e senha válidos.');
        }
    });

    // Adiciona o evento de mudança ao seletor de empresa
    empresaSelect.addEventListener('change', function() {
        const empresaSelecionada = empresaSelect.value;

        // Define o equipamento baseado na empresa selecionada
        const equipamento = equipamentosPorEmpresa[empresaSelecionada];
        if (equipamento) {
            equipamentoSelect.value = equipamento;
            atualizarTipoAvaria(equipamento);
        } else {
            equipamentoSelect.value = ''; // Reseta o valor do equipamento se não houver correspondência
            tipoAvariaSelect.innerHTML = '<option value="" disabled selected>Selecione o Tipo de Avaria:</option>'; // Limpa avarias
        }

        // Limpa os campos de número de frota e número de série
        numeroFrota.value = '';
        numeroSerie.value = '';
    });

    // Atualiza o tipo de avaria baseado no equipamento selecionado
    function atualizarTipoAvaria(equipamento) {
        tipoAvariaSelect.innerHTML = '<option value="" disabled selected>Selecione o Tipo de Avaria:</option>';
        if (avariasPorEquipamento[equipamento]) {
            avariasPorEquipamento[equipamento].forEach(avaria => {
                const option = document.createElement('option');
                option.value = avaria;
                option.textContent = avaria;
                tipoAvariaSelect.appendChild(option);
            });
        }
    }

    // Adiciona o evento de mudança ao seletor de equipamento
    equipamentoSelect.addEventListener('change', function() {
        const equipamentoSelecionado = equipamentoSelect.value;
        atualizarTipoAvaria(equipamentoSelecionado);

        // Limpa os campos de número de frota e número de série
        numeroFrota.value = '';
        numeroSerie.value = '';
    });

    // Adiciona o evento de submissão ao formulário de avaria
    avariaForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const descricao = document.getElementById('descricao').value;
        const tipo_avaria = document.getElementById('tipo_avaria').value;

        const avariaData = {
            descricao: descricao,
            tipo_avaria: tipo_avaria
        };

        fetch('http://127.0.0.1:5000/avarias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(avariaData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Avaria adicionada com sucesso!');
            avariaForm.reset(); // Reseta o formulário após o envio
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Erro ao adicionar a avaria!');
        });
    });
});
