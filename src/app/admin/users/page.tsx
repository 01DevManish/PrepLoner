'use client';

import { useState, useEffect, FC } from 'react'; // Import FC
import { db } from '@/lib/firebaseClient';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { withAuth } from '@/components/auth/withAuth';
import { Role } from '@/hooks/useAuth';

// 1. Define an interface for the User object
interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: Role;
}

const UsersPage: FC = () => { // Typed component as FC for HOC compatibility
  // 2. Use the UserProfile interface for the state
  const [users, setUsers] = useState<UserProfile[]>([]);

  const fetchUsers = async () => {
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    // 3. Ensure the mapped data conforms to the UserProfile type
    const usersList = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as UserProfile[];
    setUsers(usersList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, role: Role) => {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, { role });
    fetchUsers(); // Refresh the user list
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Management</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role || 'user'}
                    onChange={(e) => handleRoleChange(user.id, e.target.value as Role)}
                  >
                    <option value="user">User</option>
                    <option value="editor">Editor</option>
                    <option value="designer">Designer</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withAuth(UsersPage, 'admin');