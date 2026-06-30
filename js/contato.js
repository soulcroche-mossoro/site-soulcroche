const campocep = document.querySelector("#cep");
const btnsubmit = document.querySelector("#btnsubmit")

if (campocep) {
    campocep.addEventListener("blur", buscarendereco);

    const formcontato = document.querySelector("#informacoes");
    if (formcontato) {
        formcontato.addEventListener("submit", function (evento) {
            evento.preventDefault();
            const ok = document.querySelector("#mensagem-enviada");
            if (ok) {
                ok.textContent = "Recebemos seu cadastro! Em breve entraremos em contato.";
            }
            formcontato.reset();

        });
    }
}

function buscarendereco() {
    const aviso = document.querySelector("#aviso-cep");

    const cep = apenasdigitos(campocep.value);

    if (cep.length !== 8) {
        if (aviso) aviso.textContent = "Digite um CEP 8 números.";
        limparendereco();
        return;
    }

    fetch("https://viacep.com.br/ws/" + cep + "/json/")
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dados) {
            if (dados.erro) {
                if (aviso) aviso.textContent = "CEP não encontrado. Confira o número.";
                limparendereco();
                return;
            }
            if (aviso) aviso.textContent = ""
            document.querySelector("#rua").value = dados.logradouro;
            document.querySelector("#bairro").value = dados.bairro;
            document.querySelector("#cidade").value = dados.localidade;
            document.querySelector("#uf").value = dados.uf;
        })
        .catch(function () {
            if (aviso) aviso.textContent = "Não foi possível buscar o CEP agora. Tente de novo."
        })
}

function apenasdigitos(texto) {
    return texto.split("").filter(function (caractere) {
        return "0123456789".includes(caractere);
    }).join("");
}

function limparendereco() {
    document.querySelector("#rua").value = "";
    document.querySelector("#bairro").value = "";
    document.querySelector("#cidade").value = "";
    document.querySelector("#uf").value = "";
}



btnsubmit.addEventListener("click", function () {
    const dadosFormulario = {
        nome: document.querySelector('#nome').value,
        telefone: document.querySelector('#telefone').value,
        email: document.querySelector('#email').value,
        cep: document.querySelector('#cep').value,
        rua: document.querySelector('#rua').value,
        bairro: document.querySelector('#bairro').value,
        cidade: document.querySelector('#cidade').value,
        uf: document.querySelector('#uf').value,
        numero: document.querySelector('#numero').value,
        mensagem: document.querySelector('#mensagem').value
    };

    fetch("https://soulcroheapi.tsr.net.br/contatos/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token 56ae077863fe595d52349df398d592339828640c"
        },
        body: JSON.stringify(dadosFormulario)
    })
    console.log("mandarformulario");
});

