CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    given_name VARCHAR(255),
    family_name VARCHAR(255),
    picture_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  join_code VARCHAR(7) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  icon_url TEXT,
  banner_url TEXT
);

CREATE TABLE course_relations (
  user_id INTEGER REFERENCES users(id),
  course_id INTEGER REFERENCES courses(id),
  role VARCHAR(50) NOT NULL CHECK (role IN ('instructor', 'learner')),
  PRIMARY KEY (user_id, course_id)
);

CREATE TABLE exams (
  id SERIAL PRIMARY KEY,
  topic VARCHAR(255) NOT NULL,
  description TEXT,
  course_id INT NOT NULL REFERENCES courses(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE assignments (
  id SERIAL PRIMARY KEY,
  topic VARCHAR(255) NOT NULL,
  description TEXT,
  course_id INT NOT NULL REFERENCES courses(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE proctor_activities (
  id SERIAL PRIMARY KEY,
  exam_id INT NOT NULL REFERENCES exams(id),
  user_id INT NOT NULL REFERENCES users(id),
  type VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exam_submissions (
  user_id INT NOT NULL REFERENCES users(id),
  exam_id INT NOT NULL REFERENCES exams(id),
  started_at TIMESTAMP,
  submitted_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT pk_exam_submission PRIMARY KEY (user_id, exam_id)
);

CREATE TABLE assignment_submissions (
  user_id INT NOT NULL REFERENCES users(id),
  assignment_id INT NOT NULL REFERENCES assignments(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  data TEXT, -- Submission data 
  submitted_at TIMESTAMP, -- Optional timestamp for when it was submitted 
  CONSTRAINT pk_assignment_submission PRIMARY KEY (user_id, assignment_id) 
); 

CREATE TABLE attendances (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  course_id INT NOT NULL REFERENCES courses(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

