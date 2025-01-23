import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../Loading/Loading";
import './Login.css';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const roles = ["Teacher", "Institution", "Students", "Admin"];
    const [currentIndex, setCurrentIndex] = useState(1);
    const [currentRole, setCurrentRole] = useState(roles[currentIndex]);
    const [isFading, setIsFading] = useState(false);
    const imgUrl = [
        "https://i.pinimg.com/736x/e7/5c/cf/e75ccf2a214b7b71068ac2ebe410111c.jpg",
        "https://i.pinimg.com/736x/e7/5c/cf/e75ccf2a214b7b71068ac2ebe410111c.jpg",
        "https://i.pinimg.com/736x/e7/5c/cf/e75ccf2a214b7b71068ac2ebe410111c.jpg",
        "https://i.pinimg.com/736x/e7/5c/cf/e75ccf2a214b7b71068ac2ebe410111c.jpg"
    ];

    useEffect(() => {
        setCurrentRole(roles[currentIndex]);
    }, [currentIndex]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const loginData = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch('https://server.avyudha.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (response.ok) {
                const type = data.type.toLowerCase();
                const token = data.token;

                localStorage.setItem('token', token);
                localStorage.setItem('type', type);

                if (type === 'admin') navigate('/student-profiles');
                else navigate('/your-profile');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Failed to login. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // return (
    //     <>
    //         {isLoading ? (
    //             <div>
    //                 <LoadingSpinner />
    //             </div>
    //         ) : (
    //             <div
    //                 className="h-screen w-screen flex items-center justify-center bg-cover bg-center"
    //                 style={{
    //                     backgroundImage: `url(${imgUrl[currentIndex]})`,
    //                     transition: 'opacity 0.3s',
    //                     opacity: isFading ? 0 : 1,
    //                 }}
    //             >
    //                 <div className="w-full sm:max-w-md bg-gray-300 rounded-lg shadow p-8">
    //                     <h1 className="text-xl font-bold leading-tight tracking-tight text-[#041F96] text-center mb-6">
    //                         Login
    //                     </h1>
    //                     <form className="space-y-4" onSubmit={handleSubmit}>
    //                         <div>
    //                             <label htmlFor="email" className="block mb-2 text-sm font-medium text-blue-500">
    //                                 Your email
    //                             </label>
    //                             <input
    //                                 type="email"
    //                                 name="email"
    //                                 id="email"
    //                                 className="border sm:text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
    //                                 placeholder="name@company.com"
    //                                 required
    //                                 onChange={(e) => setEmail(e.target.value)}
    //                             />
    //                         </div>
    //                         <div>
    //                             <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#041F96]">
    //                                 Password
    //                             </label>
    //                             <input
    //                                 type="password"
    //                                 name="password"
    //                                 id="password"
    //                                 placeholder="••••••••"
    //                                 className="sm:text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 text-black focus:ring-blue-500 border-blue-500"
    //                                 required
    //                                 onChange={(e) => setPassword(e.target.value)}
    //                             />
    //                         </div>
    //                         <button
    //                             type="submit"
    //                             className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
    //                         >
    //                             Login
    //                         </button>
    //                         {error && <p style={{ color: "red" }}>{error}</p>}
    //                         <p className="text-sm font-light text-gray-500">
    //                             Don’t have an account yet? <a href="/signup" className="font-medium text-primary-600 hover:underline">Sign up</a>
    //                         </p>
    //                     </form>
    //                 </div>
    //             </div>
    //         )}
    //     </>
    // );
    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
                    <LoadingSpinner />
                </div>
            ) : (
                <div
                    className="flex opacity-95 items-center justify-center bg-cover bg-center"
                    style={{
                        height: "calc(100vh - 8rem)", // Adjust based on navbar + footer height
                        backgroundImage: `url(${imgUrl[currentIndex]})`,
                        transition: 'opacity 0.3s ease-in-out',
                        opacity: isFading ? 0 : 1,
                    }}
                >
                    <div className="w-full opacity-95 sm:max-w-sm bg-white rounded-lg shadow-md p-8">
                        <h1 className="text-xl font-bold text-center text-[#041F96] mb-6">
                            Login
                        </h1>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-blue-600"
                                >
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="border border-gray-300 text-sm rounded-lg block w-full p-2 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-blue-600"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="border border-gray-300 text-sm rounded-lg block w-full p-2 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white font-medium rounded-lg text-sm px-4 py-2 bg-[#041F96] hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all"
                            >
                                Login
                            </button>
                            {error && (
                                <p className="text-red-500 text-sm text-center mt-2">
                                    {error}
                                </p>
                            )}
                            <p className="text-sm font-light text-gray-500 text-center">
                                Don’t have an account yet?{' '}
                                <a
                                    href="/signup"
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    Sign up
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
    
}