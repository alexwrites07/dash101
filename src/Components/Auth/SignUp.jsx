import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 
import LoadingSpinner from "../Loading/Loading";
import axios from "axios";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    // Roles and images
    const roles = ["Teacher", "Institution", "Students", "Admin"];
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentRole = roles[currentIndex];

    const roleImages = [
        "https://i.pinimg.com/736x/ec/7f/1f/ec7f1ffc43a71274e16953245fc34ee7.jpg", // Teacher
        "https://i.pinimg.com/736x/8c/ad/57/8cad5787632904714301f367a69b2e27.jpg", // Institution
        "https://i.pinimg.com/736x/54/d1/f1/54d1f153037e28aa467fe04166166459.jpg", // Student
        "https://i.pinimg.com/736x/1f/08/63/1f086353dda55ebf102569b60f0bdf26.jpg" // Admin
    ];

    const homeImgSrc = roleImages[currentIndex];

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccessMessage("");
    
        const apiRoutes = {
            Teacher: "https://server.avyudha.com/register/tutor",
            Institution: "https://server.avyudha.com/register/organization",
            Students: "https://server.avyudha.com/register/student",
        };
    
        if (currentRole === "Admin") {
            navigate("/404");
            return;
        }
    
        try {
            // Adjust payload dynamically
            const payload = {
                username: username,
                email: email,
                password: password,
                phone: phone,
                ...(currentRole === "Institution" ? { name } : { fullName: name }),
            };
    
            const response = await axios.post(apiRoutes[currentRole], payload);
            setIsOtpSent(true);
        } catch (err) {
            // ✅ Extract API error message properly
            if (err.response && err.response.data) {
                setError(err.response.data.message || "An error occurred. Please try again.");
            } else {
                setError("Network error. Please check your connection.");
            }
        } finally {
            setIsLoading(false);
        }
    }
    
    

    async function handleOtpSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccessMessage("");
    
        const otpRoutes = {
            Teacher: "https://server.avyudha.com/register/tutor/verify",
            Institution: "https://server.avyudha.com/register/organization/verify",
            Students: "https://server.avyudha.com/register/student/verify",
        };
    
        if (currentRole === "Admin") {
            setError("Admin signup is not allowed.");
            setIsLoading(false);
            return;
        }
    
        try {
            const payload = {
                email: email,
                otp: otp,
            };
    
            const response = await axios.post(otpRoutes[currentRole], payload);
            setSuccessMessage("Signup successful! Redirecting...");
    
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError("Invalid OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }
    

 
    return (
        <>
          {isLoading ? (
            <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
              <LoadingSpinner />
            </div>
          ) : (
            
              <div
                className="flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center"
                style={{
                    height: "calc(100vh - 8rem)", // Space between navbar and footer
                    backgroundImage: `url(${homeImgSrc})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                >
                <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md border border-gray-300 mx-4">
                    <h1 className="text-xl font-semibold text-center text-[#041F96] mb-3">
                    {isOtpSent ? "Enter OTP" : `${currentRole} Sign Up`}
                    </h1>
                    <div className="flex justify-around mb-3">
                    {roles.map((role, index) => (
                        <div
                        key={index}
                        className={`cursor-pointer px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                            currentIndex === index
                            ? "bg-[#041F96] text-white"
                            : "bg-gray-200 text-black hover:bg-gray-300"
                        }`}
                        onClick={() => setCurrentIndex(index)}
                        >
                        {role}
                        </div>
                    ))}
                    </div>

                    {!isOtpSent ? (
                    <form className="space-y-2" onSubmit={handleSubmit}>
                        <div>
                        <label
                            htmlFor="name"
                            className="block mb-1 text-xs font-medium text-blue-600"
                        >
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-black"
                            placeholder="Your Full Name"
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                        </div>
                        <div>
                        <label
                            htmlFor="username"
                            className="block mb-1 text-xs font-medium text-blue-600"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-black"
                            placeholder="Username"
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        </div>
                        <div>
                        <label
                            htmlFor="email"
                            className="block mb-1 text-xs font-medium text-blue-600"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-black"
                            placeholder="name@domain.com"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        </div>
                        <div>
                        <label
                            htmlFor="password"
                            className="block mb-1 text-xs font-medium text-blue-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-black"
                            placeholder="••••••••"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </div>
                        <div>
                        <label
                            htmlFor="phone"
                            className="block mb-1 text-xs font-medium text-blue-600"
                        >
                            Phone Number
                        </label>
                        <div className="flex items-center">
                            <span className="px-2 py-1 bg-gray-200 border border-gray-300 rounded-l-lg text-sm">
                            +91
                            </span>
                            <input
                            type="tel"
                            id="phone"
                            className="w-full p-2 border border-gray-300 rounded-r-lg text-sm focus:ring-black"
                            placeholder="XXXXXXXXXX"
                            pattern="[0-9]{10}"
                            required
                            onChange={(e) => setPhone(`+91${e.target.value}`)}
                            />
                        </div>
                        </div>
                        <button
                        type="submit"
                        className="w-full bg-[#041F96] text-white text-sm p-2 rounded-lg hover:bg-blue-700 transition"
                        >
                        Sign Up
                        </button>
                        {error && <p className="text-xs text-red-500">{error}</p>}
                    </form>
                    ) : (
                    <form className="space-y-2" onSubmit={handleOtpSubmit}>
                        <div>
                        <label
                            htmlFor="otp"
                            className="block mb-1 text-xs font-medium text-[#041F96]"
                        >
                            Enter OTP
                        </label>
                        <input
                            type="text"
                            id="otp"
                            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-black"
                            placeholder="Enter OTP"
                            required
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        </div>
                        <button
                        type="submit"
                        className="w-full bg-[#041F96] text-white text-sm p-2 rounded-lg hover:bg-blue-700 transition"
                        >
                        Verify OTP
                        </button>
                        {error && <p className="text-xs text-red-500">{error}</p>}
                        {successMessage && <p className="text-xs text-green-500">{successMessage}</p>}
                    </form>
                    )}
                </div>
                </div>

          )}
        </>
      );
      
    
    
}