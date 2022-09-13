# Second assignment by Coderhouse :computer:

Compared with the first assignment, this one it's more complete in terms of theroycal content.
The objective is to start with a simple project topic, and improve it while I´m advance with the lessons by adding more resources and functionalities of JS.

### The topic that I chose for the project is a Coffeshop :coffee: 
<sub>Because I love it :sweat_smile:</sub>


The idea is making a **super simply** E-commerce, but this time i can use more things. These things are: functions and high-order functions, objects, methods and arrays. So, you cand read the code if you interested on how I implemented them.

#### A little disclaimer...
Since we dont saw the DOM lesson yet, the interact with the user it's very bounded. I can only use three functions to interact:
* `alert()`
* `prompt()`
* `console.log()/.table()`


## The highlight :star:
I think that the most important thing in this project is the logic before the **cart** and **menu** arrays. It tooks me several hours to debugg the algorithms, and the worst/best thing is... the project is not ready yet. But once I finish with it, I think the result it's gonna be amazing. So...

#### *IF YOU READ THIS MESSAGE THE PROJECT IT'S NOT DONE YET* 

On the other hand, the improvments I make will be updated in this :page_facing_up: README file in chronological order (the latest first and the oldest last)

### So don't hesitate to read it :arrow_down: :arrow_down: :arrow_down:
## Chronoligcal improvments list :clipboard:
### Latest
*12 of September 2022*

**a)** The old menu system, which worked with a "switch" statement, was improved for a more scalable array/object based system. The functions related with the "switch menu system" were also updated to work correctly.

### Changes 2
*9 of September 2022*

**a)** The object {*`cart`*} was replaced by two arrays with new functionalities. 
The first array, [*`store`*], fulfills the function of storing the products with properties related to it (*name*, *price* and *stock*).
The second one, [*`cart`*], saves the products that the user wants to buy.

**b)** Stock functionality added. 
When the user saves the order, the program makes a check in the [*`store`*] list using the `checkStock()` function. This allows to save the order on [*`cart`*] in case there is stock available.

**c)** Console output improvement. 
The code that is responsible for display the results of the order on the console when the user enters to the *cart* option was improvement, making it more readeble.

### Changes 1
*3 of September 2022*

**a)** Creating the menus logic. 
The idea is create a function called `menu()` that works with a *switch* statement which checks the input and compares against the cases, so you can navigate trought the different options.

**b)** Create a cart object.
This object was created by the following structure [key, value] = [number, object]. Namely, the objects that correspond with the property values of the {*`cart`*} object, represents the products of the store. These objects also has properties (name, price and quantity) which are used to save the order and calculate the total.
