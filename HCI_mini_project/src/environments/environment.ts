// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  search: 'https://api.spoonacular.com/recipes/complexSearch?apiKey=b5252b739ed84dfb84169fb66bb47054',
  apiKey: 'b5252b739ed84dfb84169fb66bb47054',
  // search: 'https://api.spoonacular.com/recipes/complexSearch?apiKey=fe37b2859c8942f98d35e806efe0b3dd',
  // apiKey: 'fe37b2859c8942f98d35e806efe0b3dd',
  apiHost: 'https://api.spoonacular.com/recipes/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
