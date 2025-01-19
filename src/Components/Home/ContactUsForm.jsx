import { useState } from "react";

export default function ContactUsForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        phoneNumber: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("authToken"); // Replace 'authToken' with your actual token key.
        const payload = {
            name: formData.firstName,
            email: formData.email,
            phone: formData.phoneNumber,
            message: formData.message,
        };

        try {
            const response = await fetch("https://server.avyudha.com/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const result = await response.json();
                alert("Message sent successfully!");
                console.log(result);
                setFormData({
                    firstName: "",
                    phoneNumber: "",
                    email: "",
                    message: "",
                });
            } else {
                console.error("Failed to send message:", response.statusText);
                alert("Failed to send your message. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="max-w-9xl mx-auto w-full h-full bg-white border border-[#a0a0a0] mx-4 md:p-12 p-6 py-24 md:rounded-[20px] rounded-[20px]">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mx-1 -my-12"
            >
                <div className="md:flex md:space-x-4">
                    <div className="w-full mt-4">
                        <label htmlFor="firstName">First Name*</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full border border-[#a0a0a0] rounded-md p-2"
                            required
                        />
                    </div>
                </div>
                <div className="md:flex md:space-x-4">
                <div className="md:w-1/2 w-full">
    <label htmlFor="phoneNumber">Phone Number*</label>
    <div className="flex">
        <select
            id="countryCode"
            name="countryCode"
            className="border border-[#a0a0a0] w-24 rounded-l-md p-2 bg-white"
            defaultValue="+91"
        >
             <option value="+91">+91 (India)</option>
    <option value="+1">+1 (USA)</option>
    <option value="+44">+44 (UK)</option>
    <option value="+61">+61 (Australia)</option>
    <option value="+81">+81 (Japan)</option>
    <option value="+49">+49 (Germany)</option>
    <option value="+33">+33 (France)</option>
    <option value="+86">+86 (China)</option>
    <option value="+55">+55 (Brazil)</option>
    <option value="+27">+27 (South Africa)</option>
    <option value="+7">+7 (Russia)</option>
           
        </select>
        <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="10-digit phone number"
            pattern="[0-9]{10}"
            title="Please enter a 10-digit phone number"
            maxLength={10}
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full border border-[#a0a0a0] rounded-r-md p-2"
            required
        />
    </div>
</div>

                    <div className="md:w-1/2 w-full mt-4 md:mt-0">
                        <label htmlFor="email">Email*</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-[#a0a0a0] rounded-md p-2"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="message" className="text-left">
                        Message*
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Write here"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full border border-[#a0a0a0] rounded-md p-2"
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-[#285196] text-white px-4 py-2 w-full mb-4 rounded-[50px]"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
