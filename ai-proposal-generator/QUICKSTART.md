# Quick Start Guide

Get your AI Proposal Generator up and running in 5 minutes!

## Local Development

### 1. Install Dependencies
```bash
cd ai-proposal-generator
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

The default webhook URL is already configured in the code. You can override it in `.env` if needed:
```env
VITE_WEBHOOK_URL=https://primary-rt3j-production.up.railway.app/webhook/be96b95d-9461-4e21-878a-d13ad0f22f1f/chat
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open in Browser
Navigate to: `http://localhost:5173`

### 5. Test the Application
1. Type a message in the chat: "Create a digital transformation proposal for a credit union"
2. Wait for the AI to generate the proposal
3. View the formatted proposal in the right panel
4. Try exporting to PDF or text

## Deploy to Vercel (Production)

### One-Click Deploy

1. Go to [Vercel](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Set Root Directory to: `ai-proposal-generator`
5. Add environment variable:
   - **Name**: `VITE_WEBHOOK_URL`
   - **Value**: `https://primary-rt3j-production.up.railway.app/webhook/be96b95d-9461-4e21-878a-d13ad0f22f1f/chat`
6. Click "Deploy"
7. Wait 2-3 minutes
8. Your app is live!

## Troubleshooting

### Build Errors
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
# Kill the process using port 5173
lsof -ti:5173 | xargs kill -9
# Or use a different port
npm run dev -- --port 3000
```

### Webhook Not Responding
1. Check your internet connection
2. Verify the n8n workflow is active
3. Check browser console (F12) for errors

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for advanced deployment options
- Customize the styling in `src/App.css` and component CSS files
- Modify the gradient colors to match your brand

## Key Files to Customize

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main application logic |
| `src/App.css` | Main layout and theme |
| `src/components/ChatPanel.jsx` | Chat interface |
| `src/components/ProposalViewer.jsx` | Proposal display |
| `.env` | Environment configuration |

## Example Prompts to Try

1. "Create a comprehensive digital transformation proposal for Hope Credit Union"
2. "Generate a cloud migration proposal for a manufacturing company"
3. "Draft an AI implementation strategy for a healthcare provider"
4. "Create a cybersecurity improvement proposal for a financial institution"

## Support

Need help? Check:
- [README.md](README.md) - Full documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- GitHub Issues - Report bugs or request features

---

**Happy proposing! 🚀**
