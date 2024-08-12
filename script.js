document.addEventListener('DOMContentLoaded', function() {
    const loginContainer = document.getElementById('loginContainer');
    const avariaContainer = document.getElementById('avariaContainer');
    const cadastroContainer = document.getElementById('cadastroContainer');
    const loginForm = document.getElementById('loginForm');
    const avariaForm = document.getElementById('avariaForm');
    const cadastroForm = document.getElementById('cadastroForm');
    const empresaSelect = document.getElementById('empresa');
    const equipamentoSelect = document.getElementById('equipamento');
    const tipoAvariaSelect = document.getElementById('tipo_avaria');
    const numeroFrota = document.getElementById('frota');
    const numeroSerie = document.getElementById('numero_serie');

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

    // Navegação entre Login e Cadastro
    document.getElementById('linkCadastro').addEventListener('click', function(event) {
        event.preventDefault();
        loginContainer.style.display = 'none';
        cadastroContainer.style.display = 'block';
    });

    document.getElementById('linkLogin').addEventListener('click', function(event) {
        event.preventDefault();
        cadastroContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const login = document.getElementById('ilogin').value;
        const senha = document.getElementById('isenha').value;

        if (senha.length < 5) {
            alert('A senha deve ter exatamente 5 caracteres.');
            return;
        }

        if (login && senha) {
            loginContainer.style.display = 'none';
            avariaContainer.style.display = 'block';
        } else {
            alert('Por favor, insira login e senha válidos.');
        }
    });

    cadastroForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const empresa = document.getElementById('empresaCadastro').value;
        const localidade = document.getElementById('localidade').value;
        const login = document.getElementById('loginCadastro').value;
        const senha = document.getElementById('senhaCadastro').value;

        if (senha.length !== 5) {
            alert('A senha deve ter exatamente 5 caracteres.');
            return;
        }

        const cadastroData = {
            nome: nome,
            email: email,
            empresa: empresa,
            localidade: localidade,
            login: login,
            senha: senha
        };

        fetch('/register', { // Atualize a URL conforme necessário
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cadastroData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Cadastro realizado com sucesso!');
            cadastroForm.reset();
            cadastroContainer.style.display = 'none';
            loginContainer.style.display = 'block';
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Erro ao realizar o cadastro!');
        });
    });

    empresaSelect.addEventListener('change', function() {
        const empresaSelecionada = empresaSelect.value;
        const equipamento = equipamentosPorEmpresa[empresaSelecionada];

        if (equipamento) {
            equipamentoSelect.value = equipamento;
            atualizarTipoAvaria(equipamento);
        } else {
            equipamentoSelect.value = '';
            tipoAvariaSelect.innerHTML = '<option value="" disabled selected>Selecione o Tipo de Avaria:</option>';
        }

        numeroFrota.value = '';
        numeroSerie.value = '';
    });

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

    equipamentoSelect.addEventListener('change', function() {
        const equipamentoSelecionado = equipamentoSelect.value;
        atualizarTipoAvaria(equipamentoSelecionado);

        numeroFrota.value = '';
        numeroSerie.value = '';
    });

    avariaForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const descricao = document.getElementById('descricao').value;
        const tipo_avaria = document.getElementById('tipo_avaria').value;

        const avariaData = {
            descricao: descricao,
            tipo_avaria: tipo_avaria
        };

        fetch('http://127.0.0.1:5000/avarias', { // Atualize a URL conforme necessário
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
            avariaForm.reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Erro ao adicionar a avaria!');
        });
    });

    // Limitar a senha a no máximo 5 caracteres
    document.getElementById('senhaCadastro').addEventListener('input', function() {
        if (this.value.length > 5) {
            this.value = this.value.slice(0, 5);
        }
    });

    document.getElementById('isenha').addEventListener('input', function() {
        if (this.value.length > 5) {
            this.value = this.value.slice(0, 5);
        }
    });
});
