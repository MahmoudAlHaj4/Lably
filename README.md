# Lably

## Project Overview
Lably is a specialized job board for the dental technology industry. It connects dental labs and clinics with pre-verified CAD/CAM specialists, dental technicians, and dental lab professionals.

## System Design

#### ER Diagram

![Lably ER Diagram](./assets/er-diagram.jpg)

#### System Flowchart

![System Flowchart](./assets/flowchart.png)


For full system design, database decisions, API details, and architecture notes, see [DESIGN.md](./design.md).


## Screenshots

| Landing Page | Job Seeker |
|---|---|
| ![Landing Page](./assets/landing.png) | ![Job Seeker](./assets/job-seeker.png) |

| Employer | Admin |
|---|---|
| ![Employer](./assets/employer.png) | ![Admin](./assets/admin.png) |

## Tech Stack

| Frontend | Backend | Database | File Storage | Auth | Email | Testing | CI/CD | Deployment |
|---|---|---|---|---|---|---|---|---|
| ![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white) | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white) ![Neon](https://img.shields.io/badge/Neon-00E599?style=flat&logo=neon&logoColor=black) | ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white) | ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white) ![bcrypt](https://img.shields.io/badge/bcrypt-338?style=flat) | ![Nodemailer](https://img.shields.io/badge/Nodemailer-22B573?style=flat) ![Brevo](https://img.shields.io/badge/Brevo-0B996E?style=flat&logo=brevo&logoColor=white) | ![Jest](https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white) ![Supertest](https://img.shields.io/badge/Supertest-000000?style=flat) | ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white) | ![Render](https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render&logoColor=white) |

## Testing

Integration tests using **Jest** and **Supertest** against a real PostgreSQL database (Neon) to catch real-world issues that mocks would miss.

### What's Tested

- **Authentication** — login success, wrong password, wrong email
- **Pending Applications** — file upload submission, missing resume validation
- **Activation Flow** — full end-to-end: submit application → admin approves → token validation → account activation → login
- **Jobs** — create, edit, delete, and view job listings
- **Employer Profile** — create and update employer profile
- **Email Service** — mocked to prevent real emails during CI

### Run Tests
```bash
npm test
```

## Setup & Installation

### Prerequisites
- Node.js
- PostgreSQL
- Supabase account
- Brevo account

### 1. Clone the Repository
```bash
git clone https://github.com/MahmoudAlHaj4/Lably.git
cd Lably
```

### 2. Install Dependencies
```bash
cd lably-backend
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the `lably-backend` directory and fill in the following:
```env
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
PORT=
JWT_SECRET=

DATABASE_URL=

SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

FRONTEND_URL=

BREVO_HOST=
BREVO_PORT=
BREVO_USER=
BREVO_PASS=
BREVO_SENDER=
BREVO_API_KEY=
```

### 4. Start the Server
```bash
node server.js
```
