function txRenal() {

    var cpf = document.getElementById("cpf").value;
    var telefone = document.getElementById("telefone").value;
    var nomePaciente = document.getElementById("nomePaciente").value;
    var nomeMaePaciente = document.getElementById("nomeMae").value;
    var pesoPaciente = document.getElementById("peso").value;
    var alturaPaciente = document.getElementById("altura").value;

    insertPaciente(nomePaciente,nomeMaePaciente,cpf,pesoPaciente,alturaPaciente,telefone);

    var medicamentosLME       = ["","","","",""];
    var medicamentosDosagens  = ["","","","",""];
    var posologiaMedicamentos = ["","","","",""];

    for(var i=0;i<=dataTable.length;i++){
    
        for (var j = 0; j < medicamentosEmMemoria.rows.length; j++) {
            var row = medicamentosEmMemoria.rows.item(j);
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
    
    var diagnosticoCid = "Rim transplantado";
    var cid = "Z940" // -> rim transplantado
    var anaminese = "Transplante renal."

    //var ano = now.getFullYear();

    /**nesse momento salvo no banco de dados local atraves da funcao onCreate do arquivo sqlte.js */
    
    /*var medicamentosParaSalvarNoBanco = "";
    if(medicamento2 == ""){
        medicamentosParaSalvarNoBanco = medicamento1 + " dose " + dose1
    }else{
        medicamentosParaSalvarNoBanco = medicamento1 + " dose " + dose1 + " | " + medicamento2 + " dose " + dose2
    }
    onCreate(nomePaciente, cpf, medicamentosParaSalvarNoBanco, medicoSolicitante, dataReceita, usuario);
    */
    /**---------nome, cpf, medicamentos, medico, dataMontagem--------------------------------------*/



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