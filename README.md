## Site de vendas com carrinho - com REDUX-TOOLKIT

Esse projeto foi desenvolvido como uma melhoria e atualização [desse projeto](https://github.com/emersonsdo/cheng-shoes).

O objetivo principal foi utilizar o [Redux Toolkit](https://redux-toolkit.js.org/) para implementar o
padrão Flux, incluindo as chamadas assíncronas.

Como resultado, a diferença de complexidade na implementação é muito significativa, tanto na implementação dos
reducers quanto na utilização pelas páginas e componentes da aplicação, sendo muito mais simples e
de fácil leitura com a utilização do Redux Toolkit.

Além disso estamos iniciando nosso `json-server` de forma concorrente à aplicação, sendo necessário apenas um comando, com o uso do [concurrently](https://www.npmjs.com/package/concurrently).

Ainda falta:

* Conectar com Reactotron
* Rever códigos que podem ser refatorados (sempre)
