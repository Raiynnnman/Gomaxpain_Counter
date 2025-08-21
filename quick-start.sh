#!/bin/bash

# 🚀 GoMAXPAIN Quick Start Script
# This script will set up both backend and frontend automatically

set -e  # Exit on any error

echo "🚑 GoMAXPAIN Quick Start Script"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js v16 or higher."
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm."
        exit 1
    fi
    
    # Check Node.js version
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 16 ]; then
        print_error "Node.js version 16 or higher is required. Current version: $(node -v)"
        exit 1
    fi
    
    # Check MongoDB
    if ! command -v mongod &> /dev/null; then
        print_warning "MongoDB is not installed. You'll need to install it or use MongoDB Atlas."
        print_warning "For local installation: https://docs.mongodb.com/manual/installation/"
        print_warning "For cloud (MongoDB Atlas): https://www.mongodb.com/atlas"
    fi
    
    print_success "Prerequisites check completed"
    echo ""
}

# Setup backend
setup_backend() {
    print_status "Setting up backend..."
    
    if [ ! -d "backend" ]; then
        print_error "Backend directory not found. Please run this script from the project root."
        exit 1
    fi
    
    cd backend
    
    # Install dependencies
    print_status "Installing backend dependencies..."
    npm install
    
    # Check if config.js exists
    if [ ! -f "config.js" ]; then
        print_warning "config.js not found. Creating default configuration..."
        cat > config.js << 'EOF'
module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/gomaxpain',
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  NODE_ENV: process.env.NODE_ENV || 'development'
};
EOF
        print_success "Created default config.js"
    fi
    
    print_success "Backend setup completed"
    cd ..
    echo ""
}

# Setup frontend
setup_frontend() {
    print_status "Setting up frontend..."
    
    if [ ! -d "src" ]; then
        print_error "Frontend source directory not found. Please run this script from the project root."
        exit 1
    fi
    
    # Install dependencies
    print_status "Installing frontend dependencies..."
    npm install
    
    print_success "Frontend setup completed"
    echo ""
}

# Start services
start_services() {
    print_status "Starting services..."
    
    # Start backend in background
    print_status "Starting backend server..."
    cd backend
    npm run dev > ../backend.log 2>&1 &
    BACKEND_PID=$!
    cd ..
    
    # Wait for backend to start
    print_status "Waiting for backend to start..."
    sleep 5
    
    # Check if backend is running
    if curl -s http://localhost:5000/api/health > /dev/null; then
        print_success "Backend is running on http://localhost:5000"
    else
        print_error "Backend failed to start. Check backend.log for details."
        exit 1
    fi
    
    # Start frontend in background
    print_status "Starting frontend server..."
    npm run dev > frontend.log 2>&1 &
    FRONTEND_PID=$!
    
    # Wait for frontend to start
    print_status "Waiting for frontend to start..."
    sleep 5
    
    print_success "Frontend is running on http://localhost:5173"
    echo ""
}

# Display final information
show_final_info() {
    print_success "🎉 GoMAXPAIN is now running!"
    echo ""
    echo "📱 Frontend: http://localhost:5173"
    echo "🔧 Backend:  http://localhost:5000"
    echo "📊 Health:   http://localhost:5000/api/health"
    echo ""
    echo "📝 Logs:"
    echo "   Backend:  tail -f backend.log"
    echo "   Frontend: tail -f frontend.log"
    echo ""
    echo "🛑 To stop services:"
    echo "   kill $BACKEND_PID $FRONTEND_PID"
    echo ""
    echo "🧪 Test the application:"
    echo "   1. Open http://localhost:5173 in your browser"
    echo "   2. Try the signup flow"
    echo "   3. Test responsive design by resizing browser"
    echo ""
    echo "📚 For more information, see SETUP_GUIDE.md"
    echo ""
}

# Main execution
main() {
    echo "Starting GoMAXPAIN setup..."
    echo ""
    
    check_prerequisites
    setup_backend
    setup_frontend
    start_services
    show_final_info
    
    # Keep script running to maintain background processes
    print_status "Services are running. Press Ctrl+C to stop all services."
    
    # Trap Ctrl+C to clean up background processes
    trap 'echo ""; print_status "Stopping services..."; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; print_success "All services stopped"; exit 0' INT
    
    # Wait indefinitely
    while true; do
        sleep 1
    done
}

# Run main function
main 