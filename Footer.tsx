import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} AI Humanizer | <a href="#" className="hover:text-blue-600">Privacy Policy</a> | <a href="#" className="hover:text-blue-600">Terms of Use</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
