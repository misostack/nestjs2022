# NestJS 2022

## Dev

```bash
cp .env.sample .env
yarn typeorm migration:show
yarn typeorm migration:run
```

### Migration commands

```bash
yarn typeorm migration:show
yarn typeorm migration:generate -n AnyName
yarn typeorm migration:run
yarn typeorm migration:revert
```

## Debug

```bash
yarn start:debug
# run vscode debug
```

# A.Core

- MVC: Database Connection, Model, Controller, View
  **Start DB**

```bash
docker-compose up -d
```

- [x] Database Connection
- [ ] Model : Insert
- [ ] Controller
- [ ] View

## B. Built-in Tools

...

## C. Built-in Solutions

...

# NestJS Courses

## Newbie

1. Fundamentals
2. Advanced

## Mid Level

1. Built-in tools
2. Built-in solution

## Senior

1. Performance
2. Security

## Lead

1. Architecture
2. Workflow
3. Micro services
