import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import TextInput from '../components/features/TextInput';
import TextOutput from '../components/features/TextOutput';
import SettingsPanel from '../components/features/SettingsPanel';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">AI Humanizer</h1>
        <p className="text-center text-gray-600 mb-8">
          Transform AI-generated content into human-like text that bypasses AI detection
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <TextInput />
          <TextOutput />
        </div>
        
        <SettingsPanel />
      </main>
      <Footer />
    </div>
  );
}
