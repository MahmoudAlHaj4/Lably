# Overview 

This is a job board web application. It allows job seekers to find and apply for jobs, and allows employers to post jobs and find candidates.

## User Types and Roles

The application has three types of users:

1. **Job Seekers**
- Users looking for jobs.
- They can create profiles.
- They can upload resumes.
- They can apply to job postings.

2. **Employers** 
- Users looking for candidates.
- They can create job listings.
- They can view applications from job seekers.

3. **Admin**
- Platform Owner.
- They manage Platform.
- They moderate content.
- They manage users.

### Why These Three Roles?

I chose a three role system for the following reasons:

1. Clear Separation of Concens

- Job seekers and Employers have completely different goals and workflow.
- Job seeker looking for work should never see "Post A Job" functionality.
- An Employer hiring candidates should never see "Apply for Job" functionality.
- Separation roles prevents UI clutter and confusion.

2. Secuirty and Data Protection

- Job seekers should not access employer dashboard.
- Employer should not access other employers applications.

3. Admin Role for Platform Management

- Job board needs moderation (fake accounts, inappropriate content, etc...).
- Admin gives me one place to manage the entire platform without adding management features to employer or job seeker accounts.
- Admin can see overview statistics like how many users registered, how many jobs are posted, and how many applications were submitted.

4. Simplicity for V1

- Three roles cover all essential use cases without overcomplicating the system.
- More roles (recruiter, company admin, moderator) can be added later if needed.
- Keeps authentication and authorization logic straightforward.

### Role Permissions & Access Control

| Feature/Action | Job Seeker | Employer | Admin |
|----------------|------------|----------|-------|
| **Authentication** |
| Register account | ✅ | ✅ | ❌ (created manually) |
| Login/Logout | ✅ | ✅ | ✅ |
| **Profile Management** |
| Create own profile | ✅ | ✅ | ❌ |
| Edit own profile | ✅ | ✅ | ❌ |
| Delete own profile | ✅ | ✅ | ❌ |
| View other users' profiles | ❌ | ❌ (only applicants) | ✅ (all users) |
| **Jobs** |
| Browse/search jobs | ✅ | ❌ | ✅ (all jobs) |
| View job details | ✅ | ❌ | ✅ |
| Post new job | ❌ | ✅ | ❌ |
| Edit own job | ❌ | ✅ | ❌ |
| Delete own job | ❌ | ✅ | ❌ |
| Delete any job | ❌ | ❌ | ✅ |
| See application count | ❌ | ✅ (own jobs) | ✅ (all jobs) |
| **Applications** |
| Apply to job | ✅ | ❌ | ❌ |
| View own applications | ✅ | ❌ | ❌ |
| View received applications | ❌ | ✅ (own jobs) | ✅ (all) |
| View applicant profiles | ❌ | ✅ (who applied) | ✅ (all) |
| View applicant resumes | ❌ | ✅ (who applied) | ✅ (all) |
| **Platform Management** |
| View platform statistics | ❌ | ❌ | ✅ |
| Delete any user | ❌ | ❌ | ✅ |
| View all users list | ❌ | ❌ | ✅ |

## Core Features (V1)

### Job Seekers
- Register and login.
- Create profile.
- Add about section.
- add experience section.
- upload resume.
- Edit/delete profile.
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
- View all users.
- Delete users.
- View all jobs.
- Delete jobs.
- View all applications.


## User Flows

### Job Seeker - Registration to Applying for Jobs

1. User visits registration page
2. User fills registration form (email, password, selects "Job Seeker")
3. User submits and logs in successfully
4. User is redirected to profile page
5. User adds about section, experience, and uploads resume
6. User saves profile
7. User navigates to jobs page
8. User browses available jobs
9. User clicks on a job to view details
10. User reads job description
11. User clicks "Apply"
12. Application form appears
13. User fills application form and uploads resume
14. User clicks submit
15. Message appears: "Application received"
16. User can later edit their profile (about, experience, resume)

### Employer - Registration to Managing Jobs

1. Employer registers (email, password, company name)
2. Redirects to dashboard
3. Dashboard shows: posted jobs list (empty at first) + "Post New Job" button 
4. Employer clicks "Post New Job"
5. Form appears (job title, description, requirements, location, etc.)
6. Employer fills form and clicks submit
7. Success message: "Job posted successfully and is now available to job seekers"
8. Employer returns to dashboard and sees their new job listed
9. When job seekers apply, employer sees application count on dashboard
10. Employer can click on a job to view all applications for that job

### Admin - Managing Platform

1. Admin logs in with credentials
2. Admin is redirected to admin dashboard
3. Dashboard displays statistics:
   - Total number of job seekers
   - Total number of employers
   - Total number of jobs posted
   - Total number of applications
4. Admin can view list of all users (job seekers and employers)
5. Admin can delete users if needed
6. Admin can view list of all jobs
7. Admin can delete inappropriate jobs
8. Admin can view all applications


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

