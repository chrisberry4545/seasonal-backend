#! /bin/bash

set +e

docker-compose up -d
echo "Starting tests..."
sleep 2
run_result=$(docker exec app-test-ci npm run test)

if [ "$run_result" = "1" ]; then
  echo "Tests failed"
  exit 1;
fi

echo "Tests passed"
