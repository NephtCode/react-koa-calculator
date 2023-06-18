Tarea 3. Tecnologias y Aplicaciones Web. Nicolas Olmos.

Explicacion general:

Hay dos carpetas, una es la del backend, la cual dentro tiene la carpeta src, tiene los siguientes archivos:

index.js:

En este archivo se crea un servidor con Koa con soporte para CORS, se hace el registro de solicitudes y respuestas, análisis de datos en las solicitudes y manejo de rutas utilizando el router de routes.js. Luego, inicia el servidor y lo hace escuchar en el puerto 3000 (En una issue se especifico que no importaba el puerto)

routes.js:

En este archivo se definen las rutas para realizar las operaciones basicas de la calculadora usando koa-router, de aqui se usan los metodos get o post dependiendo de la operacion para que funcione la API.

operations.js:

Se definen las operaciones matematicas basicas.

Ademas, en el archivo .env se guarda el puerto 3000, el cual se extrae en index.js a traves de dotenv.config(). Finalmente esta el archivo package.json que tiene todas las dependencias usadas, como aparecio en el taller del semestre pasado, se uso un script para que nodemon funcionara al escribir yarn dev.

Por otro lado, tenemos la carpeta frontend, la cual tiene los siguientes archivos dentro de la carpeta src:

App.jsx, donde se exporta la calculadora.

main.jsx, donde se muestra la App.

Calculator.jsx, aqui esta todo lo principal, en primer lugar se importa React y el archivo de estilos de la calculadora, despues se define el componente de la calculadora como una función llamada Calculator, continua utilizando hooks de React (useState y useEffect) para manejar el estado de la expresión y si se muestra o no resultado en la pantalla de la calculadora. En el efecto de useEffect, se agrega un event listener para capturar la tecla Enter y llamar a la función handleEqualClick cuando se presiona, tal cual como lo pedia en el enunciado Tambien se define la función countOperators que cuenta la cantidad de operadores en la expresion, de aqui hay muchas funciones, pero en resumen, estas manejan los clicks de los botones de los dígitos, operadores y botones de borrar un digito y borrar todo. La función handleEqualClick es la mas importante, esta maneja cuando se apreta el boton = o se presiona la tecla Enter, al ocurrir cualquier opcion, se analiza la expresión para extraer los numeros y el operador, luego realiza una solicitud GET o POST a una API, enviando los numeros. Si la respuesta es exitosa, actualiza la expresión con el resultado y se muestra el resultado en la calculadora, si ocurre un error, avisa en la consola (con F12 se puede ver bien).

Ademas, dentro de la carpeta src hay otra carpeta de assets, dentro hay una carpeta de styles con el archivo calculator.css para que se vea bien la calculadora.

Adicionalmente, tengo la extension de ESLint en VSC (fue recomendada por el profesor en una issue), debido a esto es que se creo un archivo llamado .eslintrc.jsc , no se si afectara en algo a la correccion.

Finalmente esta el archivo package.json con las dependencias (cuidado aqui que al verla me di cuenta que en el script toma en cuenta el linter, ¿si el ayudante no lo tiene instalada la extension quizas no funcione?)

Ejecucion:

Antes de todo, borre la carpeta node_modules, por lo que el ayudante debe hacer el yarn install (si no me equivoco).

Se deben abrir dos terminales, en cada una hay que ingresar a la carpeta principal y hacer cd backend y cd frontend. Ya con una terminal en el backend y otra en el frontend, en ambas terminales se debe correr yarn dev

Al menos en mi caso (Ubuntu) era hacer esto:

nicolas_olmos@NotebookNico:~/20625960_Olmos_Nicolas/backend$ yarn dev

nicolas_olmos@NotebookNico:~/20625960_Olmos_Nicolas/frontend$ yarn dev

Y al abrir (en mi caso) http://localhost:5173/ se puede ver todo lo relacionado con la calculadora y se puede empezar a calcular lo que se quiera.

Suposiciones y Observaciones

1. La calculadora no permite colocar simbolos donde no se debe, por ejemplo, no se puede iniciar con una suma o division o multiplicacion, si se puede empezar con una resta ya que puede ser que el primer numero sea negativo, basicamente que se puede iniciar un "-3" pero no un "*3".

2. Parecido a lo anterior, las operaciones toman en cuenta el primer numero (negativo o no), una operacion, y el otro numero (negativo o no),
aqui tenemos algunos ejemplos:

6+7 = 13

6*7 = 13

-6+7 = 1

-6--7 = 1 (se toma en cuenta que la operacion es un menos entre -6 y -7)

-6+-7 = -13 (se toma en cuenta que la operacion es un mas entre -6 y -7)

6/-2 = -3 (se toma en cuenta que la operacion es una división entre 6 y -2)

-7*4 = -28

-7*-4 = 28 (se toma en cuenta que la operacion es una multiplicacion entre -7 y -4)

Y asi sucesivamente, otros inputs como conjunto de operaciones (ej: -5/3-3+1) no se pueden realizar, tampoco se pueden hacer cosas sin sentido, como 3*/2.

Un detalle es que si se intenta dividir por 0, entonces el error se maneja en el backend, pero coloque que en la pantalla de la calculadora apareciera un mensaje diciendo "ERROR", igual que otro resultado, este desaparece al presionar cualquier boton.