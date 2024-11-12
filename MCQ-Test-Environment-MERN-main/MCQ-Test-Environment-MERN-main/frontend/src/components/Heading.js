import { API_END_POINT } from '../utils/constant';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from '../assets/th.jpeg';

const Heading = () => {
    const navigate = useNavigate(); // Initialize navigate

    const handleLogout = async () => {
        try {
            const res = await axios.get(`${API_END_POINT}/logout`, {
                withCredentials: true, // Include credentials if needed
            });

            if (res.data.success) {
                // If logout is successful, navigate to login page
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <header className="h-16 flex items-center shadow-sm">
            <nav className="flex justify-between items-center w-9/12 mx-auto">
                <a href="/" className="text-zinc-800 font-bold uppercase">
                <img src={logo} alt="logo" style={{ width: '80px', height: '80px' }} />

                </a>
                <div className="space-x-5 flex items-center">
                    <ul className="space-x-5 sm:flex hidden">
                        <li className="hover:text-yellow-500"><a href="https://github.com/AbhishekRana78">Stoke Abhishek Rana</a></li>
                     
                        <li className="hover:text-yellow-500"><a href="https://abhishekrana-portfolio.netlify.app/">About me</a></li>
                    </ul>
                    <button
                        onClick={handleLogout}
                        className="font-medium px-5 py-1 border border-[#fad763] rounded text-[#8ab5f6]"
                    >
                        Logout
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Heading;
