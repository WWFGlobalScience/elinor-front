# Elinor

## Build Setup

```bash
# Use correct Node version (optional, requires NVM). This pulls the Node version from the .nvmrc file.
$ nvm use

# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Configuration

### Offline Mode

The application supports an offline mode feature flag that defaults to enabled. This can be configured via environment variables.

**Environment Variable**: `OFFLINE_MODE`

- **Default**: `true` (enabled)
- **To disable**: Set `OFFLINE_MODE=false` in your `.env` file
- **Location**: Set in `.env`, `.env.local`, or `.env.staging` files

When offline mode is enabled:

- API calls are skipped to prevent network requests
- Cached data from localStorage (via vuex-persist) is used instead
- Offline functionality and UI elements are available

See `.env.example` for configuration examples.

## Development

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

This project uses Prettier for autoformatting and Husky 3 (an older version to match current the current Node version). Prettier will run pre-commit. It is optional, but recommended that an IDE extension such as [this one](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) is used to run Prettier when files are saved.

## DevOps

The project uses GitLab CI/CD for automated deployment. The pipeline includes stages for deployment, dependency installation, frontend building, and static site generation.

### Environment Variables

- **`BASE_URL_API`** (required): The base URL for the API endpoint. Used for API requests and fetching active languages during build.
- **`MAPBOX_ACCESS_TOKEN`** (optional): Mapbox access token for map functionality.
- **`$ENV`** (CI/CD): GitLab CI/CD variable containing the `.env` file content, which is written to the project directory during deployment.
