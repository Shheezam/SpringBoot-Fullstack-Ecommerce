import React from "react";

const Footer = () => {
  return (
    
<footer class="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <a class="flex items-center mb-4 sm:mb-0">
                <img src={require("./../Assets/Images/logo-no-background.png")} class="h-12 mr-3" alt="ARC Logo" />
                <span class="self-center text-sm font-semibold whitespace-nowrap dark:text-black">Unleash Your Inner Champion</span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-black-500 sm:mb-0 dark:text-black">
                <li>
                    <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
                </li>
                <li>
                    <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" class="mr-4 hover:underline md:mr-6 ">Licensing</a>
                </li>
                <li>
                    <a href="#" class="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-black-500 sm:text-center dark:text-black">© 2023 <a class="hover:underline">ARC™</a>. All Rights Reserved.</span>
    </div>
</footer>


    
);
}

export default Footer;