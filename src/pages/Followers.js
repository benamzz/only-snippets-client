import { useEffect, useState, useContext } from "react";
import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";
import { useParams, Link } from "react-router-dom";
import User from "../components/User";
import api from "../api"
import { AuthContext } from '../context/auth.context'

function Followers() {
    const [followers, setFollowers] = useState(null)
    const { userId } = useParams();
    const { isLoggedIn } = useContext(AuthContext)

    //get followers
    useEffect(() => {
        api().get(`/users/${userId}/followers`)
            .then(followers => setFollowers(followers.data))
            .catch(err => console.log(err))
    }, [userId])
    if (!isLoggedIn) return (
        <>
            <p>You must login to access this page</p>
            <Link to="/login">Login</Link>
        </>
    )
    return (
        <div className="FollowersList">
            <TopNavbar />
            {followers && (followers.map(el => {
                return (
                    <div key={el._id}>
                        <User value={el}></User>
                    </div>
                )
            }))}
            <BottomNavbar />
        </div>
    )
}
export default Followers;