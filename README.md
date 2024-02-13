# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [How to start](#how-to-start)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)

## Overview

### How to start

To start the project, you need to install the dependencies with the command `yarn` or `npm install` and You can also start the fake API with the command `yarn api` or `npm run api`. The fake API will start on the port 5000. After that, you can start the project with the command `yarn start` or `npm start`. The project will start on the port 3000.


### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

### Screenshot

![](./screenshot.jpg)

### Links

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [TailwindCSS](https://tailwindcss.com/) - For styles
- [shadcn/ui](https://ui.shadcn.com/) - For Components UI
- [TanStack Query](https://tanstack.com/query/latest) - For state management
- [date-fns](https://date-fns.org/) - For date formatting
- [json-server](https://www.npmjs.com/package/json-server) - For fake API
- [react-use](https://github.com/streamich/react-use) - For hooks

### What I learned

I learned how to use the `useQuery` and `useMutation` hooks from TanStack Query, and also how to use the `useMedia` hook from `react-use` to verify media query and add styles for media specify. I also learned how to use the `json-server` to create a fake API for the project. also learned how to use the `date-fns` to format the date. and how to use shadcn/ui to create a beautiful UI.

### Continued development

I want to continue learning about the use of the `useQuery` and `useMutation` hooks from TanStack Query, and also the use some editor WYSIWYG for the comment and reply input. i also want to learn testing my application with vitest and React Testing Library.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [Talvez você não precise de estados globais no React (HTTP State)](https://youtu.be/Q-206WRzOHQ?si=jboWPjBWEUihP_jB) - This helped me for understanding how to use the `useQuery` and `useMutation` hooks from TanStack Query. I'd recommend it to anyone still learning this concept.
- [PARE de usar o useEffect para fazer API calls! React Query + Next.js](https://youtu.be/whCL2lPYF4U?si=ZscJkAePIxn2D_iX) - This is an amazing article which helped me finally understand how to use TanStack Query. I'd recommend it to anyone still learning this concept.
