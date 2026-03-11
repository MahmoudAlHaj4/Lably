-- ENUM TYPES
CREATE TYPE user_role AS ENUM ('job_seeker', 'employer', 'admin');
CREATE TYPE job_status AS ENUM ('active', 'filled', 'closed');
CREATE TYPE job_type AS ENUM ('remote', 'on_site', 'hybrid');
CREATE TYPE app_status AS ENUM ('pending', 'approved', 'rejected');

-- Auto-update trigger function (replaces ON UPDATE CURRENT_TIMESTAMP)
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- users
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT FALSE,
    activation_token VARCHAR(255) DEFAULT NULL,
    activation_token_expires TIMESTAMP DEFAULT NULL
);

CREATE TRIGGER users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION set_updated_at();


-- Add new ENUMs
CREATE TYPE organization_type AS ENUM ('dental_lab', 'dental_clinic');
CREATE TYPE industry_type AS ENUM ('dental_tech', 'cadcam', 'prosthetics');
CREATE TYPE team_size AS ENUM ('1-10', '11-50', '51-200', '200+');

-- employer_profiles
CREATE TABLE employer_profiles (
    id UUID PRIMARY KEY,
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    company_description TEXT DEFAULT NULL,
    location VARCHAR(255) DEFAULT NULL,
    website VARCHAR(255) DEFAULT NULL,
    logo_path VARCHAR(255) DEFAULT NULL,
    banner_path VARCHAR(255) DEFAULT NULL,
    organization_type organization_type DEFAULT NULL,
    industry_type industry_type DEFAULT NULL,
    team_size team_size DEFAULT NULL,
    year_established INTEGER DEFAULT NULL,
    company_vision TEXT DEFAULT NULL,
    linkedin_url VARCHAR(255) DEFAULT NULL,
    twitter_url VARCHAR(255) DEFAULT NULL,
    facebook_url VARCHAR(255) DEFAULT NULL,
    instagram_url VARCHAR(255) DEFAULT NULL,
    contact_email VARCHAR(255) DEFAULT NULL,
    contact_phone VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER employer_profiles_updated_at
BEFORE UPDATE ON employer_profiles
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- job_seekers_profiles
CREATE TABLE job_seekers_profiles (
    id UUID PRIMARY KEY,
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) DEFAULT NULL,
    address VARCHAR(255) DEFAULT NULL,
    about TEXT DEFAULT NULL,
    verified_at TIMESTAMP DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER job_seekers_profiles_updated_at
BEFORE UPDATE ON job_seekers_profiles
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- experiences
CREATE TABLE experiences (
    id UUID PRIMARY KEY,
    job_seeker_profile_id UUID NOT NULL REFERENCES job_seekers_profiles(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE DEFAULT NULL,
    description TEXT DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- jobs
CREATE TABLE jobs (
    id UUID PRIMARY KEY,
    employer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status job_status DEFAULT 'active',
    job_title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT DEFAULT NULL,
    location VARCHAR(255) DEFAULT NULL,
    job_type job_type NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER jobs_updated_at
BEFORE UPDATE ON jobs
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- applications
CREATE TABLE applications (
    id UUID PRIMARY KEY,
    job_seeker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    cover_letter TEXT DEFAULT NULL,
    resume_path VARCHAR(255) DEFAULT NULL,
    applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(job_seeker_id, job_id)
);

-- pending_applications
CREATE TABLE pending_applications (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) DEFAULT NULL,
    address VARCHAR(255) DEFAULT NULL,
    resume_path VARCHAR(255) NOT NULL,
    portfolio_path TEXT DEFAULT NULL,
    submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP DEFAULT NULL,
    application_status app_status DEFAULT 'pending',
    decision_notes TEXT DEFAULT NULL,
    reviewed_by UUID DEFAULT NULL REFERENCES users(id) ON DELETE SET NULL
);