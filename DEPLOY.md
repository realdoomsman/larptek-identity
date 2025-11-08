# Deployment Guide

## Deploy to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/realdoomsman/larptek-identity)

### Manual Deployment

1. **Fork/Clone the repository**
   ```bash
   git clone https://github.com/realdoomsman/larptek-identity.git
   cd larptek-identity
   ```

2. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

3. **Deploy via Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure settings:
     - **Framework Preset**: Next.js
     - **Root Directory**: `web`
     - **Build Command**: `npm run build`
     - **Output Directory**: `.next`
     - **Install Command**: `npm install`

4. **Environment Variables** (Optional)
   - No environment variables required for basic deployment
   - Program ID is hardcoded in `web/lib/larptek.ts`

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your site will be live at `your-project.vercel.app`

### Vercel CLI Deployment

```bash
cd web
vercel
```

Follow the prompts to deploy.

## Deploy to Netlify

1. **Via Netlify Dashboard**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Configure:
     - **Base directory**: `web`
     - **Build command**: `npm run build`
     - **Publish directory**: `web/.next`

2. **Via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   cd web
   netlify deploy --prod
   ```

## Deploy to Other Platforms

### Railway
- Root directory: `web`
- Build command: `npm install && npm run build`
- Start command: `npm start`

### Render
- Root directory: `web`
- Build command: `npm install && npm run build`
- Start command: `npm start`

## Post-Deployment

### Update Program ID
After deploying your Anchor program to Solana:

1. Update `LARPTEK_PROGRAM_ID` in `web/lib/larptek.ts`
2. Commit and push changes
3. Vercel will auto-deploy the update

### Configure Custom Domain
1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Troubleshooting

### Build Fails
- Ensure Node.js version is 18+ (check `package.json` engines)
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

### White Screen After Deploy
- Check browser console for errors
- Verify all environment variables are set
- Ensure API routes are working

### Wallet Connection Issues
- Confirm you're on the correct network (devnet/mainnet)
- Check browser console for Solana wallet errors
- Ensure program is deployed to the correct cluster

## Performance Optimization

### Recommended Vercel Settings
- Enable "Automatically optimize images"
- Set up Vercel Analytics
- Configure custom headers for security

### Caching
Next.js automatically handles caching for static assets.

## Security

- Never commit private keys or mnemonics
- Use environment variables for sensitive data
- Enable Vercel's security headers
- Keep dependencies updated

## Support

For deployment issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [GitHub Issues](https://github.com/realdoomsman/larptek-identity/issues)
