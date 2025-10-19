# 🏗️ AgentRate .NET Core Backend Implementation Guide

This guide provides everything needed to build the .NET Core backend with SQL Server for the AgentRate frontend.

---

## 📋 Overview

- **Frontend**: React 19 + Vite (Standalone with mock data)
- **Backend**: .NET Core 8.0+ (To be implemented)
- **Database**: SQL Server
- **API Style**: RESTful
- **Authentication**: JWT Bearer Token
- **Documentation**: Swagger/OpenAPI 3.0

---

## 📁 Current Status

✅ **Frontend**: Fully functional with mock data  
⏳ **Backend**: Ready for implementation  
⏳ **Database**: Schema design provided below

The frontend is currently using `/src/services/api.js` with mock data. All API calls are ready to be replaced with actual HTTP requests to your .NET Core backend.

---

## 🗄️ SQL Server Database Schema

### **1. Users Table**

```sql
CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Email NVARCHAR(255) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(MAX) NOT NULL,
    Name NVARCHAR(255) NOT NULL,
    Role NVARCHAR(50) NOT NULL CHECK (Role IN ('public_user', 'agency_staff', 'agency_admin')),
    OrganizationId INT NULL,
    Phone NVARCHAR(50),
    IsVerified BIT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (OrganizationId) REFERENCES Organizations(Id)
);

CREATE INDEX IX_Users_Email ON Users(Email);
CREATE INDEX IX_Users_Role ON Users(Role);
```

### **2. Organizations Table**

```sql
CREATE TABLE Organizations (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(255) NOT NULL,
    Address NVARCHAR(500),
    Phone NVARCHAR(50),
    Email NVARCHAR(255),
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE()
);
```

### **3. Agents Table**

```sql
CREATE TABLE Agents (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    Name NVARCHAR(255) NOT NULL,
    Email NVARCHAR(255),
    Phone NVARCHAR(50),
    Photo NVARCHAR(MAX), -- URL
    Company NVARCHAR(255),
    Location NVARCHAR(255),
    Rating DECIMAL(3,2) DEFAULT 0.00,
    ReviewCount INT DEFAULT 0,
    YearsExperience INT DEFAULT 0,
    Bio NVARCHAR(MAX),
    SalesVolume NVARCHAR(50), -- e.g., "$50M+"
    AvgDaysOnMarket INT,
    PriceAccuracy NVARCHAR(50), -- e.g., "98%"
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);

CREATE INDEX IX_Agents_Rating ON Agents(Rating DESC);
CREATE INDEX IX_Agents_Location ON Agents(Location);
```

### **4. AgentSpecialties Table**

```sql
CREATE TABLE AgentSpecialties (
    Id INT PRIMARY KEY IDENTITY(1,1),
    AgentId INT NOT NULL,
    Specialty NVARCHAR(255) NOT NULL,
    FOREIGN KEY (AgentId) REFERENCES Agents(Id) ON DELETE CASCADE
);

CREATE INDEX IX_AgentSpecialties_AgentId ON AgentSpecialties(AgentId);
```

### **5. Deals Table**

```sql
CREATE TABLE Deals (
    Id INT PRIMARY KEY IDENTITY(1,1),
    AgentId INT NOT NULL,
    Address NVARCHAR(500) NOT NULL,
    Suburb NVARCHAR(255),
    City NVARCHAR(255),
    State NVARCHAR(50),
    PropertyType NVARCHAR(50) CHECK (PropertyType IN ('House', 'Apartment', 'Townhouse', 'Land', 'Commercial')),
    DealType NVARCHAR(50) CHECK (DealType IN ('sale', 'rent')),
    Status NVARCHAR(50) CHECK (Status IN ('sold', 'leased', 'active', 'under_contract')),
    Bedrooms INT,
    Bathrooms INT,
    CarSpaces INT,
    LandSize NVARCHAR(50),
    BuildingArea NVARCHAR(50),
    Price DECIMAL(18,2),
    SoldDate DATE,
    DaysOnMarket INT,
    Description NVARCHAR(MAX),
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (AgentId) REFERENCES Agents(Id)
);

CREATE INDEX IX_Deals_AgentId ON Deals(AgentId);
CREATE INDEX IX_Deals_Suburb ON Deals(Suburb);
CREATE INDEX IX_Deals_PropertyType ON Deals(PropertyType);
CREATE INDEX IX_Deals_Status ON Deals(Status);
```

### **6. DealPhotos Table**

```sql
CREATE TABLE DealPhotos (
    Id INT PRIMARY KEY IDENTITY(1,1),
    DealId INT NOT NULL,
    PhotoUrl NVARCHAR(MAX) NOT NULL,
    DisplayOrder INT DEFAULT 0,
    FOREIGN KEY (DealId) REFERENCES Deals(Id) ON DELETE CASCADE
);

CREATE INDEX IX_DealPhotos_DealId ON DealPhotos(DealId);
```

### **7. DealFeatures Table**

```sql
CREATE TABLE DealFeatures (
    Id INT PRIMARY KEY IDENTITY(1,1),
    DealId INT NOT NULL,
    Feature NVARCHAR(255) NOT NULL,
    FOREIGN KEY (DealId) REFERENCES Deals(Id) ON DELETE CASCADE
);
```

### **8. Reviews Table**

```sql
CREATE TABLE Reviews (
    Id INT PRIMARY KEY IDENTITY(1,1),
    AgentId INT NOT NULL,
    UserId INT NOT NULL,
    Author NVARCHAR(255) NOT NULL,
    Rating INT CHECK (Rating BETWEEN 1 AND 5),
    Comment NVARCHAR(MAX),
    Verified BIT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (AgentId) REFERENCES Agents(Id),
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);

CREATE INDEX IX_Reviews_AgentId ON Reviews(AgentId);
CREATE INDEX IX_Reviews_Rating ON Reviews(Rating DESC);
```

### **9. SavedAgents Table**

```sql
CREATE TABLE SavedAgents (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    AgentId INT NOT NULL,
    SavedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id),
    FOREIGN KEY (AgentId) REFERENCES Agents(Id),
    UNIQUE(UserId, AgentId)
);
```

### **10. UserPreferences Table**

```sql
CREATE TABLE UserPreferences (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL UNIQUE,
    Location NVARCHAR(255),
    PropertyType NVARCHAR(50),
    Budget DECIMAL(18,2),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);
```

---

## 🔧 .NET Core Project Structure

```
AgentRate.API/
├── Controllers/
│   ├── AuthController.cs
│   ├── AgentsController.cs
│   ├── DealsController.cs
│   ├── ReviewsController.cs
│   ├── UsersController.cs
│   ├── OrganizationsController.cs
│   └── SearchController.cs
│
├── Models/
│   ├── DTOs/
│   │   ├── Auth/
│   │   │   ├── LoginRequest.cs
│   │   │   ├── LoginResponse.cs
│   │   │   └── RegisterRequest.cs
│   │   ├── Agent/
│   │   │   ├── AgentDto.cs
│   │   │   └── AgentListDto.cs
│   │   ├── Deal/
│   │   │   ├── DealDto.cs
│   │   │   └── CreateDealRequest.cs
│   │   └── Review/
│   │       ├── ReviewDto.cs
│   │       └── SubmitReviewRequest.cs
│   │
│   └── Entities/
│       ├── User.cs
│       ├── Organization.cs
│       ├── Agent.cs
│       ├── Deal.cs
│       └── Review.cs
│
├── Data/
│   ├── AgentRateDbContext.cs
│   └── Migrations/
│
├── Services/
│   ├── IAuthService.cs
│   ├── AuthService.cs
│   ├── IAgentService.cs
│   ├── AgentService.cs
│   ├── IDealService.cs
│   ├── DealService.cs
│   └── IReviewService.cs
│
├── Repositories/
│   ├── IGenericRepository.cs
│   ├── GenericRepository.cs
│   └── ... (specific repositories)
│
├── Middleware/
│   ├── ErrorHandlingMiddleware.cs
│   └── JwtMiddleware.cs
│
├── Helpers/
│   ├── JwtHelper.cs
│   ├── PasswordHelper.cs
│   └── AutoMapperProfile.cs
│
├── appsettings.json
├── appsettings.Development.json
└── Program.cs
```

---

## 🚀 Implementation Steps

### **Step 1: Create .NET Core Project**

```bash
dotnet new webapi -n AgentRate.API
cd AgentRate.API

# Install required packages
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package BCrypt.Net-Next
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
dotnet add package Swashbuckle.AspNetCore
```

### **Step 2: Configure appsettings.json**

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=AgentRateDb;Trusted_Connection=True;TrustServerCertificate=True"
  },
  "JwtSettings": {
    "Secret": "YOUR_SECRET_KEY_HERE_MINIMUM_32_CHARACTERS",
    "Issuer": "AgentRateAPI",
    "Audience": "AgentRateFrontend",
    "ExpiryMinutes": 1440
  },
  "AllowedOrigins": [
    "http://localhost:3000",
    "https://yourdomain.com"
  ]
}
```

### **Step 3: Configure Program.cs**

```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using AgentRate.API.Data;
using AgentRate.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// Database
builder.Services.AddDbContext<AgentRateDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// JWT Authentication
var jwtSecret = builder.Configuration["JwtSettings:Secret"];
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
            ValidAudience = builder.Configuration["JwtSettings:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret))
        };
    });

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(builder.Configuration.GetSection("AllowedOrigins").Get<string[]>())
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// Services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IAgentService, AgentService>();
builder.Services.AddScoped<IDealService, DealService>();

// AutoMapper
builder.Services.AddAutoMapper(typeof(Program));

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "AgentRate API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

### **Step 4: Create DbContext**

```csharp
using Microsoft.EntityFrameworkCore;
using AgentRate.API.Models.Entities;

namespace AgentRate.API.Data
{
    public class AgentRateDbContext : DbContext
    {
        public AgentRateDbContext(DbContextOptions<AgentRateDbContext> options) 
            : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<Agent> Agents { get; set; }
        public DbSet<Deal> Deals { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<SavedAgent> SavedAgents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure relationships and constraints here
            modelBuilder.Entity<SavedAgent>()
                .HasIndex(sa => new { sa.UserId, sa.AgentId })
                .IsUnique();

            // Seed data if needed
        }
    }
}
```

### **Step 5: Run Migrations**

```bash
# Create initial migration
dotnet ef migrations add InitialCreate

# Update database
dotnet ef database update
```

---

## 🔌 Frontend Integration

### **Update Frontend .env**

```env
VITE_BACKEND_URL=http://localhost:5000/api
```

### **Update api.js (Replace Mock with Real API)**

Replace the mock implementations in `/frontend/src/services/api.js` with actual HTTP calls:

```javascript
// Example: Real API implementation
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const getAgents = async (filters = {}) => {
  const response = await api.get('/agents', { params: filters });
  return response.data;
};

// ... implement all other API functions
```

---

## 📚 API Documentation

The complete API specification is available in:
- **Swagger YAML**: `/frontend/API_SPECIFICATION.yaml`
- **Swagger UI**: Will be available at `http://localhost:5000/swagger` when .NET Core API is running

---

## ✅ Testing Checklist

### **Backend Testing**
- [ ] User registration and login
- [ ] JWT token generation and validation
- [ ] CRUD operations for Agents
- [ ] CRUD operations for Deals
- [ ] Review submission and retrieval
- [ ] Search functionality
- [ ] Authorization (role-based access)

### **Integration Testing**
- [ ] Frontend can connect to backend
- [ ] Authentication flow works
- [ ] All API endpoints return correct data
- [ ] Error handling works properly
- [ ] CORS is configured correctly

---

## 🚀 Deployment

### **Backend Deployment**
```bash
# Publish .NET Core app
dotnet publish -c Release -o ./publish

# Configure IIS or Azure App Service
# Update connection strings for production
```

### **Database Deployment**
- Use Entity Framework Migrations
- Or execute SQL scripts on production SQL Server

### **Frontend Update**
```env
# Production .env
VITE_BACKEND_URL=https://api.yourdomain.com/api
```

---

## 📞 Support

For questions or clarifications:
- Review the Swagger documentation
- Check mock API implementations in `/frontend/src/services/api.js`
- Refer to mock data in `/frontend/src/mock/` folder

---

**Happy Coding! 🎉**
