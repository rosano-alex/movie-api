import assert from "node:assert/strict";
import test from "node:test";

import worker from "../src/index";

function request(pathname: string): Request {
  return new Request(`https://movie-api.test${pathname}`);
}

test("the health endpoint identifies the movie API", async () => {
  const response = await worker.fetch(request("/"), {} as Env, {} as ExecutionContext);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok", service: "movie-api" });
});

test("the movies endpoint returns all rails", async () => {
  const response = await worker.fetch(request("/fetchRail/movies"), {} as Env, {} as ExecutionContext);
  const body = await response.json<{ rails: Array<{ id: string }> }>();

  assert.equal(response.status, 200);
  assert.deepEqual(body.rails.map((rail) => rail.id).sort(), ["bond", "marvel", "potter"]);
});

for (const [path, id] of [
  ["/fetchRail/movies/harrypottery", "potter"],
  ["/fetchRail/movies/jamesbond", "bond"],
  ["/fetchRail/movies/marvel", "marvel"]
] as const) {
  test(`${path} returns its requested rail`, async () => {
    const response = await worker.fetch(request(path), {} as Env, {} as ExecutionContext);
    const body = await response.json<{ id: string; movies: unknown[] }>();

    assert.equal(response.status, 200);
    assert.equal(body.id, id);
    assert.ok(body.movies.length > 0);
  });
}

test("unknown routes return JSON 404 responses", async () => {
  const response = await worker.fetch(request("/does-not-exist"), {} as Env, {} as ExecutionContext);

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: "Not found" });
});
