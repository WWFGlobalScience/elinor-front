# Elinor Frontend

## Prerequisites

- **Node.js 16** (specified in `.nvmrc`)
- **Yarn** package manager
- **NVM** (recommended for Node version management)

## Initial Setup

### 1. Use correct Node version

```bash
nvm use
```

This pulls the Node version from the `.nvmrc` file.

**Important:** Each new terminal session requires running `nvm use` again, as NVM settings are per-shell-session.

### 2. Configure environment variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

The `.env` file contains the API base URL:

```
BASE_URL_API="http://0.0.0.0:8082"
```

**Environment options:**
- **Local development** (with elinor-api running locally): `http://0.0.0.0:8082`
- **Remote dev API**: `https://dev-api.elinordata.org`

### 3. Install dependencies

```bash
yarn install
```

### 4. Generate translation files

```bash
yarn generate:translations
```

## Development Commands

```bash
# serve with hot reload at localhost:3000
yarn dev

# build for production and launch server
yarn build
yarn start

# generate static project
yarn generate

# regenerate translation files (after updating locales)
yarn generate:translations
```

## Troubleshooting

### "Invalid URL" error when running `yarn dev`

This means the `.env` file is missing. Create one using:
```bash
cp .env.example .env
```

### "ERR_OSSL_EVP_UNSUPPORTED" error

This indicates you're using the wrong Node.js version. Ensure you're using Node 16:
```bash
nvm use
node --version  # Should show v16.x.x
```

### "Module not found: ../../locales/en/translations.json"

Translation files haven't been generated. Run:
```bash
yarn generate:translations
```

### Dev server uses wrong Node version

Each terminal session needs to activate the correct Node version:
```bash
source ~/.nvm/nvm.sh && nvm use && yarn dev
```

## Additional Information

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

This project uses Prettier for autoformatting and Husky 3 (an older version to match the current Node version). Prettier will run pre-commit. It is optional, but recommended that an IDE extension such as [this one](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) is used to run Prettier when files are saved.
