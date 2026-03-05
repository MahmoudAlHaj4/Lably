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

## Role System
Three roles cover all essential V1 use cases while keeping auth logic straightforward.
**Separation of Concerns:** Job seekers never see "Post a Job." Employers never see "Apply for Job." This prevents UI clutter and role confusion.
**Security:** Job seekers cannot access employer dashboards. Employers cannot access other employers' applications.
**Admin:** Handles verification interviews, quality control, and moderation. Admin accounts are created manually via database insert to prevent unauthorized privilege escalation.

## Role Permissions & Access Control

### 1. Authentication
**Register:** Seeker ✅ pending · Employer ✅ · Admin ❌ manual
**Login:** Seeker ✅ verified only · Employer ✅ · Admin ✅

### 2.Profile
**Create/edit/delete:** Seeker ✅ · Employer ✅ · Admin ❌
**View others:** Seeker ❌ · Employer ❌ applicants only · Admin ✅ all

### 3.Verification
**Submit:** Seeker ✅ · Employer ❌ · Admin ❌
**Conduct interviews:** Seeker ❌ · Employer ❌ · Admin ✅
**Approve/reject:** Seeker ❌ · Employer ❌ · Admin ✅
**View status:** Seeker ❌ · Employer ❌ · Admin ✅ all

### 4.Jobs
**Browse/view:** Seeker ✅ verified only · Employer ❌ · Admin ✅
**Post/edit/delete own:** Seeker ❌ · Employer ✅ · Admin ❌
**Delete any:** Seeker ❌ · Employer ❌ · Admin ✅
**Application count:** Seeker ❌ · Employer ✅ own · Admin ✅ all

### 5.Applications
**Apply:** Seeker ✅ verified only · Employer ❌ · Admin ❌
**View own:** Seeker ✅ · Employer ❌ · Admin ❌
**View received:** Seeker ❌ · Employer ✅ own · Admin ✅ all
**View profiles/resumes:** Seeker ❌ · Employer ✅ verified only · Admin ✅ all

### 6.Platform

**Statistics / delete any user / view all users:** Seeker ❌ · Employer ❌ · Admin ✅

## Core Features (V1)

### Job Seekers
- Submit application (creates pending verification request).
- Upload CV/resume.
- Upload work samples/portfolio.
- Submit for verification.
- Once verified:
  - Create/edit profile.
  - Add about section.
  - Add experience section.
  - Search and browse jobs.
  - Apply to jobs.


### Employers
- Register with email verification and login.
- Post jobs.
- View applications received.
- View applicant profiles and resumes.
- Edit/delete jobs.

### Admin
- Login.
- View pending verification requests.
- Review candidate submissions (CV and work samples).
- Approve or reject candidates with decision notes.
- View all users (pending, verified, rejected).
- Delete users.
- View all jobs.
- Delete jobs.
- View all applications.
- View platform statistics (total verified candidates, pending verifications, etc.).

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
- activation_token: VARCHAR(255), NULL
- activation_token_expires: TIMESTAMP, NULL

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
- company_name: VARCHAR(255) NOT NULL
- job_title: VARCHAR(255) NOT NULL
- start_date: DATE NOT NULL
- end_date: DATE (NULLABLE - FOR CURRENT JOB)
- description: TEXT
- created_at: TIMESTAP

### jobs
- id: UUID (PRIMARY KEY)
- employer_id: UUID (FOREIGN KEY → users.id where role='employer')
- status:  ENUM('active', 'filled', 'closed')
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
- application_status: ENUM('pending', 'approved', 'rejected'), DEFAULT 'pending'
- decision_notes: TEXT 
- reviewed_by: UUID (FOREIGN KEY → users.id where role='admin') (NULL until reviewed)

## Database Design Decisions

**Single users Table:** All users share common fields so one table avoids duplicating auth logic. Role-specific data lives in separate profile tables.
**Separate Profile Tables:** job_seeker_profiles and employer_profiles keep the users table focused on authentication. A shared table would result in many irrelevant NULL columns per user.
**Separate pending_applications Table:** — Verification is a one-time workflow with its own tracking needs (decision notes, file paths, review timestamps). Mixing it into job_seeker_profiles would clutter the public-facing profile table.
**UUIDs over Auto-Increment IDs:** Prevents enumeration attacks where someone could guess valid IDs by incrementing integers (e.g. /users/1, /users/2). Trade-off is slightly more storage and marginally slower indexing, which is acceptable.
**Separate experiences Table:** Job seekers can have 5–10+ experiences, each needing structured data. A separate table makes it easy to add, edit, or delete individual entries. Storing as JSON would make querying and validation significantly harder.
**Activation Tokens in users Table:** Token fields are NULL until needed and cleared after use. A separate tokens table adds complexity with no V1 benefit. Can be refactored in V2 if more token types are needed.

## File Upload Specifications
**Resume:** PDF only, max 2MB. Path: /uploads/resumes/{user_id}.pdf
**Portfolio:** PDF, JPG, or PNG. Max 5MB per file, up to 5 files. Path: /uploads/portfolios/{user_id}_{timestamp}.{ext}. Stored in DB as JSON array of file paths.

## Tech Stack
- **HTML/CSS/JavaScript (Vanilla)** 
- **Node.js** 
- **Express.js** 
- **MySQL** 
- **Local Filesystem (Development)** 
- **JWT (JSON Web Tokens)**
- **bcrypt** 

## Testing Strategy

Integration tests using Jest and Supertest against a real PostgreSQL database (Neon) to catch real-world issues that mocks would miss.

### Why Real Database
A real DB catches actual constraint violations, duplicate entries, and failures.

### What I Test
**Authentication** — login success, wrong password, wrong email.
**Pending Applications** — file upload submission, missing resume validation.
**Activation Flow** — the full end-to-end flow:
- Job seeker submits application
- Admin approves and generates activation token
- Invalid token rejection
- Successful account activation with valid token
- Login after activation confirms full flow works

### Cleanup Strategy
Every test file runs `beforeAll` and `afterAll` cleanup against the test email to ensure a fresh state before each run and no leftover data after — protecting against false failures from crashed previous runs

## Architecture

### Backend File Structure
```
lably-backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── utils/
├── uploads/
├── server.js
├── .env
└── package.json
```

### Frontend File Structure
```
lably-frontend/
├── index.html
|── pages/
├── css/
├── js/
│   ├── auth/
│   ├── jobSeeker/
│   ├── employer/
│   ├── admin/
│   └── utils/
└── assets/
    └── images/
```


## API Endpoints 

### Authentication 
1. POST /api/auth/login
2. POST /api/auth/activate
3. POST /api/auth/register

### Job Seeker Application 
1. POST /api/pendingApplications/submit

### Employer - Profile 
1. POST /api/employer/profile/employer-profile
2. PUT /api/employer/profile/employer-profile
3. GET /api/empoyer/profile/employer-profile

### Job Seeker - Profile
1. POST /api/job-seeker/profile/job-seeker-profile
2. PUT /api/job-seeker/profile/job-seeker-profile
3. GET /api/job-seeker/profile/job-seeker-profile

### Experience 
1. GET /api/experience-section/experience
2. GET /api/experience-section/experience/:id
3. POST /api/experience-section/experience
4. PUT /api/experience-section/experience/:id
5. DELETE /api/experience-section/experience/:id

### Jobs
1. GET /api/jobs/job
2. GET /api/jobs/job/:id
3. POST /api/jobs/job/:id
4. PUT /api/jobs/job/:id
5. DELETE /api/jobs/job/:id

### Admin - Verification 
1. GET /api/admin/pending-applications
2. GET /api/admin/pending-applications/:id
3. PUT /api/admin/pending-applications/:id/approve
4. PUT /api/admin/pending-applications/:id/reject



### Activation Flow

#### 1. Job Seeker Applies
- Submits application with email and documents
- No password required at this stage
- Application status: pending

#### 2. Admin Reviews and Approves
- Admin reviews resume and portfolio
- Clicks "Approve" in admin dashboard
- System automatically:
      - Creates user account (inactive)
      - Generates unique activation token (expires in 48 hours)
      - Sends activation email to applicant

#### 3. Job Seeker Receives Email
- Email contains unique link: https://lably.com/activate?token=xxx
- Link expires in 48 hours for security
- Clicking link takes user to "Set Password" page

#### 4. Job Seeker Sets Password
Enters new password
Clicks "Activate Account"
System validates token, saves password
Account becomes active
User redirected to login page

#### 5. Job Seeker Logs In
- Uses email and newly created password
- Gains full access to platform features
- Can now browse jobs and apply
