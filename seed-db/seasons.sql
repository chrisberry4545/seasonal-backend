DROP TABLE IF EXISTS public.seasons;

CREATE TABLE public.seasons
(
  id uuid,
  season_index numeric,
  name text
);

INSERT INTO public.seasons (
  id,
  season_index,
  name
)
VALUES
  (
    '41bcbb3a-5599-4f0c-8da9-3144cc5be6de',
    0,
    'January'
  ),
  (
    'eec0b2bb-4fbd-46df-b905-8d2ee2fb991a',
    1,
    'February'
  );
