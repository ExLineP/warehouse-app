import axios from "axios";
import { useEffect, useState } from "react";


const Modal = ({ user, handleClose, handleUpdate }) => {
    const [formData, setFormData] = useState({ email: user.email, password: user.password });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-800 opacity-50">
        <div className="bg-white p-6 rounded m-auto w-1/2">
          <h3 className="text-lg mb-4">Edit User</h3>
          <form>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="email">
                Login:
              </label>
              <input
                type="email"
                className="border p-2 w-full"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="password">
                Password:
              </label>
              <input
                type="password"
                className="border p-2 w-full"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="text-right">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2"
                onClick={() => handleUpdate(formData)}
              >
                Update
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

const Admin = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("http://192.168.50.187:3000/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleEdit = (user) => {
    // code to handle the edit action goes here
  };

  return (
    <table className="table-auto w-full text-left">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="px-4 py-2">Login</th>
          <th className="px-4 py-2">Password</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id} className="border-b">
            <td className="px-4 py-2">{user.email}</td>
            <td className="px-4 py-2">{user.password}</td>
            <td className="px-4 py-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                onClick={() => handleEdit(user)}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Admin;



