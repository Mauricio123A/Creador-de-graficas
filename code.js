


// Elementos 
let maximaY = document.getElementById("maximaY");
let maximaX = document.getElementById("maximaX");
let inicioY = document.getElementById("inicioY")
let bCrearGrafica = document.getElementById("bCrearGrafica");
let bAgregarValor = document.getElementById("bAgregarValor");
bCrearGrafica.onclick = function(){
    let yMax, xMax;
    yMax = maximaY.value;
    xMax = maximaX.value;
    let puntosX = document.getElementsByClassName("valorX");
    let puntosY = document.getElementsByClassName("valorY");
    CrearGrafica(yMax, xMax, puntosX, puntosY, inicioY.value);
};
bAgregarValor.onclick = function(){
    let puntoX = document.getElementsByClassName("valorX")[0];
    let puntoY = document.getElementsByClassName("valorY")[0];
    document.body.appendChild(puntoX.cloneNode());
    document.body.appendChild(puntoY.cloneNode());
    document.body.appendChild(document.createElement("br"));
};

function CrearGrafica(yMax, xMax, puntosX, puntosY, inicioY){
    // Espacio
    document.body.appendChild(document.createElement("br")); document.body.appendChild(document.createElement("br"));    document.body.appendChild(document.createElement("br")); document.body.appendChild(document.createElement("br"));
    
    //Cuadro
    grafica = document.createElement("div");
    grafica.style = "position: relative; border-bottom: 5px solid #000; margin-left: calc(5vw + 50px); border-left: 5px solid #000;";
    grafica.style.width = "calc(170px + 30vw)";
    grafica.style.height = "calc(170px + 30vw)";

    //Barritas de numeros
    let numeroCero = document.createElement("h2")
    numeroCero.classList.add("numero");
    numeroCero.innerHTML = "0";
    numeroCero.style.bottom = "calc(-20px + -2.5vw)";
    numeroCero.style.left = "-20px";

    let numeroMayorX = document.createElement("h2");
    numeroMayorX.classList.add("numero");
    numeroMayorX.innerHTML = yMax;
    numeroMayorX.style.left = "-20px";
    numeroMayorX.style.top = "calc(-25px + -1.5vw)";

    let numeroMedioX = document.createElement("h2");
    numeroMedioX.classList.add("numero");
    numeroMedioX.innerHTML = yMax/2;
    numeroMedioX.style.bottom = "calc(85px + 15vw)";
    numeroMedioX.style.left = "calc(-5vw + -50px)";


    let numeroMayorY = document.createElement("h2");
    numeroMayorY.classList.add("numero");
    numeroMayorY.innerHTML = xMax;
    numeroMayorY.style.bottom = "calc(-25px + -2.5vw)";
    numeroMayorY.style.right = "0";
    
    let numeroMedioY = document.createElement("h2");
    numeroMedioY.classList.add("numero");
    numeroMedioY.innerHTML = xMax/2;
    numeroMedioY.style.bottom = "calc(-25px + -2.5vw)";
    numeroMedioY.style.left = "calc(85px + 15vw)";

    // Puntos
    let puntoInicialY = document.createElement("div");
    let graficaAltura = 175 + (window.innerWidth*0.30)
    let calculoInicialy = (inicioY/yMax) * graficaAltura-5;
    let calculoInicialx = -5;
    puntoInicialY.style.bottom = calculoInicialy + "px";
    puntoInicialY.style.left = calculoInicialx + "px";
    puntoInicialY.classList.add("punto");
    let x = 0;
    while (x < puntosX.length){
        let punto = document.createElement("div");
        let calculoy = (Number(puntosY[x].value)/yMax) * graficaAltura - 5;
        let calculox = (Number(puntosX[x].value)/xMax) * graficaAltura - 5;
        punto.style.bottom = calculoy + "px";
        punto.style.left = calculox + "px";
        punto.classList.add("punto");

        let linea = document.createElement("div");
        let catetoA, catetoB;
        if (x == 0){
            catetoA = Number(puntosX[x].value)/xMax * graficaAltura;
            catetoB = Math.abs((Number(puntosY[x].value)/yMax * graficaAltura) - calculoInicialy);
        }else{
            catetoA = Math.abs((Number(puntosX[x].value)/xMax * graficaAltura) - (Number(puntosX[x-1].value)/xMax * graficaAltura));
            catetoB = Math.abs((Number(puntosY[x].value)/yMax * graficaAltura) - (Number(puntosY[x-1].value)/yMax * graficaAltura));
        };
        linea.style.backgroundColor = "#00F";
        linea.style.position = "absolute";
        let inclinacionEnGrados = 0;
        if (x == 0){
            if (calculoInicialy > puntosY[x].value/yMax * graficaAltura){
                inclinacionEnGrados = -(Math.atan2(catetoA, catetoB) * 180/Math.PI) + 180
            }else if(calculoInicialy < puntosY[x].value/yMax * graficaAltura){
                inclinacionEnGrados = (Math.atan2(catetoA, catetoB) * 180/Math.PI)
            }
        }else{
            if (puntosY[x-1].value/yMax * graficaAltura > puntosY[x].value/yMax * graficaAltura){
                if (puntosX[x-1].value/xMax * graficaAltura > puntosX[x].value/xMax * graficaAltura){
                    inclinacionEnGrados = (Math.atan2(catetoA, catetoB) * 180/Math.PI) - 180;
                }else if(puntosX[x-1].value/xMax * graficaAltura < puntosX[x].value/xMax * graficaAltura){
                    inclinacionEnGrados = -(Math.atan2(catetoA, catetoB) * 180/Math.PI) + 180;
                }else{
                    inclinacionEnGrados = -0;
                }
            }else if(puntosY[x-1].value/yMax * graficaAltura < puntosY[x].value/yMax * graficaAltura){
                if (puntosX[x-1].value/xMax * graficaAltura > puntosX[x].value/xMax * graficaAltura){
                    inclinacionEnGrados = -(Math.atan2(catetoA, catetoB) * 180/Math.PI) - 360;
                }else if(puntosX[x-1].value/xMax * graficaAltura < puntosX[x].value/xMax * graficaAltura){
                    inclinacionEnGrados = (Math.atan2(catetoA, catetoB) * 180/Math.PI);
                }else{
                    inclinacionEnGrados = 0;
                }
            }else{
                if (puntosX[x-1]/xMax * graficaAltura > puntosX[x]/xMax * graficaAltura){
                    inclinacionEnGrados = 90;
                }else{
                    inclinacionEnGrados = -90;
                }
            }
        }


        linea.style.transformOrigin = "center bottom";
        linea.style.transform = "rotate(" + inclinacionEnGrados + "deg)";
        console.warn(linea.style.transform)
        linea.style.height = Math.sqrt(catetoA * catetoA + catetoB * catetoB) + "px";
        linea.style.width = "3px";
        if (x == 0){
            linea.style.bottom = puntoInicialY.style.bottom
            linea.style.left = 0 -1 + "px";
        }else{
            linea.style.bottom = (Number(puntosY[x-1].value)/yMax) * graficaAltura + "px";
            linea.style.left = (Number(puntosX[x-1].value)/xMax) * graficaAltura + "px";
        };
    

        x++;
        grafica.appendChild(punto);
        grafica.appendChild(puntoInicialY);
        grafica.appendChild(linea);
    }




    // Añadiendo elementos
    document.body.appendChild(grafica);
    grafica.appendChild(numeroMayorX);
    grafica.appendChild(numeroMayorY);
    grafica.appendChild(numeroMedioX);
    grafica.appendChild(numeroMedioY);
    grafica.appendChild(numeroCero);

    // Espacio
    document.body.appendChild(document.createElement("br")); document.body.appendChild(document.createElement("br"));
};