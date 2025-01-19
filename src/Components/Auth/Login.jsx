import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../Loading/Loading";
import "./Login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false); // Modal state
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
    const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const navigate = useNavigate();
    const roles = ["Teacher", "Institution", "Students", "Admin"];
    const [currentIndex, setCurrentIndex] = useState(1);
    const [currentRole, setCurrentRole] = useState(roles[currentIndex]);
    const [isFading, setIsFading] = useState(false);
    const imgUrl = [
        "https://res.cloudinary.com/dr9iwqqv7/image/upload/v1719392884/vector-male-teacher-with-pointer-on-lesson-at-blackboard-in-classroom-removebg-preview_zhf9xe.png",
        "https://res.cloudinary.com/dr9iwqqv7/image/upload/v1719395157/facade-school-educational-institution-boy-vector-32443814-removebg-preview_f0xdya.png",
        "https://res.cloudinary.com/dr9iwqqv7/image/upload/v1719395572/a-student-boy-cartoon-character-isolated-on-white-background-free-vector-removebg-preview_uamkbb.png",
        "https://res.cloudinary.com/dr9iwqqv7/image/upload/v1719395442/556-5569981_data-clipart-administrator-system-administrator-clipart-hd-png-removebg-preview_1_ebjcc4.png",
    ];

    useEffect(() => {
        setCurrentRole(roles[currentIndex]);
    }, [currentIndex]);

    const homeImgSrc = imgUrl[0];

    function roleChangeInLogin(index) {
        setIsFading(true);
        setTimeout(() => {
            setCurrentIndex(index);
            setIsFading(false);
        }, 300);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const loginData = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch("https://server.avyudha.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();
            if (response.ok) {
                const type = data.type.toLowerCase();
                const token = data.token;

                // Store token and type in local storage
                localStorage.setItem("token", token);
                localStorage.setItem("type", type);
                console.log(token);

                // Redirect to the appropriate dashboard
                navigate(type === "admin" ? "/student-profiles" : "/your-profile");
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("Failed to login. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("https://server.avyudha.com/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: forgotPasswordEmail }),
            });

            const data = await response.json();
            if (response.ok) {
                setForgotPasswordMessage("OTP sent to your email. Please check your inbox.");
                setIsOtpSent(true);
            } else {
                setForgotPasswordMessage(data.message);
            }
        } catch (error) {
            setForgotPasswordMessage("Error sending OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("https://server.avyudha.com/verifyNewPassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: forgotPasswordEmail,
                    newPassword: newPassword,
                    otp: otp,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setForgotPasswordMessage("Password reset successful.");
                navigate("/login");  // Redirect to login page after successful password reset
            } else {
                setForgotPasswordMessage(data.message);
                alert(data.message);
            }
        } catch (error) {
            setForgotPasswordMessage("Error resetting password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="lg:h-screen h-[1000px] w-screen p-3 bg-white-800">
                    <div className="lg:flex lg:flex-row h-full w-full flex items-center justify-center bg-white-900 rounded-[20px]">
                        {/* Left Section */}


                        {/* Right Section */}
                        <div className="lg:w-2/5 w-full ml-10 mr-10 bg-white-900 rounded-[20px]">
                            <section>
                                <div className="flex flex-col items-center px-6 py-8 mx-auto h-full lg:py-0">
                                    <div className="w-full rounded-lg shadow lg:mt-0 sm:max-w-md xl:p-0 bg-gray-300">
                                        <div className="p-6 space-y-4 lg:space-y-6">
                                            <h1 className="text-xl font-bold text-[#041F96] lg:text-2xl">Login</h1>
                                            <form className="space-y-4 lg:space-y-6" onSubmit={handleSubmit}>
                                                <div>
                                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-blue-500">
                                                        Your email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        placeholder="name@company.com"
                                                        className="border sm:text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 text-black"
                                                        required
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#041F96]">
                                                        Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        placeholder="••••••••"
                                                        className="sm:text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 text-black"
                                                        required
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-start">
                                                        <input
                                                            id="remember"
                                                            type="checkbox"
                                                            className="w-4 h-4 border-gray-300 rounded"
                                                        />
                                                        <label htmlFor="remember" className="ml-3 text-sm text-gray-500">
                                                            Remember me
                                                        </label>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="text-sm font-medium text-primary-600 hover:underline"
                                                        onClick={() => setIsForgotPasswordOpen(true)}
                                                    >
                                                        Forgot password?
                                                    </button>
                                                </div>
                                                <button type="submit" className="w-full text-white font-medium rounded-lg px-5 py-2.5 bg-primary-600 hover:bg-primary-700">
                                                    Login
                                                </button>
                                                {error && <p className="text-red-500">{error}</p>}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="overflow-hidden lg:w-3/5 h-full flex justify-center bg-white-900 rounded-[20px]">
                            <img
                                src={homeImgSrc}
                                alt="login illustration"
                                className={`h-[80%] transition-opacity duration-300 ${isFading ? "opacity-0" : "opacity-100"}`}
                            />
                        </div>
                    </div>

                    {/* Forgot Password Modal */}
                    {isForgotPasswordOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                {isOtpSent ? (
                                    <>
                                        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
                                        <input
                                            type="text"
                                            placeholder="Enter OTP"
                                            className="w-full mb-4 p-2 border rounded-lg"
                                            onChange={(e) => setOtp(e.target.value)}
                                        />
                                        <input
                                            type="password"
                                            placeholder="Enter new password"
                                            className="w-full mb-4 p-2 border rounded-lg"
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <button
                                            className="bg-primary-600 text-white px-4 py-2 rounded-lg mr-2"
                                            onClick={handleResetPassword}
                                        >
                                            Reset Password
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="w-full mb-4 p-2 border rounded-lg"
                                            onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                        />
                                        <button
                                            className="bg-primary-600 text-white px-4 py-2 rounded-lg mr-2"
                                            onClick={handleForgotPassword}
                                        >
                                            Send OTP
                                        </button>
                                    </>
                                )}
                                <button
    className="bg-gray-300 px-4 py-2 rounded-lg"
    onClick={() => {
        setIsForgotPasswordOpen(false); // Close the modal
        setIsOtpSent(false); // Reset OTP sent state
    }}
>
    Close
</button>

                                {forgotPasswordMessage && <p className="mt-4">{forgotPasswordMessage}</p>}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
