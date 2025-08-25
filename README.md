# Jobs MCP Proxy - Connect Your AI Assistant to Job Search

**Instantly add powerful job search capabilities to your AI assistant!** 🚀

This tool connects AI assistants like Claude, ChatGPT, and other MCP-compatible clients to comprehensive job search services. Choose from direct HTTP connection or stdio server based on your AI client.

## 🎯 For Job Seekers

**Turn your AI assistant into a powerful job search companion** that can help you:

- 🔍 Search for jobs across multiple platforms and companies
- 📋 Get detailed job descriptions and requirements
- 💼 Find remote, hybrid, or location-specific opportunities
- 📊 Compare salaries and benefits
- 🎯 Get personalized job recommendations
- ✍️ Receive help with applications and interview prep

## ⚡ Quick Setup (2 Options)

### Option 1: Direct HTTP Connection (Recommended)

**For Claude Web/Desktop and ChatGPT** - Use our direct HTTP endpoint:

**MCP Server URL:** `https://www.foundrole.com/mcp`

This is the easiest method for modern AI clients that support HTTP MCP connections.

### Option 2: stdio Server (For Other Clients)

For MCP-compatible clients that require stdio transport:

```bash
npx @foundrole/ai-job-search-mcp
```

This starts a local proxy server that communicates via standard input/output.

## 🤖 Connecting to AI Assistants

### Claude Web/Desktop Setup

**Estimated Time:** 2 minutes | **Requirements:** Claude Pro account

1. Navigate to the main settings or preferences area of Claude (click your profile or settings icon)

2. Find the "Connectors" or "Tools" section and click 'Add custom connector'

3. In the Name or Label field, enter: `Foundrole`

4. In the Remote MCP server URL field, paste the following endpoint:

   ```
   https://www.foundrole.com/mcp
   ```

5. Save the configuration and allow Claude to connect to the Found Role server

6. Once connected, you can access job search capabilities directly within your Claude conversations

> **🔗 Pro Account Required:** Claude MCP connectors require a Claude Pro subscription to access external data sources and tools.

### ChatGPT Setup

**Estimated Time:** 3 minutes | **Requirements:** ChatGPT Plus/Team/Enterprise

1. In the ChatGPT web interface, click your profile name and select 'Settings'

2. Navigate to the 'Connectors' tab within the settings menu

3. Click 'Add new connector' or 'Add custom connector'

4. For the 'Name' field, enter: `foundrole`

5. When prompted for the server URL, paste the following endpoint:

   ```
   https://www.foundrole.com/mcp
   ```

6. Follow any on-screen prompts to authorize the connection

7. Once added, you can select 'Found Role' as a data source when using Deep Research or enabling connectors

> **🔒 Premium Features:** ChatGPT connectors and Deep Research mode require ChatGPT Plus, Team, or Enterprise subscription.

### LM Studio Setup

**Estimated Time:** 3 minutes | **Requirements:** Node.js + npm

1. Open LM Studio and navigate to the MCP servers configuration section

2. Create or edit your MCP servers configuration file with the following JSON:

   ```json
   {
     "mcpServers": {
       "foundrole": {
         "command": "npx",
         "args": ["@foundrole/ai-job-search-mcp@latest"],
         "env": {}
       }
     }
   }
   ```

3. Save the configuration file and restart LM Studio to load the new MCP server

4. Verify the connection by checking that Found Role appears in your available MCP servers list

5. You can now access job search capabilities through LM Studio's chat interface

> **💡 Requirements:** Make sure you have Node.js and npm installed on your system, as the MCP server runs using npx. LM Studio will automatically manage the server connection once configured.

### Perplexity Desktop Setup

**Estimated Time:** 4 minutes | **Requirements:** Perplexity Pro + Node.js

1. Open Perplexity Desktop and navigate to MCP servers configuration

2. Create or edit your MCP configuration with the following JSON:

   ```json
   {
     "command": "npx",
     "args": ["@foundrole/ai-job-search-mcp@latest"],
     "env": {}
   }
   ```

3. Save the configuration and restart Perplexity to load the MCP server

4. Verify the connection in Perplexity's MCP servers list

5. Access job search capabilities through Perplexity Pro features

> **⚠️ Note:** Perplexity uses stdio MCP transport. Make sure Node.js and npm are installed for the MCP server to run properly.

## 💬 Example Usage

Once connected, you can ask your AI assistant questions like:

- _"Find software engineering jobs in San Francisco"_
- _"Search for data scientist positions in California"_
- _"Show me React developer jobs in Seattle, then search Austin next so I can compare opportunities"_
- _"I want to work at Netflix or Uber. Search for their open developer positions"_
- _"Find Python Django jobs in San Francisco, then show me more results if available"_
- _"Search for ‘senior software engineer’ positions in Boston. Filter out any that seem too junior when you show me the results"_
- _"Look for full-stack developer jobs in Denver. Show me several pages of results, then get detailed info on any that mention good benefits"_
- _"Find ‘fintech developer’ or ‘financial software’ jobs in New York. Highlight any with higher salaries when presenting results"_

## ❓ Troubleshooting

### Common Issues

**"Connection failed" error:**

- Check your internet connection
- Try the setup process again
- Ensure you have the required subscription (Claude Pro, ChatGPT Plus, etc.)

**"Command not found" error (for stdio clients):**

- Make sure you have Node.js installed (version 22.17.0 or higher)
- Try: `npm install -g @foundrole/ai-job-search-mcp` then `ai-job-search-mcp`

**MCP connector not working:**

- Double-check your configuration and URL
- Restart your AI client completely
- Verify you have the required premium subscription

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

---

**Happy job hunting!** 🎉

_Made with ❤️ by the [FoundRole](https://foundrole.com) team_
