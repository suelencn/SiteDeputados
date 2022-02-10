let urldeputados = 'https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome';
let urldeputadosID = 'https://dadosabertos.camara.leg.br/api/v2/deputados/';
let urlpartidos = 'https://dadosabertos.camara.leg.br/api/v2/partidos';
let listaNomes = document.querySelector('#listaDeputados');
let lista = document.querySelector('#lista');
let listanomesPartidos = document.querySelector('#listaPartidos');
let listaDeputadosPartidos = document.querySelector('#deputadosPartido');
let listadesp = document.querySelector('#listadespesas');



// ---------------------------CHAMA FUNÇÕES DOS BOTÕES --------------------//
//Botão listar deputados
document.querySelector('#listarDeputados').onclick = function(){
    requestDeputados(urldeputados);
}

//Botão filtrar deputado por ID/Nome
document.querySelector('#buscaDeputados').onclick = function(){
    requestSelecionaDeputado(urldeputados);  
}

//Botão listar partidos
document.querySelector('#buscaPartidos').onclick = function(){
    requestPartidos();
}

//Botão listar despesas
document.querySelector('#buscaDespesas').onclick = function(){
    var anoselecionado = document.getElementById("ano");
    var messelecionado = document.getElementById("mes");
    let id = 204544;
    requestDespesas(id, messelecionado.options[mes.selectedIndex].value, anoselecionado.options[ano.selectedIndex].value);
}


// <<<<<<<<<--------------------------- DEPUTADOS ----------------------------------->>>>>>>>>>>>>>>>>//

//-----------------REQUESTS---------------//

//Request selecionar deputado
function requestSelecionaDeputado(url){
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function(e){
        if(request.readyState === 4){
            if(request.status == 200){
            var combo = '<select class="btn btn-outline-dark" id=selecionanome>'+criaCombobox(request.response)+'</select> <button type="button" class="btn btn-outline-dark" onclick="buscaDeputados()"> Consulta Deputado </button>';
            listaNomes.innerHTML = combo; 
            }else{
                alert('Erro ao receber os dados: '+request.statusText);
            }
        }
    };
    request.onerror = function(e){
        alert('Erro: '+request.statusText);
    }

    request.responseType = 'json';
    request.send(null);
}

//Request p/ listar os deputados
function requestDeputados(url){
    let request = new XMLHttpRequest();
    request.open('GET', urldeputados, true);
    request.onload = function(e){
        if(request.readyState === 4){
            if(request.status == 200){
                //responseDeputados(request.response);
                var table  = "<table ><tr><th>Nome</th><th>Partido</th><th>ID</th></tr>" + criaLista(request.response) +"</table>";
                lista.innerHTML = table;
            }else{
                alert('Erro ao receber os dados: '+request.statusText);
            }
        }
    };
    request.onerror = function(e){
        alert('Erro: '+request.statusText);
    }

    request.responseType = 'json';
    request.send(null);
}

//Request para buscar deputado por ID
function retornaDeputado(id){
    let request = new XMLHttpRequest();
    request.open('GET', urldeputadosID+id, true);
    request.onload = function(e){
        if(request.readyState === 4){
            if(request.status == 200){
                responseID(request.response);
            }else{
                alert('Erro ao receber os dados: '+request.statusText);
            }
        }
    };
    request.onerror = function(e){
        alert('Erro: '+request.statusText);
    }

    request.responseType = 'json';
    request.send(null);
}

//-----FUNCÕES PARA TRATAMENTO DADOS-----//

//Função para criar lista/tabela de deputados
function criaLista(jsonList){
    let listaDeputados;
    for(let i = 0; i < jsonList.dados.length; i++){
        listaDeputados += '<tr><td>'+jsonList.dados[i].nome+'</td><td>'+jsonList.dados[i].siglaPartido+'</td><td>'+jsonList.dados[i].id+'</td><tr>';
    }
    return listaDeputados;
}

//Função para criar combobox de seleção do deputado
function criaCombobox(jsonList){
    let combo;
    for(let i = 0; i < jsonList.dados.length; i++){
        combo += '<option value="'+ (i+1) +'">'+jsonList.dados[i].nome+' - '+jsonList.dados[i].id+'</option>';
    }
    return combo; 
}

//Separa o nome do id deputado selecionado
function buscaDeputados(){
    let Deputado = document.getElementById('selecionanome');
    let nomeDeputado = Deputado.options[selecionanome.selectedIndex].text;
    id = nomeDeputado.split(' - ');
    retornaDeputado(id[1]);
}

//Tratamento da resposta, mostra os dados do deputado na tela....
function responseID(jsonObj){
    let foto = document.querySelector('#foto');
    let nome = document.querySelector('#nomecivil');
    let cpf = document.querySelector('#cpf');
    let sexo = document.querySelector('#sexo');
    let escolaridade = document.querySelector('#escolaridade');
    let datanascimento = document.querySelector('#datanascimento');
    let municipio = document.querySelector('#municipio');
    let uf = document.querySelector('#uf');

    let condicao = document.querySelector('#condicao');
    let data = document.querySelector('#data');
    let nomeeleitoral = document.querySelector('#nomeeleitoral');
    let siglapartido = document.querySelector('#siglapartido');
    let email = document.querySelector('#email');
    let situacao = document.querySelector('#situacao');


    foto.innerHTML = '<img src="'+ jsonObj.dados.ultimoStatus.urlFoto + '" width="150" height="200"></img>';
    nome.innerHTML = 'Nome Civil: ' + jsonObj.dados.nomeCivil;
    cpf.innerHTML = 'CPF: ' + jsonObj.dados.cpf;
    sexo.innerHTML = 'Sexo: ' + jsonObj.dados.sexo;
    escolaridade.innerHTML = 'Escolaridade: ' + jsonObj.dados.escolaridade;
    datanascimento.innerHTML = 'Data Nasc.: ' + jsonObj.dados.dataNascimento;
    municipio.innerHTML = 'Municipio: ' + jsonObj.dados.municipioNascimento;
    uf.innerHTML = 'UF: ' + jsonObj.dados.ufNascimento;

    condicao.innerHTML = 'Condição Eleitoral: ' + jsonObj.dados.ultimoStatus.condicaoEleitoral;
    data.innerHTML = 'Data: ' + jsonObj.dados.ultimoStatus.data;
    nomeeleitoral.innerHTML = 'Nome eleitoral: ' + jsonObj.dados.ultimoStatus.nomeEleitoral;
    siglapartido.innerHTML = 'Partido: ' + jsonObj.dados.ultimoStatus.siglaPartido;
    email.innerHTML = 'Email: ' + jsonObj.dados.ultimoStatus.email;
    situacao.innerHTML = 'Situação: '+jsonObj.dados.ultimoStatus.situacao;

}


// <<<<<<<<<<<<--------------------------------- PARTIDOS -------------------------------------------->>>>>>>>>>>>>//

//------------- REQUESTS -------------//

//Request para listar os partidos
function requestPartidos(){
    let request = new XMLHttpRequest();
    request.open('GET', urlpartidos, true);
    request.onload = function(e){
        if(request.readyState === 4){
            if(request.status == 200){
                responsePartidos(request.response);
            }else{
                alert('Erro ao receber os dados: '+request.statusText);
            }
        }
    };
    request.onerror = function(e){
        alert('Erro: '+request.statusText);
    }

    request.responseType = 'json';
    request.send(null);
}

//Request para buscar os deputados do partido
function requestDeputadosPartidos(){
    let urldeputadospartidos = 'https://dadosabertos.camara.leg.br/api/v2/partidos/'+idpartido[1]+'/membros';
    let request = new XMLHttpRequest();
    request.open('GET', urldeputadospartidos, true);
    request.onload = function(e){
        if(request.readyState === 4){
            if(request.status == 200){
                responseDeputadosPartidos(request.response);
            }else{
                alert('Erro ao receber os dados: '+request.statusText);
            }
        }
    };
    request.onerror = function(e){
        alert('Erro: '+request.statusText);
    }

    request.responseType = 'json';
    request.send(null);
}

//-------------FUNÇÕES PARA TRATAMENTO DOS DADOS -------------//

//Tratamento da resposta, faz um combo box com o nome dos partidos
function responsePartidos(jsonList){
    let listaPartidos = '<select id=selecionapartido class="btn btn-outline-dark">'
    for(let i = 0; i < jsonList.dados.length; i++){
        listaPartidos += '<option value="'+ (i+1) +'">'+jsonList.dados[i].sigla+' - '+jsonList.dados[i].id+'</option>';
    }
    listaPartidos += '</select> <button type="button" class="btn btn-outline-dark" onclick="buscaDeputadosPartido()"> Consulta Deputados do partido </button>';
    listanomesPartidos.innerHTML = listaPartidos;
}

//Separa o nome do id do partido selecionado
function buscaDeputadosPartido(){
    let partido = document.getElementById('selecionapartido');
    let nomePartido = partido.options[selecionapartido.selectedIndex].text;
    idpartido = nomePartido.split(' - ');
    requestDeputadosPartidos();

    
}

//Função para criar lista/tabela de deputados
function criaListaNomes(jsonList){
    let nomesDeputados;
    for(let i = 0; i < jsonList.dados.length; i++){
        nomesDeputados += '<tr><td>'+jsonList.dados[i].nome+'</td><tr>';
    }
    return nomesDeputados;
}


//Função para mostrar nomes deputados do partido selecionado
function responseDeputadosPartidos(jsonList){
    let qualquer = "<table ><tr><th>Nome</th></tr>";
    for(let i = 0; i < jsonList.dados.length; i++){
        qualquer += '<tr><td>'+jsonList.dados[i].nome + '</td><tr>';
    }
    listaDeputadosPartidos.innerHTML = qualquer+'</table>';
}


// <<<<<<<<<<<<--------------------------------- DESPESAS -------------------------------------------->>>>>>>>>>>>>//

//Request para consultar
function requestDespesas(id, mes, ano){
    let url = urldeputadosID+id+'/despesas?'+'ano='+ano+'&mes='+mes+'&itens=200&ordem=ASC&ordenarPor=mes'
    let request = new XMLHttpRequest();
    request.open('GET',url, true);
    request.onload = function(e){
        if(request.readyState === 4){
            if(request.status == 200){
                //responseDespesas(request.response);
                var table  = "<table><tr><th>Tipo de Despesa</th><th>Valor</th></tr>" + criaListaDespesas(request.response) +"</table>";
                listadesp.innerHTML = table;
            }else{
                alert('Erro ao receber os dados: '+request.statusText);
            }
        }
    };
    request.onerror = function(e){
        alert('Erro: '+request.statusText);
    }

    request.responseType = 'json';
    request.send(null);
}

//Função para criar lista/tabela de deputados
function criaListaDespesas(jsonList){
    let listaDespesas;
    for(let i = 0; i < jsonList.dados.length; i++){
        listaDespesas += '<tr><td>'+jsonList.dados[i].tipoDespesa+'</td><td>'+ 'R$'+jsonList.dados[i].valorDocumento+'</td><tr>';
    }
    return listaDespesas;
}


