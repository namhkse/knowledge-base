# JavaScript Roadmap

# CLI Tools

## Vite

Vite is a build tool that starts a server and update the bowser as soon as you save a file.
Many React project use Vite to scaffold a new app and handle the build process for production. 

# Components

## Functional Components

Function components are JS functions.
These function may or maynot receive data as parameters (props).
A function components must return a component to render to the DOM tree.
They can have state which is managed using React hooks

## JSX

JSX is a syntax that lets you write HTML code insde JS files.

## Props vs State

Props get passed to the component.

Stage is manged wihtin the component.

## Conditional Rendering

Conditional rendering means showing different UI depending on a condition.
You can use if statements, tenary operators, logical AND.

## Composition

Composistion means building complex components by combining smaller, simpler components.

# Rendering

## Component Lifecycle

The component lifecycle describes the different stages of a component goes through.

created --> added to the page --> updated --> removed.

Use the hook `useEffect` to run logic in each stage.

`useEffect` examples:
- Fetching data, when a stage changes or a component is mounted.
- Subscribing to events.
- Clean up, use `[]` and return a callback insde a `useEffect`.

## Lists and Keys

Mapping over an array of dat and return a component for each item.
React needs a unique key for each item in the list.
Without keys, react re-redners list items incorrectly.

## Render Props

A render props is a pattern where a component takes a function as a prop and calls it to decide what to render.

## Refs

A way to access DOM nodes or React elements created in the render method.

## Events

React wraps native browser events in its won system called synthetic events.

## HOCs

A HOC is a function that take a component and reutrn a new component with extra behavior or props added.

# Hooks

Hooks are functions that let you use state, lifecycle behavior inside function components.
Hooks replace old class component features.
Every hook name start iwth "use".

## useState

`useState` is a hook that lets you add state to components.
`useState` return a state and a function to update state.
`useState` allows  components to store data between renders. 

## useEffect

`useEffect` is a hook that lets you run side effect.

`useEffect` only runs when
- The component changes.
- During the initial mount.
- During the unmount. 

## useCallBack

`useCallback` lets you keep the same function reference between renders.

It's the same thing like `useMemo` but for functions.

Reduce re-render child components.

## useMemo

`useMemo` is a hook that memorizes the result of a function. It is used to optimize performance by caching the 
result of a function and returning the cached result when the input function have not changed.

For example, a sum result can be cached in multiple renders instead calculated each time.