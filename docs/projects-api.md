# Projects API contract (v1)

The website draws its project "network" from two sources:

- the local case-study modules in `src/lib/data/projects/*.ts`
- an optional remote endpoint that your system serves

Projects are merged by `slug`. When both sources have the same slug, the remote one wins.

## Enabling it

Set these in `.env`. Both are optional; without them the site uses local data only.

```
PROJECTS_API_URL=https://your-system.example.com/api/dakdot/projects
PROJECTS_API_TOKEN=optional-bearer-token
```

The website sends:

```
GET <PROJECTS_API_URL>
Accept: application/json
Authorization: Bearer <PROJECTS_API_TOKEN>   (only if set)
```

The request times out after 5 seconds. If the API fails or returns an unexpected shape, the site logs a warning and falls back to local data. It never breaks.

> **When new projects appear:** the homepage is prerendered, so the API is read at build time. To publish new projects, trigger a redeploy (for example a deploy hook your system calls after an edit).

## Response

The response must validate against [`projects-api.schema.json`](./projects-api.schema.json). Invalid records are dropped individually.

```json
{
	"version": 1,
	"projects": [
		{
			"slug": "acme-booking",
			"title": "Acme Booking Platform",
			"client": "Acme Ltd",
			"summary": "A booking and payments system that replaced paper schedules for 12 branches.",
			"lines": ["web", "brand"],
			"industry": "Hospitality",
			"year": 2026,
			"tags": ["Web Application", "Identity"],
			"featured": true,
			"order": 10,
			"kind": "product",
			"thumb": {
				"type": "image",
				"src": "https://cdn.example.com/acme/thumb.webp",
				"alt": "Acme booking dashboard showing the week view"
			},
			"url": "https://acme.example.com"
		}
	]
}
```

The example above is illustrative only and is not a real Dakdot project.

## Field notes

| Field | Required | Notes |
|---|---|---|
| `slug` | yes | Lowercase letters, digits and `-`. It's the identity used for merging. |
| `title` | yes | The station name on the map. |
| `lines` | yes | One or more of `web`, `brand`, `motion`. Two or more makes the project an **interchange**. |
| `thumb` | yes | `image` or `video`. Use absolute https URLs. Recommended size: 1200×900 webp under 200 KB. |
| `summary` | no | One sentence for the hover preview, up to 200 characters. |
| `featured` | no | Only featured projects appear on the homepage map. |
| `order` | no | Lower sorts first. Local projects default to 100+, remote ones to 500. |
| `kind` | no | Use `product` for live software. |
| `url` | no | Defaults to `/case-studies/<slug>`. An https URL opens the live product externally. |
| `published` | no | Set to `false` to hide the project without deleting it. |

A service line with no stations still shows on the map, listing its capabilities, until its first project arrives.
