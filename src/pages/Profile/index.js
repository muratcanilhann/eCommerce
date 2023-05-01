
import { useAuth } from "../../contexts/AuthContext";

import { Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const {user, logout} = useAuth();
     const navigate = useNavigate();
    const handleLogout = async () => {
        
        logout(() => {
            navigate("/");
        });   
    }

    return <div>
        <Text fontSize={22}>Profile</Text>
        <code>
            {JSON.stringify(user)}
        </code>
    <br />
        <Button colorScheme="blue" variant={"solid"} onClick={handleLogout}>Log Out</Button>
    </div>
}

export default Profile;