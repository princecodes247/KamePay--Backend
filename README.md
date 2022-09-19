# Isabi API🛡️

## Development

We would use `node` version `14.9.0`

The first time, you will need to run

```
npm install
```

Then just start the server with

```
npm run start
```

It uses nodemon for livereloading :peace-fingers:

# API Validation

By using [celebrate](https://github.com/arb/celebrate), the req.body schema becomes cleary defined at route level, so even frontend devs can read what an API endpoint expects without needing to write documentation that can get outdated quickly.

```js
route.post(
  '/signup',
  celebrate({
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  controller.signup
);
```

**Example error**

```json
{
  "errors": {
    "message": "child \"email\" fails because [\"email\" is required]"
  }
}
```

[Read more about celebrate here](https://github.com/arb/celebrate) and [the Joi validation API](https://github.com/hapijs/joi/blob/v15.0.1/API.md)

# Setup

- [ ] Error Handling
- [ ] Change Authentication to HTTP-only cookies
- [ ] Unit tests examples
- [x] Setup Events
- [x] Basic Service setup
- [x] Basic Controller setup
- [x] CRUD service class to extend with Pagination functionality
- [ ] Decide route name convention
- [ ] Create models array
- [ ] Rewrite Subscribers
- [ ] Add agenda dashboard
- [ ] Continuous integration with CircleCI 😍
- [ ] Deploys script and docs for Heroku, Render
- [ ] Integration test with newman 😉

# Roadmap

- [ ] Setup
- [ ] Create user services and accompanying tests
- [ ] Create game service
- [x]

## API Documentation

Postman would be used for the API Documentation. I'll search for an integration and implement it

'no-underscore-dangle': ['error', { allow: ['_place'] }],s
