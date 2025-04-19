# AI Humanizer Deployment Guide

## GitHub Repository Setup

To deploy the AI Humanizer web app to GitHub:

1. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Repository name: `ai-humanizer`
   - Description: "Web app that transforms AI-generated content to bypass AI detection"
   - Set to Public or Private based on your preference
   - Click "Create repository"

2. Push the local repository to GitHub:
   ```bash
   git remote add origin https://github.com/hogana2023/ai-humanizer.git
   git branch -M main
   git push -u origin main
   ```

## DigitalOcean Deployment

### Option 1: Deploy using App Platform

1. Log in to your DigitalOcean account
2. Go to the App Platform section
3. Click "Create App"
4. Select GitHub as the source
5. Connect to your GitHub account if not already connected
6. Select the `ai-humanizer` repository
7. Configure the app:
   - Type: Web Service
   - Environment: Node.js
   - Build Command: `npm run build`
   - Run Command: `npm start`
   - HTTP Port: 3000
8. Choose a plan (Basic or Pro based on your needs)
9. Click "Launch App"

### Option 2: Deploy using Droplet

1. Create a new Droplet:
   - Log in to DigitalOcean
   - Click "Create" > "Droplets"
   - Choose an image: Ubuntu 22.04
   - Choose a plan (Basic is sufficient for starting)
   - Choose a datacenter region close to your target audience
   - Add SSH keys or password authentication
   - Click "Create Droplet"

2. Connect to your Droplet via SSH

3. Install dependencies:
   ```bash
   apt update
   apt install -y nodejs npm git nginx
   npm install -g pm2
   ```

4. Clone the repository:
   ```bash
   git clone https://github.com/hogana2023/ai-humanizer.git
   cd ai-humanizer
   ```

5. Install dependencies and build the app:
   ```bash
   npm install
   npm run build
   ```

6. Set up PM2 for process management:
   ```bash
   pm2 start npm --name "ai-humanizer" -- start
   pm2 startup
   pm2 save
   ```

7. Configure Nginx:
   ```bash
   nano /etc/nginx/sites-available/ai-humanizer
   ```

   Add the following configuration:
   ```
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

8. Enable the site and restart Nginx:
   ```bash
   ln -s /etc/nginx/sites-available/ai-humanizer /etc/nginx/sites-enabled/
   nginx -t
   systemctl restart nginx
   ```

9. Set up SSL with Let's Encrypt:
   ```bash
   apt install -y certbot python3-certbot-nginx
   certbot --nginx -d your-domain.com
   ```

## Continuous Deployment

To set up continuous deployment:

1. In your GitHub repository, go to Settings > Secrets
2. Add the following secrets:
   - `DIGITALOCEAN_ACCESS_TOKEN`: Your DigitalOcean API token

3. Create a GitHub Actions workflow file at `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to DigitalOcean

   on:
     push:
       branches: [ main ]

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         
         - name: Install doctl
           uses: digitalocean/action-doctl@v2
           with:
             token: ${{ secrets.DIGITALOCEAN_ACCESS_TOKEN }}
             
         - name: Deploy to App Platform
           run: doctl apps update ${{ secrets.APP_ID }} --spec .do/app.yaml
   ```

## Monitoring and Maintenance

1. Set up monitoring:
   - Use DigitalOcean's built-in monitoring tools
   - Consider adding application monitoring with tools like New Relic or Datadog

2. Regular maintenance:
   - Keep dependencies updated with `npm audit fix`
   - Monitor error logs
   - Set up automated backups

## Troubleshooting

Common issues and solutions:

1. Application not starting:
   - Check logs with `pm2 logs ai-humanizer`
   - Verify Node.js version compatibility

2. Nginx configuration issues:
   - Check syntax with `nginx -t`
   - Look at error logs in `/var/log/nginx/error.log`

3. SSL certificate issues:
   - Renew certificates with `certbot renew`
   - Check certificate status with `certbot certificates`
