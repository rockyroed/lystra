## Getting Started

1. **Install dependencies** using your preferred package manager (e.g., `pnpm install`).
2. Make your changes in a new branch with a descriptive name.

## Commit Message Guidelines

We use [commitlint](https://github.com/conventional-changelog/commitlint) to enforce [Conventional Commits](https://www.conventionalcommits.org/). Your commit messages must follow this format:

```
<type>: <short description>

<body> (optional)
```

### Allowed Commit Types

- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding or correcting tests
- chore: Other changes that don't modify src or test files

**Examples:**

```
feat: add user login page
fix: correct typo in results page
docs: update README with setup instructions
```

**Rules:**

- The type must be one of the allowed types above (lowercase).
- The type cannot be empty.
- The description should be concise and in lower case.

## Pre-commit Checks

We use [lint-staged](https://github.com/okonet/lint-staged) and [husky](https://github.com/typicode/husky) to run checks before each commit:

- **JavaScript, TypeScript, and Vue files (`*.js, *.ts, *.vue`):**
  - Automatically formatted with Prettier
  - Linted and auto-fixed with ESLint
- **JSON, Markdown, YAML files (`*.json, *.md, *.yml, *.yaml`):**
  - Automatically formatted with Prettier

These checks run automatically when you commit. Please ensure all files are linted and formatted before pushing.

## Linting and Formatting

- Run `pnpm lint` to check for lint errors.
- Run `pnpm lint:fix` to automatically fix lint errors.
- Run `pnpm prettier:check` to check formatting.
- Run `pnpm prettier:write` to format all files.

## Build

- Run `pnpm build` to check if build has no errors.

## Submitting a Pull Request

1. Ensure your branch is up to date with `main`.
2. Make sure all checks pass locally.
3. Submit a pull request with a clear description of your changes.
4. Reference any related issues in your PR description.
