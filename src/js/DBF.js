//start indexedDB
//DBF -> Database Functions


const dbName = "pacientesDB";
const dbVersion = 1; // Pode ser qualquer número inteiro

const request = indexedDB.open(dbName, dbVersion);


request.onupgradeneeded = function(event) {
    const db = event.target.result;

    // Verifica se o object store já existe
    if (!db.objectStoreNames.contains("pacientes")) {
        // Cria um object store para armazenar os pacientes
        const objectStore = db.createObjectStore("pacientes",
        { keyPath: "cpf", autoIncrement: true });

        // Definir índices, se necessário
        objectStore.createIndex("nome", "nome", { unique: false });
        objectStore.createIndex("cpf", "cpf", { unique: true });
        objectStore.createIndex("mae", "mae", { unique: false });
        objectStore.createIndex("peso", "peso", { unique: false });
        objectStore.createIndex("altura", "altura", { unique: false });
        objectStore.createIndex("telefone", "telefone", { unique: false });
    }

    if(!db.objectStoreNames.contains("history")){
        // Cria a coleção "history" com um ID autoincrementável
        const historyStore = db.createObjectStore('history', 
        { keyPath: 'id', autoIncrement: true });

        // Define os índices para consulta
        historyStore.createIndex('nomePaciente', 'nomePaciente', { unique: false });
        historyStore.createIndex('cpf', 'cpf', { unique: false });
        historyStore.createIndex('medicamentosParaSalvarNoBanco', 'medicamentosParaSalvarNoBanco', { unique: false });
        historyStore.createIndex('medicoSolicitante', 'medicoSolicitante', { unique: false });
        historyStore.createIndex('dataReceita', 'dataReceita', { unique: false });
    }

    if(!db.objectStoreNames.contains("medicamentos")){
        // Cria a coleção "medicamentos" com um ID autoincrementável
        const medicamentosStore = db.createObjectStore('medicamentos', 
        { keyPath: 'id', autoIncrement: true });

        // Define os índices para consulta
        medicamentosStore.createIndex('nome', 'nome', { unique: false });
        medicamentosStore.createIndex('posologia', 'posologia', { unique: false });
        medicamentosStore.createIndex('qtd', 'qtd', { unique: false });

    }

};

request.onsuccess = function(event) {
    const db = event.target.result;
    // O banco de dados está pronto para uso aqui
    db.close();
};

//função para ler os medicamentso
var medicamentosEmMemoria = new Array()
function consultarMedicamentosOrdemAlfabetica() {
    const dbName = "pacientesDB";
    const request = indexedDB.open(dbName);
  
    request.onsuccess = function(event) {
      const db = event.target.result;
  
      // Iniciar uma transação de leitura no Object Store 'medicamentos'
      const transaction = db.transaction(['medicamentos'], 'readonly');
      const medicamentosStore = transaction.objectStore('medicamentos');
  
      // Abrir um cursor usando o índice 'nome' para percorrer os medicamentos em ordem alfabética
      const cursorRequest = medicamentosStore.index('nome').openCursor();
  
      cursorRequest.onsuccess = function(event) {
        const cursor = event.target.result;
  
        if (cursor) {
          // Aqui você pode acessar os dados de cada medicamento
          /*
          console.log('ID: ' + cursor.value.id);
          console.log('Nome: ' + cursor.value.nome);
          console.log('Posologia: ' + cursor.value.posologia);
          console.log('Quantidade: ' + cursor.value.qtd);
          console.log('------------------');
          */
          medicamentosEmMemoria.push( {
               id: cursor.value.id,
               nome: cursor.value.nome,
               posologia: cursor.value.posologia,
               qtd: cursor.value.qtd
            })

          document.getElementById("medicamento").innerHTML += "<option value='"+cursor.value.id+"'>"+cursor.value.nome+" -> quantidade: "+cursor.value.qtd+"</option>";
            
          // Mover para o próximo medicamento no cursor
          cursor.continue();
        } else {
          // O cursor atingiu o final dos medicamentos
          console.log('Consulta de medicamentos em ordem alfabética concluída.');
          // Fechar a transação e o banco de dados
          transaction.oncomplete = function() {
            db.close();
          };
        }
      };
  
      cursorRequest.onerror = function(event) {
        console.error('Erro ao abrir o cursor: ', event.target.error);
      };
    };
  
    request.onerror = function(event) {
      console.error('Erro ao abrir o banco de dados: ', event.target.error);
    };
  }
  
  // Exemplo de uso
  //consultarMedicamentosOrdemAlfabetica();
  


// Função para salvar historico no IndexedDB  <----------------- 
function saveHistory(nomePaciente, cpf, medicamentosParaSalvarNoBanco, medicoSolicitante, dataReceita) {
    
        var historyData = {
            nomePaciente: nomePaciente,
            cpf: cpf,
            medicamentosParaSalvarNoBanco: medicamentosParaSalvarNoBanco,
            medicoSolicitante: medicoSolicitante,
            dataReceita: dataReceita
        };
    
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = function(event) {
        console.error("Erro ao abrir o banco de dados:", event.target.error);
    };

    request.onsuccess = function(event) {
        const db = event.target.result;

        // Inicia uma transação de leitura/gravação no object store "history"
        const transaction = db.transaction(["history"], "readwrite");

        // Acesso ao object store
        const objectStore = transaction.objectStore("history");

        // Adiciona o historico ao object store
        const addRequest = objectStore.add(historyData);

        addRequest.onsuccess = function() {
            console.log("history save success!");
            transaction.oncomplete = function() {
                db.close();
            };
        };

        addRequest.onerror = function() {
            console.error("Erro ao salvar o historico:", addRequest.error);
        };
    };

}

// Função para atualizar um medicamento
function updateMedicamentoDB(id, newName, newQtd, newPosologia) {
    const dbName = 'pacientesDB';
    const request = indexedDB.open(dbName);
  
    request.onsuccess = function(event) {
      const db = event.target.result;
  
      // Iniciar uma transação de escrita no Object Store 'medicamentos'
      const transaction = db.transaction(['medicamentos'], 'readwrite');
      const medicamentosStore = transaction.objectStore('medicamentos');
  
      // Obter o medicamento pelo ID
      const getRequest = medicamentosStore.get(Number(id));
  
      getRequest.onsuccess = function(event) {
        const medicamento = event.target.result;
  
        // Atualizar o nome
        medicamento.nome = newName;
        // Atualizar a Quantidade
        medicamento.qtd = newQtd;
        // Atualizar a posologia
        medicamento.posologia = newPosologia;
  
        // Armazenar o medicamento atualizado de volta no Object Store
        const updateRequest = medicamentosStore.put(medicamento);
  
        updateRequest.onsuccess = function() {
          console.log('Medicamento atualizado com sucesso!');
        };
  
        updateRequest.onerror = function() {
          console.error('Erro ao atualizar o medicamento.');
        };
      };
  
      transaction.oncomplete = function() {
        db.close();
      };
    };
  
    request.onerror = function(event) {
      console.error('Erro ao abrir o banco de dados: ', event.target.error);
    };
}


// Função para atualizar pacientes por CPF
function atualizarPorCPF(cpf, novosDados) {
    const dbName = 'pacientesDB';
    const request = indexedDB.open(dbName);
  
    request.onsuccess = function(event) {
      const db = event.target.result;

        // Abre uma transação no object store com permissão de leitura e gravação
        const transaction = db.transaction('pacientes', 'readwrite');
    
        // Obtém uma referência ao object store
        const objectStore = transaction.objectStore('pacientes');
    
        // Obtém o objeto com base na chave (CPF)
        const getRequest = objectStore.get(cpf);
    
        getRequest.onsuccess = function () {
        // Atualiza os dados do objeto com os novos dados
        const objetoParaAtualizar = getRequest.result;
        console.log('Objeto encontrado:', objetoParaAtualizar);
        if (objetoParaAtualizar) {
            // Atualiza os campos necessários
            objetoParaAtualizar.nome = novosDados.nome;
            //objetoParaAtualizar.cpf = novosDados.cpf;
            objetoParaAtualizar.mae = novosDados.mae;
            objetoParaAtualizar.peso = novosDados.peso;
            objetoParaAtualizar.altura = novosDados.altura;
            objetoParaAtualizar.telefone = novosDados.telefone;
    
            // Salva as alterações no object store
            const updateRequest = objectStore.put(objetoParaAtualizar);
    
            updateRequest.onsuccess = function () {
                console.log('Paciente atualizado com sucesso!');
                db.close();
            };
    
            updateRequest.onerror = function () {
                console.error('Erro ao atualizar o Paciente:', updateRequest.error);
                db.close();
            };
        } else {
            console.error('Paciente não encontrado com o CPF fornecido.');
            db.close();
        }
        };
    
        getRequest.onerror = function () {
            console.error('Erro ao obter o objeto Paciente:', getRequest.error);
            db.close();
        };
    }
}//atualizarPorCPF(cpfParaAtualizar, novosDados);


// Função para salvar paciente no IndexedDB  <----------------- 
function salvarPaciente(paciente) {
    /* EXEMPLO DE PACIENTE
        const novoPaciente = {
            nome: "Maria",
            cpf: "123456789010",
            mae: "Joselina",
            peso: 70,
            altura: 175,
            telefone: "987654321"
        };
    */

    atualizarPorCPF(paciente.cpf, paciente)
    

    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = function(event) {
        console.error("Erro ao abrir o banco de dados:", event.target.error);
    };

    request.onsuccess = function(event) {
        const db = event.target.result;

        // Inicia uma transação de leitura/gravação no object store "pacientes"
        const transaction = db.transaction(["pacientes"], "readwrite");

        // Acesso ao object store
        const objectStore = transaction.objectStore("pacientes");

        // Adiciona o paciente ao object store
        const addRequest = objectStore.add(paciente);

        addRequest.onsuccess = function() {
            console.log("Paciente salvo com sucesso!");
            transaction.oncomplete = function() {
                db.close();
            };
        };

        addRequest.onerror = function() {
            console.error("Erro ao salvar o paciente:", addRequest.error);
        };
    };

}


//deletar historico por id
function deletarHistoricoPorId(id, callback) {
    const request = indexedDB.open(dbName, dbVersion);

    request.onsuccess = function (event) {
        const db = event.target.result;

        // Inicie uma transação de leitura/gravação no object store 'history'
        const transaction = db.transaction(["history"], "readwrite");

        // Obtenha o object store 'history'
        const objectStore = transaction.objectStore("history");

        // Use o método delete para excluir o historico com o ID fornecido
        const deleteRequest = objectStore.delete(id);

        deleteRequest.onsuccess = function () {
            console.log("Historico excluído com sucesso");

            // Chame o callback indicando que a exclusão foi bem-sucedida
            callback(true);
        };

        deleteRequest.onerror = function () {
            console.error("Erro ao excluir historico");
            
            // Chame o callback indicando que houve um erro na exclusão
            callback(false);
        };

        // Certifique-se de fechar a transação após a conclusão
        transaction.oncomplete = function () {
            console.log("Transação completa");

            // Certifique-se de fechar o banco de dados após a transação estar completa
            db.close();
        };

        transaction.onerror = function (event) {
            console.error("Erro na transação", event.target.error);
        
            // Chame o callback indicando que houve um erro na transação
            callback(false);
        };
        
        deleteRequest.onerror = function (event) {
            console.error("Erro ao excluir paciente", event.target.error);
        
            // Chame o callback indicando que houve um erro na exclusão
            callback(false);
        };

    };

    request.onerror = function (event) {
        console.error("Erro ao abrir o banco de dados", event.target.error);
        
        // Chame o callback indicando que houve um erro na abertura do banco de dados
        callback(false);
    };
    
    
}


//deletar historico pelo id keypath
function deleteProcess(keypath_id, cpf){
    deletarHistoricoPorId(Number(keypath_id), function(resultado){
        if(resultado == true){
            start_grid_patient_process(cpf)
        }
    })
}


//consultar um dado especifico
function consultarHistoricoPorCPF(cpf, callback) {
    const request = indexedDB.open(dbName, dbVersion);

    request.onsuccess = function (event) {
        const db = event.target.result;

        // Inicie uma transação de leitura no object store 'history'
        const transaction = db.transaction(["history"], "readonly");

        // Obtenha o object store 'history'
        const objectStore = transaction.objectStore("history");

        // Use o índice 'cpf' para abrir um cursor que percorre todos os resultados correspondentes ao CPF
        const index = objectStore.index("cpf");
        const cursorRequest = index.openCursor(IDBKeyRange.only(cpf));

        const resultados = [];

        cursorRequest.onsuccess = function (event) {
            const cursor = event.target.result;

            if (cursor) {
                // Adicione o resultado atual ao array
                resultados.push(cursor.value);

                // Continue para o próximo resultado
                cursor.continue();
            } else {
                
                // Todos os pacientes foram recuperados, agora ordene o array por data de nascimento em ordem decrescente
                resultados.sort(function (a, b) {
                    const dataA = new Date(a.dataReceita);
                    const dataB = new Date(b.dataReceita);

                    // Inverta a ordem da subtração para ordem decrescente
                    return dataB - dataA;
                });

                callback(resultados);
            }
        };

        cursorRequest.onerror = function () {
            console.error("Erro ao consultar history por CPF");
        };

        // Certifique-se de fechar a transação após a conclusão
        transaction.oncomplete = function () {
            db.close();
        };
    };

    request.onerror = function (event) {
        console.error("Erro ao abrir o banco de dados", event.target.error);
    };

}


// Função para consultar pacientes no IndexedDB
function consultarPacientes(callback) {
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = function(event) {
        console.error("Erro ao abrir o banco de dados:", event.target.error);
    };

    request.onsuccess = function(event) {
        const db = event.target.result;

        // Inicia uma transação de leitura no object store "pacientes"
        if(!db.objectStoreNames.contains("pacientes")){
            return
        }
        const transaction = db.transaction(["pacientes"], "readonly");

        // Acesso ao object store
        const objectStore = transaction.objectStore("pacientes");

        // Abre um cursor para percorrer todos os pacientes
        const cursorRequest = objectStore.openCursor();

        // Array para armazenar os resultados da consulta
        const resultados = [];

        cursorRequest.onsuccess = function(event) {
            const cursor = event.target.result;
            if (cursor) {
                // Adiciona o paciente atual ao array de resultados
                resultados.push(cursor.value);
                // Move para o próximo paciente
                cursor.continue();
            } else {
                // Todos os pacientes foram recuperados, agora ordene o array por nome
                resultados.sort((a, b) => (a.nome > b.nome) ? 1 : -1);
                callback(resultados);
            }
            transaction.oncomplete = function() {
                db.close();
            };
        };

        cursorRequest.onerror = function(event) {
            console.error("Erro ao consultar pacientes:", event.target.error);
        };
    };

    request.onupgradeneeded = function(event) {
        // Lida com o evento de atualização se necessário
        console.log(event)
    };
}

// Exemplo de como chamar a função consultarPacientes
/*
consultarPacientes(function(resultados) {
    console.log("Pacientes consultados:", resultados);
    // Faça algo com os resultados, por exemplo, exiba-os na interface do usuário
});
*/


function findPaciente(){// lê no banco o restante das informações deste paciente e adiciona nos inputs
    
    consultarPacientes(function(resultados) {
        console.log("Pacientes consultados:", resultados);
        // Faça algo com os resultados, por exemplo, exiba-os na interface do usuário
        resultados.forEach(paciente => {
            if(paciente.cpf == document.getElementById("nomePaciente").value){
                document.getElementById("nomeMae").value = paciente.mae;
                document.getElementById("peso").value = paciente.peso;
                document.getElementById("altura").value = paciente.altura;
                document.getElementById("cpf").value = paciente.cpf;
                document.getElementById("telefone").value = paciente.telefone;
            }
        });
    });
    
    

}

function findPrByName(nome){
    var prescritores = JSON.parse(localStorage.prescritores)
    prescritores.forEach(prescritor => {
        if(prescritor.nome == nome){
            prefixo = prescritor.prefixo
            medicoSolicitanteCNS = prescritor.cns
            medicoSolicitante = prescritor.nome
            crm = prescritor.crm
        }
    });

}


function createMedicamento(nome, posologia, qtd) {
    // Abrir ou criar o banco de dados 'MedicamentosDB' com uma versão específica (1)
    var request = indexedDB.open(dbName, dbVersion);
  
  
    // Manipular o sucesso da abertura do banco de dados
    request.onsuccess = function(event) {
      var db = event.target.result;
  
      // Iniciar uma transação de escrita no objeto de armazenamento 'medicamentos'
      var transaction = db.transaction(['medicamentos'], 'readwrite');
      var store = transaction.objectStore('medicamentos');
  
      // Adicionar um novo medicamento ao armazenamento
      var novoMedicamento = { nome: nome, posologia: posologia, qtd: qtd };
      var requestAdd = store.add(novoMedicamento);
  
      // Manipular o sucesso da adição
      requestAdd.onsuccess = function() {
        console.log('Medicamento adicionado com sucesso!');
      };
  
      // Manipular erros durante a adição
      requestAdd.onerror = function() {
        console.error('Erro ao adicionar o medicamento.');
      };
  
      // Fechar a transação quando ela estiver concluída
      transaction.oncomplete = function() {
        db.close();
        consultarMedicamentosOrdemAlfabetica()
      };
    };
  
    // Manipular erros durante a abertura do banco de dados
    request.onerror = function(event) {
      console.error('Erro ao abrir o banco de dados: ', event.target.error);
    };
  }
  
  // Exemplo de uso:
  //createMedicamento('Paracetamol', '1 comprimido a cada 6 horas', 20);


function showPrescritoresOnScreen(){
    var prescritores = JSON.parse(localStorage.prescritores)
    prescritores.forEach(prescritor => {
        configurarCNSdoMedico(prescritor.nome)
        document.getElementById("medico").innerHTML += "<option value='"+prescritor.nome+"'>"+prescritor.nome+"</option>";
    });
    configurarCNSdoMedico(document.getElementById("medico").value)

}


function insertPatientInSelect(){
    consultarPacientes(function(resultados) {
        console.log("Pacientes consultados:", resultados);
        // Faça algo com os resultados, por exemplo, exiba-os na interface do usuário
        resultados.forEach(paciente => {
            document.getElementById("nomePaciente").innerHTML += "<option value='"+paciente.cpf+"'>"+paciente.nome+"</option>";
        });

    });
}
function leitura(){
    //leitura() inicia a configuração da tela logo que o app é executado     
    findEs()//verifica se ja configurou o estabelecimento se nao pede configurar
    findPr()//procura prescritor se nao encontra pede para cadastrar
    showPrescritoresOnScreen()//atualiza a lista de prescritores na tela
    pacienteEstaEmUso("s")//atualiza a variavel com a informacao de uso no carregamento da tela passei "s" porque sempre no carregamento da tela a primeira informacao é s
    
    insertPatientInSelect();//lê todos os pacientes e adiciona no selec
    consultarMedicamentosOrdemAlfabetica()//lê os medicamentos e adiciona no select
    
    

}

function grid_patients(){     //
    consultarPacientes(function(resultados) {
        
        resultados.forEach(patient => {
            //console.log(patient)
            document.getElementById("tbody").innerHTML += `
                    <tr class='border-b border-gray-900 dark:border-gray-700'>
                        <td><a class='no-underline hover:underline' href="javascript:start_grid_patient_process('`+patient.cpf+`')">`+patient.nome+`</a></td>
                        <td>`+patient.cpf+`</td>
                    </tr>`;
        });
    });

}

function grid_patient_process(paciente){
    var paciente_cpf = paciente;
    consultarHistoricoPorCPF(paciente_cpf, function (paciente) {
        
        paciente.forEach(patient => {
            console.log(patient)
            document.getElementById("paciente").innerText = 'Paciente: '+patient.nomePaciente;

            document.getElementById("tbody").innerHTML += `
            <tr class='border-b border-gray-900 dark:border-gray-700'>
                <td class='py-3 px-6 bg-gray-50 dark:bg-gray-800'>`+patient.dataReceita+`</td>
                <td class='py-3 px-6 bg-gray-50 dark:bg-gray-800'>`+patient.medicamentosParaSalvarNoBanco+`</td>
                <td class='py-3 px-6 bg-gray-50 dark:bg-gray-800'>`+patient.medicoSolicitante+`</td>
                <td class='py-3 px-6 bg-gray-50 dark:bg-gray-800'>
                    <button onclick='deleteProcess("`+patient.id+`","`+patient.cpf+`")' class='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded'>Excluir</button>
                </td>

            </tr>`;
        })
    })
    
}


function insertPaciente(nome, nomeMae, cpf, peso, altura, telefone){
    
    var novoPaciente = {
        nome: nome,
        cpf: cpf,
        mae: nomeMae,
        peso: peso,
        altura: altura,
        telefone: telefone
    };

    salvarPaciente(novoPaciente);

}

//salvar prescritor no localstorage
function createPr(prefixo, nome, cns, crm) {
    var prescritores = new Array();
    if(localStorage.prescritores != null){
        prescritores = JSON.parse(localStorage.prescritores)
    }
    
    prescritores.push({
            nome: nome,
            cns: cns,
            prefixo: prefixo,
            crm: crm
        }
    )

    localStorage.setItem("prescritores", JSON.stringify(prescritores))
}

function findPr(){//ve se tem prescritor registrado se nao tiver pede para registrar
    if( localStorage.prescritores == null ){
        alert("é preciso informar o prescritor para continuar")
        registrarPrescritor()
    }
}


//salvar estabelecimento de saude no localstorage
function createEs(nome, nome_centro, cnes, address) {
    var unidade = [
        {
            nome: nome,
            cnes: cnes,
            address: address
        }
    ]
    
    localStorage.setItem("unidade", JSON.stringify(unidade))

}

function findEs(){//ve se tem estabelecimento registrado se nao tiver pede para registrar
    if( localStorage.unidade == null ){
        alert("Atenção: no seu primeiro acesso é preciso configurar os dados de estabelecimento\n\n")
        registrarEstabelecimento()
    }else{
        var estabelecimento = JSON.parse(localStorage.unidade)
        
        nome_estabelecimento = estabelecimento[0].nome;
        nome_centro = estabelecimento[0].nome;
        cnes = estabelecimento[0].cnes;
        address = estabelecimento[0].address;
    }
}