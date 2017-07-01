# feathers-test

> test feathers app

Customization:
1. ```$feathers generate app```

* [x] remove user email from package.json
* [x] add eslint-airBnB config & update lint script & add eslint files
* [x] add nodemon & update start script & add nodemon config ignore file
* [x] add feathers-authentication
* [x] add feathers-mongodb (still has promises)

> replace winston with Bunyan?

> add feathers-client, feathers-authentication-client?

> with Vue see https://github.com/feathersjs/feathers-chat-vuex

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/feathers-test; npm install
    ```

3. Start your app

    ```
    npm start
    ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g feathers-cli             # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers generate model                 # Generate a new Model
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

## Changelog

__0.1.0__

- Initial release

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
