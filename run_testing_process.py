import os
import sys
import subprocess
import time

def start_nextjs_server():
    """Start the Next.js development server"""
    print("Starting Next.js development server...")
    
    # Change to the project directory
    os.chdir('/home/ubuntu/ai_humanizer_app/ai-humanizer')
    
    # Start the Next.js server
    server_process = subprocess.Popen(
        ['npm', 'run', 'dev'],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    
    # Wait for server to start
    print("Waiting for server to start...")
    time.sleep(10)  # Give it some time to initialize
    
    # Check if server is running
    try:
        import requests
        response = requests.get('http://localhost:3001')
        if response.status_code == 200:
            print("Server is running!")
            return server_process
        else:
            print(f"Server returned status code: {response.status_code}")
            return None
    except Exception as e:
        print(f"Error checking server: {e}")
        return None

def run_tests():
    """Run the test suite"""
    print("\nRunning tests...")
    os.chdir('/home/ubuntu/ai_humanizer_app/testing')
    
    # Run the test script
    result = subprocess.run(['python3', 'run_tests.py'], capture_output=True, text=True)
    
    print(result.stdout)
    if result.stderr:
        print("Errors:")
        print(result.stderr)
    
    return result.returncode == 0

def analyze_results():
    """Analyze test results"""
    print("\nAnalyzing results...")
    os.chdir('/home/ubuntu/ai_humanizer_app/testing')
    
    # Run the analysis script
    result = subprocess.run(['python3', 'analyze_results.py'], capture_output=True, text=True)
    
    print(result.stdout)
    if result.stderr:
        print("Errors:")
        print(result.stderr)
    
    return result.returncode == 0

def main():
    """Main function to run the testing process"""
    print("=== AI Humanizer Testing Process ===")
    
    # Install required packages
    print("Installing required packages...")
    subprocess.run(['pip3', 'install', 'requests', 'matplotlib', 'numpy'], check=True)
    
    # Create directories
    os.makedirs('/home/ubuntu/ai_humanizer_app/testing/results', exist_ok=True)
    os.makedirs('/home/ubuntu/ai_humanizer_app/testing/visualizations', exist_ok=True)
    
    # Start the Next.js server
    server_process = start_nextjs_server()
    if not server_process:
        print("Failed to start server. Exiting.")
        return 1
    
    try:
        # Run tests
        tests_success = run_tests()
        if not tests_success:
            print("Tests failed. Exiting.")
            return 1
        
        # Analyze results
        analysis_success = analyze_results()
        if not analysis_success:
            print("Analysis failed. Exiting.")
            return 1
        
        print("\n=== Testing process completed successfully! ===")
        return 0
    
    finally:
        # Terminate the server process
        print("\nShutting down server...")
        if server_process:
            server_process.terminate()
            try:
                server_process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                server_process.kill()

if __name__ == "__main__":
    sys.exit(main())
