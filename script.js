/**
 * Função principal que encontra todas as subsequências consecutivas crescentes
 * em um array de números.
 *
 * @param {number[]} daysArray - Array de dias a ser analisado
 * @returns {number[][]} Array de arrays com as subsequências encontradas
 */
function findConsecutiveSequences(daysArray) {
  if (daysArray.length === 0) return [];

  let sequences = [];
  let currentSequence = [daysArray[0]];

  for (let i = 1; i < daysArray.length; i++) {
    // Verifica se o número atual é consecutivo ao anterior
    if (daysArray[i] === daysArray[i - 1] + 1) {
      currentSequence.push(daysArray[i]);
    } else {
      // Adiciona a sequência atual ao resultado e inicia uma nova
      sequences.push(currentSequence);
      currentSequence = [daysArray[i]];
    }
  }

  // Adiciona a última sequência
  sequences.push(currentSequence);

  return sequences;
}

/**
 * Processa a entrada do usuário e exibe o resultado
 */
function processInput() {
  const input = document.getElementById('days-input').value.trim();
  const resultDiv = document.getElementById('result');
  const calculationDiv = document.getElementById('calculation');

  // Limpa resultados anteriores
  resultDiv.innerHTML = '';
  calculationDiv.innerHTML = '';

  if (!input) {
    resultDiv.textContent = 'Por favor, insira uma lista de dias.';
    return;
  }

  try {
    // Processa a entrada e converte para array de números
    const daysArray = input
      .split(',')
      .map(item => parseInt(item.trim()))
      .filter(item => !isNaN(item));

    calculationDiv.innerHTML = `Processando a sequência: [${daysArray.join(', ')}]\n\n`;

    if (daysArray.length === 0) {
      resultDiv.textContent = 'Nenhum número válido encontrado na entrada.';
      return;
    }

    // Encontra as sequências consecutivas
    const sequences = findConsecutiveSequences(daysArray);

    // Exibe o resultado formatado horizontalmente
    if (sequences.length === 0) {
      resultDiv.textContent = 'Nenhuma sequência consecutiva encontrada.';
    } else {
      sequences.forEach(seq => {
        const seqElement = document.createElement('div');
        seqElement.className = 'sequence-box';
        seqElement.textContent = `[${seq.join(', ')}]`;
        resultDiv.appendChild(seqElement);
      });
    }

    // Mostra o passo a passo do cálculo
    calculationDiv.innerHTML += `Passo a passo:\n`;
    calculationDiv.innerHTML += `1. Iniciamos com o primeiro número: ${daysArray[0]}\n`;

    let currentSeq = [daysArray[0]];

    for (let i = 1; i < daysArray.length; i++) {
      if (daysArray[i] === daysArray[i - 1] + 1) {
        calculationDiv.innerHTML += `2. ${daysArray[i]} é consecutivo, adicionando à sequência atual\n`;
        currentSeq.push(daysArray[i]);
      } else {
        calculationDiv.innerHTML += `3. ${daysArray[i]} não é consecutivo, finalizando sequência [${currentSeq}] e iniciando nova com ${daysArray[i]}\n`;
        currentSeq = [daysArray[i]];
      }
    }

    calculationDiv.innerHTML += `\nTotal de sequências encontradas: ${sequences.length}`;
  } catch (error) {
    resultDiv.textContent =
      'Ocorreu um erro ao processar a entrada. Certifique-se de que os números estão separados por vírgulas.';
    console.error(error);
  }
}

/**
 * Limpa os campos de entrada e resultado
 */
function clearFields() {
  document.getElementById('days-input').value = '';
  document.getElementById('result').textContent = '';
  document.getElementById('calculation').textContent = '';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('decipher-btn').addEventListener('click', processInput);
  document.getElementById('return-btn').addEventListener('click', clearFields);

  // Permite pressionar Enter no input para acionar o botão DECIFRAR
  document.getElementById('days-input').addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      processInput();
    }
  });
});
