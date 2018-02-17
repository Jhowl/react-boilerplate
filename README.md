# iMasters UI
Componentes de UI utilizados no projeto iMasters.

Este projeto utiliza as seguintes tecnologias:

- SASS como pre-processador css
- Eslint para padrões de código
- Storybook para visualização dos componentes

## Desenvolvimento

- Rode `yarn dev`, `yarn serve` ou `yarn start` para desenvolver utilizando o storybook na porta `http://localhost:9002`
- Rode `yarn build` para gerar o build de produção (os arquivos serão gerados no diretório `dist`)

## Scripts

- `yarn dev (or npm run dev)`: Inicia o desenvolvimento no storybook
- `yarn build (or npm run build)`: Gera o build de produção
- `yarn build:analyzer (or npm run build:analyzer)`: Gera o build de produção e abre o bundle analyzer na porta `8888`
- `yarn storybook (or npm run storybook)`: Roda o Storybook na porta `9002`
- `yarn build-storybook`: Gera o build estático do Storybook
- `yarn start (or npm start)`: Script especial reservado para rodar o código de procução. Altere como quiser. Por agora, ele é o mesmo que `yarn dev`.

