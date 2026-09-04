CREATE TABLE IF NOT EXISTS execom_members (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT NOT NULL,
 position TEXT NOT NULL,
 department TEXT,
 year TEXT,
 email TEXT,
 phone TEXT,
 photo_url TEXT,
 bio TEXT,
 sort_order INTEGER DEFAULT 0,
 created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS activities (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 title TEXT NOT NULL,
 description TEXT,
 event_date TEXT,
 category TEXT,
 image_url TEXT,
 created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS sessions (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 title TEXT NOT NULL,
 description TEXT,
 session_date TEXT,
 start_time TEXT,
 end_time TEXT,
 venue TEXT,
 speaker TEXT,
 created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS updates (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 title TEXT NOT NULL,
 content TEXT,
 published_at TEXT DEFAULT CURRENT_TIMESTAMP
);
