DROP TABLE IF EXISTS public.countries;

CREATE TABLE public.countries
(
    id uuid NOT NULL,
    name text
);

INSERT INTO public.countries (
  id,
  name
)
VALUES
  ('1fc52423-eb83-4cd9-9fdd-b6f9cb323c37', 'UK'),
  ('d6e57673-eee8-444a-b7be-d9ab553052cf', 'Australia');
