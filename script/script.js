// Função para gerar senha
async function gerarSenha(tipo) {
    const response = await fetch('/gerar-senha', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tipo }),
    });
    const data = await response.json();
    document.getElementById('mensagem').innerText = `Senha gerada: ${data.senha}`;
}

// Função para chamar a próxima senha
async function chamarProximaSenha() {
    const response = await fetch('/chamar-senha', {
        method: 'POST',
    });
    const data = await response.json();

    if (data.senha) {
        document.getElementById('senhaAtual').innerText = data.senha;
        document.getElementById('guicheAtual').innerText = `Guichê: ${data.guiche}`;
        atualizarUltimasSenhas();
    } else {
        alert(data.error);
    }
}

// Função para atualizar as últimas senhas chamadas
async function atualizarUltimasSenhas() {
    const response = await fetch('/ultimas-senhas');
    const data = await response.json();
    const listaSenhas = document.getElementById('listaSenhas');
    if (listaSenhas) {
        listaSenhas.innerHTML = data.ultimasSenhas
            .map(s => `<div>${s.senha} - Guichê: ${s.guiche}</div>`)
            .join('');
    }
}

// Atualiza as últimas senhas a cada 2 segundos (apenas no visor)
if (window.location.pathname.includes('visor.html')) {
    setInterval(atualizarUltimasSenhas, 2000);
}