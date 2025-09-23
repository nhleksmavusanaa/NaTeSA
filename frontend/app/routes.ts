import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),             // Home page (/)
  route("about", "routes/about.tsx"),   // /about
  route("login", "routes/login.tsx"),   // /login
  //route("register", "routes/register.tsx"), // /register
//  route("dashboard", "routes/dashboard.tsx"), // /dashboard nhlanhla
] satisfies RouteConfig;
