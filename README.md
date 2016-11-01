# graphql-server-dataloader
Featuring DataLoader power for GraphQL server.

[Demo on Azure Web Apps](https://graphql-server-dataloader.azurewebsites.net/graphiql)

[Demo with a sample query](https://graphql-server-dataloader.azurewebsites.net/graphiql?query=%7B%0A%20%20user(id%3A%221%22)%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%20%20address%20%7B%0A%20%20%20%20%20%20zip%0A%20%20%20%20%20%20street%0A%20%20%20%20%7D%0A%20%20%20%20hobby%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20follow%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20follow%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D)

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
