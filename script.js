let contador= 0;
function correcto(i) {
  contador++;
  Swal.fire({
  icon: 'success',
  html: 'Respuesta Correcta'
})
document.getElementById("verdadero"+i).disabled = true;
document.getElementById("falso"+i).disabled = true;
document.getElementById("verdadero"+i).classList.remove('btn-info');
document.getElementById("falso"+i).classList.remove('btn-info');
document.getElementById("verdadero"+i).classList.add('btn-success');
document.getElementById("falso"+i).classList.add('btn-danger');
document.getElementById("contador").innerHTML = "Aciertos: <span style='color:green'>" +contador + "</span>";
}

function incorrecto(i) {
  Swal.fire({
  icon: 'error',
  html: 'Respuesta Incorrecta'
})
document.getElementById("verdadero"+i).disabled = true;
document.getElementById("falso"+i).disabled = true;
document.getElementById("verdadero"+i).classList.remove('btn-info');
document.getElementById("falso"+i).classList.remove('btn-info');
document.getElementById("verdadero"+i).classList.add('btn-danger');
document.getElementById("falso"+i).classList.add('btn-success');
}

// recoger los datos de la api y convertirlos a Objeto
async function getQuestions() {
  let numPreguntas = document.getElementById("numPreguntas").value;
  console.log(numPreguntas);
  var peticion = await fetch("https://opentdb.com/api.php?amount="+numPreguntas+"&type=boolean");
  var resultado = await peticion.text();
  var preguntas = JSON.parse(resultado);
  document.getElementById("boton").style.display = "none";
  document.getElementById("numPreguntas").style.display = "none";
  document.getElementById("numPreguntas2").style.display = "none";
  document.getElementById("preguntas").innerHTML = "<thead><tr><th class='text-center'>Categoría</th><th class='text-center'>Pregunta</th><th class='text-center'>Respuesta</th></tr></thead>";
  preguntas.results.forEach((p, i) => {
     let botones = "";

    if (p.correct_answer == "True") {
      botones = "<button class='btn btn-info btn-sm' id='verdadero"+i+"' onclick='correcto("+i+")'>True</button><button class='btn btn-info btn-sm' onclick='incorrecto("+i+")' id='falso"+i+"'>False</button>";
    } else {
      botones = "<button class='btn btn-info btn-sm' onclick='incorrecto("+i+")' id='verdadero"+i+"'>True</button><button class='btn btn-info btn-sm' onclick='correcto("+i+")' id='falso"+i+"'>False</button>";  
    }

    document.getElementById("preguntas").innerHTML += 
      "<tr>" +
      "<td class='text-info'>" + p.category + "</td>" +
      "<td>" + p.question + "</td>" +
      "<td>" + botones + "</td>" +
      "</tr>";
  });
}
