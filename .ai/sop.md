# Standard Operating Procedure (SOP) for Bev Brand AI Development

## Phase 4: Vercel Deployment

### 4.1 Initial Setup
1. Vercel Project Creation:
   - Go to vercel.com and sign in
   - Click "Add New Project"
   - Import your GitHub repository
   - Select the repository

2. Environment Variables:
   - Add in Vercel dashboard:
     * OPENAI_API_KEY
     * NEXT_PUBLIC_TEST_MODE="false"
   - Verify environment variables

3. Domain Configuration:
   - Use provided Vercel domain or
   - Add custom domain if needed
   - Vercel handles SSL automatically

4. Build Configuration:
   - Framework Preset: Next.js
   - Build Command: `next build`
   - Output Directory: `.next`
   - Install Command: `npm install`

5. Deploy:
   - Click "Deploy"
   - Wait for build completion
   - Verify deployment success

### 4.2 Post-Deployment
1. Verify Functionality:
   - Test all chat features
   - Check image generation
   - Verify streaming responses
   - Test mobile responsiveness

2. Domain Setup (if using custom domain):
   - Add domain in Vercel
   - Configure DNS records
   - Wait for propagation
   - Verify SSL certificate
