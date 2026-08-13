import { handleMovieRoute } from "./routes/movie-routes";
import { json, preflight } from "./utils/response";

export default {
  fetch(request: Request): Response {
    if (request.method === "OPTIONS") {
      return preflight();
    }

    const { pathname } = new URL(request.url);

    if (pathname === "/") {
      return json({ status: "ok", service: "movie-api" });
    }

    return handleMovieRoute(pathname) ?? json({ error: "Not found" }, { status: 404 });
  }
} satisfies ExportedHandler;
