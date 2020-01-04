DROP TABLE IF EXISTS public.regions;

CREATE TABLE public.regions
(
    code text,
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
    'gbr',
    'UK',
    '1fc52423-eb83-4cd9-9fdd-b6f9cb323c37',
    50,
    50
  ),
  (
    'aus-sydney',
    'Sydney',
    'd6e57673-eee8-444a-b7be-d9ab553052cf',
    -50,
    -50
  );
