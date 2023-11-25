//global
var selectPacients;

function trocarInputPorSelect(){
    document.getElementById("nomePaciente").remove();
    //document.getElementById("inputPaciente").innerHTML += '<select id="nomePaciente" type="text" placeholder="Nome completo do paciente" class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"><option value=""></option></select>';
    document.getElementById("nomeee").appendChild(DEFAULT_SELECT);
    document.getElementById("nomeee").appendChild(DEFAULT_ICON);
    document.getElementById("btntrocabtn").remove();
    document.getElementById("btns-c").innerHTML += '<button id="btntrocabtn" class="font-bold bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded" onclick="trocarSelectPorInput()"><b>Preenchimento manual</b></button>';
    
}


var DEFAULT_SELECT, DEFAULT_ICON;
function trocarSelectPorInput(){
    //clear inputs
    document.getElementById("nomeMae").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("telefone").value = "";
    //
    //document.getElementById("nomeee").remove();
    //document.getElementById("nomePaciente").remove();
    DEFAULT_SELECT = document.getElementById("nomePaciente");
    DEFAULT_ICON = document.getElementById("iconClass");

    document.getElementById("nomeee").innerHTML = '<input id="nomePaciente" type="text" placeholder="Nome completo do paciente" class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline">';
    document.getElementById("btntrocabtn").remove();
    document.getElementById("btns-c").innerHTML += '<button id="btntrocabtn" class="font-bold bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded" onclick="trocarInputPorSelect()"><b>Selecionar o Paciente na Lista</b></button>';
}


