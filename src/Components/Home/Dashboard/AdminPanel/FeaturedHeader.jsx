import React, { useState } from 'react';
import Header from '../Header';
import Sidebar from './AdminSidebar';
function AdminHeader() {
  const [menuItems, setMenuItems] = useState([
    { id: 1, label: 'Home', link: '/' },
    { id: 2, label: 'Find Job', link: '/jobpost' },
    { id: 3, label: 'Find Tutor', link: '/findtutor' },
    { id: 4, label: 'Admin', link: '/admin-panel' },
    { id: 5, label: 'Pricing', link: '/pricing' },
    { id: 6, label: 'Contact', link: '/contact' },
  ]);

  const [newMenuItem, setNewMenuItem] = useState({ label: '', link: '' });
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  // Add new menu item
  const addMenuItem = () => {
    if (newMenuItem.label && newMenuItem.link) {
      setMenuItems([...menuItems, { id: menuItems.length + 1, ...newMenuItem }]);
      setNewMenuItem({ label: '', link: '' });
    }
  };

  // Remove menu item
  const removeMenuItem = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  // Edit menu item
  const editMenuItem = (id) => {
    const item = menuItems.find((item) => item.id === id);
    setEditItemId(id);
    setNewMenuItem({ label: item.label, link: item.link });
    setEditMode(true);
  };

  // Update menu item
  const updateMenuItem = () => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === editItemId ? { ...item, ...newMenuItem } : item
      )
    );
    setNewMenuItem({ label: '', link: '' });
    setEditMode(false);
    setEditItemId(null);
  };

  return (
    <div className="md:ml-24 -mt-12">
      <div className="flex flex-col items-center p-6 space-y-6 mt-24">
        <Sidebar />
        <div className="p-4 max-w-3xl mx-auto">
          <Header />
      <h2 className="text-xl font-semibold mb-4">Admin Panel - Manage Header</h2>
      
      {/* Add or Edit form */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Label"
          value={newMenuItem.label}
          onChange={(e) => setNewMenuItem({ ...newMenuItem, label: e.target.value })}
          className="border p-2 rounded mr-2"
        />
        <input
          type="text"
          placeholder="Link"
          value={newMenuItem.link}
          onChange={(e) => setNewMenuItem({ ...newMenuItem, link: e.target.value })}
          className="border p-2 rounded mr-2"
        />
        {editMode ? (
          <button onClick={updateMenuItem} className="bg-green-500 text-white px-4 py-2 rounded">
            Update
          </button>
        ) : (
          <button onClick={addMenuItem} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add
          </button>
        )}
      </div>

      {/* List of menu items */}
      <div className="menu-list">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="flex justify-between items-center mb-2 p-2 border-b">
              <div>
                <span className="font-semibold">{item.label}</span> - <a href={item.link}>{item.link}</a>
              </div>
              <div>
                <button onClick={() => editMenuItem(item.id)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => removeMenuItem(item.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      </div></div>
    </div>
  );
}

export default AdminHeader;
