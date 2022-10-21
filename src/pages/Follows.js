import { useEffect, useState, useContext } from "react";
import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";
import { useParams, Link } from "react-router-dom";
import User from "../components/User";
import api from "../api"
import { AuthContext } from '../context/auth.context'

function Follows() {
    const { userId } = useParams();
    const [follows, setFollows] = useState(null)
    const { isLoggedIn } = useContext(AuthContext)

    //get follows
    useEffect(() => {
        api().get(`/users/${userId}`)
            .then(userFromApi => setFollows(userFromApi.data.following))
            .catch(err => console.log("err", err));
    }, [userId]);
    if (!isLoggedIn) return (
        <>
            <p>You must login to access this page</p>
            <Link to="/login">Login</Link>
        </>
    )
    if (!follows) return "loading";

    return (
        <div className="FollowersList">
            <TopNavbar />
            {follows && (follows.map(el => {
                return (
                    <div key={el._id}>
                        <User value={el} />
                    </div>
                )
            }))}
            <BottomNavbar />
        </div>
    )
}
export default Follows;