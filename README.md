# Jobs MCP Proxy - Connect Your AI Assistant to Job Search

**Instantly add powerful job search capabilities to your AI assistant!** 🚀

This tool connects AI assistants like Claude, Cursor, and other MCP-compatible clients to comprehensive job search services. No technical knowledge required - just one simple command gets you started.

## 🎯 For Job Seekers

**Turn your AI assistant into a powerful job search companion** that can help you:

- 🔍 Search for jobs across multiple platforms and companies
- 📋 Get detailed job descriptions and requirements
- 💼 Find remote, hybrid, or location-specific opportunities
- 📊 Compare salaries and benefits
- 🎯 Get personalized job recommendations
- ✍️ Receive help with applications and interview prep

## ⚡ Quick Setup (2 Options)

### Option 1: One-Command Setup (Easiest)

Just run this single command - no installation needed:

```bash
npx @foundrole/ai-job-search-mcp
```

That's it! Your proxy server is now running and ready to connect to your AI assistant.

### Option 2: Direct Connection (If Your AI Client Supports HTTP)

Some AI clients can connect directly to our streamable HTTP endpoint:

**Streamable HTTP URL:** `https://www.foundrole.com/mcp`

Use this URL directly in clients that support streamable HTTP MCP connections.

## 🤖 Connecting to AI Assistants

### Claude Desktop

1. **Start the proxy server:**

   ```bash
   npx @foundrole/ai-job-search-mcp
   ```

2. **Add to Claude Desktop configuration:**

   Open your Claude Desktop configuration file:
   - **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

3. **Add this configuration:**

   ```json
   {
     "mcpServers": {
       "jobs-search": {
         "command": "npx",
         "args": ["@foundrole/ai-job-search-mcp"],
         "env": {}
       }
     }
   }
   ```

4. **Restart Claude Desktop** and start asking about jobs!

### Other MCP-Compatible Clients

The setup process is similar for other clients:

1. Run: `npx @foundrole/ai-job-search-mcp`
2. Configure your client to use this as an MCP server
3. The server communicates via stdio (standard input/output)

## 🔧 Advanced Configuration

### Using a Local Development Server

If you're a developer working with a local job search server:

```bash
MCP_TARGET_URL=http://localhost:3000/mcp npx @foundrole/ai-job-search-mcp
```

This connects to your local server instead of the production service.

### Environment Variables

- `MCP_TARGET_URL`: Override the target server URL (default: `https://www.foundrole.com/mcp`)

## 💬 Example Usage

Once connected, you can ask your AI assistant questions like:

- _"Find software engineering jobs in San Francisco"_
- _"Show me remote data science positions"_
- _"What are the highest paying tech jobs right now?"_
- _"Help me find entry-level marketing jobs"_
- _"Compare salaries for product manager roles"_

## ❓ Troubleshooting

### Common Issues

**"Connection failed" error:**

- Check your internet connection
- Try running the command again
- For local development, ensure your local server is running

**"Command not found" error:**

- Make sure you have Node.js installed (version 22.17.0 or higher)
- Try: `npm install -g @foundrole/ai-job-search-mcp` then `ai-job-search-mcp`

**Claude Desktop not detecting the server:**

- Double-check your configuration file syntax
- Restart Claude Desktop completely
- Verify the file path is correct for your operating system

### Getting Help

- 🐛 **Report issues:** [GitHub Issues](https://github.com/foundrole/jobs-mcp-proxy/issues)
- 💬 **Questions:** Contact us at dev@foundrole.com
- 📖 **Documentation:** [FoundRole.com](https://foundrole.com)

## 🚀 What's Next?

Once you have job search working in your AI assistant:

1. **Refine your searches** - Be specific about roles, locations, and requirements
2. **Save interesting opportunities** - Ask your AI to help organize and track applications
3. **Get application help** - Use your AI to tailor resumes and cover letters
4. **Interview preparation** - Practice with AI-generated questions based on job descriptions

## 🚀 For Developers

### Testing

The project includes comprehensive testing with coverage reporting:

```bash
# Run all tests
yarn test

# Run tests with coverage
yarn test:coverage

# Run tests in watch mode (during development)
yarn test:watch

# Run specific test file
yarn test tests/basic.test.ts
```

**Test Coverage:**

- Unit tests for configuration handling
- Integration tests for CLI functionality
- Environment variable testing
- Package validation tests

### Code Quality

Before committing, run the full quality check:

```bash
# Run all quality checks (auto-runs in pre-commit hook)
yarn type-check  # TypeScript validation
yarn prettier:write  # Code formatting
yarn lint:fix  # ESLint fixes
yarn test  # Test suite
yarn build  # Compilation check
```

### Publishing

To publish this package to npm:

```bash
# Login to npm with @foundrole organization access
npm login

# Build and publish the package
yarn publish:npm

# Or manually:
yarn test && yarn build
npm publish --access public
```

**Prerequisites:**

- Access to the `@foundrole` organization on npm
- Proper version number in `package.json`
- All tests passing and code quality checks passed

---

**Happy job hunting!** 🎉

_Made with ❤️ by the [FoundRole](https://foundrole.com) team_
