dayName = new Array ("domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado")
monName = new Array ("janeiro", "fevereiro", "março", "abril", "maio", "junho","julho", "agosto","setembro", "outubro", "novembro", "dezembro")
now = new Date


//como usar no frontend
//document.write ("<h1> Hoje  " + dayName[now.getDay() ] + ", " + now.getDate () + " de " + monName [now.getMonth() ]   +  " de "  +     now.getFullYear () + ". </h1>")
//var dataNaTela = ("<p class='font-mono text-base md:text-lg'> Hoje  " + dayName[now.getDay() ] + ", " + now.getDate () + " de " + monName [now.getMonth() ]   +  " de "  +     now.getFullYear () + ". </p>")

//data na receita
var dia = now.getDate();
var mes = now.getMonth()+1;
var ano = now.getFullYear();

if(dia < 10){
    dia = "0"+dia;
}
if(mes < 10){
    if(mes == 0){mes++}
    if(mes < 10){mes = "0"+mes;}
}

var dataReceita = dia+"/"+mes+"/"+ano;