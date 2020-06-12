/**
 * This function maps a given route to itself, if it is the same or
 * starts with a route from a given list or else to false.
 * This is needed because of the TabBar, that has Tabs
 * for only some of possible routes of the application.
 *
 * If e.g. the only routes that are defined within the TabBar are
 * "/foo" and "/bar" and the current route is "/" than a error
 * is thrown, that the value "/" is illegal within the TabBar.
 *
 *
 * @param route The current route.
 * @param routes exact: routes that should be same as route
 *               prefix: routes that are just prefix of route
 * @returns The input path, if valid, else false
 */
export function mapRoute(
  route: string,
  routes: {
    exact?: string | Array<string> | undefined;
    prefix?: string | Array<string> | undefined;
  }
): string | boolean {
  let res: string | boolean = false;

  // check if route matches any of routes.exact
  let exact: Array<string> | undefined =
    typeof routes.exact === "string" ? [routes.exact] : routes.exact;
  res = exact?.map((r) => route === r).some((b) => b === true) ? route : res;

  // check if route starts with any of routes.prefix
  let prefix: Array<string> | undefined =
    typeof routes.prefix === "string" ? [routes.prefix] : routes.prefix;
  res =
    !res && prefix?.map((r) => route.startsWith(r)).some((b) => b === true)
      ? route
      : res;

  // returns route if one of the two statements above succeeded else false
  return res;
}
