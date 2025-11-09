# Deployment Guide - AI Proposal Generator

## Quick Start - Deploy to Vercel

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Sign up/Login to Vercel**
   - Go to https://vercel.com
   - Sign up or login with your GitHub account

2. **Import Your Repository**
   - Click "Add New..." → "Project"
   - Select your GitHub repository: `ekuzevska1/n8n-workflows`
   - Select the branch: `claude/ai-proposal-generator-011CUxzbsCigEPDdGSKbBpNu`

3. **Configure Project**
   - Framework Preset: Vite (should auto-detect)
   - Root Directory: `ai-proposal-generator`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add variable:
     - Name: `VITE_WEBHOOK_URL`
     - Value: `https://primary-rt3j-production.up.railway.app/webhook/be96b95d-9461-4e21-878a-d13ad0f22f1f/chat`
   - Click "Add"

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build completion
   - Your app will be live at: `https://your-project-name.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Navigate to Project Directory**
```bash
cd ai-proposal-generator
```

4. **Deploy**
```bash
vercel
```

5. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - What's your project's name? `ai-proposal-generator`
   - In which directory is your code located? `./`

6. **Set Environment Variable**
```bash
vercel env add VITE_WEBHOOK_URL production
```
Then paste: `https://primary-rt3j-production.up.railway.app/webhook/be96b95d-9461-4e21-878a-d13ad0f22f1f/chat`

7. **Deploy to Production**
```bash
vercel --prod
```

## Post-Deployment Configuration

### 1. Test Your Deployment

Visit your deployed URL and test:
- [ ] Application loads correctly
- [ ] Chat interface is responsive
- [ ] Send a test message
- [ ] Verify proposal generation works
- [ ] Test PDF export
- [ ] Test text export
- [ ] Check mobile responsiveness

### 2. Configure Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (can take up to 48 hours)

### 3. Configure n8n Webhook CORS

Ensure your n8n workflow accepts requests from your Vercel domain:

1. In n8n, go to your workflow
2. Edit the Webhook node
3. Under "Options" → "Allowed Origins"
4. Add your Vercel domain: `https://your-project.vercel.app`
5. Save and activate the workflow

## Troubleshooting

### Build Fails

**Problem**: Build fails with module errors
**Solution**:
```bash
# Clear node_modules and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Webhook Not Working

**Problem**: Proposals not generating
**Solutions**:
1. Verify environment variable is set correctly in Vercel dashboard
2. Check n8n workflow is active
3. Verify CORS is configured in n8n
4. Check browser console for errors (F12)

### PDF Export Not Working

**Problem**: PDF export button doesn't work
**Solutions**:
1. Try with a smaller proposal first
2. Check browser console for errors
3. Ensure sufficient browser memory
4. Try a different browser (Chrome recommended)

### Mobile Layout Issues

**Problem**: Layout broken on mobile
**Solutions**:
1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. Check if all CSS files loaded correctly

## Performance Optimization

### 1. Enable Edge Functions (Optional)

For faster response times globally:
1. Vercel Dashboard → Project → Settings → Functions
2. Enable "Edge Functions"
3. Redeploy

### 2. Configure Caching

Add to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 3. Monitor Performance

1. Vercel Dashboard → Your Project → Analytics
2. Monitor:
   - Response times
   - Error rates
   - Geographic distribution
   - Usage patterns

## Security Best Practices

### 1. Environment Variables
- Never commit `.env` files to git
- Rotate webhook URLs periodically
- Use Vercel's environment variable encryption

### 2. CORS Configuration
- Only allow your specific Vercel domain in n8n
- Don't use wildcard `*` origins in production

### 3. Rate Limiting
Consider adding rate limiting to prevent abuse:
- Use Vercel's Edge Middleware
- Implement request throttling in n8n

## Updating the Application

### Push Updates

1. Make changes locally
2. Commit changes:
```bash
git add .
git commit -m "Description of changes"
```
3. Push to branch:
```bash
git push origin claude/ai-proposal-generator-011CUxzbsCigEPDdGSKbBpNu
```
4. Vercel will automatically redeploy

### Rollback to Previous Version

1. Vercel Dashboard → Your Project → Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

## Monitoring and Analytics

### Built-in Vercel Analytics

1. Enable in Vercel Dashboard → Your Project → Analytics
2. Monitor:
   - Page views
   - Unique visitors
   - Top pages
   - Response times

### Custom Analytics (Optional)

Add Google Analytics or other tools by updating `index.html`:
```html
<!-- Add before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

## Cost Considerations

### Vercel Pricing
- **Hobby Plan** (Free):
  - 100 GB bandwidth/month
  - Unlimited deployments
  - Perfect for testing and personal use

- **Pro Plan** ($20/month):
  - 1 TB bandwidth/month
  - Advanced analytics
  - Password protection
  - Recommended for production

### n8n Considerations
- Monitor webhook execution count
- Check Railway.app pricing
- Consider caching responses for common requests

## Support and Maintenance

### Regular Maintenance Tasks
- [ ] Weekly: Check error logs in Vercel
- [ ] Monthly: Review analytics and usage
- [ ] Quarterly: Update dependencies
- [ ] As needed: Update n8n workflow

### Getting Help
- Check Vercel documentation: https://vercel.com/docs
- n8n community: https://community.n8n.io
- GitHub issues: Create issue in your repository

## Production Checklist

Before going live:
- [ ] All environment variables configured
- [ ] n8n webhook tested and working
- [ ] CORS properly configured
- [ ] PDF export tested
- [ ] Text export tested
- [ ] Mobile responsiveness verified
- [ ] Error handling tested
- [ ] Loading states verified
- [ ] Custom domain configured (if applicable)
- [ ] Analytics enabled
- [ ] Backup/rollback plan established

## Next Steps

1. **Deploy Now**: Follow Method 1 or 2 above
2. **Test Thoroughly**: Use the testing checklist
3. **Share**: Get feedback from users
4. **Iterate**: Improve based on user feedback

---

**Need Help?** Check the main README.md or create an issue in the repository.
