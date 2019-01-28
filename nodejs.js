'use strict'

var params = process.argv.slice(2); 
var varone = parseFloat(params[0]) ;
var vartwo = parseFloat(params[1]) ;
var texto = `
El resultado de la suma es: ${varone + vartwo} 
El resultado de la multiplicacion es : ${ varone * vartwo}
El resultado de la division es : ${varone / vartwo}
`

console.log(texto);


console.log("bienvenido a node js ");
