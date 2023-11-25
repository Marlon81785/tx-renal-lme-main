// Código JavaScript para preencher o select com os medicamentos


function atualizarInputs(){
    
    const id = document.getElementById('medicamentosSelect').value;
    // Preencher as opções do select com os medicamentos

    if(id == "-1"){
        document.getElementById('newName').value = "";
        document.getElementById('newQtd').value = "";
        document.getElementById('newPosologia').value = "";
        document.getElementById('newName').disabled = true;
        document.getElementById('newQtd').disabled = true;
        document.getElementById('newPosologia').disabled = true;
    }else{
        document.getElementById('newName').disabled = false;
        document.getElementById('newQtd').disabled = false;
        document.getElementById('newPosologia').disabled = false;
    }
    
    medicamentosEmMemoria.forEach(element => {
        if(element.id == id){
            document.getElementById('newName').value = element.nome;
            document.getElementById('newQtd').value = element.qtd;
            document.getElementById('newPosologia').value = element.posologia;
        }
        
    });
}

function updateMedicamento(){
    document.getElementById('medicamentosSelect').innerHTML = '<option value="-1">Selecione um medicamento</option>'
    abrirModal()
    const select = document.getElementById('medicamentosSelect');
    // Preencher as opções do select com os medicamentos
    
    medicamentosEmMemoria.forEach(element => {
        var option = document.createElement('option');
        option.value = element.id;
        option.text = element.nome+"  qtd: "+element.qtd;
        select.add(option);
    });
    atualizarInputs()
    
}

function abrirModal() {
    // Tornar visíveis a camada de fundo semitransparente e o modal
    document.getElementById('backgroundOverlay').classList.remove('hidden');
    document.getElementById('myModal').classList.remove('hidden');
  }

  function fecharModal() {
    // Ocultar a camada de fundo semitransparente e o modal
    document.getElementById('backgroundOverlay').classList.add('hidden');
    document.getElementById('myModal').classList.add('hidden');
  }

// Função para atualizar o medicamento selecionado
function atualizarMedicamento() {
    const id = document.getElementById('medicamentosSelect').value;
    const newName = document.getElementById('newName').value;
    const newQtd = document.getElementById('newQtd').value;
    const newPosologia = document.getElementById('newPosologia').value;

    updateMedicamentoDB(id, newName, newQtd, newPosologia)

    // Implemente a lógica de atualização aqui
    // Você precisa acessar o IndexedDB e atualizar os dados do medicamento com o ID selecionado
    // Exemplo: updateMedicamento(selectedId, newPosologia);

    // Fechar o modal após a atualização
    fecharModal();
    location.reload()
}

