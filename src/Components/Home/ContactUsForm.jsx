import { useState } from "react";

export default function ContactUsForm() {
    return (
        <div className="max-w-9xl mx-auto w-full h-full bg-white border border-[#a0a0a0] mx-4 md:p-12 p-6 py-24 md:rounded-[20px] rounded-[20px]">
            <form className="flex flex-col gap-4 mx-1 -my-12">
                <div className="md:flex md:space-x-4">
                    <div className="w-full mt-4">
                        <label htmlFor="firstName">First Name*</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                            className="w-full border border-[#a0a0a0] rounded-md p-2"
                        />
                    </div>
                </div>
                <div className="md:flex md:space-x-4">
                    <div className="md:w-1/2 w-full">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            pattern="[0-9]{10}"
                            title="Please enter a 10-digit phone number"
                            maxLength={10}
                            className="w-full border border-[#a0a0a0] rounded-md p-2"
                            required // If you want to make this field mandatory
                        />
                    </div>
                    <div className="md:w-1/2 w-full mt-4 md:mt-0">
                        <label htmlFor="email">Email*</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email Address"
                            className="w-full border border-[#a0a0a0] rounded-md p-2"
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="message" className="text-left">Message*</label>
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Write here"
                        rows="5"
                        className="w-full border border-[#a0a0a0] rounded-md p-2"
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
