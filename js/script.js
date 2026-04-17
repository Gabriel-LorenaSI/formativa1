const form = document.getElementById("enderecoForm");
const nomeInput = document.getElementById("nome");
const cepInput = document.getElementById("cep");
const logradouroInput = document.getElementById("logradouro");
const numeroInput = document.getElementById("numero");
const ufInput = document.getElementById("uf");
const modal = document.getElementById("successModal");
const closeModalBtn = document.getElementById("closeModalBtn");

const regras = {
  nome: /^[a-zA-ZÀ-ÿ]+(?:\s+[a-zA-ZÀ-ÿ]+)+$/,
  cep: /^\d{5}-\d{3}$/,
  numero: /^\d+$/,
  uf: /^[A-Z]{2}$/,
};

function validarTempoReal(input, regex, minLength = 0) {
  const valor = input.value.trim();
  let valido = valor.length > 0;

  if (regex && !regex.test(valor)) valido = false;
  if (minLength && valor.length < minLength) valido = false;

  if (valido) {
    input.classList.remove("error");
    input.classList.add("success");
    input.nextElementSibling.style.display = "none";
  } else {
    input.classList.remove("success");
  }

  return valido;
}

nomeInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
  validarTempoReal(nomeInput, regras.nome);
});

numeroInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/\D/g, "");
  validarTempoReal(numeroInput, regras.numero);
});

cepInput.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "");
  value = value.replace(/^(\d{5})(\d)/, "$1-$2");
  e.target.value = value;
  validarTempoReal(cepInput, regras.cep);
});

ufInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.toUpperCase().replace(/[^A-Z]/g, "");
  validarTempoReal(ufInput, regras.uf);
});

logradouroInput.addEventListener("input", () => {
  validarTempoReal(logradouroInput, null, 5);
});

function mostrarErro(inputElement, mensagem) {
  inputElement.classList.remove("success");
  inputElement.classList.add("error");
  const errorDiv = inputElement.nextElementSibling;
  errorDiv.innerText = mensagem;
  errorDiv.style.display = "block";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;

  if (!validarTempoReal(nomeInput, regras.nome)) {
    mostrarErro(nomeInput, "Insira nome e sobrenome válidos.");
    isValid = false;
  }

  if (!validarTempoReal(cepInput, regras.cep)) {
    mostrarErro(cepInput, "Formato exigido: 00000-000.");
    isValid = false;
  }

  if (!validarTempoReal(logradouroInput, null, 5)) {
    mostrarErro(logradouroInput, "Mínimo de 5 caracteres.");
    isValid = false;
  }

  if (!validarTempoReal(numeroInput, regras.numero)) {
    mostrarErro(numeroInput, "Insira apenas números.");
    isValid = false;
  }

  if (!validarTempoReal(ufInput, regras.uf)) {
    mostrarErro(ufInput, "Exatamente 2 letras maiúsculas.");
    isValid = false;
  }

  if (isValid) {
    modal.style.display = "flex";
  }
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
  form.reset();
  document.querySelectorAll("input").forEach((input) => {
    input.classList.remove("success", "error");
  });
});
