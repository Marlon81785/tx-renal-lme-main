function start_grid_patients(){
    document.getElementById("master").innerHTML = "";
    var newHTML = "\
    <div class='overflow-x-auto relative shadow-md sm:rounded-lg p-10'>\
        <button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onclick='backToHome()'>Voltar</button>\
        <h2>Pacientes</h2>\
        \
        <table class='w-full text-sm text-left dark:text-gray-400 p-2'>\
        <thead class='text-xs text-gray-700 uppercase dark:text-gray-400'>\
            <th scope='col' class='py-3 px-6 bg-gray-50 dark:bg-gray-800'>Nome</th>\
            <th scope='col' class='py-3 px-6 bg-gray-50 dark:bg-gray-800'>CPF</th>\
        </thead>\
        <tbody id='tbody'>\
        </tbody>\
        </table>\
    </div>"

    document.getElementById("master").innerHTML = newHTML;
    grid_patients();
}

function start_grid_patient_process(paciente){
    document.getElementById("master").innerHTML = "";
    var newHTML = "\
    <div class='overflow-x-auto relative shadow-md sm:rounded-lg p-10'>\
        <button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onclick='start_grid_patients()'>Voltar</button>\
        <h2>Processos montados</h2>\
        <h1 class='font-mono text-base md:text-lg uppercase' id='paciente'></h1>\
        \
        <table class='w-full text-sm text-left dark:text-gray-400 p-2'>\
            <thead class='text-xs uppercase dark:text-gray-400'>\
                <th scope='col' class='py-3 px-6'>Data da montagem</th>\
                <th scope='col' class='py-3 px-6'>Medicamentos</th>\
                <th scope='col' class='py-3 px-6'>Profissional</th>\
            </thead>\
            <tbody id='tbody'>\
            </tbody>\
        </table>\
    </div>\
    "


    document.getElementById("master").innerHTML = newHTML;
    grid_patient_process(paciente);
}

function backToHome(){
    document.location.reload(true);
}