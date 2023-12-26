function cadastrarUsuario() {
    document.getElementById("loginMain").style.display = 'none';
    let registroMain = document.getElementById("registroMain")
    registroMain.style.display = 'block';
    registroMain.style.width = "50vw";
    registroMain.style.height = "100vh";
    registroMain.style.display = "flex";
    registroMain.style.justifyContent = "center";
    registroMain.style.alignItems = "center";
}

let cadForm = document.getElementById("form_cadastro");
cadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let emailUsuario = document.getElementById('emailUsuario').value;
    let nomeUsuario = document.getElementById('nomeUsuario').value;
    let senhaUsuario = document.getElementById('senhaUsuario').value;

    console.log(emailUsuario);
    console.log(nomeUsuario);
    console.log(senhaUsuario);

    let usuarios = new Array();

    if (localStorage.hasOwnProperty("usuarios")) {
        // -- recuperar os valores da propriedade usuarios do localStorage e converte string para object -- //
        usuarios = JSON.parse(localStorage.getItem("usuarios"));
    }
    let usuarioDuplicado = usuarios.find(usuario => {
        return usuario.email_usuario === emailUsuario;
    });
    if (usuarioDuplicado) {
        alert("Já existe um usuário cadastrado com o email informado.\nEmail já utilizado: " + emailUsuario);
        window.location.href = "index.html"
    } else {
        // -- Adiciona um novo objeto no array de usuarios -- //
        usuarios.push({ email_usuario: emailUsuario, nome_usuario: nomeUsuario, senha_usuario: senhaUsuario, tarefas: [] });

        // -- Salva no localStorage -- //
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        alert("Usuário criado com sucesso!")
        window.location.href = "index.html"
    }
});

let loginForm = document.getElementById("form_login");
loginForm.addEventListener('submit', (l) => {
    l.preventDefault();

    let emailLogin = document.getElementById('emailLogin').value;
    let senhaLogin = document.getElementById('senhaLogin').value;
    // -- Procura usuários cadastrados -- //
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // -- Vê se há correspondência com os parametros que chegaram em relação a lista de cadastros: -- //
    let usuarioAutentica = usuarios.find(usuario => {
        return usuario.email_usuario === emailLogin && usuario.senha_usuario === senhaLogin;
    });
    if (usuarioAutentica) {
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAutentica));
        alert("Você está autênticado.")
        window.location.href = "gerenciador_tarefas.html"
    } else {
        alert("OOPS! Sua senha ou email estão incorretos.")
        window.location.href = "index.html"
    }
});