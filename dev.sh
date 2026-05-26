#!/bin/bash
# Start all UDIH apps in parallel

echo "Starting UDIH dev servers..."
echo ""

(cd homepage && pnpm dev --port 5173) &
(cd udih-2024-27/cybersecurity-course/lecturer-guide && pnpm dev --port 5174) &
(cd udih-2024-27/cybersecurity-course/presentation && pnpm dev --port 5175) &
(cd udih-2024-27/digital-fundamentals/lecturer-guide && pnpm dev --port 5176) &
(cd udih-2024-27/digital-fundamentals/presentation && pnpm dev --port 5177) &

echo "  Homepage:                            http://localhost:5173/"
echo "  Cybersecurity Lecturer Guide:        http://localhost:5174/cybersecurity/lecturer-guide/"
echo "  Cybersecurity Presentation:          http://localhost:5175/cybersecurity/presentation/"
echo "  Digital Fundamentals Lecturer Guide: http://localhost:5176/digital-fundamentals/lecturer-guide/"
echo "  Digital Fundamentals Presentation:   http://localhost:5177/digital-fundamentals/presentation/"
echo ""
echo "Press Ctrl+C to stop all servers."

wait
