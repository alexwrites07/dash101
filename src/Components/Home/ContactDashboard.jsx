import { useState } from "react";

export default function ContactUsForm() {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("https://server.avyudha.com/submitComplaint", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ description: message }),
            });

            const result = await response.json();
            alert(result.message);  // Adjust based on API response structure
        } catch (error) {
            alert("Error submitting complaint");
        }
    };

    return (
        <div className="max-w-9xl mx-auto w-full h-full bg-white border border-[#a0a0a0] mx-4 md:p-12 p-6 py-24 md:rounded-[20px] rounded-[20px]">
            <form className="flex flex-col gap-4 mx-1 -my-12" onSubmit={handleSubmit}>
                <div className="flex flex-col my-4">
                    <label htmlFor="message" className="text-left">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Write here"
                        rows="5"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full border border-[#a0a0a0] rounded-md p-2 mt-2"
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
