const catalogo = document.querySelector("#catalogo");

if (catalogo) {
    const campobusca = document.querySelector("#busca");
    const filtrocategoria = document.querySelector("#categoria");
    const contador = document.querySelector("#contador");

    const whatsapp = "5584988663787";

    let todosprodutos = [];

    let todascategorias = [];

    const btnanterior = document.querySelector("#btnanterior");

    const btnproximo = document.querySelector("#btnproximo");

    let numeropagina = document.querySelector("#numeropagina");

    let pagina = 1;

    const totalpaginas = 2;

    numeropagina.innerHTML = pagina;

    function carregarpagina() {
        let url = `https://soulcroheapi.tsr.net.br/produtos/?page=${pagina}`

        if (filtrocategoria.value && filtrocategoria.value !== "todas") {
            url += `&categoria__slug=${filtrocategoria.value}`;
        }

        console.log(url);

        fetch(url)
            .then(function (resposta) {
                return resposta.json();
            })
            .then(function (produtos) {
                todosprodutos = produtos.results;
                console.log(todosprodutos);
                aplicarfiltros();

            });

    }

    carregarpagina();

    function mostrarprodutos(lista) {
        const cards = lista.map(function (produto) {
            const mensagem = "Olá! Tenho interesse no produto " + produto.nome;
            const link = "https://wa.me/" + whatsapp + "?text=" + encodeURIComponent(mensagem);
            return `
                <article class="card">
                <img src="${produto.imagem}" alt="${produto.nome} em crochê">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <span class="preco">R$ ${produto.preco}</span>
                <a href="${link}" target="_blank" rel="noopener">Quero Este</a>
                </article>`;

        });


        catalogo.innerHTML = cards.join("");

    }


    btnanterior.addEventListener("click", function () {
        console.log("btnanterior");
        if (pagina === 1) {
            return;

        } else {
            pagina--;
            numeropagina.innerHTML = pagina;
        };
        carregarpagina();
    });

    btnproximo.addEventListener("click", function () {
        console.log("btnproximo");
        if (pagina < totalpaginas) {
            pagina++;
            numeropagina.innerHTML = pagina;
        };
        carregarpagina();
    });

    function mostrarcategorias(lista2) {
        const categoria = lista2.map(function (categoria) {
            console.log (categoria);
            return `
                <option value="${categoria.slug}">${categoria.nome}</option>`
        });
        filtrocategoria.innerHTML += categoria.join("");
    }

    function categorias() {
        fetch("https://soulcroheapi.tsr.net.br/categorias/")
            .then(function (resposta2) {
                return resposta2.json();
            })
            .then(function (categorias) {
                todascategorias = categorias.results;
                mostrarcategorias(todascategorias);
            });

    };

    categorias();

    function aplicarfiltros() {
        const termo = campobusca.value.toLowerCase();
        const filtrados = todosprodutos.filter(function (produto) {
            const combinanome = produto.nome.toLowerCase().includes(termo);
            return combinanome;
        });

        console.log("chamando mostrarprodutos", filtrados);
        mostrarprodutos(filtrados);
        atualizarcontador(filtrados.length);

        filtrocategoria.addEventListener("change", function () {
        pagina = 1; 
        numeropagina.innerHTML = pagina;
        carregarpagina(); 
        console.log("change");
    });
    
    }

    function atualizarcontador(quantidade) {
        if (!contador) return;
        if (quantidade === 1) {
            contador.textContent = "1 produto encontrado";
        } else {
            contador.textContent = quantidade + " produtos encontrados";
        }
    }

    campobusca.addEventListener("input", aplicarfiltros);
    filtrocategoria.addEventListener("change", function () {
        // aplicarfiltros();
        carregarpagina();
        console.log("change");
    })

}
