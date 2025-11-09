# AI Business Transformation Proposal Generator

A professional web application for generating comprehensive AI-powered business transformation proposals. This application features a modern two-panel interface with real-time chat and beautifully formatted proposal viewing, powered by n8n workflow automation.

![Application Preview](https://img.shields.io/badge/React-18.3-blue) ![Vite](https://img.shields.io/badge/Vite-6.0-purple) ![License](https://img.shields.io/badge/license-MIT-green)

## Features

### Core Functionality
- **Two-Panel Interface**: Intuitive split-screen design with chat on the left and proposal display on the right
- **Real-time AI Integration**: Connected to n8n webhook for intelligent proposal generation
- **Professional Formatting**: Parse and display long-form proposals (15+ pages) with executive-ready formatting
- **Export Capabilities**:
  - PDF export with professional formatting
  - Plain text export for easy sharing
- **Advanced Document Styling**: Impressive, client-ready proposal presentations

### Proposal Components
- Executive summaries with ROI calculations
- Detailed analysis sections
- Implementation roadmaps
- Financial projections
- Professional tables and charts
- Blockquotes and highlighted sections

### Technical Features
- **Modern React**: Built with React 18 and hooks
- **Professional UI**: Gradient backgrounds, smooth animations, and modern design
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Error Handling**: Comprehensive error states and user feedback
- **Loading States**: Visual feedback during proposal generation
- **Session Management**: Unique session IDs for conversation tracking

## Technology Stack

- **Frontend**: React 18.3
- **Build Tool**: Vite 6.0
- **Styling**: Custom CSS with gradients and modern UI patterns
- **Markdown**: react-markdown with GitHub Flavored Markdown support
- **PDF Export**: jsPDF + html2canvas
- **HTTP Client**: Native Fetch API
- **Session Management**: UUID v4

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- n8n workflow endpoint (or use the provided default)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-proposal-generator
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and set your webhook URL:
```env
VITE_WEBHOOK_URL=your-n8n-webhook-url
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser to `http://localhost:5173`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

### Project Structure

```
ai-proposal-generator/
├── src/
│   ├── components/
│   │   ├── ChatPanel.jsx          # Chat interface component
│   │   ├── ChatPanel.css          # Chat styling
│   │   ├── ProposalViewer.jsx     # Proposal display component
│   │   └── ProposalViewer.css     # Proposal styling
│   ├── utils/
│   │   └── exportUtils.js         # PDF and text export utilities
│   ├── App.jsx                    # Main application component
│   ├── App.css                    # Application-level styles
│   ├── main.jsx                   # Application entry point
│   └── index.css                  # Global styles
├── public/                        # Static assets
├── .env.example                   # Environment variables template
├── vercel.json                    # Vercel deployment configuration
├── package.json                   # Dependencies and scripts
└── README.md                      # This file
```

## Deployment to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual Deployment

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Set environment variables in Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add `VITE_WEBHOOK_URL` with your n8n webhook URL

### Environment Variables

Set the following environment variable in your Vercel project:

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_WEBHOOK_URL` | n8n webhook endpoint for proposal generation | Yes |

## n8n Webhook Integration

### Expected Request Format

The application sends POST requests to your n8n webhook with the following structure:

```json
{
  "chatInput": "User's message or request",
  "sessionId": "unique-session-identifier"
}
```

### Expected Response Format

Your n8n workflow should return a JSON response with one of these structures:

```json
{
  "proposal": "# Markdown formatted proposal content...",
  "message": "Optional status message"
}
```

Or:

```json
{
  "content": "# Markdown formatted proposal content...",
  "message": "Optional status message"
}
```

The application will automatically extract and display the proposal content.

## Usage Guide

### Generating a Proposal

1. **Start a Conversation**: Type your request in the chat input, for example:
   - "Create a digital transformation proposal for a credit union"
   - "Generate an AI implementation proposal for healthcare"
   - "Draft a cloud migration proposal for manufacturing"

2. **View the Proposal**: The AI will generate a comprehensive proposal displayed in the right panel with professional formatting

3. **Export Options**:
   - Click "📄 Export PDF" to download as PDF
   - Click "📝 Export Text" to download as plain text

### Example Prompts

- "Create a comprehensive digital transformation proposal for Hope Credit Union focusing on AI integration and member experience"
- "Generate a cloud migration proposal for a mid-sized manufacturing company"
- "Draft an AI automation proposal for a healthcare provider"

## Customization

### Styling

The application uses CSS custom properties and can be easily customized by modifying:

- `src/index.css` - Global styles and theme variables
- `src/App.css` - Main application layout
- `src/components/*.css` - Component-specific styles

### Gradient Colors

The default gradient uses:
- Primary: `#667eea` (purple-blue)
- Secondary: `#764ba2` (purple)

Modify these in the CSS files to match your brand.

### Webhook Configuration

To use a different webhook endpoint:

1. Update `.env` file with new URL
2. Ensure your endpoint accepts the required request format
3. Ensure your endpoint returns the expected response format

## Troubleshooting

### Common Issues

**Proposal not generating:**
- Check that your webhook URL is correctly configured
- Verify the n8n workflow is active and accessible
- Check browser console for error messages

**PDF export not working:**
- Ensure sufficient browser memory for large proposals
- Try exporting smaller sections if proposal is very long

**Styling issues:**
- Clear browser cache
- Ensure all CSS files are properly imported
- Check for console errors

### Debug Mode

Enable detailed logging by checking the browser console (F12) for:
- Network requests to webhook
- Response data structure
- Export operation details

## Security Considerations

- **Environment Variables**: Never commit `.env` files to version control
- **API Keys**: Store sensitive credentials in Vercel environment variables
- **CORS**: Ensure your n8n webhook allows requests from your deployment domain
- **Input Validation**: The application includes basic input sanitization

## Performance Optimization

- **Code Splitting**: Automatically handled by Vite
- **Lazy Loading**: Consider implementing for large proposals
- **Caching**: Browser caching enabled for static assets
- **Image Optimization**: Use optimized images in proposals

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

## Acknowledgments

- Built with React and Vite
- Powered by n8n workflow automation
- Inspired by modern SaaS applications
- Designed for professional business use

---

**Built with ❤️ for creating impressive business transformation proposals**
