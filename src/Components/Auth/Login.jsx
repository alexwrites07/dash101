import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../Loading/Loading";
import './Login.css';
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotPhone, setForgotPhone] = useState("");
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState("");

    
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
    const handleForgotPassword = async () => {
        try {
            const response = await fetch('https://server.avyudha.com/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: forgotPhone }),
            });

            const data = await response.json();

            if (response.ok) {
                setShowForgotPassword(false);
                setShowOtpModal(true);
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Failed to send reset request. Please try again.");
        }
    };

    const handleResetPassword = async () => {
        try {
            const response = await fetch('https://server.avyudha.com/verifyNewPassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phone: forgotPhone,
                    newPassword,
                    otp
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Password reset successful! Please login with your new password.");
                setShowOtpModal(false);
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Failed to reset password. Please try again.");
        }
    };
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
                                <div className="relative w-full">
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="border border-gray-300 rounded-lg w-full p-2 pr-10 mb-4"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-600 -mt-2"
                onClick={() => setShowPassword((prev) => !prev)}
            >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
        </div>
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
                            <p className="text-sm text-blue-600 text-center cursor-pointer hover:underline" onClick={() => setShowForgotPassword(true)}>
                                Forgot Password?
                            </p>
                        </form>
                    </div>
                </div>
            )}
             {showForgotPassword && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
                        <input
    type="text"
    placeholder="Enter your phone number"
    className="border border-gray-300 rounded-lg w-full p-2 mb-4"
    maxLength={10}
    onChange={(e) => {
        const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
        if (value.length <= 10) {
            setForgotPhone(value);
        }
    }}
    onBlur={(e) => {
        if (e.target.value.length !== 10) {
            alert("Phone number must be exactly 10 digits.");
        }
    }}
/>

                        <button onClick={handleForgotPassword} className="w-full bg-blue-600 text-white rounded-lg p-2">Send OTP</button>
                        <button onClick={() => setShowForgotPassword(false)} className="w-full mt-2 bg-gray-300 rounded-lg p-2">Cancel</button>
                    </div>
                </div>
            )}

            {/* OTP and New Password Modal */}
            {showOtpModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Enter OTP & New Password </h2>
                    

                        <input
                            type="text"
                            placeholder="Enter OTP"
                            className="border border-gray-300 rounded-lg w-full p-2 mb-2"
                            onChange={(e) => setOtp(e.target.value)}
                        />
                         <div className="relative w-full">
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="border border-gray-300 rounded-lg w-full p-2 pr-10 mb-4"
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-600 -mt-2"
                onClick={() => setShowPassword((prev) => !prev)}
            >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
        </div>
                        <button onClick={handleResetPassword} className="w-full bg-blue-600 text-white rounded-lg p-2">Reset Password</button>
                        <button onClick={() => setShowOtpModal(false)} className="w-full mt-2 bg-gray-300 rounded-lg p-2">Cancel</button>
                    </div>
                </div>
            )}
        </>
    );
    
}