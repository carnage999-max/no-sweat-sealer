# No Sweat® — Video Briefs

Text-to-video prompts for the three silent background loops used by the redesign.
Each one is wired by filename: drop the files into `public/video/` and rebuild.
No code change is needed, and nothing 404s before they exist (the page checks the
filesystem and falls back to the poster / still image).

| Page | File (in `public/video/`) | Role |
| --- | --- | --- |
| Home hero | `home-hero.mp4` (+ `.webm`, `-poster.jpg`) | Cinematic treated-vs-untreated cold cup |
| Commercial | `commercial-hero.mp4` (+ `.webm`, `-poster.jpg`) | Café / bar service line, "Built for more than one cup" |
| How It Works | `how-it-works.mp4` (+ `.webm`, `-poster.jpg`) | PREP → APPLY → CURE application sequence |

## Read this first: what these videos are, and are not

These are **illustrations, not evidence.** The build spec is explicit: simulated visuals
must never be presented as proof, and prototype testing has shown condensation can still
occur under some conditions. So:

- The treated cup must look **visibly less wet, not magically spotless.** Every prompt
  below asks for a few small, sparse leftover beads on the treated side. That is both more
  honest and more believable.
- No video here may be placed on the Testing page. That page uses real, matched-condition
  test footage only.
- Generate **no text, labels, logos or packaging artwork** in any video. Video models garble
  lettering, and all wordmarks are live HTML on the page.

## Shared look (all three)

- Palette: near-black graphite (`#05080D`→`#0B1118`), ice white highlights (`#EAF6FB`),
  one electric-cyan accent (`#1CC8F5`) used as rim light / edge glow. Brushed-silver
  reflections are fine; no other hue.
- Premium product-launch feel: crisp, cold, confident. Think material-science launch film,
  not hardware-store spray commercial.
- 24 fps, shallow depth of field, fine film grain, minimal bloom, **slow** camera only.
- Everything sits in the **right 55 %** of the frame (home + commercial) so the left side
  stays dark and quiet for the headline. The video plays at roughly 55–70 % opacity under a
  gradient, so keep it dark and low-contrast; never blow out the highlights.

## Technical delivery (all three)

- 1920×1080 (a 2560×1440 master is better), H.264 MP4 **and** VP9 WebM, **no audio track**,
  8–10 s seamless loop, ≤ 4 MB each after compression.
- Hold the first and last 12 frames visually identical; cross-dissolve the tail into the
  head over ~0.5 s if the generator drifts.
- Encode:
  - `ffmpeg -i master.mov -vf scale=1920:-2 -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart -an public/video/<name>.mp4`
  - `ffmpeg -i master.mov -vf scale=1920:-2 -c:v libvpx-vp9 -crf 34 -b:v 0 -an public/video/<name>.webm`
  - Poster: `ffmpeg -i public/video/<name>.mp4 -frames:v 1 -q:v 3 public/video/<name>-poster.jpg`

---

## 1 · `home-hero` — "The End of Cup Sweat."

**Used on:** `/` hero, full viewport, behind the headline. Poster doubles as the social image.

### Prompt

> A cinematic, photoreal macro product film shot in a dark graphite studio. Two identical
> clear plastic iced-coffee cups, filled with cold brew and ice, stand side by side on a
> dark wet-looking stone surface, slightly angled toward camera, positioned in the right
> half of the frame. The left half of the frame is deep soft-focus darkness with faint cool
> bokeh.
>
> The LEFT cup is untreated: its outer wall is covered in dense, glittering condensation —
> hundreds of fine beads that slowly merge into larger drops and begin to run in glossy
> vertical streaks; one heavy drop slides down and gathers into a small spreading pool and
> ring on the counter beneath it.
>
> The RIGHT cup is treated: its outer wall is noticeably clearer and drier, with only a
> handful of tiny, widely spaced beads and no running streaks and no pool at its base. It
> reads as dramatically less wet, but not unnaturally perfect — a few small isolated beads
> remain.
>
> A thin electric-cyan rim light from behind and to the right traces the edge of both cups
> and glints along the droplets. Cold mist drifts faintly across the floor of the frame.
> Ice cubes shift very slightly inside the cups.
>
> Camera: a slow, smooth lateral dolly of a few percent combined with a gentle rack focus
> that drifts from the wet cup to the dry cup and settles on the dry one. Nothing cuts,
> flashes or whips. Colour grade: near-black graphite, ice-white highlights, one cyan
> accent, minimal bloom, fine grain, 24 fps, shallow depth of field.

### Negative prompt

> text, letters, numerals, logos, labels, watermarks, brand names, packaging, people, faces,
> hands, bottles, spray, UI overlays, subtitles, perfectly spotless glass, cartoon, CGI look,
> neon sci-fi, lens flares, explosions, purple, magenta, orange, green, warm colour cast,
> fast camera motion, whip pan, shaky cam, motion blur streaks, glitch, low resolution

---

## 2 · `commercial-hero` — "Built for more than one cup."

**Used on:** `/commercial` hero, and the commercial block on the home page.

### Prompt

> A cinematic, photoreal film of a busy-but-calm café and cocktail-bar service pass at
> night, shot low and wide in a dark graphite interior. A long row of identical clear
> plastic iced drinks — iced coffees, iced teas and cold cocktails with ice and garnish —
> lines a polished black stone service counter that recedes diagonally away from camera
> through the right half of the frame. The left half is deep, soft, near-black out-of-focus
> space with a few faint warm bokeh lights.
>
> Every cup in the row shows clean, clear sides with only the occasional tiny bead of
> condensation, and the stone around them is dry and glossy — no water rings, no puddles.
> A single pair of hands (no faces) enters from the right, lifts one cup, and slides it
> forward along the pass; the counter where it stood is clean and dry.
>
> Thin electric-cyan edge light from a strip fixture behind the counter runs along the rim
> of the cups. A few cool-white highlights glint on the ice.
>
> Camera: a slow, steady dolly tracking left-to-right along the row, a few percent only,
> shallow depth of field, focus sliding gently down the line of cups. No cuts, no flashes.
> Colour grade: near-black graphite with cool silver reflections, ice-white highlights,
> a single cyan accent and tiny warm bokeh accents. Fine grain, minimal bloom, 24 fps.

### Negative prompt

> text, signage, menus, logos, brand names, cup branding, faces, uniforms with logos,
> crowds, puddles, water rings, wet counter, spilled drinks, steam, cartoon, CGI look,
> neon sci-fi, lens flares, purple, magenta, green, orange glare, fast camera motion,
> whip pan, shaky cam, glitch, low resolution

---

## 3 · `how-it-works` — PREP → APPLY → CURE

**Used on:** `/how-it-works` header and the three-stage section on the home page.

This one is an **instructional beat sequence** rather than a mood loop, so it carries three
clear moments. It must also model the product's real handling guidance (from the Safety
Data Sheet): spray the **outside** of the cup only, in a well-ventilated space, never
toward a face or the inside of a drinking vessel.

### Prompt

> A calm, photoreal macro product film of a simple three-step routine in a bright-but-moody
> graphite workspace beside an open window, cool daylight raking across a clean dark
> surface. One clear plastic cup stands empty and upright on the surface in the right half
> of the frame; the left half is soft, dark, uncluttered space.
>
> 0:00–0:03 — PREP. A bare hand wipes the OUTSIDE wall of the cup with a lint-free white
> cloth in one slow downward stroke, leaving the plastic bright and clean. Macro detail on
> the cloth and the clean surface.
>
> 0:03–0:07 — APPLY. A plain, unbranded clear fine-mist trigger spray bottle enters from the
> right, held about eight inches from the cup, and makes one smooth, even pass over the
> OUTSIDE of the cup. A fine, soft mist hangs in the light, picked out by a thin cyan rim
> light, and settles as a faint even sheen on the cup wall. The spray is aimed only at the
> cup's outer surface, away from the camera.
>
> 0:07–0:10 — CURE. The bottle withdraws. The cup rests alone. The wet sheen on its outside
> settles and clears to a clean, transparent finish while a few cold-light glints slide
> across it. End on a still, centred, clean hero shot of the cup that is easy to loop back
> to the empty-cup start.
>
> Camera: slow macro push-in of a few percent, steady, no shake. Colour grade: graphite,
> ice-white, one cyan accent. Fine grain, 24 fps, shallow depth of field.

### Negative prompt

> text, letters, numerals, logos, labels, branded bottle, packaging, faces, spray toward the
> camera or a person, spraying inside the cup, drinking, food, steam, fire, chemicals
> warning symbols, cartoon, CGI look, neon sci-fi, lens flares, purple, magenta, green,
> orange, fast camera motion, whip pan, shaky cam, glitch, low resolution

---

## Still images worth generating while you're at it

The redesign leans on photography. These are not videos, but the site is noticeably
stronger with them and they are in the spec's asset list:

1. **Product bottle set** — clear 4 oz spray bottle, 16 oz refill bottle and 1-gallon jug on
   a dark graphite surface, cyan rim light, blank labels (the label art is added from the
   real packaging file). Front, three-quarter and grouped views.
2. **Application close-up** — a hand spraying the *outside* of a clean cup, macro.
3. **Matched test photos** — these must be **real photographs** of your actual control and
   treated cups at 0 / 10 / 20 / 30 minutes under identical conditions. Do not generate
   them. They power the before/after slider and the Testing page.
