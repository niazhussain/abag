# AB AG

Is a crypto currency convertor with a list of crypto currencies rates.

### Additional features

- Sorting of crypto currencies list
- Favorite crypto currencies
- GDPR ready

### Tech

This project uses a number of open source projects to work properly:

- Next.JS - SSR framework based on React.JS
- Styled Components - CSS-in-JS
- MaterialUI - UI framework
- FinalForm - for validation

### Some good news about architecture

- MVC
- Redux with redux-thunk
- Atomic structure of visual components
- TypeScript

### Installation

This project requires [Node.js](https://nodejs.org/) v10+ to run.

```sh
$ cd abag
$ npm i
$ npm run dev
```

For production environments:

```sh
$ docker image build -t abag .
$ docker run -p 3000:80 -d abag
```
