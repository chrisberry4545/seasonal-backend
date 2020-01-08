#! /bin/bash

docker-compose -f ./docker-compose.test.yml down
echo "Starting tests..."

docker-compose -f ./docker-compose.test.yml run --rm app-test
status=$?

docker-compose -f ./docker-compose.test.yml down

if [ "$status" = "0" ]; then
  echo "Tests passed"
  exit 0;
fi

echo "Tests Failed"
exit 1;
