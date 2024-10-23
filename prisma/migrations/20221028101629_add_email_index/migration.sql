-- This is an empty migration.

CREATE UNIQUE INDEX IF NOT exists user_email_lower_idx ON "user" ((lower(email)));
