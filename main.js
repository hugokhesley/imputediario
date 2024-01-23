// Lista de executivos
const executivos = [
    '-----SMB NEN-----',
    'Cintia Silva Falcone',
    'Hugo Khesley Nobrega Dias Brito',
    'IZADORA FRANKLIN FERREIRA',
    'LAURO ROGERIO MAIA NOGUEIRA',
    'SIMONE RODRIGUES FRANCO',
    'VIVIANE DE MENEZES FERREIRA',

    ' ',

    '-----SMB NES-----',
    'CARLOS ROBERTO TEIXEIRA DE ALBUQUERQUE LINS',
    'JOAO AMBROSIO RAMOS',
    'Luiz Gonzaga dos Santos Neto',
    'ROSA TALITA MACHADO DOS SANTOS'
];

const selecionaExecutivos = document.getElementById("executivoSelecionado");
const tabelaPrevisoes = document.getElementById("tabelaPrevisoes");
const corpoTabela = document.getElementById("corpoTabela");

executivos.forEach(function(executivo) {
    const option = document.createElement("option");
    option.value = executivo;
    option.text = executivo;
    selecionaExecutivos.add(option);
});

function getDataAtual() {
    var data = new Date();
    var dia = data.getDate().toString().padStart(2, '0');
    var mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Mês é baseado em zero
    var ano = data.getFullYear();
    return dia + '/' + mes + '/' + ano;

}
document.getElementById('dataAtual').textContent = 'Data: ' + getDataAtual();

/*
function processarMensagem() {
    var mensagemRecebida = document.getElementById('mensagemInput').value;

    // Expressão regular para encontrar executivos e suas linhas "Hoje"
    var regex = /TBP - Nordeste - (\w+).*?Hoje: (\d+\/\d+)?/g;

    var matches;
    while ((matches = regex.exec(mensagemRecebida)) !== null) {
        var executivo = matches[1];
        var vendasHoje = matches[2] || 'Sem dados hoje'; // Se não houver dados, use uma mensagem padrão

        console.log('Executivo:', executivo);
        console.log('Vendas Hoje:', vendasHoje);
        console.log('---');
        }
    }*/

//const executivo = document.getElementById('executivo').value;
//const quantidadeLinhas = document.getElementById('quantidadeLinhas').value;
//const receitaFinanceira = document.getElementById('receitaFinanceira').value;

// Aqui você pode adicionar lógica para enviar os dados para o backend ou realizar outras operações.
// Por enquanto, apenas exibiremos os dados no console.
//console.log('Executivo:', executivo);
//console.log('Quantidade de Linhas:', quantidadeLinhas);
//console.log('Receita Financeira:', receitaFinanceira);

// Limpar os campos após o envio
document.getElementById('quantidadeLinhas').value = '';
document.getElementById('receitaFinanceira').value = '';

const previsoesDiarias = {};

function enviarPrevisao() {
    const dataAtual = new Date().toLocaleDateString();

    // Obter valores diretamente do DOM dentro da função enviarPrevisao
    const executivoSelecionado = selecionaExecutivos.value;
    const quantidadeLinhas = document.getElementById('quantidadeLinhas').value;
    const receitaFinanceira = document.getElementById('receitaFinanceira').value;

    // Verificar se o executivo já enviou uma previsão para o dia atual
    if (previsoesDiarias[dataAtual] && previsoesDiarias[dataAtual][executivoSelecionado]) {
        alert('O executivo já incluiu uma previsão para hoje.');
        return;
    }

    // Validar se os valores são números inteiros antes de adicionar à tabela
    const linhasValidas = /^\d+$/.test(quantidadeLinhas);
    const financeiroValido = /^\d+$/.test(receitaFinanceira);

    if (linhasValidas && financeiroValido) {
        // Adicionar a previsão à tabela
        const newRow = corpoTabela.insertRow();
        const cellData = newRow.insertCell(0);
        const cellExecutivo = newRow.insertCell(1);
        const cellLinhas = newRow.insertCell(2);
        const cellFinanceiro = newRow.insertCell(3);
        const cellEditar = newRow.insertCell(4); // Adicionar célula para o botão de editar
    
        cellData.textContent = dataAtual;
        cellExecutivo.textContent = executivoSelecionado;
        cellLinhas.textContent = quantidadeLinhas;
        cellFinanceiro.textContent = receitaFinanceira;
    
        // Armazenar a previsão diária do executivo
        if (!previsoesDiarias[dataAtual]) {
            previsoesDiarias[dataAtual] = {};
        }
        previsoesDiarias[dataAtual][executivoSelecionado] = true;
    
        // Adicionar o botão de editar
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = function() {
            editarPrevisao(newRow);
        };
        cellEditar.appendChild(btnEditar);
    
        // Limpar a área de entrada após adicionar à tabela
        document.getElementById('quantidadeLinhas').value = '';
        document.getElementById('receitaFinanceira').value = '';
    } else {
        alert('Por favor, insira valores válidos para a quantidade de linhas e receita financeira.');
    }

    
}

function editarPrevisao(row) {
    const dataAtual = new Date().toLocaleDateString();
    const executivoSelecionado = row.cells[1].textContent;
    const quantidadeLinhas = prompt('Informe a nova quantidade de linhas:');
    const receitaFinanceira = prompt('Informe a nova receita financeira:');

    // Validar se os novos valores são números inteiros antes de editar a tabela
    const linhasValidas = /^\d+$/.test(quantidadeLinhas);
    const financeiroValido = /^\d+$/.test(receitaFinanceira);

    if (linhasValidas && financeiroValido) {
        // Atualizar os valores na tabela
        row.cells[0].textContent = dataAtual;
        row.cells[2].textContent = quantidadeLinhas;
        row.cells[3].textContent = receitaFinanceira;

        // Atualizar a previsão diária do executivo
        if (!previsoesDiarias[dataAtual]) {
            previsoesDiarias[dataAtual] = {};
        }
        previsoesDiarias[dataAtual][executivoSelecionado] = true;

    } else {
        alert('Por favor, insira valores válidos para a quantidade de linhas e receita financeira.');
    }
}