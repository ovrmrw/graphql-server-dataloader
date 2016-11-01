# graphql-server-dataloader
Featuring DataLoader power for GraphQL server.

---

## Setup
```
$ npm install
```

## Run
```
$ npm start
```

Open `http://localhost:3000/graphiql` on your browser.

## Run Query
Input a query in a textarea on the screen as below.

```
{
  user(id:"1") {
    id
    name
    age
    address {
      zip
      street
    }
    hobby {
      name
    }
    follow {
      id
      name
    }
  }
}
``` 
