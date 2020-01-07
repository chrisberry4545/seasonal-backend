#! /bin/bash

#set +e

docker-compose down
#docker-compose up -d
echo "Starting tests..."
sleep 10

#docker-compose run app-test-ci npm run test
run_result=$(docker-compose run --rm app-test-ci)

echo "Run result:"
echo $run_result

#docker-compose down

if [ "$run_result" = "0" ]; then
  echo "Tests passed"
  exit 0;
fi

echo "Tests Failed"
exit 1;
