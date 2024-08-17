// import React from 'react'

// function Home() {
//   return (
//     <div>
//          <section className="pt-20 md:pt-40">
//             <div className="container mx-auto px-8 lg:flex">
//                 <div className="text-center lg:text-left lg:w-1/2">
//                     <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-none">Main title of your
//                         landing page</h1>
//                     <p className="text-xl lg:text-2xl mt-6 font-light">Free landing page template to promote your
//                         business startup and generate leads for the offered services
//                     </p>
//                     <p className="mt-8 md:mt-12">
//                         <button type="button"
//                             className=" py-4 px-12 bg-teal-500 hover:bg-teal-600 rounded text-white">Get Started</button>
//                     </p>
//                     <p className="mt-4 text-gray-600">Sed fermentum felis ut cursu
//                     </p>
//                 </div>

//                 <div className="lg:w-1/2">
//                     <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"
//                         viewBox="0 0 1167.52 754.06">
                       
                   
//                     </svg>
//                 </div>
//             </div>
//         </section>
//     </div>
//   )
// }

// export default Home



import React from 'react';

const Home = () => {
  return (
    <body className="bg-gradient-to-br from-gray-900 to-black">
      <div className="text-gray-300 container mx-auto p-8 overflow-hidden md:rounded-lg md:p-10 lg:p-12">
        <div className="flex justify-between">
          <h1 className="font-serif text-3xl font-medium">Home</h1>
          <span className="self-start px-3 py-2 leading-none text-gray-200 border border-gray-800 rounded-lg focus:outline-none focus:shadow-outline bg-gradient-to-b hover:from-indigo-500 from-gray-900 to-black">
            Logout
          </span>
        </div>

        <div className="h-32 md:h-40"></div>

        <p className="font-sans text-4xl font-bold text-gray-200 max-w-5xl lg:text-7xl lg:pr-24 md:text-6xl">
          Spend less time coding and more time creating
        </p>
        <div className="h-10"></div>
        <p className="max-w-2xl font-serif text-xl text-gray-400 md:text-2xl">
          Imagine being able to spend less time... This is a demonstration landing
          page made with tailwindcss.
        </p>

        <div className="h-32 md:h-40"></div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <p
              className="self-start inline font-sans text-xl font-medium text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-green-600"
            >
              Simple and easy
            </p>
            <h2 className="text-4xl font-bold">Made for devs and designers</h2>
            <div className="h-6"></div>
            <p className="font-serif text-xl text-gray-400 md:pr-10">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
              autem, a recusandae vero praesentium qui impedit doloremque
              molestias necessitatibus.
            </p>
            <div className="h-8"></div>
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-800">
              <div>
                <p className="font-semibold text-gray-400">Made with love</p>
                <div className="h-4"></div>
                <p className="font-serif text-gray-400">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Delectus labor.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-400">It's easy to build</p>
                <div className="h-4"></div>
                <p className="font-serif text-gray-400">
                  Ipsum dolor sit, amet consectetur adipisicing elit. Delectus
                  amet consectetur.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="-mr-24 rounded-lg md:rounded-l-full bg-gradient-to-br from-gray-900 to-black h-96"></div>
          </div>
        </div>

        <div className="h-32 md:h-40"></div>

        <p className="font-serif text-4xl">
          <span className="text-gray-400">If we work all together</span>
          <span className="text-gray-600">
            consectetur adipisicing elit. Consectetur atque molestiae omnis
            excepturi enim!
          </span>
        </p>

        <div className="h-32 md:h-40"></div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex-col p-8 py-16 rounded-lg shadow-2xl md:p-12 bg-gradient-to-br from-gray-900 to-black">
            <p
              className="flex items-center justify-center text-4xl font-semibold text-green-400 bg-green-800 rounded-full shadow-lg w-14 h-14"
            >
              1
            </p>
            <div className="h-6"></div>
            <p className="font-serif text-3xl">We build products with UX in mind</p>
          </div>
          <div className="flex-col p-8 py-16 rounded-lg shadow-2xl md:p-12 bg-gradient-to-b from-gray-900 to-black">
            <p
              className="flex items-center justify-center text-4xl font-semibold text-indigo-400 bg-indigo-800 rounded-full shadow-lg w-14 h-14"
            >
              2
            </p>
            <div className="h-6"></div>
            <p className="font-serif text-3xl">
              You can trust us to deliver super fast
            </p>
          </div>
          <div className="flex-col p-8 py-16 rounded-lg shadow-2xl md:p-12 bg-gradient-to-bl from-gray-900 to-black">
            <p
              className="flex items-center justify-center text-4xl font-semibold text-teal-400 bg-teal-800 rounded-full shadow-lg w-14 h-14"
            >
              3
            </p>
            <div className="h-6"></div>
            <p className="font-serif text-3xl">We made it simple and easy to do</p>
          </div>
        </div>

        <div className="h-40"></div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col justify-center md:col-span-2">
            <p
              className="self-start inline font-sans text-xl font-medium text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-teal-600"
            >
              We are humans
            </p>
            <h2 className="text-4xl font-bold">We could work together</h2>
            <div className="h-6"></div>
            <p className="font-serif text-xl text-gray-400 md:pr-10">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
              autem, a recusandae vero praesentium qui impedit doloremque
              molestias.
            </p>
            <div className="h-8"></div>
            <div className="grid gap-6 pt-8 border-t border-gray-800 lg:grid-cols-3">
              <div>
                <p className="font-semibold text-gray-400">Made with love</p>
                <div className="h-4"></div>
                <p className="font-serif text-gray-400">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Delectus labor.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-400">It's easy to build</p>
                <div className="h-4"></div>
                <p className="font-serif text-gray-400">
                  Ipsum dolor sit, amet consectetur adipisicing elit. Delectus
                  amet consectetur.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-400">It's easy to build</p>
                <div className="h-4"></div>
                <p className="font-serif text-gray-400">
                  Ipsum dolor sit, amet consectetur adipisicing elit. Delectus
                  amet consectetur.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="-mr-24 rounded-lg md:rounded-l-full bg-gradient-to-br from-gray-900 to-black h-96"></div>
          </div>
        </div>

        <div className="h-10 md:h-40"></div>

        <div className="grid gap-4 md:grid-cols-4">
          <ul className="space-y-1 text-gray-400">
            <li className="pb-4 font-serif text-gray-400">Social networks</li>
            <li>
              <a href="https://twitter.com/victormustar" className="hover:underline">
                Twitter
              </a>
            </li>
            <li>
              <span className="hover:underline">Linkedin</span>
            </li>
            <li>
              <span className="hover:underline">Facebook</span>
            </li>
          </ul>
          <ul className="space-y-1 text-gray-400">
            <li className="pb-4 font-serif text-gray-400">Locations</li>
            <li>
              <span className="hover:underline">Paris</span>
            </li>
            <li>
              <span className="hover:underline">New York</span>
            </li>
            <li>
              <span className="hover:underline">London</span>
            </li>
            <li>
              <span className="hover:underline">Singapore</span>
            </li>
          </ul>
          <ul className="space-y-1 text-gray-400">
            <li className="pb-4 font-serif text-gray-400">Company</li>
            <li>
              <span className="hover:underline">The team</span>
            </li>
            <li>
              <span className="hover:underline">About us</span>
            </li>
            <li>
              <span className="hover:underline">Our vision</span>
            </li>
            <li>
              <span className="hover:underline">Join us</span>
            </li>
          </ul>
          <ul className="space-y-1 text-gray-400">
            <li className="pb-4 font-serif text-gray-400">Join</li>
            <li>
              <a
                href="https://github.com/gary149/landing-gradients"
                className="self-start px-3 py-2 leading-none text-gray-200 border border-gray-800 rounded-lg focus:outline-none focus:shadow-outline bg-gradient-to-b hover:from-indigo-500 from-gray-900 to-black"
              >
                Get this template
              </a>
            </li>
          </ul>
        </div>
        <div className="h-12"></div>
      </div>
    </body>
  );
};

export default Home;
