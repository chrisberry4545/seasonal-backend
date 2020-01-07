#! /bin/bash

set +e

docker-compose down
docker-compose up -d
echo "Starting tests..."
sleep 10
run_result=$(docker exec app-test-ci npm run test)

if [ "$run_result" = "1" ]; then
  echo "Tests failed"
  exit 1;
fi

docker-compose down
echo "Tests passed"
