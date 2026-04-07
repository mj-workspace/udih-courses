#!/bin/bash
# Start all UDIH apps in parallel

echo "Starting UDIH dev servers..."
echo ""

(cd homepage && pnpm dev --port 5173) &
(cd udih-2024-27/cybersecurity-course/lecturer-guide && pnpm dev --port 5174) &
(cd udih-2024-27/cybersecurity-course/presentation && pnpm dev --port 5175) &

echo "  Homepage:        http://localhost:5173/udih-courses/"
echo "  Lecturer Guide:  http://localhost:5174/udih-courses/cybersecurity-lecturer-guide/"
echo "  Presentation:    http://localhost:5175/udih-courses/cybersecurity-presentation/"
echo ""
echo "Press Ctrl+C to stop all servers."

wait
