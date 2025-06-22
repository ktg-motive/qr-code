import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import QRCodeGenerator from './components/QRCodeGenerator';

function App() {
  // Apply dark class to document element
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center px-3 pb-8 sm:px-4">
        <div className="w-full max-w-sm sm:max-w-md">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              QR Code Generator
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Create professional QR codes for text, contacts, WiFi networks, and more.
            </p>
          </div>
          
          <div className="bg-card rounded-xl shadow-lg border border-border p-4 sm:p-6">
            <QRCodeGenerator />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
