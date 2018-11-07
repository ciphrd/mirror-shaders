# Creenv, the creative environment

Creenv was developed to make the fastidious process of setting up an es6 environment easy. This project gets installed when you run the [create-creenv](https://github.com/bcrespy/create-creenv) command-line. **Instead of cloning this repo, I recommend that you use the command-line instead.** It runs the redundant tasks for you :)

More than just a starting project, Creenv comes with usefull classes to create faster, such as Core, Colors, Vector, SoundAnalysis, etc... [Section #3 provides informations about these modules]

## 1. Installation 

You can have more informations on the [create-creenv command-line github page](https://github.com/bcrespy/create-creenv). But for short:

```bash
npm install -g create-creenv
```

```bash
create-creenv your-project-name
```

```bash
cd your-project-name
npm run start
```

This will install the project in the *your-project-name* folder and will set it up for you :). Then it runs the local server and watch your files for modification. We'll go deeper on this behavior in the next sections.

## 2. Usage

This section covers the basic knowledge you need to start creating with Creenv. However, if you feel that the informations supplied here are insufiscient, check the *in-depth tutorial on Creenv usage* (not written yet, stay tuned). 

### a. The project structure 

This is what you should get after the project installation:

```
your-project-name
| public 
| | index.html
| src
| | main.js
| | renderer.js
| webpack 
| | dev.config.js
| | prod.config.js
| .gitignore 
| LICENSE 
| package.lock.json
| package.json 
| readme.md
```

#### The /public folder 

This is the folder you serve assets from. As it is now, only the index.html can be found. This is the html file were the [transpiled javascript](https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them) will be included.

#### The /src folder 

This folder contains the logic of your application. To be able to see the result of your code into the browser, [you will have to run a command that will transpile the javascript](#b.-how-to-work-with-creenv). The *main.js* file will be used as an entry point by the transpiler. It means that you'll need to start the logic of your application here. The example provided within the starting project should be enough for you to understand how this works. Go ahead and open the *main.js* file ;).

Moreover, you can put your images in the /src folder and serve them using javascript. Here is [a working example](null) *-not written yet-*.

#### The /webpack folder and files at the root 

The webpack folder contains the config required by the transpiler. You can take a look at it, but you will probably never have to touch it :). The files at the root are used by npm (to manage package dependencies) and git (to exclude useless folders). 

### b. **How to work with Creenv**

First, go to your project directory using cd 

``` bash 
cd path/to/my/project
```

To start developing, just run 

``` bash
npm run start 
```

It will start the development server, open it in your browser and watch for modifications to your files. So everytime you save, the webpage will **automatically reload**, making the development process easier and faster. 

When you are done working, you can stop the server and run this command :

```bash
npm run build 
```

This will build your app into a */build* folder. To upload your work on the internet, you will just have to upload the content of the folder on a server.

### c. Work with Creenv modules

When you need a module from Creenv, such as those described in the next section, you can import it at the beginning of your javascript files :

```js
import Module from '@creenv/module';
```

The module can then be used within the app: 

```js
// this is an example with uses the color module
import Color from '@creenv/color';

const magenta = new Color(255,0,255); // magenta

// let's set the body background to magenta
document.body.style.backgroundColor = magenta.rgb;
```

That's it, basically. From now, you can start and be creative :). Although it's not necessary, next section provides informations about useful modules that you may want to use to boost your creativity. **Especially the Core module, being used in this boilerplate.**

## 3. Creenv modules

### a. The **Core** module

Even though it is easy to use, this module requires a full chapter to go through all this functionalities. Fortunatly, such a chapter is available in [the github page of the module](https://github.com/bcrespy/creenv-core). By the way, this is an habit your should take. Whenever you need informations about a creenv module, check it's github page, such informations should be provided here, and if it's not you can ask your questions there :).

We will cover here the basics required to run an app with the core. First, a working example is available in this starter project, so go and check the *src/main.js* file.

**The Core object is abstract.** It means that it cannot be used directly, but must be inherited by another class. Only one method **needs** to be rewritten, and it's the render one. This method will be called each frame once the main loop has started. If you need to initialize variables, load data from file, you can do so by rewritting the *init()* method. Note that if this method returns a *Promise*, the render method will only be called after the Promise resolves. After your class is written, you have to bootstrap it. You can do so by instanciating your class and calling it's bootstrap method. **All of this is covered and explained in the current main.js file.**

*insert main.js file here*

### b. Everyday modules you will use 

* [**color**](https://github.com/bcrespy/creenv-color) - provides an interface to work easily with colors 
* [**vector**](https://github.com/bcrespy/creenv-vector) - 2d vector operations, a must to have **NOT AVAILABLE YET**

### c. An exhaustive list of creenv modules 

* [**canvas**](https://github.com/bcrespy/creenv-canvas) - makes it easier to work with Canvas, making the redundant process disappear 

## 4. Have fun 

It's time for you to have fun. A list of useful resources:

* i am an item in a list

