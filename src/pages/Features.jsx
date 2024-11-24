import { FiCheck, FiPackage, FiTool, FiShield } from "react-icons/fi";

function Features() {
  const features = [
    {
      title: "Core Features",
      icon: <FiCheck className="w-6 h-6" />,
      items: [
        "Create, Edit & Complete Tasks",
        "Real-time Search",
        "User Authentication",
        "Password Reset",
        "Pagination",
        "Motivational Quotes",
      ],
    },
    {
      title: "Tech Stack",
      icon: <FiTool className="w-6 h-6" />,
      items: [
        "React 18",
        "Firebase (Auth & Database)",
        "TailwindCSS",
        "React Router v6",
        "Context API",
        "Custom Hooks",
      ],
    },
    {
      title: "Enhanced Experience",
      icon: <FiPackage className="w-6 h-6" />,
      items: [
        "date-fns - Smart Date Formatting",
        "react-confetti - Task Completion Celebrations",
        "use-sound - Action Feedback",
        "react-icons - Modern UI Icons",
        "Smooth Animations",
        "Dark Mode UI",
      ],
    },
    {
      title: "Security",
      icon: <FiShield className="w-6 h-6" />,
      items: [
        "Secure Authentication",
        "Protected Routes",
        "Email Verification",
        "Data Validation",
        "Real-time Security Rules",
        "Safe Password Reset",
      ],
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl font-bold tracking-tight">
            <span
              className="text-transparent bg-clip-text animate-text-gradient
              bg-[size:200%] bg-gradient-to-r 
              from-cyan-500 via-purple-500 via-pink-500 
              via-violet-500 via-purple-500 to-cyan-500"
            >
              Features Overview
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Modern task management with a delightful user experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((section, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 
                border-2 border-gray-700/50 hover:border-gray-600/50
                transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gray-700/50">
                  {section.icon}
                </div>
                <h2 className="text-xl font-semibold text-gray-200">
                  {section.title}
                </h2>
              </div>

              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-center gap-2 text-gray-400 hover:text-gray-300
                      transition-colors duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p> More exciting features coming soon! ✨</p>
        </div>
      </div>
    </div>
  );
}

export default Features;
