#!/bin/bash
# diagnose_drift.sh

echo "Checking retriever.py for drift..."
gcloud run services describe just-ken-gpt-backend \
  --platform managed \
  --region us-central1 \
  --format=json > deployed_config.json

diff retriever.py <(gcloud run services describe just-ken-gpt-backend \
  --platform managed \
  --region us-central1 \
  --format='value(spec.template.spec.containers[0].env[0].value)') || echo "No drift found."
