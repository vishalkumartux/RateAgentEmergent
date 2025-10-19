# 🚀 AgentRate - Local Development Setup

Your AgentRate codebase is now **fully migrated to Vite** with React 19! This guide will help you run it on your local machine.

---

## 📋 Prerequisites

Install these before starting:

### **1. Node.js & Yarn**
```bash
# Download Node.js 18+ from: https://nodejs.org/
node --version  # Should be 18.x or higher

# Install Yarn
npm install -g yarn
yarn --version
```

### **2. Python 3.8+**
```bash
# Download from: https://python.org/
python --version  # or python3 --version
```

### **3. MongoDB**
Choose one option:

**Option A - Local MongoDB:**
```bash
# Download from: https://mongodb.com/try/download/community
mongod --version
```

**Option B - Docker:**
```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

**Option C - MongoDB Atlas (Cloud):**
- Sign up at https://mongodb.com/cloud/atlas
- Get connection string

---

## 📥 Step 1: Get the Code

### **Option A: From GitHub (Recommended)**
1. In Emergent chat, click **"Save to GitHub"**
2. Clone to your machine:
```bash
git clone https://github.com/yourusername/agentrate.git
cd agentrate
```

### **Option B: Manual Download**
- Download the entire `/app` folder from Emergent
- Extract to your project directory

---

## ⚙️ Step 2: Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

**Create `backend/.env` file:**
```env
MONGO_URL=mongodb://localhost:27017/agentrate
PORT=8001
```

*If using MongoDB Atlas, replace with your connection string:*
```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/agentrate
```

---

## ⚙️ Step 3: Frontend Setup

```bash
cd frontend

# Install dependencies
yarn install
```

**Update `frontend/.env` for local:**
```env
VITE_BACKEND_URL=http://localhost:8001
```

---

## 🚀 Step 4: Run Everything

Open **3 separate terminals**:

### **Terminal 1 - MongoDB (if running locally):**
```bash
mongod
# Or if using Docker:
docker start mongodb
```

### **Terminal 2 - Backend:**
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

### **Terminal 3 - Frontend (Vite):**
```bash
cd frontend
yarn dev
# Or: yarn start
```

---

## ✅ Access Your App

- **🌐 Frontend:** http://localhost:3000 or http://localhost:3001
- **🔧 Backend API:** http://localhost:8001
- **📚 API Docs:** http://localhost:8001/docs

---

## 🛠️ Development Commands

### **Frontend (Vite):**
```bash
yarn dev          # Start dev server with hot reload
yarn build        # Build for production
yarn preview      # Preview production build
```

### **Backend:**
```bash
# Start server
uvicorn server:app --reload --port 8001

# Run with logs
uvicorn server:app --reload --log-level debug
```

### **Database:**
```bash
# Connect to MongoDB shell
mongosh

# View databases
show dbs

# Use agentrate database
use agentrate

# View collections
show collections
```

---

## 💡 VS Code Recommended Extensions

Install these for the best experience:

- **ES7+ React/Redux/React-Native snippets**
- **Python**
- **Prettier - Code formatter**
- **ESLint**
- **Tailwind CSS IntelliSense**
- **MongoDB for VS Code**
- **GitLens**

---

## 🔥 Vite Benefits

Your frontend now uses **Vite** instead of Create React App:

✅ **10x faster** startup time  
✅ **Instant hot reload** - changes appear immediately  
✅ **React 19** - Latest version  
✅ **Better build performance**  
✅ **Modern ES modules**  
✅ **Smaller bundle sizes**  

---

## 📁 Project Structure

```
agentrate/
├── backend/
│   ├── server.py          # FastAPI main app
│   ├── requirements.txt   # Python dependencies
│   └── .env              # Backend config
│
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── mock/         # Mock data
│   │   ├── App.jsx       # Main app component
│   │   └── index.jsx     # Entry point
│   ├── index.html        # HTML template
│   ├── vite.config.js    # Vite configuration
│   ├── package.json      # Dependencies
│   └── .env              # Frontend config
│
└── LOCAL_SETUP.md        # This file
```

---

## 🐛 Troubleshooting

### **Port already in use:**
```bash
# Frontend
PORT=3001 yarn dev

# Backend
uvicorn server:app --reload --port 8002
```

### **Module not found errors:**
```bash
# Frontend
rm -rf node_modules yarn.lock
yarn install

# Backend
pip install -r requirements.txt --force-reinstall
```

### **MongoDB connection failed:**
```bash
# Check if MongoDB is running
mongosh
# Or check Docker:
docker ps | grep mongo
```

### **Vite build errors:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
yarn dev
```

---

## 🔑 Key Differences from Emergent

When running locally:

1. **Environment Variables:**
   - Use `VITE_` prefix (not `REACT_APP_`)
   - Update `.env` files for local URLs

2. **MongoDB:**
   - Set up your own database
   - Update `MONGO_URL` in backend/.env

3. **No Supervisor:**
   - Run each service manually in separate terminals

4. **Hot Reload:**
   - Vite provides instant updates
   - Backend auto-reloads with `--reload` flag

---

## 🎉 You're All Set!

Your AgentRate app is now running locally with:
- ⚡ **Vite** for blazing-fast development
- ⚛️ **React 19** - Latest version
- 🐍 **FastAPI** backend
- 🍃 **MongoDB** database

**Happy coding!** 🚀

---

## 📞 Need Help?

- Check the error logs in your terminals
- Review the `.env` files for correct URLs
- Ensure all services are running (MongoDB, Backend, Frontend)
- Check firewall/antivirus isn't blocking ports 3000, 8001, 27017

