var pdf = new Array()

function receitas(medico, paciente, posologia, medicamentosLME, medicamentosDosagens){
    var localVar = new Array()
    const tracinhoDefault = '  -----------------------'+" (";
    var fechamentoParentese1 = '';
    var fechamentoParentese2 = '';
    var fechamentoParentese3 = '';
    var fechamentoParentese4 = '';
    var fechamentoParentese5 = '';
    var tracinho1 = '';
    var tracinho2 = '';
    var tracinho3 = '';
    var tracinho4 = '';
    var tracinho5 = '';

    var complementosMedicamento1Receita = '';
    var complementosMedicamento2Receita = '';
    var complementosMedicamento3Receita = '';
    var complementosMedicamento4Receita = '';
    var complementosMedicamento5Receita = '';
    
    for(var i=0;i<=5;i++){
        var pageBreakStatus = "after";
        if(i == 5){ pageBreakStatus = "" }
        if(i == 0){
            if(medicamentosLME[0] != ''){
                complementosMedicamento1Receita = i+1+"- ";
                tracinho1 = tracinhoDefault
                fechamentoParentese1 = ')';
            }
            if(medicamentosLME[1] != ''){
                complementosMedicamento2Receita = i+2+"- ";
                tracinho2 = tracinhoDefault
                fechamentoParentese2 = ')';
            }
            if(medicamentosLME[2] != ''){
                complementosMedicamento3Receita = i+3+"- ";
                tracinho3 = tracinhoDefault
                fechamentoParentese3 = ')';
            }
            if(medicamentosLME[3] != ''){
                complementosMedicamento4Receita = i+4+"- ";
                tracinho4 = tracinhoDefault
                fechamentoParentese4 = ')';
            }
            if(medicamentosLME[4] != ''){
                complementosMedicamento5Receita = i+5+"- ";
                tracinho5 = tracinhoDefault
                fechamentoParentese5 = ')';
            }
        }
        

        /*
        {   //logo da empresa
            //image: receita,
            //width: 109
        },
        */

        localVar.push([{   
            text: "RECEITA MÉDICA",
            absolutePosition: { x:310, y:110 },
            fontSize: 16,
            bold: true,
        },
        {
            text: paciente.toUpperCase(),
            absolutePosition: { x:127, y:190 },
            fontSize: 14,
            bold: true,
        },
        {
            text: dataReceita,
            absolutePosition: { x:92, y:220 },
            fontSize: 12,
        },
        {
            text: "Data: ",
            absolutePosition: { x:60, y:220 },
            fontSize: 12,
        },
        {
            text: "Paciente: ",
            
            absolutePosition: { x:60, y:190 },
            fontSize: 14,
            bold: true,
        },
        {
            text: complementosMedicamento1Receita+medicamentosLME[0]+tracinho1+medicamentosDosagens[0]+fechamentoParentese1+"\n"+posologia[0],
            absolutePosition: { x:60, y:300 },
            fontSize: 12,
        },
        {
            text: complementosMedicamento2Receita+medicamentosLME[1]+tracinho2+medicamentosDosagens[1]+fechamentoParentese2+"\n"+posologia[1],
            absolutePosition: { x:60, y:345 },
            fontSize: 12,
        },
        {
            text: complementosMedicamento3Receita+medicamentosLME[2]+tracinho3+medicamentosDosagens[2]+fechamentoParentese3+"\n"+posologia[2],
            absolutePosition: { x:60, y:390 },
            fontSize: 12,
        },
        {
            text: complementosMedicamento4Receita+medicamentosLME[3]+tracinho4+medicamentosDosagens[3]+fechamentoParentese4+"\n"+posologia[3],
            absolutePosition: { x:60, y:435 },
            fontSize: 12,
        },
        {
            text: complementosMedicamento5Receita+medicamentosLME[4]+tracinho5+medicamentosDosagens[4]+fechamentoParentese5+"\n"+posologia[4],
            absolutePosition: { x:60, y:480 },
            fontSize: 12,
        },
        {
            text: medico,
            alignment: "center",
            absolutePosition: {y: 630},
            fontSize: 12,
        },
        {
            text: "Nefrologista",
            alignment: "center",
            absolutePosition: {y: 645},
            fontSize: 12,
        },
        {
            text: address,
            absolutePosition: {x: 50, y: 750},
            fontSize: 10,
            pageBreak: pageBreakStatus
        }
    ])
    }
    return localVar
    
}



function returnPageLME(
    medico, paciente, mae_paciente, peso, altura,
    cid, diagnosticoCid, anaminese, medicamentosLME, medicamentosDosagens
    ){
    return [
    //  ########### -> Pagina do LME  <- ##############
    {
        image: PaginaDoLme,
        width: 520,
    },
    {
        text: cnes,
        absolutePosition: {x: 55, y: 187}
    },
    {
        text: nome_estabelecimento.toUpperCase(),
        absolutePosition: {x: 230, y: 187}
    },
    {
        text: paciente.toUpperCase(),
        absolutePosition: {x: 55, y: 213},
        
    },
    {
        text: mae_paciente.toUpperCase(),
        absolutePosition: {x: 55, y: 239}
    },
    {
        text: peso,
        absolutePosition: {x: 480, y:215}
    },
    {
   
        text: altura,
        absolutePosition: {x: 480, y:239}
    },
    {
        text: medicamentosLME[0],
        absolutePosition: {x: 74, y: 282},
        fontSize: 10
    },
    {
        text: medicamentosDosagens[0],
        absolutePosition: {x: 373, y: 282}
    },
    {
        text: medicamentosDosagens[0],
        absolutePosition: {x: 403, y: 282}
    },
    {
        text: medicamentosDosagens[0],
        absolutePosition: {x: 433, y: 282}
    },
    {
        text: medicamentosDosagens[0],
        absolutePosition: {x: 463, y: 282}
    },
    {
        text: medicamentosDosagens[0],
        absolutePosition: {x: 493, y: 282}
    },
    {
        text: medicamentosDosagens[0],
        absolutePosition: {x: 523, y: 282}
    },
    {
        text: medicamentosLME[1],
        absolutePosition: {x: 74, y: 300},
        fontSize: 10
    },
    {
        text: medicamentosDosagens[1],
        absolutePosition: {x: 373, y: 300}
    },
    {
        text: medicamentosDosagens[1],
        absolutePosition: {x: 403, y: 300}
    },
    {
        text: medicamentosDosagens[1],
        absolutePosition: {x: 433, y: 300}
    },
    {
        text: medicamentosDosagens[1],
        absolutePosition: {x: 463, y: 300}
    },
    {
        text: medicamentosDosagens[1],
        absolutePosition: {x: 493, y: 300}
    },
    {
        text: medicamentosDosagens[1],
        absolutePosition: {x: 523, y: 300}
    },
    {
        text: medicamentosLME[2],
        absolutePosition: {x: 74, y: 318}
    },
    {
        text: medicamentosDosagens[2],
        absolutePosition: {x: 373, y: 318}
    },
    {
        text: medicamentosDosagens[2],
        absolutePosition: {x: 403, y: 318}
    },
    {
        text: medicamentosDosagens[2],
        absolutePosition: {x: 433, y: 318}
    },
    {
        text: medicamentosDosagens[2],
        absolutePosition: {x: 463, y: 318}
    },
    {
        text: medicamentosDosagens[2],
        absolutePosition: {x: 493, y: 318}
    },
    {
        text: medicamentosDosagens[2],
        absolutePosition: {x: 523, y: 318}
    },
    {
        text: medicamentosLME[3],
        absolutePosition: {x: 74, y: 336}
    },
    {
        text: medicamentosDosagens[3],
        absolutePosition: {x: 373, y: 336}
    },
    {
        text: medicamentosDosagens[3],
        absolutePosition: {x: 403, y: 336}
    },
    {
        text: medicamentosDosagens[3],
        absolutePosition: {x: 433, y: 336}
    },
    {
        text: medicamentosDosagens[3],
        absolutePosition: {x: 463, y: 336}
    },
    {
        text: medicamentosDosagens[3],
        absolutePosition: {x: 493, y: 336}
    },
    {
        text: medicamentosDosagens[3],
        absolutePosition: {x: 523, y: 336}
    },
    {
        text: medicamentosLME[4],
        absolutePosition: {x: 74, y: 353}
    },
    {
        text: medicamentosDosagens[4],
        absolutePosition: {x: 373, y: 353}
    },
    {
        text: medicamentosDosagens[4],
        absolutePosition: {x: 403, y: 353}
    },
    {
        text: medicamentosDosagens[4],
        absolutePosition: {x: 433, y: 353}
    },
    {
        text: medicamentosDosagens[4],
        absolutePosition: {x: 463, y: 353}
    },
    {
        text: medicamentosDosagens[4],
        absolutePosition: {x: 493, y: 353}
    },
    {
        text: medicamentosDosagens[4],
        absolutePosition: {x: 523, y: 353}
    },
    {
        text: cid,
        absolutePosition: {x: 55, y: 400}
    },
    {
        text: diagnosticoCid,
        absolutePosition: {x: 120, y: 400}
    },
    {
        text: anaminese,
        absolutePosition: {x: 55, y: 430}
    },
    {
        //NAO REALIZOU TRATAMENTO PREVIO
        text: realizouTratamentoPrevioOpNao,
        absolutePosition: {x: 60, y: 493},
        bold: true
    },
    {
        //SIM REALIZOU TRATAMENTO PREVIO
        text: realizouTratamentoPrevioOpSim,
        absolutePosition: {x: 100, y: 493},
        bold: true
    },
    {
        text: relatar,
        absolutePosition: {x: 160, y: 493}
        
    },
    {
        text: medico.toUpperCase(),
        absolutePosition: {x: 60, y: 592}
    },
    {
        text: medicoSolicitanteCNS,
        absolutePosition: {x: 60, y: 620}
    },
    {
        text: "",
        absolutePosition: {x: 300, y: 620},
        pageBreak: "after"
    },]
}


function returnRequerimento(){
    return [//REQUERIMENTO
    {
        image: requerimento,
        width: 520
    },
    {
        text: nomePaciente.toUpperCase(),
        absolutePosition: { x:82, y:152 }
    },
    {
        text: cpf,
        absolutePosition: { x:82, y:186 }
    },
    {
        text: telefone,
        absolutePosition: { x:312, y:186 },
        pageBreak: "after"
    },]
}


function returnTermoDeAdesao(){
    return [{
        image: termoDeAdesao,
        width: 520
    },]
}


function returnRelacaoDeDocumentos(){
    //pagina -> relação de documentos
    return [
    {
        image: relacaoDeDocumentos,
        width: 520,
    },
    {
        text: "",
        absolutePosition: {x: 86, y: 557},
        pageBreak: "after"
    },]
}