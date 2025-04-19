// src/components/layout/Footer.tsx

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} AI Humanizer. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
              Contact
            </a>
          </div>
        </div>
        
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>AI Humanizer is designed to transform AI-generated content into more human-like text.</p>
          <p>Use responsibly and in accordance with applicable laws and regulations.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
