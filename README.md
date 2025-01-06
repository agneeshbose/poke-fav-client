# Introduction

This is the frontend codebase for a react js based single page application having features to view a list of pokeman species, preview their attributes and mark those you like as favourite.

# Approach

A simple website containing only the landing page. Since having a huge list of pokeman to find favourites from, a side to side view of the list and preview card is given, since having a popup on each preview might increase the number of clicks and effort hindering smooth navigation. A graphical image and associated attributes are presented in a tabular nature for better readability.

## Technical details

**State management**: Considering the scale of the application, React context is used to manage application wide state and the useState hook is employed to manage individual component states.
**API integration**: Axios handles HTTP requests throughout the app, with custom hooks created to facilitate API interactions
**Styling**: Component-level CSS files are used for styling, providing a simple, scoped, and maintainable approach to UI design.
**Bulid tool**: Vite was chosen as the build tool for its fast and efficient development experience, providing instant module hot reloading (faster than webpack) and optimized build performance through native ES module support.

## How to run the app

1.  Clone the repository to your local machine
2.  Install the dependencies using `npm install`
3.  Update `VITE_API_BASE_URL` in the `.env.development` file to the backend url where you are running`poke-fav-api` express app.
4.  Run `npm run dev` to start the app locally.

## Cloud instance

The app is currently deployed in vercel and is available to access at https://poke-fav-client-git-main-agneesh-boses-projects.vercel.app/
