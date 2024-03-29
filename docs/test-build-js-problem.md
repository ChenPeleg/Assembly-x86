# Test js problem

I get this error when I try to run tests on the project:

```bash
Error: Module build failed (from ./node_modules/@ngtools/webpack/src/ivy/index.js): Error: Emit
```

Haven't found a solution yet.

There is this but all of these are not working:
https://stackoverflow.com/questions/73716279/error-module-build-failed-from-node-modules-ngtools-webpack-src-ivy-index-j


## Workaround solution

added this to the `tsconfig.spec.json`:

```json
{
  "angularCompilerOptions": {
    "allowJs": false
  }
}
```


This is not good but at least I've got the tests running.

