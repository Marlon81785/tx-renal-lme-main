//global
var selectPacients;



function trocarInputPorSelect(){
    document.getElementById("nomePaciente").remove();
    //document.getElementById("inputPaciente").innerHTML = '<select id="nomePaciente" type="text" placeholder="Nome completo do paciente" class="form-control" style="width: auto;"><option value=""></option></select>';
    document.getElementById("inputPaciente").appendChild(selectPacients);
    document.getElementById("btntrocabtn").remove();
    document.getElementById("btntroca").innerHTML = '<button id="btntrocabtn" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onclick="trocarSelectPorInput()"><b>Se o paciente não estiver na lista pode clicar aqui para preenchimento manual</b></button>';
    //leitura();
}

function trocarSelectPorInput(){
    //clear inputs
    document.getElementById("nomeMae").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("telefone").value = "";
    //
    //document.getElementById("ih").innerText = "";
    selectPacients = document.getElementById("nomeee");
    document.getElementById("nomeee").remove();
    document.getElementById("inputPaciente").innerHTML = '<input id="nomePaciente" type="text" placeholder="Nome completo do paciente" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline">';
    document.getElementById("btntroca").innerHTML = '<button id="btntrocabtn" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onclick="trocarInputPorSelect()"><b>Selecionar o Paciente na Lista</b></button>';
}






