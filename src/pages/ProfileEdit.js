import { useState, useContext } from "react";
import api from "../api";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";
import languages from "../languages";

function ProfileEdit() {
    const { user, refresh: refreshUser } = useContext(AuthContext);
    const [username, setUsername] = useState("")
    const [bio, setBio] = useState("")
    const [location, setLocation] = useState("")
    const [tags, setTags] = useState([])
    const [website, setWebsite] = useState("")
    const [linkedin, setLinkedin] = useState("")
    const [github, setGithub] = useState("")
    const [avatarUrl, setAvatarUrl] = useState("")
    const { userId } = useParams()
    const { isLoggedIn } = useContext(AuthContext)


    const navigate = useNavigate()

    const handleUsernameInput = e => setUsername(e.target.value);
    const handleBioInput = e => setBio(e.target.value);
    const handleLocationInput = e => setLocation(e.target.value);
    const handleTagsInput = e => {
        let selectedTags = Array.from(e.target.selectedOptions, option => option.value);
        setTags(selectedTags);
    };
    const handleWebsiteInput = e => setWebsite(e.target.value);
    const handleLinkedinInput = e => setLinkedin(e.target.value);
    const handleGithubInput = e => setGithub(e.target.value);

    const handleFileUpload = (e) => {
        const uploadData = new FormData();
        uploadData.append("avatarUrl", e.target.files[0]);
        api().post(`/upload`, uploadData)
            .then((response) => {
                setAvatarUrl(response.data)
            })
            .catch(err => console.log("Error while uploading file:", err))
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        const requestBody = { username, bio, location, tags, website, linkedin, github, avatarUrl };
        api().patch(`/users/${user._id}`, requestBody)
            .then(() => {
                refreshUser()
                navigate(`/users/${userId}`)
            })
            .catch(err => console.log(err));
    };
    if (!isLoggedIn) return (
        <>
            <p>You must login to access this page</p>
            <Link to="/login">Login</Link>
        </>
    )
    if (!user) return "loading"

    return (
        <div className="ProfileEdit">
            <TopNavbar />
            <form onSubmit={handleProfileSubmit}>
                <label>
                    Username : <input type="text" name="username" value={username} onChange={handleUsernameInput} placeholder={user.username} />
                </label>
                <label>
                    Bio : <input type="text" name="bio" value={bio} onChange={handleBioInput} placeholder={user.bio} />
                </label>
                <label>
                    Location : <input type="text" name="location" value={location} onChange={handleLocationInput} placeholder={user.location} />
                </label>
                <label>
                    Tags : <select name="tags" onChange={handleTagsInput} placeholder={user.tags} multiple>
                        {languages.map(elem => {
                            return (<option key={elem} value={elem} selected={user.tags.includes(elem)}>{elem}</option>)
                        })}
                    </select>
                </label>
                <label>
                    Website : <input type="text" name="website" value={website} onChange={handleWebsiteInput} placeholder={`  ${user.website}`} />
                </label>
                <label>
                    Linkedin : <input type="text" name="linkedin" value={linkedin} onChange={handleLinkedinInput} placeholder={`  ${user.linkedin}`} />
                </label>
                <label>
                    Github : <input type="text" name="github" value={github} onChange={handleGithubInput} placeholder={`  ${user.github}`} />
                </label>
                <label>
                    Profile image<input type="file" name="avatarUrl" id="uploadImg  " onChange={handleFileUpload} />
                </label>
                <button type="submit">SUBMIT</button>
            </form>
            <BottomNavbar />
        </div>)
}

export default ProfileEdit