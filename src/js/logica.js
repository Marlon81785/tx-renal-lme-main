//logica da tabela de medicamentos
var contador = 0;//conta quantos medicamentos foram adicionados na tabela



var dataTable = new Array()
function adicionarNaTabela(){
    //criando a tabela
    if(contador > 4){return alert("maximo permitido")}
    
    var medicamento = document.getElementById("medicamento")
    var value = medicamento.options[medicamento.selectedIndex].value;
    var text = medicamento.options[medicamento.selectedIndex].text;
    dataTable.push({value})

    document.getElementById('tabela-medicamento').
    innerHTML += "<tr id="+contador+"><td><span hidden>"+value+"</span>"+text+"</td><td><button class='ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onclick='removerNaTabela("+contador+")'>Remover</button></td></tr>";
    contador++;
    if(contador > 0 ){
        document.getElementById("tableMed").innerText = "Medicamentos"
    }
}

function removerNaTabela(data){
    //deletar medicamento da tabela na tela e atualizar o dataTable
    document.getElementById(data).remove();
    contador = contador - 1;
    //console.log(data)

    dataTable = [] //limpando o array
    for(var i=0;i<=5;i++){
        try {
            var id_medicamento = document.getElementById(i).children[0].children[0].textContent
            dataTable.push({id_medicamento})
        } catch (error) {
            console.log(error)
        }
        
    }
    
}