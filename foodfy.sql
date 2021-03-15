-- CREATE TABLES

CREATE TABLE recipes(
	id SERIAL PRIMARY KEY UNIQUE,
  title TEXT NOT NULL,
  chef_id INT NOT NULL,
  user_id INT NOT NULL,
  ingredients TEXT[] NOT NULL,
  preparation TEXT[] NOT NULL,
  information TEXT,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE chefs(
	id SERIAL PRIMARY KEY UNIQUE,
	name TEXT NOT NULL,
  file_id INTEGER REFERENCES files(id) ,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE files (
  id SERIAL PRIMARY KEY UNIQUE,
  name TEXT NOT NULL,
  path TEXT NOT NULL
);

CREATE TABLE recipe_files(
  id SERIAL PRIMARY KEY UNIQUE,
  recipe_id INTEGER REFERENCES recipes(id),
  files_id INTEGER REFERENCES files(id)
);

CREATE TABLE users(
  id SERIAL PRIMARY KEY UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  reset_token TEXT,
  reset_token_expires TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

-- CREATE TABLE session

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" 
ADD CONSTRAINT "session_pkey" 
PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- CREATE CONSTRAINT - recipes_chef_id_fkey

ALTER TABLE recipes
ADD CONSTRAINT recipes_chef_id_fkey
FOREIGN KEY (chef_id)
REFERENCES chefs(id)

-- CREATE CONSTRAINT - recipes_user_id_fkey

ALTER TABLE recipes
ADD CONSTRAINT recipes_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES users(id)

-- CREATE FUNCTION TO AUTO UPDATE
CREATE FUNCTION set_timestamp() RETURNS TRIGGER AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- UPDATE TABLE - recipes

CREATE TRIGGER trigger_timestamp_recipes 
BEFORE UPDATE ON recipes
FOR EACH ROW EXECUTE PROCEDURE set_timestamp();

-- UPDATE TABLE - chefs

CREATE TRIGGER trigger_timestamp_chefs
BEFORE UPDATE ON chefs
FOR EACH ROW EXECUTE PROCEDURE set_timestamp();