window.onload = function() {
    exibirTarefas(); // Chama a função para exibir as tarefas na tabela
    let usuarioLogadoSessao = JSON.parse(localStorage.getItem("usuarioLogado"));
    let tag_usu = document.getElementById("usuarioSessaoNome");
    tag_usu.innerHTML = "Bem vindo, " + usuarioLogadoSessao.nome_usuario;
    
};

var cadForm = document.getElementById("form_cadastro");
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
        //recuperar os valores da propriedade usuarios do localStorage
        //converte string para object
        usuarios = JSON.parse(localStorage.getItem("usuarios"));
    }
    let usuarioDuplicado = usuarios.find(usuario => {
        return usuario.email_usuario === emailUsuario;
    });
    if(usuarioDuplicado){
        alert("Já existe um usuário cadastrado com o email informado.\nEmail já utilizado: " + emailUsuario);
        window.location.href = "index.html"
    }else{
    // Adiciona um novo objeto no array de usuarios
    usuarios.push({ email_usuario: emailUsuario, nome_usuario: nomeUsuario, senha_usuario: senhaUsuario, tarefas: []});

    // Salva no localStorage
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
    
    //procura usuários cadastrados:
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    //vê se há correspondência com os parametros que chegaram em relação a lista de cadastros:
    let usuarioAutentica = usuarios.find(usuario => {
        return usuario.email_usuario === emailLogin && usuario.senha_usuario === senhaLogin;
    });
    if(usuarioAutentica){
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAutentica));
        alert("Você está autênticado.")
        window.location.href = "gerenciador_tarefas.html"
    }else{
        alert("OOPS! Sua senha ou email estão incorretos.")
        window.location.href = "index.html"
    }
});


function adicionarTarefa(event) {
    event.preventDefault();

    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Encontrar o usuário logado no array de usuários
    let usuarioIndex = usuarios.findIndex(user => user.email_usuario === usuarioLogado.email_usuario);

    if (usuarioIndex !== -1) {
        // Adicionar a nova tarefa ao usuário logado
        idTarefaAnterior = JSON.parse(localStorage.getItem("ultimaTarefa"));
        if(idTarefaAnterior === null){
            idTarefaAnterior = 0;
        }
        alert(JSON.stringify(idTarefaAnterior));
        let idTarefa = 0;
        alert(idTarefa);
        let tarefaCriada = {
            idTarefa : idTarefaAnterior + 1,
            nomeTarefa : document.getElementById('nomeTarefa').value,
            dataInicio: document.getElementById('dataInicio').value,
            horaInicio: document.getElementById('horaInicio').value,
            dataTermino: document.getElementById('dataTermino').value,
            horaTermino: document.getElementById('horaTermino').value,
            descricaoTarefa: document.getElementById('descricaoTarefa').value,
            statusTarefa: ''
            };

        usuarios[usuarioIndex].tarefas.push(tarefaCriada);
        //usuarios[usuarioIndex].tarefas.ultimaTarefa.push(idTarefa);

        // Atualizar o localStorage com o novo array de usuários
        ///localStorage.setItem("ultimaTarefa", idTarefa).value;
        localStorage.setItem("ultimaTarefa", JSON.stringify(tarefaCriada.idTarefa));
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarios[usuarioIndex]));
        alert("Tarefa criada com sucesso.");
        window.location.href = "gerenciador_tarefas.html";
        
    } else {
        alert("Não foi possível criar uma tarefa.");
    }
}

function exibirTarefas() {
    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    let tbody = document.querySelector("#tabelaTarefas tbody");

    if (usuarioLogado) {
        tbody.innerHTML = "";
        if (usuarioLogado.tarefas.length > 0) {
            usuarioLogado.tarefas.forEach((tarefa, index) => {
                let row = tbody.insertRow();
                let cellTarefa = row.insertCell(0);
                let cellDataInicio = row.insertCell(1);
                let cellDataTermino = row.insertCell(2);
                let cellStatus = row.insertCell(3);
                let cellAlterar = row.insertCell(4);

                cellTarefa.textContent = tarefa.nomeTarefa || '';
                cellDataInicio.textContent = tarefa.dataInicio + " às " + tarefa.horaInicio || '';
                cellDataTermino.textContent = tarefa.dataTermino + " às " + tarefa.horaTermino || '';
                cellStatus.textContent = tarefa.statusTarefa || '';

                let btnAlterar = document.createElement('button');
                btnAlterar.textContent = 'Alterar';
                btnAlterar.classList.add('btn', 'btn-warning');

                // Adiciona um atributo "data-id" ao botão com o ID da tarefa
                btnAlterar.setAttribute('data-id', tarefa.idTarefa);

                btnAlterar.addEventListener('click', (e) => {
                    e.preventDefault();
                    // Captura o ID ao clicar no botão
                    let idTarefa = e.target.getAttribute('data-id');
                    usuSessao = JSON.parse(localStorage.getItem('usuarioLogado'));
                    if(usuSessao.tarefas.idTarefa = idTarefa){
                        tarefao = usuSessao.tarefas[idTarefa - 1];
                        //alert(JSON.stringify(tarefao));
                        localStorage.setItem("idAcao", idTarefa);

                        document.getElementById("nomeTarefaEdit").value = tarefao.nomeTarefa;
                        document.getElementById("dataInicioEdit").value = tarefao.dataInicio;
                        document.getElementById("horaInicioEdit").value = tarefao.horaInicio;
                        document.getElementById("dataTerminoEdit").value = tarefao.dataTermino;
                        document.getElementById("horaTerminoEdit").value = tarefao.horaTermino;


                        document.getElementById("criacaoTarefa").style.display = 'none';
                        document.getElementById("edicaoTarefa").style.display = 'block';


                    }else{
                        alert('Não foi encontrada nenhuma tarefa que tivesse correspondência com o Id informado.')
                    }
                    // Aqui, você pode preencher o formulário de edição com os detalhes da tarefa usando o ID
                    // Isso é um exemplo, você precisa implementar o preenchimento com os detalhes da tarefa
                    alert("Você entrou no modo de edição da tarefa com o ID: " + idTarefa);
                });

                cellAlterar.appendChild(btnAlterar);
            });
        } else {
            tbody.innerHTML = "<tr><td colspan='6'>Nenhuma tarefa encontrada.</td></tr>";
        }
    } else {
        tbody.innerHTML = "<tr><td colspan='6'>Usuário não logado ou não encontrado.</td></tr>";
    }
}

function alterarTarefa(event){
    event.preventDefault();
    let nomeTarefaEdit = document.getElementById("nomeTarefaEdit").value;
    let dataInicioEdit = document.getElementById("dataInicioEdit").value;
    let horaInicioEdit = document.getElementById("horaInicioEdit").value;
    let dataTerminoEdit = document.getElementById("dataTerminoEdit").value;
    let horaTerminoEdit = document.getElementById("horaTerminoEdit").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let idAcao = JSON.parse(localStorage.getItem("idAcao"));
    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    let usuarioIndex = usuarios.findIndex(user => user.email_usuario === usuarioLogado.email_usuario);

    if(usuarioIndex !== -1){
        let tarefaIndex = usuarios[usuarioIndex].tarefas.findIndex(tarefa => tarefa.idTarefa === idAcao);

        if(tarefaIndex !== -1) {
            usuarios[usuarioIndex].tarefas[tarefaIndex].nomeTarefa = nomeTarefaEdit;
            usuarios[usuarioIndex].tarefas[tarefaIndex].dataInicio = dataInicioEdit;
            usuarios[usuarioIndex].tarefas[tarefaIndex].horaInicio = horaInicioEdit;
            usuarios[usuarioIndex].tarefas[tarefaIndex].dataTermino = dataTerminoEdit;
            usuarios[usuarioIndex].tarefas[tarefaIndex].horaTermino = horaTerminoEdit;

            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarios[usuarioIndex]));

            alert("Tarefa atualizada com sucesso!");
            window.location.href = "gerenciador_tarefas.html";
        }else {
            alert('Não foi encontrada nenhuma tarefa que corresponda ao ID informado.');
        }
    } else {
        alert('Usuário não encontrado.');
    }
}
function excluirTarefa(event){
    event.preventDefault();
    let idAcao = JSON.parse(localStorage.getItem("idAcao"));
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    let usuarioIndex = usuarios.findIndex(user => user.email_usuario === usuarioLogado.email_usuario);
    let tarefaIndex = usuarios[usuarioIndex].tarefas.findIndex(tarefa => tarefa.idTarefa === idAcao);
    
    if(tarefaIndex !== -1){
        alert("Tarefa excluída com sucesso.");
        usuarios[usuarioIndex].tarefas.splice(tarefaIndex, 1); // Remove a tarefa do array de tarefas

        for (let i = tarefaIndex; i < usuarios[usuarioIndex].tarefas.length; i++) {
            usuarios[usuarioIndex].tarefas[i].idTarefa = usuarios[usuarioIndex].tarefas[i].idTarefa - 1;
        }
        let ultimaTarefaAlt = JSON.parse(localStorage.getItem("ultimaTarefa"));
        let ultimaTarefaAtt = ultimaTarefaAlt - 1;
        localStorage.setItem("ultimaTarefa", JSON.stringify(ultimaTarefaAtt));

        localStorage.setItem("usuarios", JSON.stringify(usuarios)); // Atualiza o armazenamento local
        usuarioLogado = usuarios[usuarioIndex];
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
        exibirTarefas(); // Atualiza a exibição das tarefas após a exclusão
        window.location.href = "gerenciador_tarefas.html";
    }
}
function alterarStatus(event){
    event.preventDefault();
    
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    let usuarioIndex = usuarios.findIndex(user => user.email_usuario === usuarioLogado.email_usuario);
    let idAcao = JSON.parse(localStorage.getItem("idAcao"));
    let tarefaIndex = usuarios[usuarioIndex].tarefas.findIndex(tarefa => tarefa.idTarefa === idAcao);

    usuarios[usuarioIndex].tarefas[tarefaIndex].statusTarefa = 'Realizada';
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarios[usuarioIndex]));
    window.location.href = 'gerenciador_tarefas.html';
}