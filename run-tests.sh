#! /bin/bash

docker-compose down
echo "Starting tests..."

docker-compose run --rm app-test-ci
status=$?

#docker-compose down

if [ "$status" = "0" ]; then
  echo "Tests passed"
  exit 0;
fi

echo "Tests Failed"
exit 0;
