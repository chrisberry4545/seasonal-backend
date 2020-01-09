DROP TABLE IF EXISTS public.food;

CREATE TABLE public.food
(
  id uuid,
  name text,
  substitute_food_ids uuid[],
  image_url_small text,
  description text
);

INSERT INTO public.food (
  id,
  name,
  substitute_food_ids,
  image_url_small,
  description
)
VALUES
  (
    'c6f78568-fe23-47e4-8e65-55934199a39f',
    'Beetroot',
    ARRAY[]::uuid[],
    'https://beetroot.com',
    'beetroot description'
  ),
  (
    'dd9ba012-8f8e-48af-9775-0139374dd94c',
    'Apple',
    ARRAY[]::uuid[],
    'https://apple.com',
    'apple description'
  ),
  (
    'd1df368e-6ed1-4a50-bb7d-6163c15df1d3',
    'Onion',
    ARRAY[]::uuid[],
    'https://onion.com',
    'onion description'
  );
