DROP TABLE IF EXISTS public.region_to_season_food_map;

CREATE TABLE public.region_to_season_food_map
(
  id uuid,
  region_id text,
  food_id uuid,
  season_id uuid
);

INSERT INTO public.region_to_season_food_map (
  id,
  region_id,
  food_id,
  season_id
)
VALUES
  -- UK
  (
    '01b40983-876c-42f0-959d-38cf98fea1c3',
    'gbr',
    'c6f78568-fe23-47e4-8e65-55934199a39f',
    '41bcbb3a-5599-4f0c-8da9-3144cc5be6de'
  ),
  (
    '22be80d3-5154-43e7-a750-f0d03e4ca91a',
    'gbr',
    'c6f78568-fe23-47e4-8e65-55934199a39f',
    'eec0b2bb-4fbd-46df-b905-8d2ee2fb991a'
  ),
  (
    '29ab0c3c-3876-456a-adfc-7baa438a13ff',
    'gbr',
    'dd9ba012-8f8e-48af-9775-0139374dd94c',
    '41bcbb3a-5599-4f0c-8da9-3144cc5be6de'
  ),
  (
    '053c46cd-584e-46c5-a70d-a39b9ded3cca',
    'gbr',
    '053c46cd-584e-46c5-a70d-b79b9ded3cca',
    '41bcbb3a-5599-4f0c-8da9-3144cc5be6de'
  ),
  -- Sydney
  (
    '2214870d-ccb5-479d-b6d0-2d7fb5692857',
    'aus-sydney',
    'c6f78568-fe23-47e4-8e65-55934199a39f',
    'eec0b2bb-4fbd-46df-b905-8d2ee2fb991a'
  );
