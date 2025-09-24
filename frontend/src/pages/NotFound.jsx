import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-lg mt-4">Oops! Page not found.</p>
      <Link to="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded">
        Go Home
      </Link>
    </div>
  );
}
