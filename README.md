# Dashgo

![Imagem inicial da aplicação](/public/inicio.png)
![Dashboard da aplicação](/public/dashboard.png)
![Lista de usuários](/public/userlist.png)
![Formulário de usuário](/public/formuser.png)

## Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- React
- TypeScript
- Chakra UI
- React Query
- React Hook Form
- Yup
- Cookies
- Mirage JS

## Como executar

Clone o projeto e acesse a pasta do mesmo.

```
$ git clone https://github.com/gugavillar/dashgo
$ cd dashgo
```

Para iniciá-lo, siga os passos abaixo:

```
# Instalar as dependências
$ yarn

# Iniciar o projeto
$ yarn dev
```

O app estará disponível no seu browser pelo endereço http://localhost:3000.

Para que todo o projeto funcione corretamente é preciso que baixe o projeto https://github.com/gugavillar/ignite-reactjs-auth-backend

## Como executar

Clone o projeto e acesse a pasta do mesmo.

```
$ git clone https://github.com/gugavillar/ignite-reactjs-auth-backend
$ cd ignite-reactjs-auth-backend
```

Para iniciá-lo, siga os passos abaixo:

```
# Instalar as dependências
$ yarn

# Iniciar o projeto
$ yarn dev
```

O servidor estará disponível pelo endereço http://localhost:3333. O servidor possui 2 usuários com a senha 123456.

- admin@dashgo.com
- user@dashgo.com

## 💻 Projeto

O Dashgo é um projeto de um painel administrativo.

As funcionalidades do projeto são:

- Efetuar login;
- Uso de token e refreshToken para verificar se o usuário ainda está logado;
- Listar usuários;
- Fazer a verificação de preenchimento de formulário com o uso do React Hook Form com o uso do Yup;
- Paginação de usuários com o uso do react query

Esse projeto tem como objetivo consolidar conhecimentos sobre:

- Uso da biblioteca ReactQuery;
- Uso da biblioteca React Hook Forms;
- Uso da biblioteca Chakra UI;
- Criação de um contexto para autenticação de usuário;
- Criação de componente de paginação;
  Entre outros

Esse foi um projeto realizado dentro do Ignite da Rocketseat.
