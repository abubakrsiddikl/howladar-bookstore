import React from "react";

export default function Footer() {
  return (
    <div>
      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm py-4 text-gray-600">
        &copy; {new Date().getFullYear()} হাওলাদার প্রকাশনী | সর্বস্বত্ব
        সংরক্ষিত
      </footer>
    </div>
  );
}
