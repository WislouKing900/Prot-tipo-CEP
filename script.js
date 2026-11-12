// 1. Selecionamos os elementos do HTML pelos seus IDs
    const campoCep = document.getElementById('cep');
    const campoRua = document.getElementById('rua');
    const campoBairro = document.getElementById('bairro');
    const campoCidade = document.getElementById('cidade');
    const campoEstado = document.getElementById('estado');
    const campoNumero = document.getElementById('numero');

    // 2. Criamos um "ouvinte" que dispara assim que o usuário sai do campo CEP (evento 'blur')
    campoCep.addEventListener('blur', function() {
        // Remove tudo o que não for número do CEP (caso o usuário digite com traço)
        const cepLimpo = campoCep.value.replace(/\D/g, '');

        if (cepLimpo.length === 8) {
            // 3. Fazemos a requisição (Fetch) para a API do ViaCEP
            fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
                .then(resposta => resposta.json())
                .then(dados => {
                    // Se o CEP não existir, a API retorna { erro: true }
                    if (dados.erro) {
                        alert('CEP não encontrado. Verifique o número digitado.');
                        limparCampos();
                    } else {
                        // 4. Preenche os inputs com os dados retornados pela API
                        campoRua.value = dados.logradouro;
                        campoBairro.value = dados.bairro;
                        campoCidade.value = dados.localidade;
                        campoEstado.value = dados.uf;

                        // Joga o cursor do mouse direto para o campo Número
                        campoNumero.focus();
                    }
                })
                .catch(erro => {
                    console.error('Erro ao buscar o CEP:', erro);
                    alert('Erro ao consultar o CEP. Verifique sua conexão.');
                });
        } else if (cepLimpo.length > 0) {
            alert('CEP inválido. O CEP deve conter 8 números.');
            limparCampos();
        }
    }); // <--- ESSA CHAVE E ESTE PARÊNTESES ESTAVAM FALTANDO!

    // Função auxiliar para limpar os campos se der erro
    function limparCampos() {
        campoRua.value = '';
        campoBairro.value = '';
        campoCidade.value = '';
        campoEstado.value = '';
    }