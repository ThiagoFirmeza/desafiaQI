const QUESTIONS = [
    { q: "1. Complete a sequência: 3, 9, 27, 81, ?", opts: ["162","243","324","121"], a: 1 },
    { q: "2. Se TODOS os zorn são frinks e ALGUNS frinks são bips, então:", opts: ["Todos os bips são zorn","Alguns bips podem ser zorn","Nenhum bip é zorn","Todos os frinks são bips"], a: 1 },
    { q: "3. Qual figura completa corretamente a sequência lógica?", opts: ["△◯□△◯□","□◯△◯□△","◯□△□◯△","△□◯△□◯"], a: 3 },
    { q: "4. Encontre o número que falta: 7, 14, 28, 56, ?", opts: ["84","98","112","120"], a: 2 },
    { q: "5. Se o relógio adianta 2 minutos por hora, quantos minutos adiantará em 24h?", opts: ["24","36","48","60"], a: 2 },
    { q: "6. Encontre o intruso: 16, 25, 36, 49, 81.", opts: ["16","25","36","81"], a: 3 },
    { q: "7. Qual número é diferente dos outros: 2, 3, 5, 7, 9, 11?", opts: ["3","7","9","11"], a: 2 },
    { q: "8. Se A = 1, B = 2, C = 3, qual é o valor de CAB?", opts: ["312","6","213","24"], a: 1 },
    { q: "9. Em uma corrida, você ultrapassa o segundo colocado. Em que posição está agora?", opts: ["Primeiro","Segundo","Terceiro","Último"], a: 1 },
    { q: "10. Um cubo tem 6 faces. Quantos cubos menores de mesmo tamanho formam um cubo maior de 3x3x3?", opts: ["9","18","27","36"], a: 2 },
    { q: "11. Se o dobro de um número é igual a 3 a mais do que ele, qual é o número?", opts: ["1","2","3","4"], a: 2 },
    { q: "12. Se todos os filósofos são pensadores e alguns pensadores são artistas, então:", opts: ["Todos os artistas são filósofos","Alguns artistas podem ser filósofos","Nenhum filósofo é artista","Todos os artistas são pensadores"], a: 1 },
    { q: "13. O que vem a seguir? J, F, M, A, M, J, J, A, S, O, N, ?", opts: ["D","E","M","F"], a: 0 },
    { q: "14. Qual o próximo número: 1, 4, 9, 16, 25, ?", opts: ["30","35","36","49"], a: 2 },
    { q: "15. Se 5 gatos pegam 5 ratos em 5 minutos, quantos gatos pegam 100 ratos em 100 minutos?", opts: ["5","10","20","100"], a: 0 },
    { q: "16. Um trem de 120m atravessa um túnel de 480m em 30s. Qual é sua velocidade?", opts: ["60 km/h","72 km/h","96 km/h","120 km/h"], a: 2 },
    { q: "17. Se um círculo representa 360°, o que representa ⅔ dele?", opts: ["120°","180°","240°","270°"], a: 2 },
    { q: "18. Qual palavra não pertence: árvore, flor, raiz, tijolo?", opts: ["Flor","Raiz","Tijolo","Árvore"], a: 2 },
    { q: "19. Encontre o padrão: 11, 13, 17, 19, ?", opts: ["21","23","25","27"], a: 1 },
    { q: "20. Uma balança equilibra 2 bolas de ferro e 1 de madeira com 9 kg. Se 1 bola de ferro pesa 4 kg, quanto pesa a de madeira?", opts: ["1 kg","2 kg","3 kg","4 kg"], a: 1 },
    { q: "21. Se 6 pessoas levam 6 dias para construir 6 muros, quanto tempo 3 pessoas levarão para construir 3 muros?", opts: ["3 dias","6 dias","9 dias","12 dias"], a: 1 },
    { q: "22. Se 2x + 3 = 11, então x =", opts: ["3","4","5","6"], a: 1 }
  ];
  
  let currentIndex = 0;
  let answers = [];
  let chart = null;
  
  const homeScreen = document.getElementById("homeScreen");
  const quizScreen = document.getElementById("quizScreen");
  const paymentScreen = document.getElementById("paymentScreen");
  const resultScreen = document.getElementById("resultScreen");
  const progressBar = document.getElementById("progressBar");
  const qNumber = document.getElementById("qNumber");
  const qText = document.getElementById("qText");
  const choices = document.getElementById("choices");
  const scoreDisplay = document.getElementById("scoreDisplay");
  const correctAnswers = document.getElementById("correctAnswers");
  const funMessage = document.getElementById("funMessage");
  
  // ==== Navegação ====
  document.getElementById("startBtn").onclick = () => {
    homeScreen.classList.remove("active");
    quizScreen.classList.add("active");
    renderQuestion();
  };
  
  document.getElementById("prevBtn").onclick = () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderQuestion();
    }
  };
  
  document.getElementById("nextBtn").onclick = () => {
    if (document.querySelector('input[name="q"]:checked')) {
      answers[currentIndex] = parseInt(document.querySelector('input[name="q"]:checked').value);
      currentIndex++;
      renderQuestion();
    } else {
      showAlert("Selecione uma resposta!", "Atenção");
    }
  };
  
  document.getElementById("finishBtn").onclick = () => {
    if (document.querySelector('input[name="q"]:checked')) {
      answers[currentIndex] = parseInt(document.querySelector('input[name="q"]:checked').value);
      quizScreen.classList.remove("active");
      paymentScreen.classList.add("active");
    } else {
      showAlert("Responda a última pergunta antes de finalizar!", "Ops!");
    }
  };
  
  document.getElementById("payBtn").onclick = () => {
    // Simulação de pagamento
    paymentScreen.classList.remove("active");
    resultScreen.classList.add("active");
    showResult();
  };
  
  // ==== Renderização ====
  function renderQuestion() {
    const q = QUESTIONS[currentIndex];
    qNumber.innerText = `Pergunta ${currentIndex + 1} de ${QUESTIONS.length}`;
    qText.innerText = q.q;
    choices.innerHTML = "";
  
    q.opts.forEach((opt, i) => {
      const label = document.createElement("label");
      label.className = "choice";
      label.innerHTML = `<input type="radio" name="q" value="${i}" ${answers[currentIndex]===i?'checked':''}> ${opt}`;
      choices.appendChild(label);
    });
  
    progressBar.style.width = ((currentIndex) / QUESTIONS.length * 100) + "%";
    document.getElementById("prevBtn").style.display = currentIndex === 0 ? 'none' : 'inline-block';
    document.getElementById("nextBtn").style.display = currentIndex === QUESTIONS.length - 1 ? 'none' : 'inline-block';
    document.getElementById("finishBtn").style.display = currentIndex === QUESTIONS.length - 1 ? 'inline-block' : 'none';
  }
  
  // ==== Resultado ====
  function showResult() {
    const correct = answers.filter((a, i) => a === QUESTIONS[i].a).length;
    const iq = Math.round(80 + (correct / QUESTIONS.length) * 40);
    scoreDisplay.innerText = iq;
    correctAnswers.innerText = correct;
  
    let message = "";
    if (iq >= 140) message = "🧠 Quase Einstein!";
    else if (iq >= 120) message = "✨ Acima da média! Você é afiado!";
    else if (iq >= 100) message = "😎 Dentro da média, mente equilibrada!";
    else message = "😂 Bora tentar de novo? O importante é se divertir!";
  
    funMessage.innerText = message;
  
    const ctx = document.getElementById("iqChart").getContext("2d");
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Você", "Média Mundial"],
        datasets: [{
          label: 'QI',
          data: [iq, 100],
          backgroundColor: ['#00b4d8', '#94a3b8']
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true, max: 160 }
        }
      }
    });
  }
  
  // ==== ALERTA CENTRAL ====
  function showAlert(message, title = "Aviso") {
    let existing = document.querySelector(".custom-alert");
    if (existing) existing.remove();
  
    let alertBox = document.createElement("div");
    alertBox.classList.add("custom-alert");
    alertBox.innerHTML = `
      <h2>${title}</h2>
      <p>${message}</p>
      <button onclick="this.parentElement.remove()">OK</button>
    `;
    document.body.appendChild(alertBox);
    setTimeout(() => alertBox.classList.add("active"), 10);
  }
  