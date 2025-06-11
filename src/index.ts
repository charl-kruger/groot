import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export class MyMCP extends McpAgent {
	server = new McpServer({
		name: "Timezone MCP Server",
		version: "1.0.0",
	});

	async init() {
		// Tool: Return the user's current timezone (based on the Worker runtime)
		this.server.tool(
			"get_timezone", // Tool name
			"Get the server or detected user timezone. If location is provided, returns the timezone for that location.", // Description
			{
				location: z.string().optional().describe("Optional location name, address, or coordinates in 'lat,lng' format.")
			},
			async ({ location }) => {
				try {
					// If location is provided, use a geocoding/timezone API (stub only, as no ext. HTTP in MCP tools by default)
					if (location) {
						// Note: For production, you'd call a geocoding/timezone API with fetch() and API key.
						return {
							content: [{
								type: "text",
								text: `Timezone lookup by location is not implemented in this demo. Try without location.`
							}]
						};
					}

					// Default: Return this server's runtime timezone (system time)
					const now = new Date();
					const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
					return {
						content: [{
							type: "text",
							text: `The server's detected timezone is: ${tz}. Current time: ${now.toISOString()}`
						}]
					};
				} catch (err) {
					return {
						content: [{
							type: "text",
							text: `Error detecting timezone. (${err instanceof Error ? err.message : err})`
						}]
					};
				}
			}
		);
	}
}

export default {
	fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const url = new URL(request.url);
		if (url.pathname === "/sse" || url.pathname === "/sse/message") {
			return MyMCP.serveSSE("/sse").fetch(request, env, ctx);
		}
		if (url.pathname === "/mcp") {
			return MyMCP.serve("/mcp").fetch(request, env, ctx);
		}
		return new Response("Not found", { status: 404 });
	},
};
