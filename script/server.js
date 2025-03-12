const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../public')));

let senhas = {
    Cursos: 0,
    Lazer: 0,
    Prioridade: 0,
    Pagamento: 0,
    Saude: 0
};

let filaSenhas = []; // Armazena as senhas geradas
let ultimasSenhas = []; // Armazena as últimas 5 senhas chamadas

// Função para gerar senhas
app.post('/gerar-senha', (req, res) => {
    const { tipo } = req.body;

    if (!senhas.hasOwnProperty(tipo)) {
        return res.status(400).json({ error: 'Tipo de senha inválido' });
    }

    senhas[tipo]++;
    const senhaFormatada = formatarSenha(tipo, senhas[tipo]);

    // Adiciona a senha à fila
    filaSenhas.push(senhaFormatada);

    res.json({ senha: senhaFormatada });
});

// Função para chamar senhas
app.post('/chamar-senha', (req, res) => {
    if (filaSenhas.length > 0) {
        const senha = filaSenhas.shift(); // Remove a primeira senha da fila
        const guiche = Math.floor(Math.random() * 5) + 1; // Simula um guichê aleatório (1 a 5)

        // Adiciona a senha chamada à lista das últimas 5
        ultimasSenhas.unshift({ senha, guiche });
        if (ultimasSenhas.length > 5) {
            ultimasSenhas.pop(); // Mantém apenas as últimas 5 senhas
        }

        res.json({ senha, guiche });
    } else {
        res.status(404).json({ error: 'Não há senhas na fila' });
    }
});

// Rota para obter as últimas senhas chamadas
app.get('/ultimas-senhas', (req, res) => {
    res.json({ ultimasSenhas });
});

// Função para formatar a senha
function formatarSenha(tipo, numero) {
    const prefixos = {
        Cursos: 'C',
        Lazer: 'L',
        Prioridade: 'P',
        Pagamento: 'PP',
        Saude: 'S'
    };

    const prefixo = prefixos[tipo];
    return `${prefixo}${String(numero).padStart(3, '0')}`;
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});