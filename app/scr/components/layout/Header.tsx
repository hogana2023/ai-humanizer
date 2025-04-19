import React from 'react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-indigo-600">AI Humanizer</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                Documentation
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
