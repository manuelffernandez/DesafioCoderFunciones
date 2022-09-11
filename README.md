# Segundo desafío complementario :coffee:
**Manuel Fernandez**

Simulador de ordenes de compra de una cafetería ficticia. Se interactúa con el usuario a través de las funciones `prompt()`, `alert()` y `console.log()`

## Cambios implementados para la segunda entrega 11/09

**1-** Se sustituyo el objeto {*`cart`*} por dos arrays con funcionalidades nuevas. 
El primer array, [*`store`*], cumple la función de guardar los productos con propiedades relativas a él (*name*, *price* y *stock*).
El segundo, [*`cart`*], sirve para guardar las compras que el usuario vaya cargando.

**2-** Funcionabilidad de stock agregada. Cuando el usuario carga su compra, el programa realiza un chequeo de stock por medio de la función `checkStock()` en el array (*`store`*), la cual permite la carga de la orden en caso de que haya stock disponible.

**3-** Mejora del output en la consola. Se mejoró la sección de código que mostraba los resultados del pedido en consola cuadno el usuario ingresa a la sección de *carrito*.
