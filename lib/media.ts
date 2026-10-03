import { existsSync } from "node:fs";
import path from "node:path";

export type VideoMedia = {
  sources: { src: string; type: string }[];
  poster?: string;
};

const FORMATS = [
  { ext: "webm", type: "video/webm" },
  { ext: "mp4", type: "video/mp4" },
];

/**
 * Resolves a background loop from public/video/<name>.(webm|mp4) at render
 * time. Returns null until the file exists, so pages never emit a <video> (or
 * a poster) that 404s. Drop the files in, rebuild, and the page picks them up.
 */
export function resolveVideo(name: string): VideoMedia | null {
  const dir = path.join(process.cwd(), "public", "video");
  const sources = FORMATS.filter(({ ext }) => existsSync(path.join(dir, `${name}.${ext}`))).map(
    ({ ext, type }) => ({ src: `/video/${name}.${ext}`, type }),
  );
  if (sources.length === 0) return null;

  const poster = `${name}-poster.jpg`;
  return {
    sources,
    poster: existsSync(path.join(dir, poster)) ? `/video/${poster}` : undefined,
  };
}
