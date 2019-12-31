DROP TABLE IF EXISTS public.regions;

CREATE TABLE public.regions
(
    code uuid,
    name text,
    country_id uuid,
    lat numeric,
    lng numeric
);

INSERT INTO public.regions (
  code,
  name,
  country_id,
  lat,
  lng
)
VALUES
  (
    '9061f3aa-3bf3-4c12-b6f9-4a8d1ea88601',
    'UK',
    '1fc52423-eb83-4cd9-9fdd-b6f9cb323c37',
    50,
    50
  ),
  (
    '2d8bafc4-5b7a-4212-a8a8-cfdccdd27cce',
    'Sydney',
    'd6e57673-eee8-444a-b7be-d9ab553052cf',
    -50,
    -50
  );
