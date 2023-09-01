import React, { useEffect, useState } from "react";
import { useNavigate,Link } from 'react-router-dom';

interface UserData {
    id: number;
    Name: string;
    email: string;
    mobile: string;
}

const Profile = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const storedUserEmail = localStorage.getItem('userEmail');
        if (storedUserEmail) {
            setUserEmail(storedUserEmail);

            fetch(`http://localhost:8085/users?email=${storedUserEmail}`)
                .then(res => res.json())
                .then(data => {
                    if (data.length > 0) {
                        setUserData(data[0]);
                    }
                })
                .catch(err => console.log(err));
        }
    }, []);

    return (
            <div className="main-content">
                <h2>Profile</h2>
                {userData && (
                    <>
                        <p>ID: {userData.id}</p>
                        <p>Name: {userData.Name}</p>
                        <p>Email: {userData.email}</p>
                        <p>Mobile: {userData.mobile}</p>
                    </>

                )}
            </div>
    );
}

export default Profile;