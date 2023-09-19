//1. Inicialização

var localDB = null;

function onInit(){
    try {
        if (!window.openDatabase) {
            console.log("Erro: Seu navegador não permite banco de dados.");
            alert("Erro: Seu navegador não é compativel com esta aplicação.\n\nTente usar o Google Chrome");
        }
        else {
            initDB();
            createTables();
        }
    } 
    catch (e) {
        if (e == 2) {
            console.log("Erro: versao de banco de dados invalida.");
        }
        else {
            console.log("Erro: Erro desconhecido: " + e + ".");
        }
        return;
    }
}
 
function initDB(){
    var shortName = 'ctrs';
    var version = '1.0';
    var displayName = 'ctrs';
    var maxSize = 65536; // Em bytes
    localDB = window.openDatabase(shortName, version, displayName, maxSize);
}

function findPaciente(paciente){// lê no banco o restante das informações deste paciente e adiciona nos inputs

    var query = "SELECT * FROM pacientes WHERE nome = ?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [paciente], function(transaction, results){
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);

                    if(row.nome == document.getElementById("nomePaciente").value){
                        document.getElementById("nomeMae").value = row.nomeMae;
                        document.getElementById("peso").value = row.peso;
                        document.getElementById("altura").value = row.altura;
                        document.getElementById("cpf").value = row.cpf;
                        document.getElementById("telefone").value = row.telefone;
                        
                    }
 
                }
            }, function(transaction, error){
                console.log("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        console.log("Error: SELECT nao realizado " + e + ".");
    }

}

function findPrByName(nome){// lê no banco o restante das informações deste prescritor e adiciona nos inputs
    var query = "SELECT * FROM prescritores WHERE nome = ? LIMIT 1;";
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [nome], function(transaction, results){
                if (!results) {
                    //updateStatus("Erro: desconhecido.");
                }else{
                    prefixo = results.rows[0]['prefixo']
                    medicoSolicitanteCNS = results.rows[0]['cns']
                    //console.log(results.rows[0])
                    
                    
                }
            }, function(transaction, error){
                console.log("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        console.log("Error: SELECT nao realizado " + e + ".");
    }

}

function onDelete(cpf){
    
    var query = "delete from pacientes where cpf=?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [cpf], function(transaction, results){
                if (!results.rowsAffected) {
                    updateStatus("Erro: Delete não realizado.");
                }
                else {
                    console.log("Linhas deletadas:" + results.rowsAffected);
                    
                }
            });
        });
    } 
    catch (e) {
        console.log("Erro: DELETE não realizado " + e + ".");
    }
    
}


function deleteProcess(id, nome){
    
    var query = "delete from processos where id=?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [id], function(transaction, results){
                if (!results.rowsAffected) {
                    updateStatus("Erro: Delete não realizado.");
                }
                else {
                    console.log("Linhas deletadas:" + results.rowsAffected);
                    //reload page
                    start_grid_patient_process(nome);
                    
                }
            });
        });
    } 
    catch (e) {
        console.log("Erro: DELETE não realizado " + e + ".");
    }
    
}

function showPrescritoresOnScreen(){
    var query = "SELECT * FROM prescritores ORDER BY nome COLLATE NOCASE;";
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], function(transaction, results){
                configurarCNSdoMedico(results.rows[0]['nome'])
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    document.getElementById("medico").innerHTML += "<option value='"+row.nome+"\nCRM "+row.crm+"'>"+row.nome+"</option>";
                }
            }, function(transaction, error){
                console.log("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        console.log("Error: SELECT nao realizado " + e + ".");
    }
}

var medicamentosEmMemoria = []
function refreshMedicamentos(){
    var query = "SELECT * FROM medicamentos ORDER BY nome COLLATE NOCASE;";
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], function(transaction, results){
                medicamentosEmMemoria = results
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    document.getElementById("medicamento").innerHTML += "<option value='"+row.id+"'>"+row.nome+" -> quantidade: "+row.qtd+"</option>";
                }
            }, function(transaction, error){
                console.log("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        console.log("Error: SELECT nao realizado " + e + ".");
    }
}

var lista //variavel pra receber a lista de medicamentos para mostrar no update de med
function getListaMedicamentos(){
    var query = "SELECT * FROM medicamentos ORDER BY nome COLLATE NOCASE;";
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], function(transaction, results){
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    lista += "["+row.id+"] "+ row.nome + " " +row.posologia+" "+row.qtd+"\n";
                }
            }, function(transaction, error){
                console.log("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        console.log("Error: SELECT nao realizado " + e + ".");
    }
}



function leitura(){     //lê todos os pacientes e adiciona no selec
    findEs()//verifica se ja configurou o estabelecimento se nao pede configurar
    findPr()//procura prescritor se nao encontra pede para cadastrar
    showPrescritoresOnScreen()//atualiza a lista de prescritores na tela
    pacienteEstaEmUso("s")//atualiza a variavel com a informacao de uso no carregamento da tela passei "s" porque sempre no carregamento da tela a primeira informacao é s
    getListaMedicamentos()
    var query = "SELECT * FROM pacientes ORDER BY nome COLLATE NOCASE;";
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], function(transaction, results){
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    document.getElementById("nomePaciente").innerHTML += "<option value='"+row.nome+"'>"+row.nome+"</option>";
                }
            }, function(transaction, error){
                console.log("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        console.log("Error: SELECT nao realizado " + e + ".");
    }
    refreshMedicamentos()

}

function grid_patients(){     //lê todos os pacientes e adiciona no selec

    var query = "SELECT * FROM pacientes ORDER BY nome COLLATE NOCASE;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [], function(transaction, results){
                for (var i = 0; i < results.rows.length; i++) {
                
                    var row = results.rows.item(i);

                    document.getElementById("tbody").innerHTML += `
                    <tr class='border-b border-gray-900 dark:border-gray-700'>
                            <td><a class='no-underline hover:underline' href="javascript:start_grid_patient_process('`+row.nome+`')">`+row.nome+`</a></td>
                            <td>`+row.cpf+`</td>
                    </tr>`;
                    //console.log(row);
                    
                    
                }
            }, function(transaction, error){
                console.log("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        console.log("Error: SELECT nao realizado " + e + ".");
    }

}

function grid_patient_process(paciente){

    var query = "SELECT * FROM processos WHERE nome = ? ORDER BY id DESC;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [paciente], function(transaction, results){
                for (var i = 0; i < results.rows.length; i++) {
                
                    var row = results.rows.item(i);

                    document.getElementById("paciente").innerText = 'Paciente: '+row.nome;

                    document.getElementById("tbody").innerHTML += `
                    <tr class='border-b border-gray-900 dark:border-gray-700'>
                        <td class='py-3 px-6 bg-gray-50 dark:bg-gray-800'>`+row.dataMontagem+`</td>
                        <td class='py-3 px-6 bg-gray-50 dark:bg-gray-800'>`+row.medicamentos+`</td>
                        <td class='py-3 px-6 bg-gray-50 dark:bg-gray-800'>`+row.medico+`</td>
                        <td class='py-3 px-6 bg-gray-50 dark:bg-gray-800'>
                            <button onclick='deleteProcess("`+row.id+`","`+row.nome+`")' class='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded'>Excluir</button>
                        </td>
                        
                    </tr>`;
                    //console.log(row);
                    
                    
                }
            }, function(transaction, error){
                console.log("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        console.log("Error: SELECT nao realizado " + e + ".");
    }

}


function insertPaciente(nome, nomeMae, cpf, peso, altura, telefone){
    if(cpf == null || cpf == ""){
        console.log("precisa inserir o cpf")
        return
    }else{
        var query = "SELECT * FROM pacientes WHERE cpf = ?;";
        try {
            localDB.transaction(function(transaction){
            
                transaction.executeSql(query, [cpf], function(transaction, results){
                    if(results.rows.length > 0){
                        console.log("paciente já cadastrado"+results.rows.length)
                        return
                    }else{
                        
                        var query = "insert into pacientes (nome, nomeMae, cpf, peso, altura, telefone) VALUES (?, ?, ?, ?, ?, ?);";
                            try {
                                localDB.transaction(function(transaction){
                                    transaction.executeSql(query, [nome, nomeMae, cpf, peso, altura, telefone], function(transaction, results){
                                        if (!results.rowsAffected) {
                                            console.log("Erro: Insert paciente não realizado");
                                        }
                                        else {
                                                
                                            console.log("Insert paciente realizado, linha id: " + results.insertId);
                                            
                                        }
                                    }, errorHandler);
                                });
                            } 
                            catch (e) {
                                console.log("Erro: INSERT não realizado " + e + ".");
                            }
                        }
                    
                }, function(transaction, error){
                    console.log("Erro: " + error.code + "<br>Mensagem: " + error.message);
                });
            });
        } 
        catch (e) {
            console.log("Error: SELECT nao realizado " + e + ".");
        }
    }
    
}

function onCreate(nome, cpf, medicamentos, medico, dataMontagem, usuario){
    //alert("função de insert executada");
    if(window.confirm('Deseja Salvar a Montagem do Processo?')){
        var query = "insert into processos (nome, cpf, medicamentos, medico, dataMontagem, usuario) VALUES (?, ?, ?, ?, ?, ?);";
        try {
            localDB.transaction(function(transaction){
                transaction.executeSql(query, [nome, cpf, medicamentos, medico, dataMontagem, usuario], function(transaction, results){
                    if (!results.rowsAffected) {
                        console.log("Erro: Insert não realizado");
                    }
                    else {
                            
                        console.log("Insert realizado, linha id: " + results.insertId);
                        
                    }
                }, errorHandler);
            });
        } 
        catch (e) {
            console.log("Erro: INSERT não realizado " + e + ".");
        }
    }
    
}

//registrar prescritor
function createPr(prefixo, nome, cns, crm) {
    var query = "insert into prescritores (prefixo, nome, cns, crm) VALUES (?, ?, ?, ?);";
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query, [prefixo, nome, cns, crm], function (transaction, results) {
                if (!results.rowsAffected) {
                    console.log("Erro: Insert não realizado");
                }
                else {
                    console.log("Insert realizado, linha id: " + results.insertId);
                }
            }, errorHandler);
        });
    }
    catch (e) {
        console.log("Erro: INSERT não realizado " + e + ".");
    }
}

function findPr(){//ve se tem prescritor registrado se nao tiver pede para registrar
    var query = "SELECT * from prescritores;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [], function(transaction, results){
                if(results.rows.length == 0){
                    alert("é preciso informar o prescritor para continuar")
                    registrarPrescritor()
                }
            }, function(transaction, error){
                console.log("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        console.log("Error: SELECT nao realizado " + e + ".");
    }
}



function updateEs(nome, nome_centro, cnes, address){//não testei muito só uma ve
    var query = "UPDATE estabelecimento SET nome=?, nome_centro=?, cnes=?, address=? WHERE id = 1;";
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [nome, nome_centro, cnes, address], function(transaction, results){
                if (!results.rowsAffected) {
                    console.log("Erro: Update não realizado.");
                }
                else {
                    console.log("Update realizado:" + results.rowsAffected);
                }
            });
        });
    } 
    catch (e) {
        console.log("Erro: UPDATE não realizado " + e + ".");
    }
    
}

//registrar estabelecimento de saude
function createEs(nome, nome_centro, cnes, address) {
    var query = "insert into estabelecimento (nome, nome_centro, cnes, address) VALUES (?, ?, ?, ?);";
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query, [nome, nome_centro, cnes, address], function (transaction, results) {
                if (!results.rowsAffected) {
                    console.log("Erro: Insert não realizado");
                }
                else {
                    console.log("Insert realizado, linha id: " + results.insertId);
                }
            }, errorHandler);
        });
    }
    catch (e) {
        console.log("Erro: INSERT não realizado " + e + ".");
    }
}

function findEs(){//ve se tem estabelecimento registrado se nao tiver pede para registrar
    var query = "SELECT * from estabelecimento LIMIT 1;";
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], function(transaction, results){
                if(results.rows.length == 0){
                    alert("Atenção: no seu primeiro acesso é preciso configurar os dados de estabelecimento e prescritor\n\n")
                    registrarEstabelecimento()
                }else{
                    //console.log(results.rows[0]['nome']);
                    nome_estabelecimento = results.rows[0]['nome'];
                    nome_centro = results.rows[0]['nome_centro'];
                    cnes = results.rows[0]['cnes'];
                    address = results.rows[0]['address'];
                }
            }, function(transaction, error){
                console.log("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        console.log("Error: SELECT nao realizado " + e + ".");
    }
}

function onUpdate(cpf, nome, nomeMae, peso, altura, telefone){//não testei muito só uma vez

    var query = "update pacientes set nome=?, nomeMae=?, peso=?, altura=?, telefone=? where cpf=?;";
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [nome, nomeMae, peso, altura, telefone, cpf], function(transaction, results){
                if (!results.rowsAffected) {
                    console.log("Erro: Update não realizado.");
                }
                else {
                    console.log("Update realizado:" + results.rowsAffected);
                }
            });
        });
    } 
    catch (e) {
        console.log("Erro: UPDATE n�o realizado " + e + ".");
    }
    
}

function createMedicamento(nome, posologia, qtd) {
    var query = "insert into medicamentos (nome, posologia, qtd) VALUES (?, ?, ?);";
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query, [nome, posologia, qtd], function (transaction, results) {
                if (!results.rowsAffected) {
                    console.log("Erro: Insert não realizado");
                }
                else {
                    console.log("Insert realizado, linha id: " + results.insertId);
                    refreshMedicamentos()
                    getListaMedicamentos()
                }
            }, errorHandler);
        });
    }
    catch (e) {
        console.log("Erro: INSERT não realizado " + e + ".");
    }
}

function getMedicamento(id){
    var query = "SELECT * from medicamentos WHERE id = ? LIMIT 1;";
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [id], function(transaction, results){
                if(results.rows.length == 0){
                    //
                }else{
                    //console.log(results.rows[0]['nome']);
                    var update_medicamento_nome = results.rows[0]['nome'];
                    var update_medicamento_posologia = results.rows[0]['posologia'];
                    var update_medicamento_qtd = results.rows[0]['qtd'];

                    var update_nome = prompt("Insira o nome do medicamento ex.: Alaepoetina 2000UI (Injetavel)", update_medicamento_nome)
                    if(update_nome == null || update_nome == ""){ return 0; }
                    var update_posologia = prompt("Insira a posologia do medicamento, ex.: Tomar 01 cp 3x por dia...\n: ", update_medicamento_posologia)
                    if(update_posologia == null || update_posologia == ""){ return 0; }
                    var update_qtd = prompt("Insira o quantidade do medicamento por mês: ", update_medicamento_qtd)
                    if(update_qtd == null || update_qtd == ""){ return 0; }

                    updateMd(update_nome, update_posologia, update_qtd, id);
                    refreshMedicamentos()//reexec for update global vars with database
                }
            }, function(transaction, error){
                console.log("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        console.log("Error: SELECT nao realizado " + e + ".");
    }
}

function updateMd(nome, posologia, qtd, id){
    var query = "UPDATE medicamentos SET nome=?, posologia=?, qtd=? WHERE id=?;";
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [nome, posologia, qtd, id], function(transaction, results){
                if (!results.rowsAffected) {
                    console.log("Erro: Update não realizado.");
                }
                else {
                    console.log("Update realizado:" + results.rowsAffected);
                }
            });
        });
    } 
    catch (e) {
        console.log("Erro: UPDATE não realizado " + e + ".");
    }
    
}

//registrar estabelecimento de saude
function migrate_medicamentos() {
    var query = "insert into medicamentos (nome, posologia, qtd) VALUES ('Incrilex', 'tomar 1x por dia', '30');";
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(query, [], function (transaction, results) {
                if (!results.rowsAffected) {
                    console.log("Erro: Insert não realizado");
                }
                else {
                    console.log("Insert realizado, linha id: " + results.insertId);
                }
            }, errorHandler);
        });
    }
    catch (e) {
        console.log("Erro: INSERT não realizado " + e + ".");
    }
}

function criarTabelaMedicamentos(){
    var query = 'CREATE TABLE IF NOT EXISTS medicamentos(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nome VARCHAR NOT NULL, posologia VARCHAR NOT NULL, qtd VARCHAR NOT NULL);';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
            console.log("Tabela 'medicamentos' status: OK.");
        });
    } 
    catch (e) {
        console.log("Erro: Data base 'medicamentos' não criada " + e + ".");
    }
}

function criarTabelaEstabelecimento(){
    var query = 'CREATE TABLE IF NOT EXISTS estabelecimento(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nome VARCHAR NOT NULL, nome_centro VARCHAR, cnes VARCHAR NOT NULL, address VARCHAR);';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
            console.log("Tabela 'estabelecimento' status: OK.");
        });
    } 
    catch (e) {
        console.log("Erro: Data base 'estabelecimento' não criada " + e + ".");
    }
}

function createTables(){
    criarTabelaEstabelecimento()
    criarTabelaMedicamentos()

    var query = 'CREATE TABLE IF NOT EXISTS processos(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nome VARCHAR NOT NULL, cpf VARCHAR NOT NULL, medicamentos VARCHAR NOT NULL, medico VARCHAR NOT NULL, dataMontagem VARCHAR NOT NULL, usuario VARCHAR NOT NULL);';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
            console.log("Tabela 'processos' status: OK.");
        });
    } 
    catch (e) {
        console.log("Erro: Data base 'processos' não criada " + e + ".");
    }

    var queryPacientes = 'CREATE TABLE IF NOT EXISTS pacientes(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nome VARCHAR NOT NULL, nomeMae VARCHAR, cpf VARCHAR NOT NULL, peso VARCHAR, altura VARCHAR, telefone VARCHAR );';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(queryPacientes, [], nullDataHandler, errorHandler);
            console.log("Tabela 'pacientes' status: OK.");
        });
    } 
    catch (e) {
        console.log("Erro: Data base 'pacientes' não criada " + e + ".");
    }

    var q = 'CREATE TABLE IF NOT EXISTS prescritores(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, prefixo VARCHAR NOT NULL, nome VARCHAR NOT NULL, cns VARCHAR NOT NULL, crm VARCHAR NOT NULL );';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(q, [], nullDataHandler, errorHandler);
            console.log("Tabela 'prescritores' status: OK.");
        });
    } 
    catch (e) {
        console.log("Erro: Data base 'prescritores' não criada " + e + ".");
    }


}


// Tratando erros
 
errorHandler = function(transaction, error){
    //updateStatus("Erro: " + error.message);
    return true;
}
 
nullDataHandler = function(transaction, results){
}
