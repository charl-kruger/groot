# Remote MCP Server: Return User Timezone

This MCP server exposes a tool to return the current Cloudflare worker's runtime timezone. It demonstrates how to build a simple MCP server with Cloudflare Workers.

## Quick Deploy

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/your-repo-here)

This deploys your MCP server to: `remote-mcp-server-authless-timezone.<your-account>.workers.dev/sse`

---

## Usage Example

Use Cloudflare AI Playground or Claude Desktop to connect to your deployed server. Query for the current timezone with:

**Tool:** `get_timezone`
- No args needed for basic timezone detection (returns server's detected timezone).
- Optionally, pass a `location` (name or lat,lng) as input (returns a stub message in demo).

## Test Locally

```bash
npm run dev
```

Example request (MCP raw HTTP):
```
curl -X POST 'http://localhost:8787/mcp' \  
	-H 'Content-Type: application/json' \
	-d '{"tool":"get_timezone","params":{}}'
```

## Customize

- Edit `src/index.ts` to add or extend tools.
- To enable real location-based timezone detection, integrate with a geolocation API and handle the `location` parameter.

## Security/Notes

- This demo does not collect true user location—only shows the Worker runtime timezone.
- The server's timezone may not reflect the user's location.
- Add authentication if restricting access is required.

---

## Connect from Claude Desktop or mcp-remote

Claude example config:
```json
{
  "mcpServers": {
    "timezone": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "http://localhost:8787/sse"
      ]
    }
  }
}
```

Restart Claude Desktop, click "Connect", and try using the `get_timezone` tool.

---
