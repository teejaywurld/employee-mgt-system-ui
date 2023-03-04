import React, { useState, useEffect } from 'react'
import Employee from './Employee';
import UpdateEmployee from "../components/UpdateEmployee";

const EmployeeList = ({ user }) => {
    const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/users";
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [responseUser, setResponseUser] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(EMPLOYEE_API_BASE_URL, {
                method: "GET",
                headers: {
                    "Content-Type":"application/json",
                },
            });
            const users = await response.json();
            setUsers(users);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
      };
      fetchData();
    }, [user, responseUser]);

    const deleteUser = (e, id) => {
        e.preventDefault();
        fetch(EMPLOYEE_API_BASE_URL + "/" + id, {
            method: "DELETE",
        }).then((res) => {
            if (users) {
                setUsers((prevElement) => {
                    return prevElement.filter((user) => user.id !== id);
                })
            }
        })
    };

    const updateUser = (e, id) => {
        e.preventDefault();
        setUserId(id);
    };

  return (
    <>
        <div className="container mx-auto my-8">
            <div className="flex shadow border-b">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">First Name</th>
                            <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Last Name</th>
                            <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Email Address</th>
                            <th className="text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6">Actions</th>
                        </tr>
                    </thead>
                    {!loading && (
                        <tbody className="bg-white">
                            {users?.map((user) => (
                                <Employee 
                                    user={user} 
                                    key={user.id} 
                                    deleteUser={deleteUser}
                                    updateUser={updateUser} 
                                />
                            ))}    
                    </tbody>
                    )}
                </table>
            </div>
        </div>
        <UpdateEmployee userId={userId} setResponseUser={setResponseUser} />
    </>
  )
}

export default EmployeeList;
 