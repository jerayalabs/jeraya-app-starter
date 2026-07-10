# Collection Schemas

Defined in `src/collections/` and registered in `src/jeraya.config.ts`.


## Build Config

File: `src/jeraya.config.ts`:
```ts
export default buildConfig({
  collections: [], // register the collections here
  webapps: {}
})
```

**Note:** These collection definitions use `defineCollection` from `@jeraya/sdk`. However, they are currently **not wired** into the runtime app.
This collectoin folder used only by creating tables schema. and not used in the frontend.