docker compose --profile ingest run --rm ingest

# Remove the ingest image after it's done
docker rmi what2game-ingest || echo "Image already removed or not found."