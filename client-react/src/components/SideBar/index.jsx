import React from 'react';

function SideBar() {
  return (
    <div className="w-1/4 bg-gray-300 p-4">
      <h2 className="text-2xl font-semibold mb-4">Navigation</h2>
      <ul className="space-y-2">
        <li>
          <a href="/Main" className="block">
            <button className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-800 focus:outline-none">
              Books Page
            </button>
          </a>
        </li>
        <li>
          <a href="/Profile" className="block">
            <button className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-800 focus:outline-none">
              Profile Page
            </button>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
