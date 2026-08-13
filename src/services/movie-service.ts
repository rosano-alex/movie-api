import { movieCatalog } from "../data/movies";
import type { MovieRail } from "../models/movie";

const railAliases: Record<string, string> = {
  harrypottery: "potter",
  jamesbond: "bond",
  marvel: "marvel"
};

export class MovieService {
  getRails(): MovieRail[] {
    return movieCatalog.rails;
  }

  getRail(railName: string): MovieRail | undefined {
    const railId = railAliases[railName];
    return movieCatalog.rails.find((rail) => rail.id === railId);
  }
}
