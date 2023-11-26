function txRenal() {

    var cpf = document.getElementById("cpf").value;
    if(cpf == ''){
        return alert("Digite o cpf")
    }
    var telefone = document.getElementById("telefone").value;
    var nomePaciente = configPatitentName();
    var nomeMaePaciente = document.getElementById("nomeMae").value;
    var pesoPaciente = document.getElementById("peso").value;
    var alturaPaciente = document.getElementById("altura").value;

    insertPaciente(nomePaciente,nomeMaePaciente,cpf,pesoPaciente,alturaPaciente,telefone);

    var medicamentosLME       = ["","","","",""];
    var medicamentosDosagens  = ["","","","",""];
    var posologiaMedicamentos = ["","","","",""];

    
    for(var i=0;i<=dataTable.length;i++){
    
        for (var j = 0; j < medicamentosEmMemoria.length; j++) {
            var row = medicamentosEmMemoria[j]
            try {
                if(dataTable[i].value == row.id){
                    medicamentosLME[i] = row.nome
                    medicamentosDosagens[i] = row.qtd
                    posologiaMedicamentos[i] = row.posologia
                    console.log(posologiaMedicamentos)
                }
            } catch (error) {
                console.log(error)
            }
            
            
        }
    }
    
    /**
     * medicamentos em memoria contem o resultado de um select * na tabela medicamentos
     * pego as informacoes com base no id do medicamentos no dataTable
     */
    //



    //console.log(medicamento1+" -> "+dose1+"\n"+medicamento2+" -> "+dose2);
    var medicamentosParaSalvarNoBanco = null;
    var diagnosticoCid = "Rim transplantado";
    var cid = "Z940" // -> rim transplantado
    var anaminese = "Transplante renal."

    
    for(var i=0; i<5; i++){
        if(medicamentosLME[i] != "" && i == 0){
            medicamentosParaSalvarNoBanco = medicamentosLME[i]+" Quantidade de comprimidos: "+medicamentosDosagens[i]+"  |  ";
        }else{
            if(medicamentosLME[i] != ""){
                medicamentosParaSalvarNoBanco += medicamentosLME[i]+" Quantidade de comprimidos: "+medicamentosDosagens[i]+"  |  ";
            }
        }
        
    }

    saveHistory(nomePaciente, cpf, medicamentosParaSalvarNoBanco, medicoSolicitante, dataReceita)


    //
    var dd = {
        content: [
            //dados do pdf aqui
        ]
        
    }

    dd['content'].push(
        returnPageLME(
            medicoSolicitante, nomePaciente, nomeMaePaciente,
            pesoPaciente, alturaPaciente, cid, diagnosticoCid, 
            anaminese, medicamentosLME, medicamentosDosagens
        ),
        receitas(medicoSolicitante, crm, prefixo, nomePaciente, posologiaMedicamentos, medicamentosLME, medicamentosDosagens)

    )

    
    pdfMake.createPdf(dd).open();
    
}