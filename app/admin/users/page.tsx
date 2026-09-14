import { getAllUsers } from "@/lib/services/admin-service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default async function AdminUsersPage() {
  const users = await getAllUsers();

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Registered Users</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-50">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border border-gray-100">
                      <AvatarImage src={user.imageUrl} />
                      <AvatarFallback className="bg-black text-white text-xs">
                        {user.firstName?.charAt(0) || ""}
                        {user.lastName?.charAt(0) || ""}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500">{user.email || "No email"}</td>
                <td className="px-6 py-4">
                  <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                    {user.role}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
