# API Documentation

This project provides a robust server-side API for programmatically managing Blogs and Projects. You can use standard tools like `curl` to automate content updates.

## Prerequisites

Ensure the following environment variables are set in your `.env` file:

- `API_SECRET`: A secret string used to authenticate requests.
- `FIREBASE_SERVICE_ACCOUNT`: The content of your Firebase Service Account JSON file (as a single line string).
- `ADMIN_UID`: (Optional) The Firebase User ID of the admin user to associate new documents with.
- `VITE_CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name.
- `VITE_CLOUDINARY_UPLOAD_PRESET`: Your Cloudinary unsigned upload preset.

## Authentication

All requests must include the `x-api-key` header matching your `API_SECRET`.

```http
x-api-key: your_secure_random_string
```

---

## Endpoints

### 1. Add a Blog Post

**Endpoint:** `POST /api/blogs`

This endpoint is highly flexible. It supports standard JSON payloads for simple updates, or `multipart/form-data` for file uploads (Markdown files and images).

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | String | Yes | Title of the blog post. |
| `content` | String | * | Raw Markdown content. *Required if `mdFile` or `mdUrl` is missing.* |
| `mdFile` | File | * | Upload a `.md` file. *Supported in `multipart/form-data` only.* |
| `mdUrl` | String | * | A URL to a raw `.md` file (e.g., from GitHub) to fetch content from. |
| `image` | File/String | No | An image file to upload or a URL string. |
| `tags` | Array/String | No | JSON array (JSON) or comma-separated string (Form). |
| `slug` | String | No | URL slug. Auto-generated from title if missing. |

#### Example: Uploading a Markdown File and Image (Form Data)
```bash
curl -X POST http://localhost:5173/api/blogs \
  -H "x-api-key: my-super-safe-secret" \
  -F "title=My New Technical Post" \
  -F "mdFile=@/Users/name/docs/post.md" \
  -F "image=@/Users/name/images/cover.png" \
  -F "tags=svelte,typescript" \
  -F "description=A deep dive into SvelteKit APIs."
```

#### Example: Fetching Content from GitHub (JSON)
```bash
curl -X POST http://localhost:5173/api/blogs \
  -H "Content-Type: application/json" \
  -H "x-api-key: my-super-safe-secret" \
  -d 
    "title": "Post from GitHub",
    "mdUrl": "https://raw.githubusercontent.com/user/repo/main/README.md",
    "imageUrl": "https://example.com/banner.jpg",
    "tags": ["github", "automation"]
  
```

---

### 2. Add a Project

**Endpoint:** `POST /api/projects`

Handles project additions with support for image uploads to Cloudinary.

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | String | Yes | Project name. |
| `description` | String | Yes | Project summary. |
| `technologies` | Array/String | Yes | Tech stack used (JSON array or comma-separated string). |
| `image` | File/String | No | Screenshot file or URL string. |
| `github` | String | No | Repository URL. |
| `url` | String | No | Live demo URL. |

#### Example: Adding a Project with a Screenshot (Form Data)
```bash
curl -X POST http://localhost:5173/api/projects \
  -H "x-api-key: my-super-safe-secret" \
  -F "title=Portfolio v4" \
  -F "description=My updated personal portfolio." \
  -F "technologies=SvelteKit, Tailwind, Firebase" \
  -F "image=@/path/to/screenshot.png" \
  -F "github=https://github.com/user/portfolio"
```

---

## Troubleshooting

- **401 Unauthorized**: Double-check your `x-api-key` header and ensure your server was restarted after updating `.env`.
- **400 Bad Request**: Ensure all required fields (like `title` and `content`) are provided.
- **Malformed Input**: When using `curl` on macOS/Linux with JSON, use single quotes `'` around the `-d` payload. When using Windows, escape inner quotes or use a file (`-d @file.json`).
- **Cloudinary Errors**: Ensure `VITE_CLOUDINARY_CLOUD_NAME` and `VITE_CLOUDINARY_UPLOAD_PRESET` are correctly set in your environment.
