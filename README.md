<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="https://github.com/abadano2019/AppBazar5A/blob/master/assets/icon.png" width="80" height="80">
    <p>  E-COMMERCE BAZAR 5A BACKEND </p>
  </a>
</div>




<!-- ABOUT THE PROJECT -->
## Introducción

AppBazar5A backend surge como una consecuencia del front de Bazar5A ya desarrollado en otras repositorios de mi gitHub para  proyecto familiar en donde se vuelcan muchos años de experiencia en venta de artículos de Bazar, el mismo consta de varias secciones como ser cristalería, electrodomésticos, cocina, vajilla entre otros, pudiendo adaptarse a las necesidades del mercado. Dentro de las funcionalidades un cliente puede ingresar a la vista de categorías, navegar entre las opciones de categorías disponibles, seleccionar una y ver sus productos asociados, ver los detalles de los productos, agregarlos al carrito de compra, emitir órdenes, ver el histórico de ordenes, enviar mensajes, agregar direcciones de envío, listarlas, ver el detalle de una en particular y eliminarlas de la lista de direcciones. 

### Tecnologías utilizadas

Dentro de las tecnologías utilizadas para el desarrollo de la aplicación podemos encontrar:

##### * React Native
##### * Java Script
##### * Firebase rtdb
##### * Firebase Storage
##### * Firebase Autentication
##### * Expo
##### * SQLite
##### * Utilización de la Camara de los dispositivos
##### * Utilización de Geolocalización de Google

React Native y Expo como herramientas base para la elaboración de la aplicación, Java Script para todo lo relacionado a lógica de decisión, Firebase se utilizó como repositorio de imagenes, base de datos y medio de registro y autenticación de usuarios, SQLite como base de datos local y librerías específicas para la utilización de la cámara del dispositivo y la geolocalización. 

<!-- GETTING STARTED -->
## Instalación

### Requisitos previos

Se recomienda el uso de Visual Studio Code para la visualización y administración del código, se debe tener instalado Node JS, en caso de querer utilizar datos propios, se debe utilizar una cuenta de gmail para la configuración de firebase y el servicio de google maps.

### Pasos a seguir

A continuación se marcan los pasos para poder utilizar la aplicación con datos propios.

1. Configurar el servicio de realtime database en firebase. 
2. Configurar el servicio de autenticación de firebase por intermedio de correo electónico.
3. En caso de querer utilizar imágenes propias se deberá cambiar la url en el archivo productos.js ubicado en la carpeta src/constants/data
4. Configurar los servicios necesarios para el uso de la api de geolocalización de google.maps 
5. De las configuraciones vista en los puntos del 1 al 4 se deben obtener 2 api key una de firebase y otra de google.maps

6. Clonar o descargar el repositorio, antes de ejecutar este comando debe posicionarse en la carpeta donde desea clonar el repositorio
   ```sh
   git clone https://github.com/abadano2019/AppBazar5A.git
   ```
7. Instalar NPM packages
   ```sh
   npm install
   ```
8. En caso de querer utilizar datos propios modificar los archivos categories.js y products.js ubicados en la carpeta src/constants/data 
  

## Estructura de carpetas

![image](https://user-images.githubusercontent.com/48340360/227794486-d415326e-6c50-48be-8f82-f37c6beb055a.png)


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
