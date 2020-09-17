BEGIN;

TRUNCATE
  users,
  RESTART IDENTITY CASCADE;

INSERT INTO users (name, password)
VALUES
  ('dunder', 'password'),
  ('marlo', 'beast'),


COMMIT;
