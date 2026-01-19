# StayInn - Deployment Guide

## Deployment Options

### Option 1: Deploy Frontend to Netlify (Free)

#### Step 1: Prepare Frontend
```bash
cd frontend
# Ensure all files are in this directory
```

#### Step 2: Create Netlify Account
1. Go to https://www.netlify.com
2. Sign up with GitHub/Google
3. Click "New site from Git"

#### Step 3: Deploy
1. Connect your Git repository
2. Set build command: `npm run build` (if using build tool)
3. Set publish directory: `frontend/`
4. Click Deploy

Your site will be live at: `https://your-site.netlify.app`

---

### Option 2: Deploy Frontend to Vercel (Free)

1. Go to https://vercel.com
2. Sign up and click "New Project"
3. Import your repository
4. Set root directory to `frontend/`
5. Click Deploy

---

### Option 3: Deploy Backend to Heroku

#### Prerequisites
- Heroku account
- Heroku CLI installed

#### Step 1: Setup Backend
```bash
cd backend

# Create Procfile
echo "web: node server.js" > Procfile

# Create .env for production
# Update with production database credentials
```

#### Step 2: Deploy
```bash
heroku login
heroku create stayinn-api
git push heroku main
heroku open
```

---

### Option 4: Deploy Locally (Development)

#### Windows/Linux/Mac
```bash
# Start Backend
cd backend
npm install
npm start

# In another terminal, start Frontend
cd frontend
python -m http.server 8000
# or
npx http-server
```

---

## Complete Production Deployment

### Step 1: Database Setup (Cloud)

#### Using AWS RDS MySQL
1. Create RDS instance
2. Configure security groups
3. Create database `stayinn`
4. Run schema: `mysql -h host -u user -p stayinn < schema.sql`

#### Using MongoDB Atlas (Alternative)
1. Create cluster at https://www.mongodb.com/cloud/atlas
2. Get connection string
3. Update backend connection code

### Step 2: Backend Deployment

#### Using Heroku
```bash
cd backend

# Login to Heroku
heroku login

# Create app
heroku create stayinn-backend

# Set environment variables
heroku config:set DB_HOST=your-db-host
heroku config:set DB_USER=your-user
heroku config:set DB_PASSWORD=your-password
heroku config:set DB_NAME=stayinn
heroku config:set JWT_SECRET=your-secret-key
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

#### Using AWS EC2
1. Launch EC2 instance (Ubuntu)
2. Connect via SSH
3. Install Node.js and MySQL
4. Clone repository
5. Setup environment variables
6. Install PM2: `npm install -g pm2`
7. Start app: `pm2 start server.js --name stayinn`
8. Setup Nginx as reverse proxy

### Step 3: Frontend Deployment

#### Option A: Netlify
```bash
cd frontend
# Drag and drop to Netlify or connect Git
```

#### Option B: AWS S3 + CloudFront
1. Create S3 bucket
2. Enable static website hosting
3. Upload frontend files
4. Setup CloudFront distribution
5. Point domain to CloudFront

#### Option C: GitHub Pages
```bash
# Push to gh-pages branch
git subtree push --prefix frontend origin gh-pages
```

### Step 4: Domain Setup

1. Register domain on GoDaddy/Namecheap
2. Point to your hosting provider's nameservers
3. Update DNS records:
   - **A Record**: Points to frontend server IP
   - **CNAME**: api.yourdomain.com → backend server

---

## Environment Variables

### Production Backend (.env)
```
DB_HOST=your-production-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=stayinn
PORT=5000
NODE_ENV=production
JWT_SECRET=your-super-secret-key-min-32-chars
```

### Production Frontend (Update API URLs)
Update in JavaScript files:
```javascript
// Change from localhost to production URL
const API_URL = 'https://api.stayinn.com';
```

---

## SSL Certificate

### Using Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --standalone -d yourdomain.com

# Auto-renewal setup
sudo certbot renew --dry-run
```

---

## Database Backup Strategy

### Automated Backups

```bash
# Create backup script
#!/bin/bash
BACKUP_DIR="/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
mysqldump -u user -p password stayinn > "$BACKUP_DIR/stayinn_$TIMESTAMP.sql"

# Schedule with cron (daily at 2 AM)
0 2 * * * /path/to/backup.sh
```

### Cloud Backup
- AWS RDS: Automatic daily backups
- MongoDB Atlas: Automatic daily backups
- Google Cloud SQL: Automatic backups

---

## Performance Optimization

### Frontend
```javascript
// Minify CSS and JavaScript
npm install -D terser-webpack-plugin cssnano

// Enable caching
// Add cache headers in web server config
```

### Backend
```javascript
// Enable compression
const compression = require('compression');
app.use(compression());

// Add caching headers
app.use((req, res, next) => {
    res.set('Cache-Control', 'public, max-age=3600');
    next();
});
```

### Database
```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_email ON bookings(guest_email);
CREATE INDEX idx_room_availability ON rooms(availability_status);
```

---

## Monitoring & Analytics

### Setup Google Analytics
```html
<!-- Add to frontend/index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Setup Error Logging
```bash
# Using Sentry
npm install @sentry/node
```

### Monitor API Performance
```bash
# Using PM2 monitoring
pm2 web  # Opens dashboard at localhost:9615
```

---

## Security Checklist

- [x] SSL/TLS certificates installed
- [x] Environment variables secured
- [x] CORS properly configured
- [x] Input validation implemented
- [x] Password hashing enabled
- [x] JWT secrets changed
- [x] Rate limiting enabled
- [x] HTTPS enforced
- [x] Sensitive data not logged
- [x] Database backups automated

---

## Post-Deployment

### Testing Checklist
- [ ] Test all pages load correctly
- [ ] Test booking flow end-to-end
- [ ] Test payment form validation
- [ ] Test contact form submission
- [ ] Test sign in/registration
- [ ] Test on mobile devices
- [ ] Test API endpoints
- [ ] Check SSL certificate
- [ ] Verify email notifications
- [ ] Test database backups

### Documentation
- [ ] Update API documentation
- [ ] Create admin guide
- [ ] Document deployment steps
- [ ] Create troubleshooting guide

---

## Scaling Strategy

### Phase 1: Current (0-1000 users)
- Single server for both frontend and backend
- MySQL on same server
- Basic monitoring

### Phase 2: Growth (1000-10000 users)
- Separate servers for frontend, backend, database
- Redis caching layer
- CDN for static assets
- Load balancer

### Phase 3: Scale (10000+ users)
- Microservices architecture
- Database sharding
- Message queue (RabbitMQ)
- Kubernetes containers
- Global CDN

---

## CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy Backend
      run: |
        git push heroku main
    
    - name: Deploy Frontend
      run: |
        npm run build
        netlify deploy --prod --dir=frontend
```

---

## Cost Estimation (Monthly)

### Minimal Setup
- Frontend (Netlify): Free
- Backend (Heroku): $7-50
- Database (MongoDB Atlas): Free
- Email (SendGrid): Free-20
- **Total: $7-70/month**

### Standard Setup
- Frontend (Vercel): $0-20
- Backend (AWS EC2): $10-50
- Database (AWS RDS): $15-100
- CDN (CloudFlare): $0-20
- Email (SendGrid): $10-100
- **Total: $35-290/month**

### Enterprise Setup
- Frontend (AWS): $50-200
- Backend (AWS): $100-500
- Database (AWS): $100-500
- CDN (CloudFront): $50-200
- Monitoring: $50-100
- **Total: $350-1500/month**

---

## Troubleshooting

### 502 Bad Gateway
- Check backend server status
- Verify database connection
- Check server logs: `heroku logs --tail`

### CORS Errors
- Ensure frontend URL is whitelisted in backend
- Check CORS headers

### Database Connection Timeout
- Verify security groups/firewall
- Check database credentials
- Increase timeout values

### Slow Performance
- Enable caching
- Optimize database queries
- Use CDN for static files

---

## Support & Resources

- **Netlify Docs**: https://docs.netlify.com
- **Vercel Docs**: https://vercel.com/docs
- **Heroku Docs**: https://devcenter.heroku.com
- **AWS Docs**: https://docs.aws.amazon.com
- **MongoDB Atlas**: https://docs.atlas.mongodb.com

---

## Emergency Procedures

### Database Outage
1. Switch to backup database
2. Restore from recent backup
3. Notify users
4. Update status page

### DDoS Attack
1. Enable CloudFlare protection
2. Increase rate limiting
3. Block suspicious IPs
4. Scale resources

### Data Breach
1. Take site offline if necessary
2. Change all credentials
3. Notify affected users
4. File incident report

---

## Maintenance Schedule

- **Daily**: Monitor server status
- **Weekly**: Review logs and errors
- **Monthly**: Security updates, backups
- **Quarterly**: Performance optimization
- **Annually**: Security audit, planning

---

**Deployment Guide Version**: 1.0  
**Last Updated**: January 19, 2026  
**Status**: Ready for Production

Good luck with your deployment! 🚀
