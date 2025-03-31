# Pokémon Explorer - Client

Frontend application for the Pokémon Explorer project. Built with React, TypeScript, Material UI, and Zustand.

## Environment Variables

The following environment variables can be configured in `.env` files:

### API Configuration

- `REACT_APP_API_URL` - Base URL for the API (default: `http://localhost:5000/api`)

### Pagination

- `REACT_APP_DEFAULT_PAGE_SIZE` - Number of Pokémon to load per page (default: `20`)
- `REACT_APP_MAX_PAGE_SIZE` - Maximum number of Pokémon that can be requested in a single API call (default: `50`)

### Feature Flags

- `REACT_APP_ENABLE_INFINITE_SCROLL` - Toggle infinite scrolling feature (default: `true`)

### Pokemon Configuration

- `REACT_APP_MAX_POKEMON_COUNT` - Maximum number of Pokémon to fetch in total (default: `150`)

## Environment Files

- `.env` - Default environment variables (development)
- `.env.production` - Production environment variables (used during `npm run build`)
- `.env.local` - Local overrides (not committed to repo)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

To learn more about environment variables in Create React App, see the [documentation](https://create-react-app.dev/docs/adding-custom-environment-variables/).
