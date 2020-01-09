SELECT
  countries.id,
  countries.name,
  (
    SELECT COALESCE(
      json_agg(
        json_build_object(
          'code' , regions.code,
          'name', regions.name,
          'latLng', json_build_object(
            'lat', regions.lat,
            'lng', regions.lng
          )
        )
        ORDER BY regions.name
      ),
      '[]'::json
    ) AS regions
    FROM regions
    WHERE regions.country_id = countries.id
  )
FROM countries
ORDER BY countries.name;
