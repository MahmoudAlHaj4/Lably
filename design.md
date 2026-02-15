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
- Register (creates pending account).
- Upload CV/resume.
- Upload work samples/portfolio.
- Submit for verification.
- Wait for admin to review and schedule interview.
- Complete interview and live technical assessment with admin.
- View verification status (pending/in review/approved/rejected).
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
- resume_path: VARCHAR(255)
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

### verifications
- id: UUID (PRIMARY KEY)
- job_seeker_profile_id: UUID (FOREIGN KEY → job_seeker_profiles.id), UNIQUE
- resume_path: VARCHAR(255), NOT NULL
- portfolio_path: TEXT (comma-separated file paths or JSON)
- submitted_at: TIMESTAMP
- reviewed_at: TIMESTAMP (NULL until reviewed)
- interview_scheduled_at: TIMESTAMP (NULL)
- interview_completed_at: TIMESTAMP (NULL)
- verification_result: ENUM('pending', 'approved', 'rejected'), DEFAULT 'pending'
- assessment_notes: TEXT (admin's notes from technical assessment)
- approved_at: TIMESTAMP (NULL - set when approved)
- rejected_at: TIMESTAMP (NULL - set when rejected)
- rejection_reason: TEXT (NULL - only if rejected)
- reviewed_by: UUID (FOREIGN KEY → users.id where role='admin') (NULL until reviewed)

### Design Decisions

#### 1. Single users Table with Role Field

**Decision** Store all users (job seekers, employers, admins) in one table with a role field.

**Reason:**
- Avoid code duplication, authentication logic works the same for all user types.
- Simpler to maintain, one login system instead of three separate ones.
- All users share common fields.
- Role specific data (profile, company info) lives in separate tables where it belongs.

**Alternative considered:** Separate job seekers, employers and admins tables.

**Why rejected:** Would require building three authentication systems with nearly identical code.

#### 2. Separate Profile Tables

**Decision:** 
Instead of putting all user information in one giant users table, I split it into three tables:

- users (authentication only)
- job_seeker_profiles (job seeker info)
- employer_profiles (employer info)

**Reason:**

- Keeps users table clean and foucsed on authentication.
- Job seekers and Employers have completely different profile fields.
- Easier to query.
- better data organiztion.

**Alternative considered:** Store all profile fields directly in users.

**Why rejected:** Would result in a bloated users table with many NULL values. A job seeker doesn't need company_name field and an employer doesn't need resume_path field.

#### 3. Admin Account Creation

**Decision:** Admins cannot self register. Admin accounts are created manually via direct database insert.

**Reason:**
- Security: prevents anyone from making themselves an admin.
- Admin is a privileged role that should be tightly controlled.
- For V1, only the platform owner (me) needs admin access.

#### 4. No Guest Browsing
**Decision:** Users must register and login to browse jobs.

**Reason:**
- Keeps V1 scope small and focused.
- Encourages user registration (builds user base).
- Simpler authorization logic all routes require authentication.
- Easier to track user behavior and applications.

**Trade-off:** May reduce initial traffic, but acceptable for V1. Guest browsing can be added in V2 if needed.
