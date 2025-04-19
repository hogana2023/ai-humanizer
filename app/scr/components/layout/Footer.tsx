import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} AI Humanizer. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
