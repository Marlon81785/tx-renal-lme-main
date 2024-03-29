//funcoes


//configurar o prefixo e o CNS do medico
var medicoSolicitanteCNS = null;
var prefixo = "Dr. "
var crm;
var medicoSolicitante;
function configurarCNSdoMedico(medicoSolicitante){
    medicoSolicitante = medicoSolicitante;
    //essa funcao vai atualizar as variaveis acima prefixo e medicoSolicitanteCNS
    findPrByName(medicoSolicitante)
}


function configPatitentName(){
    //pegando o nome pelo campo. porque o valor esta sendo usado para busca do paciente pelo cpf.
    var nomePaciente;
    var type = document.getElementById("nomePaciente").tagName;
    if(type == 'SELECT'){
        var indexName = document.getElementById("nomePaciente").selectedIndex;
        nomePaciente = document.getElementById("nomePaciente").children[indexName].text;
    }else{
        nomePaciente = document.getElementById("nomePaciente").value;
    }

    return nomePaciente;
    
}



/**
 * Configurar de acordo com a situação do paciente
 */
var realizouTratamentoPrevioOpSim = "";
var realizouTratamentoPrevioOpNao = "";
var relatar = "";
function pacienteEstaEmUso(option){
    
    switch(option){
        case "s":
            relatar = "Em uso de imunossupressão";
            realizouTratamentoPrevioOpSim = "X";
            realizouTratamentoPrevioOpNao = "";
            break;
        case "n":
            relatar = "";
            realizouTratamentoPrevioOpNao = "X";
            realizouTratamentoPrevioOpSim = "";
            break;
        case "ns":
            relatar = "";
            realizouTratamentoPrevioOpNao = "";
            realizouTratamentoPrevioOpSim = "";
            realizouTratamentoPrevioOpNao = "";
            break;
    }
    
}



function registrarPrescritor(){
    var nome = prompt("Insira o nome do prescritor ex.: Joana Silva Pereira Gomes")
    if(nome == null || nome == ""){ return 0; }
    var prefixo = prompt("Escolha a opção: \n\n[1] : Dr. \n[2] : Dra. \n\n", "1")
    if(prefixo == null || prefixo == ""){ return 0; }
    var aux;
    if(prefixo == "1"){
        aux = "Dr. "
    }else{ 
        if(prefixo == "2"){
            aux = "Dra. "
        }else{
            aux = "erro"
            alert("opção invalida, tente novamente")
            return 0;
        }
    }
    var cns = prompt("Insira o CNS do prescritor: ")
    if(cns == null || cns == ""){ return 0; }
    var crm = prompt("Insira o CRM do prescritor: ")
    if(crm == null || crm == ""){ return 0; }
    createPr(aux, nome, cns, crm);
    showPrescritoresOnScreen();
    location.reload()
}

function registrarMedicamento(){
    var nome = prompt("Insira o nome do medicamento ex.: Alaepoetina 2000UI (Injetavel)")
    if(nome == null || nome == ""){ return 0; }
    var posologia = prompt("Insira a posologia do medicamento, ex.: Tomar 01 cp 3x por dia...\n: ")
    if(posologia == null || posologia == ""){ return 0; }
    var qtd = prompt("Insira o quantidade do medicamento por mês: ")
    if(qtd == null || qtd == ""){ return 0; }
    createMedicamento(nome, posologia, qtd);
    location.reload()
}


var nome_estabelecimento;
var nome_centro;
var cnes;
var address;
function registrarEstabelecimento(){
    var nome = prompt("insira o nome do estabelecimento, ex.: Centro De Saúde Viver Mais")
    if(nome == null || nome == ""){ return 0; }
    var nome_centro = prompt("Caso seu estabelecimento tenha um centro especifico de hemodialise, digite o nome ex.: Centro de ...\n\n")
    var cnes = prompt("Digite o CNES do estabelecimento, apenas números, ex.: 0000000")
    if(cnes == null || cnes == ""){ return 0; }
    var auxiliar_address = prompt("Digite o endereço do estabelecimento:")
    auxiliar_address = auxiliar_address.toString()
    createEs(nome, nome_centro, cnes, auxiliar_address);
    findEs()//reexec for update global vars with database
}

function updateEstabelecimento(){
    var update_nome = prompt("insira o nome do estabelecimento, ex.: Centro De Saúde Viver Mais", nome_estabelecimento)
    if(update_nome == null || update_nome == ""){ return 0; }
    var update_nome_centro = prompt("Caso seu estabelecimento tenha um centro especifico de hemodialise, digite o nome ex.: Centro de ...", nome_centro)
    var update_cnes = prompt("Digite o CNES do estabelecimento, apenas números, ex.: 0000000", cnes)
    if(update_cnes == null || update_cnes == ""){ return 0; }
    var update_address = prompt("Digite o endereço do estabelecimento:")
    update_address = update_address.toString()
    updateEs(update_nome, update_nome_centro, update_cnes, update_address);
    findEs()//reexec for update global vars with database
}


