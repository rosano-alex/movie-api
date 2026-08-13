import { MovieService } from "../services/movie-service";
import { json } from "../utils/response";

const movieService = new MovieService();

export function handleMovieRoute(pathname: string): Response | undefined {
  if (pathname === "/fetchRail/movies") {
    return json({ rails: movieService.getRails() });
  }

  const match = pathname.match(/^\/fetchRail\/movies\/(harrypottery|jamesbond|marvel)$/);
  if (match) {
    const rail = movieService.getRail(match[1]);
    return rail ? json(rail) : json({ error: "Rail not found" }, { status: 404 });
  }

  return undefined;
}
