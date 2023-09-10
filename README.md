# Module Federation

## How to use

Run the following commands in the root directory.

```bash
yarn
yarn start
```

Both `app1` and `app2` are independently deployed apps:

- `app1`: http://localhost:3001
- `app2`: http://localhost:3002

Check out this link below for more examples:

[https://github.com/module-federation/module-federation-examples](https://github.com/module-federation/module-federation-examples)

## TODO
### 热更新
app2改动了，app1里面没有更新(live reload)