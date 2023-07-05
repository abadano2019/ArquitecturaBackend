<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="https://github.com/abadano2019/AppBazar5A/blob/master/assets/icon.png" width="80" height="80">
    <p>  E-COMMERCE BAZAR 5A BACKEND </p>
  </a>
</div>




<!-- ABOUT THE PROJECT -->
## Introducción

AppBazar5A backend surge como una consecuencia del front de Bazar 5A ya desarrollado en otros repositorios de mi gitHub para el cual se realizan una serie de funcionalidades para darle servicio al sitio web, el mismo consta de varios módulos entre los que podemos encontrar seguridad y la utilización de Passport, pasarela de pago con la implementación de Stripe, bases de datos NoSQL con la utilización de mongoose, con la posibilidad de implementar otras persistencias, entre otras cosas. Dentro de las funcionalidades un cliente puede agregar productos a su carrito, restarle o agregarle cantidad de elementos, eliminar un producto de su carrito, emitir órdenes de compra, realizar pago con la pasarela de pago Stripe, también cuenta con las funcionalidades de administración para poder agregar modifica y eliminar productos entre otras cosas. 

### Tecnologías utilizadas

Dentro de las tecnologías utilizadas para el desarrollo del backend podemos encontrar:

##### * @faker-js/faker (https://www.npmjs.com/package/@faker-js/faker)
##### * artillery (https://www.npmjs.com/package/artillery)
##### * bcrypt (https://www.npmjs.com/package/bcrypt)
##### * connect-mongo (https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database)
##### * cookie-parser (http://expressjs.com/en/resources/middleware/cookie-parser.html)
##### * cors (https://www.npmjs.com/package/cors)
##### * dotenv (https://www.npmjs.com/package/dotenv)
##### * express js (https://expressjs.com/)
##### * express-compression (https://www.npmjs.com/package/express-compression)
##### * express-handlebars (https://www.npmjs.com/package/express-handlebars)
##### * express-session (https://www.npmjs.com/package/express-session)
##### * jsonwebtoken (https://www.npmjs.com/package/express-jwt)
##### * moment (https://momentjs.com/)
##### * mongoose (https://www.npmjs.com/package/mongoose)
##### * mongoose-paginate-v2 (https://www.npmjs.com/package/mongoose-paginate-v2)
##### * multer (https://expressjs.com/en/resources/middleware/multer.html)
##### * nodemailer (https://www.npmjs.com/package/nodemailer)
##### * passport (https://www.passportjs.org/)
##### * passport-discord (https://www.passportjs.org/packages/passport-discord/)
##### * passport-github2 (https://www.passportjs.org/packages/passport-github2/)
##### * passport-google-oauth20 (https://www.passportjs.org/packages/passport-google-oauth20/)
##### * passport-jwt (https://www.passportjs.org/packages/passport-jwt/)
##### * passport-local (https://www.passportjs.org/packages/passport-local/)
##### * session-file-store (https://www.npmjs.com/package/session-file-store)
##### * socket.io (https://www.npmjs.com/package/socket.io)
##### * stripe (https://www.npmjs.com/package/stripe)
##### * swagger-jsdoc (https://www.npmjs.com/package/swagger-jsdoc)
##### * swagger-ui-express (https://www.npmjs.com/package/swagger-ui-express)
##### * winston (https://www.npmjs.com/package/winston)
##### * chai (https://www.npmjs.com/package/chai)
##### * mocha (https://www.npmjs.com/package/mocha)
##### * Docker (https://docs.docker.com/desktop/install/windows-install/)
##### * Kubernetes ()
##### * Railway (https://railway.app/)

El servidor de backend fue desarrollado con Express Js y junto con Node Js y Java Script forman la base medular para la aplicación, luego se le agregaron otras librerias para generar otras funcionalidades. 

Repositorio: Para la persistencia se utilizó mongoose, connect-mongo y mongoose-paginate-v2 y por intermedio de patrones de diseño se dejó la posibilidad de implementar otros tipos de persistencia.

Seguridad: se utilizó passport, passport-discord, passport-github2, passport-google-oauth20, passport-jwt, passport-local, bcrypt, con passport se agregó el ingreso a la aplicación por intermedio de los usuarios ya existentes en otras aplicaciones, en este caso, google, discord y gitHub, por otro lado, existe la posibilidad de registro de forma local. Se usa un sistema de hasheo de información proporcionado por bcrypt.

Documentación: Para la documentación de la aplicación se utiliza swagger-jsdoc y swagger-ui-express, si bien no están todos los módulos documentados hay una muestra de un par de ellos en la ruta (http://localhost:3000/api/docs/)

Logueo: El logueo de información se realiza con la implementación de winston ya sea por consola o en archivo, ser manejan 4 niveles de logueo fatal: "magenta", error: "red", warning: "yellow", info: "cyan".

Testeo: Para el testing unitario y de integración se utiliza chai, mocha, @faker-js/faker y supertest se realizó una muestra de unas pocas muestras para ver el funcionmaiento en la carpeta /supertest y en la carpeta /src/test

Testeo de carga: Para el testeo de carga se utilizó Artillery se realizó sobre un par endpoints y los resultados se pueden encontrar en la carpeta src/test/artillery en el archivo src/test/artillery/read.me.txt se encuetran las consultas ejecutadas. 

Usuarios: Para el manejo de usuarios se utilizó cookie-parser, bcrypt, express-session, jsonwebtoken, session-file-store, en la aplicación si bien se utilizón jwt, cookies y sessioens quedó utilizando sessiones las cuales son guardadas en la base de datos, en caso de querer cambiar se deben de hacer los ajustes necesarios. La solicitud de una nueva clave de usuario se realizan utilizando jwt. 

Comunicación entre servidores: se utiliza cors

Motor de plantillas: si bien en la carpeta public está todo el diseño del front el backend está conectado con formularios de express-handlebars, todo el front a no ser por el menú está diseñado con plantillas de handlebars, queda fuera del alcance de esta entrega la integración con el front por falta de tiempo.

Pasarela de pago: Se implementa stripe y se deja pronto para el desarrollo de la pasarela de mercado pago.

Middleware: Se implementas varios middlewares entre ellos se implementa el modulo de multer para subir archivos al servidor, se implementa de varias formas para documentos, perfiles y productos, se puede ver en la carpeta src/public/img, además se implementó middlewares de autotenticación, errores personalizados, validacion de jwt, 

Docker, Kubernetes, Railway: Se utilizó docker para la generación de contendedores y utilizó kubernetes para la escalabilidad y se intentó utilizar railway pero por problemas de comuniciación con gitHub no se llegó a realizar el despligue ya que por problemas de configuración railway no se integra con gitHub.

Otras: para el manejo del tiempo se utiliza moment, para el manejo de envio de mails nodemailer, para el manejo de datos entre clientes se implementó web socket con socket.io

<!-- GETTING STARTED -->
## Instalación

### Requisitos previos

Se recomienda el uso de Visual Studio Code para la visualización y administración del código, se debe tener instalado Node JS, en caso de querer utilizar datos propios se debe contar con una cuenta de mongodb.

### Pasos a seguir

A continuación se marcan los pasos para poder utilizar la aplicación con datos propios.

1. Configurar el servicio de mongodb  

2. Clonar o descargar el repositorio, antes de ejecutar este comando debe posicionarse en la carpeta donde desea clonar el repositorio
   ```sh
   git clone https://github.com/abadano2019/AppBazar5A.git
   ```
3. Instalar NPM packages
   ```sh
   npm install
   ```
4. Configurar la variable mongoUri en el archivo .env obtenida del punto 1
5. Registrar un usuario cualquiera con el el mail adminCoder@coder.com el cual será administrador
6. Ingresar con el usuario adminCoder@coder.com y cargar datos de productos
7. Para el correcto uso del resto de las funcionalidades completar el resto de las variables en el archivo .env
  

## Estructura de carpetas

![image](https://github.com/abadano2019/ArquitecturaBackend/assets/48340360/7ce1d0c7-c962-48a9-810a-f0cbec7d4690)



Dentro de la carpeta src tenemos la siguiente estructura, una carpeta components donde se encuentran los componentes de la aplicación, una carpeta con el nombre constants donde se encuentran los datos, la configuración para la conexión a firebase, la conexión al servicio de google.maps y la definición de colotes para ser utilizados por los estilos de los distintos componentes y vistas, una carpeta models donde se encuentran los distintos modelos a utilizar por las bases de datos, una carpeta navigation con toda la estructura y archivos para la navegación de las pantallas por intermedio de @react-navigation, una carpeta con el nombre screens con todas las vistas que la aplicación utiliza, una carpeta con el nombre Store con la implementación de 'redux-thunk' y una carpeta utils con elementos de uso reutilizable como ser el formulario de inicio y registro de sesión.

#### components

![image](https://user-images.githubusercontent.com/48340360/227795274-ca088124-6a0d-486a-a4de-fd4999d8a43c.png)

Dentro de la carpeta components podemos destacar los siguientes archivos:
* cart-item.jsx: encargado de desplegar un elemento del carrito con los botones de mas y menos para aumentar o disminuir la cantidad del producto seleccionado, también cuenta con la posibilidad de borrarse del carrito.

* category-item.jxs: encargado de desplegar una tarjeta con el nombre de una categoría. El dato se encuentra disponible en el archivo categories.js en la ruta /src/constants/data

* image-selector.jsx: encargado de verificar permisos de usa de la cámara del dispositivo y posterior toma de imagen.

* order-item.jsx: encargado de desplegar la información de una orden, esta información se encuentra en firebase en rtdb por usuario de generación de orden.

* place-item.jsx: encargado de desplegar la información de una dirección cargada por el usuario, la información de guarda en SQLite, la dirección puede ser borrada por intermedio del icono de borrado.

* product-item.jsx: encargado de desplegar la información de un producto para la vista por categorías.

#### constants

![image](https://user-images.githubusercontent.com/48340360/227796245-eb228be7-b68c-4015-bf43-046904765d8a.png)

* data: contiene archivos .js con la información necesaria para el renderizado de lo componentes de productos y categorias, además cuenta con otros archivos de prueba en desarrollo.
* firebase: cuenta con la configuración necesaria para la conexión con firebase para el uso de la rtdb y el servicio de autenticación y registro de usuarios. 
* db: cuenta con la configuración necesaria para la conexión con SQLite y las transacciones de inicialización, inserción, búsqueda y borrado de datos que la aplicación utiliza.
* maps: cuenta con la configuración necesaria para la conexión con el servicio de google.maps
* theme: cuenta con las definiciones de colores utilizada por los estilos de los componentes.

#### models

![image](https://user-images.githubusercontent.com/48340360/227796737-23bfa035-bd2c-473b-a11c-48c41c0f5e67.png)

* places.js: archivos con el modelo especifico utilizado por SQLite para las direcciones cargados por los usuarios.

Nota: falta integrar la definición de los restantes modelos de datos 

#### navigation

![image](https://user-images.githubusercontent.com/48340360/227796925-c6661f5a-eaaf-405b-9e93-59cc1016f376.png)

La aplicación cuanta con 2 stack de navegación uno para las direcciones, donde se dan de alta, se listan y se pueden ver en detalles y otro para las categorías de los productos donde se pueden listar los productos por categoría y luego ver en detalle. El primer stack se encuentra bajo el item del menú (Tab de navegación) shop y el segundo stack para el item places.

![image](https://user-images.githubusercontent.com/48340360/227798283-a0e58de9-b321-49e1-97e1-bf0915371e95.png)

Luego se pueden ver otros tres items uno para ver las ordenes generadas por el usuario, el histórico de órdenes (se guardan en una base de dato de firebase), otro para ver el carrito del usuario, no tienen persistencia una vez que se cierra la aplicación el carrito se borra y un formulario de contacto simple. 

#### vistas

![image](https://user-images.githubusercontent.com/48340360/227798846-5ffcd2bc-2f3b-4bd4-858f-72d0a2cc370f.png)


En esta carpeta contamos con las vistas o páginas de la aplicación:

* auth.jsx: despliega la página de inicio donde un usuario se puede registrar o autenticarse para el ingreso a la aplicación.

* cart.jsx: despliga la página del carrito donde podremos ver los producos seleccionados por el usuario junto con la suma total de los productos agregados.

* categories.jsx: despliega la página de las categorías donde se pueden seleccionar la categoría deseada para visualizar los productos correspondientes a esa categoría.

* contact.jsx: despliega la pantalla de contacto de la aplicación donde se puede ingresar nombre, mail y mensaje que se desea enviar. En esta versión de la aplicación los datos quedan en redux y no son almacenado en ninguna base de datos.

* maps.jsx: despliega la pantalla que proporciona la funcionalidad de elegir una dirección personalizada, distinta a la de la geolocalización del usuario.

* new-place.jsx: despliega la pantalla responsable de obtener los datos necesarios para agregar una nueva dirección del usuario, se ingresa nombre, una foto tomada desde el dispositivo y una localización.

* order-detail.jsx: despliega la pantalla con los productos correspondientes a una orden seleccionada por el usuario.

* orders.jsx: despliega el histórico de ordenes de un usuario

* place-detail.jsx: despliega el detalla de una dirección seleccionada por el usuario de la lista de direcciones disponibles.

* place-list.jsx: despliega la lista de dirección disponibles de un usuario.

* product-detail.jsx: despliega el detalle de un producto seleccionado por el usuario, desde esta pantalla se puede agregar el producto al carrito.

* products.jsx: despliega la lista de productos para una categoría determinada seleccionada por el usuario.

#### store

![image](https://user-images.githubusercontent.com/48340360/227798900-d28078ab-0b8c-441e-8b97-0b7af89cb666.png)

![image](https://user-images.githubusercontent.com/48340360/227798921-8bfc52b5-94e8-40e8-b827-b8953b9dacec.png)

![image](https://user-images.githubusercontent.com/48340360/227798951-b6d5bbc8-7288-4512-82b1-b2614d8c6bfa.png)

![image](https://user-images.githubusercontent.com/48340360/227798969-81dbed76-08c9-468e-a344-399950e56414.png)

la carpeta store cuenta con toda la estructura para el uso de redux-thunk, se utiliza para los usuarios, el carrito, las categorías, para el formulario de contacto, para las ordenes, para las direcciones y para los productos.

### Otros archivos

Dentro de la carpeta assets podemos encontrar los iconos de la aplicación y las fuentes utilizada

![image](https://user-images.githubusercontent.com/48340360/227800339-7429ca8c-fb4b-4bd5-8def-9faa2fa8124f.png)


#### fonts

![image](https://user-images.githubusercontent.com/48340360/227800377-32d6f434-a793-4500-9433-8eb80d7a9925.png)

#### icono

<img src="https://github.com/abadano2019/AppBazar5A/blob/master/assets/icon.png" width="80" height="80">

#### splash

<img src="https://github.com/abadano2019/AppBazar5A/blob/master/assets/splash.png" width="160" height="320">

#### adaptive-icon

<img src="https://github.com/abadano2019/AppBazar5A/blob/master/assets/adaptive-icon.png" width="80" height="80">

#### favicon

<img src="https://github.com/abadano2019/AppBazar5A/blob/master/assets/favicon.png" width="30" height="30">

<!-- ROADMAP -->
## Mejoras

Esta es una primera versión del proyecto AppBazar5A, en el cual quedan para definir en un nuevo alcance otras funcionalidades como ser:

* Agregar los modelos de datos que faltan e impactar datos contra firebase.
* Generar una vista para ampliar los datos de registro de los usuarios.
* Generar módulo de mantenimiento de los productos para poder modificar y eliminar productos existente y agregar nuevos.
* Utilizar el template form generado para la autorización para el formulario de contacto.
* Publicar la aplicación al menos en Play Store de Google. 
* Generar un modelo y vista para los productos favoritos o deseados del usuario.
* Generar las validaciones necesarias para el control de stock de los productos.
* Agregar otras fotos en un carrusel sobre los productos seleccionados.

entre otras cosas

# ANEXO

Proyecto desarrollado utilizando Expo [Create an app using Expo](https://docs.expo.dev/tutorial/create-your-first-app/).

Proyecto AppBazar5A (https://github.com/abadano2019/AppBazar5A)

Testeado en Android Studio Dolphin con los siguiente dispositivos virtuales:

![image](https://user-images.githubusercontent.com/48340360/227805485-b123b23d-3e93-4f37-abf9-0995b24bba65.png)


## Comandos disponibles

### `npm start`

Desde una terminal donde se esté ubicado en la raiz del proyecto se puede iniciar la aplicación ejecutando el comando npm start

Previo a la ejecución de la app se deben instalar las dependencias del proyecto.

### `npm install`

Ejecute el comando npm install para instalar todas las dependencias del archivo node_modules del proyecto.

### `build`

Para generar un ejecutable (apk) para utilizar en dispositivos Android ejecute el comando 

  ```sh
   eas build -p android --profile prod
   ```

previo registro de un usuario en el sitio de expo dev https://expo.dev/

Para mayor información dirigirse a la siguiente página (ANDROID): [Build APKs for Android Emulators and devices](https://docs.expo.dev/build-reference/apk/).
o dirigirse a la siguiente página (IOS): [Build for iOS Simulators](https://docs.expo.dev/build-reference/simulators/).

## Learn More

Si desea aprender sobre Expo / React Native dirijase a los siguientes links: 

[Create a new app with Expo documentation](https://docs.expo.dev/get-started/create-a-new-app/).
[Expo documentation](https://docs.expo.dev/). [React Native documentation] (https://reactnative.dev/)

<!-- REFERENCIAS -->
## Referencias

* Curso desarrollo de aplicaciones - CoderHouse.com - Profesor: Ing.Daniel Alberto Soto Guillen

<!-- CONTACT -->
## Contacto

Ariel Badano - abadano05@gmail.com

Project Link: [https://github.com/abadano2019/AppBazar5A](https://github.com/abadano2019/AppBazar5A)
