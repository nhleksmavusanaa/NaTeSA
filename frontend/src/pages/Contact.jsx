import React from "react";

export default function Contact() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form className="max-w-md space-y-4">
        <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
        <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
        <textarea placeholder="Message" className="w-full p-2 border rounded" rows="4"></textarea>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
      </form>
    </div>
  );
}
