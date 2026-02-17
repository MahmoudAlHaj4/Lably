# Lably - Design Documentation 

Lably is a specialized job board for the dental technology industry. It connects dental labs and clinics with pre-verified CAD/CAM specialists, dental technicians, and dental lab professionals.


## What Makes Lably Different?

Unlike general job boards, Lably maintains high quality standards through a rigorous verification process:

- **Verified Candidates Only:** All job seekers must pass interviews and technical assessments before appearing on the platform
- **Live Technical Assessments:** Candidates demonstrate their skills by creating dental work live in front of specialists
- **Industry-Specific:** Focused exclusively on dental technology roles (CAD/CAM, dental technicians, lab technicians)
- **Quality Over Quantity:** Employers access a curated pool of qualified professionals, not hundreds of unvetted applicants

## Target Users

**Job Seekers:**
- Dental technicians
- CAD/CAM specialists  
- Dental lab technicians

**Employers:**
- Dental laboratories
- Dental clinics

**Platform Owner:**
- Manages verification process
- Conducts technical interviews
- Maintains platform quality

## Why These Three Roles?

I chose a three role system for the following reasons:

### 1. Clear Separation of Concens

- **Job Seekers** (dental technicians, CAD/CAM specialists) are looking for work.
- **Employers** (dental labs, clinics) are looking for verified talent.
- Job seeker looking for work should never see "Post A Job" functionality.
- An Employer hiring candidates should never see "Apply for Job" functionality.
- Separation roles prevents UI clutter and confusion.

### 2. Secuirty and Data Protection

- Job seekers should not access employer dashboard.
- Employer should not access other employers applications.

### 3. Admin Role for Platform Management
- **Verification Process:** Admin conducts interviews and technical assessments for all job seekers
- **Quality Control:** Only verified candidates appear on the platform - maintaining Lably's core value proposition
- **Platform Moderation:** Manages users, jobs, and ensures platform quality
- Admin can see overview statistics like how many verified candidates, active jobs, and applications

4. Simplicity for V1

- Three roles cover all essential use cases without overcomplicating the system.
- More roles (recruiter, company admin, moderator) can be added later if needed.
- Keeps authentication and authorization logic straightforward.

## Role Permissions & Access Control

| Feature/Action | Job Seeker | Employer | Admin |
|----------------|------------|----------|-------|
| **Authentication** |
| Register account | ✅ (pending verification) | ✅ | ❌ (created manually) |
| Login/Logout | ✅ (only if verified) | ✅ | ✅ |
| **Profile Management** |
| Create own profile | ✅ | ✅ | ❌ |
| Edit own profile | ✅ | ✅ | ❌ |
| Delete own profile | ✅ | ✅ | ❌ |
| View other users' profiles | ❌ | ❌ (only verified applicants) | ✅ (all users) |
| **Verification** |
| Submit for verification | ✅ (after registration) | ❌ | ❌ |
| Conduct interviews | ❌ | ❌ | ✅ |
| Approve/reject candidates | ❌ | ❌ | ✅ |
| View verification status | ✅ (own status) | ❌ | ✅ (all statuses) |
| **Jobs** |
| Browse/search jobs | ✅ (only verified) | ❌ | ✅ (all jobs) |
| View job details | ✅ (only verified) | ❌ | ✅ |
| Post new job | ❌ | ✅ | ❌ |
| Edit own job | ❌ | ✅ | ❌ |
| Delete own job | ❌ | ✅ | ❌ |
| Delete any job | ❌ | ❌ | ✅ |
| See application count | ❌ | ✅ (own jobs) | ✅ (all jobs) |
| **Applications** |
| Apply to job | ✅ (only verified) | ❌ | ❌ |
| View own applications | ✅ | ❌ | ❌ |
| View received applications | ❌ | ✅ (own jobs, verified only) | ✅ (all) |
| View applicant profiles | ❌ | ✅ (verified who applied) | ✅ (all) |
| View applicant resumes | ❌ | ✅ (verified who applied) | ✅ (all) |
| **Platform Management** |
| View platform statistics | ❌ | ❌ | ✅ |
| Delete any user | ❌ | ❌ | ✅ |
| View all users list | ❌ | ❌ | ✅ |
| View pending verifications | ❌ | ❌ | ✅ |

## Core Features (V1)

### Job Seekers
- Submit application (creates pending verification request).
- Upload CV/resume.
- Upload work samples/portfolio.
- Submit for verification.
- Wait for admin to review and schedule interview.
- Complete interview and live technical assessment with admin.
- Once verified:
  - Create/edit profile.
  - Add about section.
  - Add experience section.
  - Search and browse jobs.
  - Apply to jobs.


### Employers
- Register and login.
- Post jobs.
- View applications received.
- View applicant profiles and resumes.
- Edit/delete jobs.

### Admin
- Login.
- View pending verification requests.
- Review candidate submissions (CV and work samples).
- Schedule interviews with candidates.
- Conduct interviews.
- Administer live technical assessments.
- Approve or reject candidates with feedback.
- View all users (pending, verified, rejected).
- Delete users.
- View all jobs.
- Delete jobs.
- View all applications.
- View platform statistics (total verified candidates, pending verifications, etc.).

## Why These Features for V1?

### Focus on Verification Over Everything Else
**Problem:** Most dental labs and clinics struggle to find qualified candidates. Generic job boards are flooded with unqualified applicants, wasting employers time.

**Solution:** Lably's core value is quality over quantity. The verification process ensures only qualified dental technicians and CAD/CAM specialists appear on the platform. This makes it dramatically easier for employers to find the right candidate.

**Why verification is V1 priority:**
- It's Lably's competitive advantage and main differentiator
- Without it, Lably is just another generic job board
- Employers will use the platform specifically because candidates are pre-verified

### Simple Registration and Job Posting 
**Decision:** Keep employer registration and job posting free and unlimited for V1.

**Reason:**
- Focus on building the core product first
- Need to attract employers to the platform before charging
- Payment integration adds complexity
- Can add paid tiers in V2 once platform proves valuable

## What's Intentionally Left Out for V2

- Direct messaging between employers and candidates
- Email notifications 
- Saved/bookmarked jobs for job seekers
- AI-powered job recommendations and matching
- Payment system and employer subscription tiers
- Advanced analytics dashboard for employers

## Database Schema

### users
- id: UUID (PRIMARY KEY)
- email: VARCHAR(255), UNIQUE, NOT NULL
- password: VARCHAR(255), NOT NULL (hashed)
- role: ENUM('job_seeker', 'employer', 'admin')
- created_at: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP
- updated_at: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
- is_active: BOOLEAN, DEFAULT TRUE

### job_seekers_profiles
- id: UUID (PRIMARY KEY)
- user_id: UUID (FOREIGN KEY-> users.id), UNIQUE
- full_name: VARCHAR(255), NOT NULL
- phone: VARCHAR(255)
- address: VARCAHR(255)
- about: TEXT
- verified_at: TIMESTAMP (NULL - set when approved)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP

### experiences
- id: UUID (PRIMARY KEY)
- job_seeker_profile_id: UUID (FOREIGN KEY-> job_seekers_profiles.id)
- company_name: VARCHAR(255)
- job_title: VARCHAR(255)
- start_date: DATE
- end_date: DATE (NULLABLE - FOR CURRENT JOB)
- description: TEXT
- created_at: TIMESTAP

### jobs
- id: UUID (PRIMARY KEY)
- employer_id: UUID (FOREIGN KEY → users.id where role='employer')
- job_title: VARCHAR(255), NOT NULL
- description: TEXT, NOT NULL
- requirements: TEXT
- location: VARCHAR(255) (or separate city/state/country?)
- job_type: ENUM('remote', 'on-site', 'hybrid'), NOT NULL
- created_at: TIMESTAMP
- updated_at: TIMESTAMP

### applications 
- id: UUID (PRIMARY KEY)
- job_seeker_id: UUID (FOREIGN KEY → users.id)
- job_id: UUID (FOREIGN KEY → jobs.id)
- cover_letter: TEXT
- resume_path: VARCHAR(255)
- applied_at: TIMESTAMP
- UNIQUE(job_seeker_id, job_id)

### employer_profiles
- id: UUID (PRIMARY KEY)
- user_id: UUID (FOREIGN KEY → users.id), UNIQUE
- company_name: VARCHAR(255), NOT NULL
- company_description: TEXT
- location: VARCHAR(255) (or separate city/state/country?)
- website: VARCHAR(255) (optional - company website)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP

### pending_applications
- id: UUID (PRIMARY KEY)
- email (VARCHAR) UNIQUE NOT NULL
- full_name (VARCHAR)
- phone (VARCHAR)
- address (VARCHAR, optional)
- resume_path: VARCHAR(255), NOT NULL
- portfolio_path: TEXT (stores JSON array of file paths)
- submitted_at: TIMESTAMP
- reviewed_at: TIMESTAMP (NULL until reviewed)
- interview_scheduled_at: TIMESTAMP (NULL)
- interview_completed_at: TIMESTAMP (NULL)
- verification_result: ENUM('pending', 'approved', 'rejected'), DEFAULT 'pending'
- assessment_notes: TEXT (admin's notes from technical assessment)
- decision_notes: TEXT 
- reviewed_by: UUID (FOREIGN KEY → users.id where role='admin') (NULL until reviewed)

## Database Design Decisions

### 1. Single users Table with Role Field

**Decision:** Store all users (job seekers, employers, admins) in one `users` table with a `role` field.

**Reason:**
- Avoids code duplication, authentication logic works the same for all user types
- Simpler to maintain, one login system instead of three separate ones
- All users share common fields (email, password, timestamps, is_active)
- Role-specific data (verification status, company info) lives in separate tables where it belongs

**Alternative considered:** Separate `job_seekers`, `employers`, and `admins` tables.

**Why rejected:** Would require building three authentication systems with nearly identical code. makes maintenance harder.

### 2. Separate Profile Tables

**Decision:** User-specific data lives in separate tables (`job_seeker_profiles`, `employer_profiles`) linked by foreign key to `users`.

**Reason:**
- Keeps `users` table clean and focused on authentication
- Job seekers and employers have completely different profile fields
- Easier to query - don't need to filter through irrelevant NULL fields
- Better data organization - profile data is separated from authentication data

**Alternative considered:** Store all profile fields directly in the `users` table with many nullable columns.

**Why rejected:** Would result in a bloated `users` table with many NULL values. A job seeker doesn't need `company_name` field and an employer doesn't need `resume_path` field.

### 3. Separate pending_applications Table

**Decision:** Verification data (CV, portfolio, interview tracking) stored in dedicated `pending_applications` table, not in `job_seeker_profiles`.

**Reason:**
- Keeps `job_seeker_profiles` focused on public profile information
- Verification is a one-time process with specific workflow tracking needs
- Easier to query pending verifications without loading all profile data
- Clear separation: profile data vs verification process data

**Alternative considered:** Store verification fields directly in `job_seeker_profiles`.

**Why rejected:** Would clutter the profile table with process-tracking fields (interview dates, assessment notes, rejection reasons) that aren't part of the public profile.

### 4. Admin Account Creation

**Decision:** Admins cannot self-register. Admin accounts are created manually via direct database insert.

**Reason:**
- Security - prevents anyone from making themselves an admin
- Admin is a privileged role that conducts verification interviews
- For V1, only the platform owner needs admin access
- Simple solution for small-scale application

**Implementation:** Use SQL INSERT or database seed script to create initial admin account.


### 5. UUIDs Instead of Auto-Increment IDs

**Decision:** Use UUIDs for all primary keys instead of auto-increment integers.

**Reason:**
- **Security:** Users cannot guess other users IDs by incrementing numbers (e.g., `/users/1`, `/users/2`)
- **Privacy:** Protects against enumeration attacks where someone could discover all users
- **Scalability:** UUIDs are globally unique  no ID conflicts if scaling to multiple databases
- **Flexibility:** Can generate IDs in application code before inserting into database

**Alternative considered:** Auto-increment INT IDs (1, 2, 3...).

**Why rejected:** Sequential IDs expose how many users/jobs exist and make it easy to guess valid IDs. Security and privacy are more important than slightly better performance.

**Trade-off:** UUIDs take more storage space (36 characters vs 4-8 bytes) and are slightly slower to index, but this is acceptable for the security benefits.

### 6. Why Separate experiences Table?
**Decision:** Store work experience in separate experiences table instead of TEXT field in profile.

**Reason:**
- Job seekers can have multiple work experiences (5-10+ jobs over career)
- Each experience needs structured data (company, title, dates, description)
- Easier to query, filter, and display individual experiences
- Can add/edit/delete individual experiences without touching entire profile

**Alternative:** Store as JSON or TEXT in job_seeker_profiles.experiences
**Why rejected:** Makes querying difficult, can't easily filter by company or date range, harder to validate data structure.

### 7. File Upload Specifications

### Resume Upload
- Allowed formats: PDF only
- Max file size: 2MB
- Storage path: /uploads/resumes/{user_id}.pdf
- Validation: Check MIME type (application/pdf)

### Portfolio Upload  
- Allowed formats: PDF, JPG, PNG
- Max file size: 5MB per file
- Max files: 5 files per submission
- Storage path: /uploads/portfolios/{user_id}_{timestamp}.{ext}
- Storage in database: JSON array of file paths
- Validation: Check MIME type (application/pdf, image/jpeg, image/png)


## Tech Stack

### Frontend
- **HTML/CSS/JavaScript (Vanilla)** - No framework dependencies, full control over code
- **CSS** - Custom styling without framework overhead

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for building REST API

### Database
- **PostgreSQL** - Relational database

### File Storage
- **Local Filesystem (Development)** - Store uploaded files in `/uploads` directory
- **Cloudinary (Production - Free Tier)** - Cloud storage for resumes and portfolios

**Alternative considered:** AWS S3
**Why rejected for V1:** More complex setup, pricing less predictable for beginners, Cloudinary's free tier is sufficient.

### Authentication
- **JWT (JSON Web Tokens)** - Stateless authentication
- **bcrypt** - Password hashing


## Architecture

### Backend File Structure
```
lably-backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── jobSeekerController.js
│   │   ├── employerController.js
│   │   ├── adminController.js
│   │   └── PendingApplicationsController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── JobSeekerProfile.js
│   │   ├── EmployerProfile.js
│   │   ├── Job.js
│   │   ├── Application.js
│   │   ├── Experience.js
│   │   └── Verification.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── jobSeekerRoutes.js
│   │   ├── employerRoutes.js
│   │   ├── adminRoutes.js
│   │   └── verificationRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── config/
│   │   └── database.js
│   └── utils/
│       ├── jwtUtils.js
│       └── fileUtils.js
├── uploads/
│   ├── resumes/
│   └── portfolios/
├── server.js
├── .env
└── package.json
```

### Frontend File Structure
```
lably-frontend/
├── index.html
|── pages/
│   ├── auth/
│   ├── jobSeeker/
│   ├── employer/
│   └── admin/
├── css/
│   ├── styles.css
│   ├── auth.css
│   └── dashboard.css
├── js/
│   ├── auth/
│   │   ├── login.js
│   │   └── register.js
│   ├── jobSeeker/
│   │   ├── profile.js
│   │   ├── jobs.js
│   │   └── applications.js
│   ├── employer/
│   │   ├── dashboard.js
│   │   ├── postJob.js
│   │   └── viewApplications.js
│   ├── admin/
│   │   ├── dashboard.js
│   │   ├── verifications.js
│   │   └── users.js
│   └── utils/
│       ├── api.js
│       └── auth.js
└── assets/
    └── images/
```

### File Responsibilities

**Backend:**

**controllers/** - Handle HTTP requests and responses
- `authController.js` - Registration, login, logout logic
- `jobSeekerController.js` - Job seeker profile CRUD, job browsing, applications
- `employerController.js` - Employer profile, job posting, viewing applications
- `adminController.js` - User management, platform statistics
- `verificationController.js` - Verification workflow (submit, review, approve/reject)

**models/** - Database schemas and queries
- Each model file represents one database table
- Contains SQL queries for CRUD operations
- Data validation logic

**routes/** - API endpoint definitions
- Maps URLs to controller functions

**middleware/** - Request preprocessing
- `authMiddleware.js` - Verify JWT tokens, protect routes
- `roleMiddleware.js` - Check user roles (job_seeker, employer, admin)
- `uploadMiddleware.js` - Handle file uploads (Multer)

**config/** - Configuration files
- `database.js` - PostgreSQL connection setup

**utils/** - Helper functions
- `jwtUtils.js` - Generate and verify JWT tokens
- `fileUtils.js` - File upload, validation, deletion

---

**Frontend:**

**js/auth/** - Authentication pages
- Login and registration forms
- JWT token storage in localStorage

**js/jobSeeker/** - Job seeker features
- Profile management
- Job browsing and search
- Application submission

**js/employer/** - Employer features
- Job posting
- Viewing applications
- Managing posted jobs

**js/admin/** - Admin features
- Verification queue management
- User and job moderation

**js/utils/** - Shared utilities
- `api.js` - Fetch wrapper for API calls, handles JWT headers
- `auth.js` - Check if user is logged in, get current user role

---

### Why Separate Files?

**Separation of Concerns**
- Each file has one clear responsibility
- Easy to find where specific logic lives
- Can test each part independently

**Benefits:**
- **Easier debugging** - Know exactly where to look for issues
- **Scalability** - Can add new features without touching existing code
- **Collaboration ready** - Multiple developers can work on different files
- **Maintainability** - Changes to one feature don't break others

**Example:** If verification logic needs updating, I only touch `verificationController.js` and `verificationRoutes.js`, without affecting job posting or authentication code.