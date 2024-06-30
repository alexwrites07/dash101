import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'; 
import LoadingSpinner from "../Loading/Loading";

export default function SignUp() {
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
        "https://res.cloudinary.com/dr9iwqqv7/image/upload/v1719392884/vector-male-teacher-with-pointer-on-lesson-at-blackboard-in-classroom-removebg-preview_zhf9xe.png",
        "https://res.cloudinary.com/dr9iwqqv7/image/upload/v1719395157/facade-school-educational-institution-boy-vector-32443814-removebg-preview_f0xdya.png",
        "https://res.cloudinary.com/dr9iwqqv7/image/upload/c_fill,h_400/v1719395572/a-student-boy-cartoon-character-isolated-on-white-background-free-vector-removebg-preview_uamkbb.png",
        "https://res.cloudinary.com/dr9iwqqv7/image/upload/v1719395442/556-5569981_data-clipart-administrator-system-administrator-clipart-hd-png-removebg-preview_1_ebjcc4.png"
    ];

    useEffect(() => {
        setCurrentRole(roles[currentIndex]);
    }, [currentIndex]);

    const homeImgSrc = imgUrl[currentIndex];

    function roleChangeInLogin(index) {
        setIsFading(true);
        setTimeout(() => {
            setCurrentIndex(index);
            setIsFading(false);
        }, 300); 
    }

    return (
        <>
            {isLoading ? (
                <div>
                    <LoadingSpinner />
                </div>
            ) : (
                <div className=" lg:h-1/2 h-[800px] w-screen p-3 bg-white-900">
                    <div className={`${currentIndex === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} overflow-hidden lg:flex lg:flex-row flex-col-reverse h-full w-full flex items-center justify-center bg-white-900 rounded-[20px]`}>
                        {/* left */}
                        <div className="overflow-hidden lg:w-3/5  h-full flex justify-center place-items-top lg:place-items-center bg-white-900 rounded-[20px]">
                            <img
                                src={homeImgSrc}
                                alt="left"
                                className={`h-[80%] object-contain lg:object-center object-top transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}
                            />
                        </div>

                        {/* right */}
                        <div className="lg:w-2/5 w-full ml-10 mr-10 bg-white-900 rounded-[20px]">
                            <section className="bg-white-900">
                                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full lg:py-0">
                                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white">
                                        {/* <img className="w-32 h-12 mr-2 -mb-2" src="https://kridhatutor.com/wp-content/uploads/2020/04/kridha-tutor-tuition-logo-e1681547247439.webp" alt="logo" /> */}
                                    </a>
                                    <div className="w-full bg-white rounded-lg shadow lg:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-300 dark:border-gray-700">
                                        <div className="p-6 space-y-4 lg:space-y-6 sm:p-8">
                                            <h1 className={`text-xl font-bold leading-tight tracking-tight text-[#041F96] lg:text-2xl transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                                                {currentRole} SignUp
                                            </h1>
                                            <form className="space-y-4 lg:space-y-6" onSubmit={(e) => {
                                                e.preventDefault(); 
                                            }}>
                                                <div>
                                                    <label htmlFor="name" className="block mb-1 text-sm font-medium text-blue-500">Your Name</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 text-black focus:ring-blue-500 border-blue-500"
                                                        placeholder="Mr/Mrs"
                                                        required=""
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-blue-500">Your email</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 text-black focus:ring-blue-500 border-blue-500"
                                                        placeholder="name@company.com"
                                                        required=""
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        placeholder="••••••••"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 text-black focus:ring-blue-500 border-blue-500"
                                                        required=""
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                                >
                                                    Sign Up
                                                </button>
                                                {error && <p style={{ color: "red" }}>{error}</p>}
                                                <p className="flex flex-row gap-10">
                                                    {roles.map((role, index) => (
                                                        <a onClick={() => roleChangeInLogin(index)} key={index} className={`flex flex-row ${currentIndex === index ? 'hidden' : 'font-bold text-blue-500'}`}>
                                                            {role} ?
                                                        </a>
                                                    ))}
                                                </p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
          )}
          </>
      );
  }
