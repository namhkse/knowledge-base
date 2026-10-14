# Fundamentals of React

# Hello React

SPA have becoem popular. Using these frameworks made it easier to build web applications that beyond vanilla JS
and jQuery.
React is solution for SPAs.

In the past, websites and weapplications were rendered from the server.
A user visits a URL in a browser and requests one HTML file and all its acoociated HTML, CSS, JS files from web
server.
Every additional page transition(meaning: visiting another URL) would initiate this chain of events again.

In constrast, modern JS shifted the focus from the server to the client.
A user visits a URL and requests one small HTML file and one larger JS file. After some network delay, the user
sees the by JS rendered HTML in teh browser and starts ot interact with it.

# Setting up a react project

Vite is a modenr build tool, development server, bundler.

# Project structure

`vite.config.js`: a file to configure Vite. 
`public/`: this folder hodls static assets for project (e.g favicon) 
`index.html`: the HTML that is displayed in teh browser when starting the project.

`src/App.jsx` fiel which is used to implement React components.
`src/main.jsx` as an entry point to the React world.

# npm Scripts

All project-specific commands can be found in *package.json* file under the *script* property.

```json
{
    "script": {
        "dev": "vite",
        ...
    }
}
```

These scripts are executed with the `npm run <script>` command.

`npm run preview` can be used to run the production-ready build on the local machine for testing purposes.

# Meet the React Component

```jsx
import './App.css'

function App() {
  return (
    <div><h1>Hello React</h1></div>
  )
}

export default App
```

This React component is called App component, is just a JS function. It's defined in *PascalCase*
It must start it a capital, otherwise it isn't treated as compoent in React.
The kind of the App component is called a **function component**.
Function components are teh modern way of uisng components in React.

Second, the App component doens't have any parameters in its function signature yet. You will learn how to pass 
information (see **props**).

And third, the App component returns code that resembles HTML that allows you to combine JS and HTML for display dynamic and interactive content in a browser.

Like any other JS function, a function component can have implementation details between function signature and the 
return statement.

```jsx
function App() {
  // you can do soemthing in between
  return (
    <div><h1>Hello React</h1></div>
  )
}
```

Variables defined in the function's body will be re-deifned each time this function runs.

```jsx
function App() {
  const titl e= 'React';

  return (
    <div><h1>Hello React</h1></div>
  )
}
```

The function of a component runs every time a component is displayed in the browser. This happens:
- Initial rendering
- The component updates because it has to display something different (re-rendering)

Since we do not want to re-defined a variable within a function every time this function runs, we could define this variable outside of the component as well.

> A rule of thumb
> If a variable does not need anything from within the function component's body (e.g. parameters), then define
> it outside of the component which avoids re-definig it on every function call.

# React JSX

The returned output of the App component is called JSX (Javascript XML)

When using HTML in JSX, Reach internally translates all HTML attributes to JS where certaint workds such as class or for are reversed
during the render process. Therefore React came up with replacements such as `className` and `htmlFor`.

```
JSX (code) ---> ReactJS (internal React) ---> HTML (browser)
```

```jsx
import * as React from "react";

const welcome = {
  greeting: 'Hey',
  title: 'React',
};

function App() {
  return (
    <div>
      <h1>{welcome.greeting} {welcome.title}</h1>

      <label htmlFor="search">Search</label>
      <input type="text" id="search" />
    </div>
  );
}

export default App
```

While HTML can be used almost (execpt for the attributes) in its native way in JSX, everything in curly braces can be used to interpolate
JS. For example, you could define a function that returns the title and execute it within the curly braces:

JSX enables developers to express what should be rendered by mixing up HTML with JS. React doens't require you to use JSX at all, instead
it's possible to use methods liek `createElement()`.
eacth

# Linting With ESLint

# Lists in React

We will learn how to render a list of items in React.
In React, the arrya's build-in `map()` method is used to transform a list of items in to JSX by returning JSX for eacth item.  

We return JSX that renders each item of the list

Without any made up temlating syntax, it's possible to use JS to map from a list of items to a list of HTML elements.
That is what JSX  is for the developer in the end: Just JS mixed with HTML.

Fix the waring: every React element in a list should have a key assinged to it.

The *key* attriute is used for one specific reason: Whenever React has to re-render a list, it checks where an item has changed.
When using keys, React can efficiently exchanged the changed items, not using keys, React may update the list inefficiently.

# Meet another React component

With a growing React project, you will get mre and more components to manage.
Each component encapsulates functionalities (e.g. rendering a list of items).
Instead of making one component larger and more complex over time, we'll split one component into multiple components.

# React Component Instantiation

Only one component declaration, but can have multiple component instances.

# React DOM

TODO: Skip

# React Component Declaration

We can delare a React component with a function or arrow function expression.

```js
// function declaration
function App() {...}

// arrow function expression
const App = () => {...}
```

If an arrow function's only purpose is to return a value and it doesn't have any business logic in between, you can remove the block body
of the function.

# Handler Function in JSX

In native HTML, we can add event handlers on elements.

React's synthetic event is a wrapper arround the browser's native event. 

# React Event Handler

It's nice to make event handlers more distinguishable from other variables by giving them the function statatement again:
and in format `handle...`

```js
function handleUserSignIn() {...}

function handleUserSignUp() {...}

function handleUserSignOut() {...}
```

# Inline event hanler in React

So whenever you need to **pass event and paramters**, for instacne when you need an extra prameter for your `onClick` evnet, inline
event handlers may help you.

```js
function handleCount(event, delta) {...}

<button type="button" onClick={event => handleCount(event, 1)}>
  Increase Count
</button>
```

# Callback Eent Handler in React

There are callback event handlers or callback handlers.
They are used when a child component needs to communicate to a parent component. Since *React props* are only passed down the component
tree, a callback handler is used to communicate upward.

How to create and use a callback event.
1. Define the event handler in somewhere.
2. Define a child component that has input paramter accept a callback function
3. Setup the child component to use its callback function.
4. Pass the event handler (in the parent component) to the child component by using *React props*.

```jsx
const App = () => {
  const [text, setText] = React.useState('');

  function handleTextChange(event) {
    setText(event.target.value);
  }

  return (
    <div>
      <h1>My Hacker Stories {text}</h1>

      <Search inputValue={text} onInputChange={handleTextChange} />

      <hr />

      <List />
    </div>
  );
};

const Search = ({inputValue, onInputChange}) => {
  return (
    <div>
      <label htmlFor="search">Search</label>
      <input type="text" id="search" value={inputValue} onChange={onInputChange} />
    </div>
  );
};
```

# React: Event Bubbling and Capturing

Whenever an event happens on a HTML elemetn (e.g. inner HTML element), it starts to run through the handlers of this specific element, then the handlers of its parent HTML element (e.g. outer HTML element, where it actually finds a listening handler), and afterward all
they way up through each acestor HTML element until it reaches the root of the document. 

The `stopPropagation()` methdo is native to the DOM API.

`event.target` vs `event.currentTarget`

# Event capturing in React

When a user interacts with an element, the DOM API traverses down the document (capturing phase) to the target element (target phase),
only then the DOM API traverses up again (bubbling phase).

# React Props

```jsx
const List = (props) => (
  <ul>
    {props.list.map((item) => (
      <li key={item.objectID}>
        <span>
          <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
      </li>
    ))}
  </ul>
);
```

Everything that we pass from a parent component fron a parent component to a child compoent via the component element's HTML attribute
can be accessed in the child component.

The child component receives a parameter `(props)` as a object in its function signature.

Props are only used to pass information down the component hierachy. 

# Read more: How to use Props in React

A common question: **how to pass the data from one React components to another component?**
Entering Reaact props - where you can pass data from one component to another in React by defining custom HTML attributes to which you assign your data with JSX's syntax.

```jsx
const WelCome = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}
```

You always find the props as 1st argumetn in the function signature of a function component,
which is just the JS object holding all data passed from component to component.

You can destrcutre the props eary. It is called **React Props Destructuring**.

```jsx
const WelCome = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}
```

React's props are read only (immutable). You shoudl never mutate props but only read them in
your components.

## React Props vs State

Passing props from component to component in React doesn't make component interactive, because
props are immutable.
If you want interactive React components you have to introduce stateful values by using React
State.

Usually state is co-located to a React component by using React's useState Hook.
States can become props when it is passed to a child component. Even though the state becomes
props in the child component, it can still get modified in the parent component as state via the state updater function.
Once modified, the state is passed down as "modified" props.

Every state change in a component cause a re-render of this can all child components.

## How to pass Props from child to parent Component

Since props can only be passed from parent to child components, how can a child component
communicate with its parent component.

> There is no way  to pass props from a child to a parent component

## React Spread Props

A strategy for passing all properties of an object to a child component is using JS spread
operator. (a.k.a React ...props syntax)

The props spreading can be used to sperad a whole object with key value pairs down to a child
component. It has the same effect as passing each property of the object property by property
to the component.

```jsx
const Message = ({title, description}) => {
  ...
}

const Welcome = (props) => {
  // spreading the props
  <Message {...props} />
}
```

## React Rest Props

The JS rest destructuring can be applied for React props too.

> The destructuring syntax
> is a JS syntax that makes it possible to unpakce values from arrays, or properties from object
> into distinct variables.

```js
[a, b, ...rest] = [10, 20, 30, 40, 50];

// Expect a: 10
// Expect b: 20
// Expect rest: [30, 40, 50]
```

Overtime, there will be more and more props that we want to pass to the button and therefore
the Button component's function signature will grow in size. 

```jsx
const Button = ({ label, onClick, ...others}) => {
  return (
    <button onClick={onClick} disabled={others.disabled} type="button">
      {label}
    </button>
  );
}
```

We can use JS spread operator for spreading the rest pros to the button HTML element.
This way anytime we pass a new prop to the Button component and don't destructure it explicily.

```jsx
<button onClick={onClick} disabled={others.disabled}>...</button>
// to this
<button onClick={onClick} {...others}>...</button> 
```

## React props with Default value

In some cases, you want to pass default values as props.

Historically the best approach to it was using JS OR operator.

```jsx
const Welcome = ({title, description}) => {
  title = title || 'Earth';

  return (...);
}
```

However, with modern JS you can use the default value for the prop when using destructuring.

```jsx
const Welcome = ({title = "Earth", description}) => {
  return (...);
}
```

## React's child prop

The child prop in React can be used for composing React components into each other.

```jsx
const App = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <Button onClick={() => setCount(count + 1)}>
        {count} // notice this
      </Button>
    </div>
  );
};

const Button = ({onClick, children}) => {
  return (
    <button onClick={onClick}>{chidlren}</button>
  );
};

```

## How to pass Components as Props

Before you have learned about REact's children prop which allow you also to pass HTML/React
elements to components as props

However if you have multiple components, you should pass them as props because you will only
have one child component.

## Children as a Function

The concept of children as a function or child as a funciton, aka render prop.
Basically it is a function passed as prop.

## React's Context API for Prop Drilling

At some point, you are passing a lot props down your component tree. Depending on the depth
of the component tree, it can happen that many props are passed form a top level component
to all the leaf component.
Every component in between has to pass the props even though it may not be interested in the 
props.

The problem is called **prop drilling** in React.

## React Props Pitfalls

1. React props are not being apssed in Component
  Forgot the `{}` at the component signature, and faild to destruct.

2. React props key is undefined

3. Pass props to styled components


# React State

While it is not allowed to mutate React props as a develop, because they are only there to pass
information from parent to child component.

React state intorduces a mutable data struture.
These statefull values get instantiated in a React component a sso called state, can be passed 
with props as vehicle down to child components, but can also get mutated by using a function to
modify the state.

When a state gets mutated, the component with the state and all child components will re-render.

Prosp are used to pass information down the component hierachy.

State is used to change information over time.

# Callback Handlers in JSX

prosp are only passed downwards.

Callback handler: A callback hander gets introduced as event handler (A), is passed as function
in props to another component (B), is executed there as callback handler (C), and calls back
to the place it was introduced (D).

The callback handler in a nutshell: We pass a function from a parent component to a child
component via props, we call this function in the child component but have the actual
implementation of the called function in the parent component.

# Lifting State in React

The process of moving state from one component to another is called lifting state.

> Rule of thumb: Always manage state at component level where every component that's interested
> in it is one that either manages the state.

# Lifting State donw

TODO: Read [Lifting state down](https://www.robinwieruch.de/react-lift-state/)

# React Controlled components

HTML elemetns come with their internal state which is not coupled to React.

TODO: Read [controlled components in React](https://www.robinwieruch.de/react-controlled-components/)

# React side-effects

A component returned output is define dby its props and state. Side-effects can affect this
output too, because they are used to interact with thrid-party APIs (e.g. browser's localstorage).
, with HTML elemtns for width and height measurements, or widht build-in JS functions such as
timer or interval.

```jsx
const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    localStorage.setItem('search', event.target.value);
};
```

The feature is complete, but there is one bug.
BUG: The handler function should mostly be concerned wiht updating the state, but it has a 
side-effect now. If we use the `setSearchTerm` state updater function somewhere else in our
application, we break teh feature because the localstorage doesn't get updated.
Let's fix this by handling the side-effect at a centralized place and not in specific handler.

We'll use **React's useEffect Hook** to trigger the desired side-effect each time the `searchTerm` changes.

React's useEffect Hook takes 2 arguments

The 1st argument is a function that runs our side-effect. In our case, the side-effect stores
`searchTerm` into the browser's local storage.

The 2nd argument is a dependency array of variables. If one of these variable changes, the
function for the side-effect is called.

Leaving out the second array (the dependency array) would make the function for the side-effect
run on every render (initial render and upate renders) of the component.

If the dependency array is an empty array, the function for the side-effect is only called once
when the component render for the first time

Using useEffect Hook instead of managing the side-effect in the event handler has made the
application more robust.

# How to fetch data with React Hooks

## Loading Indicator with React Hooks

The loading flag is used to render a loading indicator in the App component

## Error Handling with React Hooks

What about error handling for data fetching with a React hook?
The error is just another state. Once there is an error state, the App component can render 
feedback for the user. When using async/await, it is common to use try/catch blocks for error
handling.

## Data Fetching with Custom Hook

In order to extract a custom hook for data fetching, move everything that belongs to the data
fetching to its own function, also called custom hook. Also make sure you return all the
necessary variables for the function that are used in the App component.

# React Custom Hooks (Advanced)

A custom react hook is a function that uses other hooks to encapsulate stateful logic.

This custom hook allows us to use it the same the way build-hook in React.
It returns a state and a state updater function and accepts an intial state as argument.

# React Fragments

You may have noticed that lal of our React components reutrn JSX with one-top level HTML element.

# Reusable React Component

Have a closer look at the Seach component: Every implementation detail is tied to the search
feature. However, internally the component is only a label and an input, so why should it be
tied so strictly to one domain ?
Being tied to one feature makes a component less reusable for the rest of the application.
In this case, the Search component cannot be used for non-serach-related tasks.

In addition, the Search component risks introducing bugs, because if two of these Search
components are rendered on the same page, their htmlFor/id combinition is duplicated and
therefore breaking the focus when one of the labels is clicked by the user. Let's fix these
underlying issues by making the Search component reusable.

# React Component Composition

Essentially a React application is a bunch of react componets arranged in the shaped of a tree.
When you learnd about initializng compoents as elements in JSX, you have seen how they are used 
like any other HTML element in JSX.

Sometimes when using a React component, you want to have more

TODO: Read [text](https://www.robinwieruch.de/react-component-composition/)

# Imperative React

React is declarative. When you implement JSX, you tell React what elements you want to see,
not how t create these elements.

When you implement a hook for state, you tell React what you want to manage as a stateful value
and not how to manage it.
And then you implement an event handler, you do not have to assign a listener imperatively.

However, there are cases when we will not want everything to be declarative. For example,
sometimes you want to have imperative access to rendred elements, most often as side-effect,
in cases such as these:

- read/write access to elements via the DOM API:
    - measuring (read) an element's width or height
    - setting (write) an input field's focus state
- implementation of more complext animations:
    - setting transitions
    - orchestrating transitions
- integration of third-party libraries

Because imperative programming in React is often verbose, 

# Add an item to a list in React

We need to make the list stateful by making use of React's state and useState hook.

Rather than mutating the list, we keep it as an immutable data structure and therefore
create a new list based on the old list and the new item.

# How to useReducer in React

There are two hooks that are used for modern state management in React:
- useState
- useReducer

## JS Reducer

A reducer is a function which takes two arguments - the current state and an action - and
returns based on both arguments a new state.

```js
(state, action) => newState

function counterReducer(state, action) {
    return state + 1;
}
```

The reducer function is a pure function  without any side-effects.
This make reducer functions the perfect fit for reasoning about state changes.

The `action` is normally defined as an object with a `type` property.
Based on the type of the action, the reducer can perform conditional state transitions.

```js
function counterReducer(count, action) {
    if (acount.type === "INCREMENT") {
        return count + 1
    }

    if (action.type == "DECREMENT") {
        return count - 1;
    }

    return count;
}
```

You will handle more complext data type than primative.

```js
function counterReduder (state, action) {
    switch (action.type) {
        case "INCREMENT":
            return {...state, count: state.count + 1};
        case "DECREMENT":
            return {...state, count: state.count - 1};
        default:
            return state;
    }
}
```

Two important things:
- The state processed by a reducer function is immutable. The reducer function always returns
a new state object.
- We can use teh JS spread operator to create a new state object from immutable state.


# React Asynchornous Data

We have two interactions in our app:
- Searching the list
- Remove items from the list

Usulaly, data from a remote backedn/database arrives asynchronously for client-side applications like React.

This it's often the case that we must render. Thus it's often the case we must render a component before we can initiate the data fetching.

In the App component, instead of using teh initialStories, use an empty array for the initial
state.

We want to start with an empty list fo stories and simulate fetching these stories aynchronously.
In a new `useEffect` hook, call the function and resolve the returned promise as a side-effect. The side-effect only runs once the component renders for the first time.

Even though the data shold arrive async when we start the application, it apperas to arrive
sync, because it's rendered immediately.

Intead of having the data tehre from the beginning, we resolved the data asynchronously from 
a promise.

# React Conditional Rendering 

In real application, a user would see some kind of feedback (e.g. loading spinner) when data
gets loaded. We want to cimplment such feedback.

Task: It takes some time to load the sample data from the promise. During this time, a user
should be presented with a loading indicator (e.g. text wich says "Loading...").
Once the data arrived asynchronously, hide the loaidng indicator.

# React Advanced State

A reduer action is always associated with a `type` and as a best practice with a `payload`.
If the `type` matches a condition in the reducer, reutrn a new state based on incoming state and action.
If it isn't covered by the reduer, throw an error to remind yourself that the implementtation
isn't covered.

```jsx
const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    []
  );
```

The new dispatch function can be used instead of the `setStories` function.
Instead of setting the state explicitly with the state updater function from `useState`.
The `useReducer` state updater function sets the state implicitly by dispatching an action for the reducer.

# React Impossible States

You've noticed disconected between the single states in the App component when using multiples states.
All states related to the asychronous data belong tegether.

There is nothing woring with multiple `useState` hooks in one React component. Be wary once you see multiple state updater function in a row.
However, there condition states can lead to impossible states and undersierd behavior in the UI.

The impossible state happens when an error occurs for the asynchronous data.L


# Data Fetching with react

We set everything up for asynchronous data fetching React.
However, we are still using pseudo data comming from a promise we setup ourselves for a
fake API.

# Data Re-Fetching in React

# Memoized Fucntions in React (Advanced)

Functions that are defined in a React componens are most of the time event handlers.

However, because a React component is just a function itself, you can declare functions,
function expressions, and arrow function expressions in a component too.

We will intorduce the concept of a memoized function by using React's useCallback Hook.

React's useEffect Hook. Instead of using the data fetching logic directly in the 
side-effect, we made it avaiable as a function for the entire application.

The benefit: reusability, the data fetchign can be used by other parts of the application
by calling this new function.

We have used React's useCallback Hook to wrap the extracted function.
React's useCallback creates a memoized function every time its dependency array changes.
As a result, the `useEffect` hook runs again, because it depends on the new function.

1. change: searchTern (cause: user interaction)
2. change: handleFetchStories
3. run: side-effect

If we didn't create a memoized function with React's useCallback Hook, 
a new handleFetchStories function would be created each time the App component re-renders,
and would be executed in the useEffect hook to fetch data.
The fetch data is then stored as state in the component.
Because the state of the component changed, the component re-redners and create a new
`handleFetchStories` function.
The side-effect would be triggered to fetch data, and we'd be stuck in an endless loop.

By moving the data fetching function outside the React's useEffect Hook, it becomes 
reusable for other parts of the application.

# Explicit Data Fetching with React

Re-fetching all data each time someone types in the input fields isn't optimal.
Since we're using a 3rd API to fetch the data. We will cahnge the implementation details from implicit to explicit data.

The application will refetch data only if someone clicks a confirmation button.

**Task:** The server-side search executes every time a user types into th einput field.
The new implementation should only execute a search when a user clicks a confirmation 
button. As long as the button is not clicked, the search tern can change but isn't 
executed as API request.