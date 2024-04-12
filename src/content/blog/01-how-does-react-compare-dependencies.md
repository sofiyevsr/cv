---
published: true
title: How does React compare hook dependencies?
author: Rasul Sofiyev
description: Confused by how React hooks work behind the scenes? This guide explains how they control when your app updates, making renders efficient!
image:
    url: ../assets/react-hooks.jpg
    alt: Image of React useEffect hook
    caption: Image by <a href="https://unsplash.com/photos/text-tvHtIGbbjMo?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash">Ferenc Almasi</a>
pubDate: 2022-08-12
tags: ["react", "hooks"]
---

# Introduction
Hooks are used widely since their release in React 16.8. Although it is very easy to use and create your own hooks, some builtin hooks won't work as intended if provided deps are incorrect. We will explore useEffect hook's dependencies parameter in this post. Here is simple example of the hook:
```typescript
useEffect(()=>{
  console.log(count);
}, [count])
```
# Problem
This effect will run when count changes. But what if dependency parameter is not a primitive type like array, object and etc. Let's start with example:
```typescript
const [person, setPerson] = useState({name: "John"});
useEffect(()=>{
  console.log(person.name);
}, [person])
return <button onClick={()=>{
  setPerson({name: "John"});
}}>change name<\button>
```
In this example when we click button we set person name to John again. Despite person's name is not changed, in this case effect will still run since person is a new object instance. This may be wanted behaviour but let's explore how we can skip the effect when person's name is same.

**Here is how react compares previous and next single dependency (this is an actual code i found in react repo):**
```typescript
/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x: any, y: any) {
  return (
    (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y) 
  );
}

const objectIs: (x: any, y: any) => boolean =
  typeof Object.is === 'function' ? Object.is : is;

export default objectIs;
```

# Conclusion
Since person.name is a primitive data type (string), "John" equals "John" always. So just changing [person] to [person.name] would suffice to skip effect. That's it. Thank you for reading.
