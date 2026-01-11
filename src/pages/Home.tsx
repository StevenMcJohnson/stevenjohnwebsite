import { Github, Linkedin, Mail, Phone, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { NavContext } from '../context/NavContext';

const Home = () => {
    const location = useLocation();
    const { setActiveLink } = useContext(NavContext);

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        
        const updateActiveLink = () => {
            const scrollPosition = window.scrollY + 100; // Offset for header
            
            let currentSection = '';
            let maxVisibility = 0;
            
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top + window.scrollY;
                const sectionBottom = sectionTop + rect.height;
                
                // Calculate how much of the section is visible in the viewport
                const viewportTop = window.scrollY;
                const viewportBottom = window.scrollY + window.innerHeight;
                
                const visibleTop = Math.max(sectionTop, viewportTop);
                const visibleBottom = Math.min(sectionBottom, viewportBottom);
                const visibleHeight = Math.max(0, visibleBottom - visibleTop);
                const visibilityRatio = visibleHeight / rect.height;
                
                // If scroll position is within this section and it has good visibility
                if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom && visibilityRatio > maxVisibility) {
                    maxVisibility = visibilityRatio;
                    currentSection = section.id;
                }
            });
            
            // Handle case when at the top of the page (home section)
            if (window.scrollY < 200) {
                currentSection = 'home';
            }
            
            // Only update if we found a section and it's different
            if (currentSection) {
                const newLink = currentSection === 'home' ? '/' : `/#${currentSection}`;
                setActiveLink(newLink);
            }
        };
        
        // Initial check
        updateActiveLink();
        
        // Update on scroll
        window.addEventListener('scroll', updateActiveLink, { passive: true });
        window.addEventListener('resize', updateActiveLink, { passive: true });
        
        // Also use intersection observer for better detection
        const observer = new IntersectionObserver((entries) => {
            // Find the section with the highest intersection ratio
            let maxRatio = 0;
            let activeSection = '';
            
            entries.forEach(entry => {
                if (entry.intersectionRatio > maxRatio && entry.isIntersecting) {
                    maxRatio = entry.intersectionRatio;
                    activeSection = entry.target.id;
                }
            });
            
            // Only update if we have a valid section with good visibility
            if (activeSection && maxRatio > 0.1) {
                const newLink = activeSection === 'home' ? '/' : `/#${activeSection}`;
                setActiveLink(newLink);
            }
        }, { 
            threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
            rootMargin: '-80px 0px -50% 0px' 
        });

        sections.forEach(section => observer.observe(section));

        return () => {
            sections.forEach(section => observer.unobserve(section));
            window.removeEventListener('scroll', updateActiveLink);
            window.removeEventListener('resize', updateActiveLink);
        };
    }, [setActiveLink]);

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const sectionAnimation = {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.6 }
    };
    
    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-8 pt-24">
        
        <motion.section 
          id="home"
          className="min-h-[80vh] flex flex-col justify-center items-center text-center"
          {...sectionAnimation}
        >
          <header className="pb-6 mb-8">
            <motion.img 
              src="/profile.jpg" 
              alt="Steven John" 
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto mb-6 border-4 border-blue-400 object-cover shadow-lg"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">Steven John</h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">Computer Science Student | AI/ML Enthusiast</p>
            <div className="flex flex-col items-center justify-center gap-y-2 text-sm text-gray-500 dark:text-gray-400 sm:flex-row sm:gap-x-6 sm:text-base">
              <a href="mailto:Steven.John06@icloud.com" className="flex items-center space-x-2 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                <Mail size={20} />
                <span className="break-all">Steven.John06@icloud.com</span>
              </a>
              <a href="tel:9086361176" className="flex items-center space-x-2 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                <Phone size={20} />
                <span>908-636-1176</span>
              </a>
            </div>
             <div className="flex justify-center items-center space-x-4 mt-6">
                <a href="https://github.com/StevenMcJohnson" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"><Github size={24}/></a>
                <a href="https://www.linkedin.com/in/steven-john-465687350/" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"><Linkedin size={24}/></a>
            </div>
          </header>
           <button onClick={() => scrollToSection('about')} className="absolute bottom-16 animate-bounce">
              <ArrowDown size={32} className="text-gray-500"/>
           </button>
        </motion.section>

        <main>
          <motion.section id="about" className="mb-16 py-8" {...sectionAnimation}>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-500 dark:border-blue-400 pb-2 mb-6 inline-block">Resume Summary</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Motivated computer science student with strong analytical and communication skills. Experienced in artificial intelligence, software development, and collaborative projects. Passionate about coding, emerging technologies, and community service.
            </p>
          </motion.section>

          <motion.section id="skills" className="mb-16 py-8" {...sectionAnimation}>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-500 dark:border-blue-400 pb-2 mb-6 inline-block">Skills Summary</h2>
            <div className="space-y-6">
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Programming & AI</h3>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'Java', 'AI/ML', 'Generative AI', 'LLMs (OpenAI, Perplexity, Vibe)'].map((skill, i) => (
                    <motion.span 
                      key={skill}
                      className="bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200 px-3 py-1.5 rounded-full text-sm font-medium"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Software Development</h3>
                <div className="flex flex-wrap gap-2">
                  {['Object-oriented design', 'Teamwork', 'Problem-solving', 'TypeScript'].map((skill, i) => (
                    <motion.span 
                      key={skill}
                      className="bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200 px-3 py-1.5 rounded-full text-sm font-medium"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Tools & Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {['Replit', 'Windsurf', 'Cursor.ai', 'Crew.ai', 'Microsoft Office'].map((skill, i) => (
                    <motion.span 
                      key={skill}
                      className="bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200 px-3 py-1.5 rounded-full text-sm font-medium"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {['Conversational Spanish', 'English'].map((skill, i) => (
                    <motion.span 
                      key={skill}
                      className="bg-yellow-200 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-200 px-3 py-1.5 rounded-full text-sm font-medium"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section id="experience" className="mb-16 py-8" {...sectionAnimation}>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-500 dark:border-blue-400 pb-2 mb-6 inline-block">Professional Experience</h2>
            <div className="space-y-8">
              <div className="group bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">AI / Software Engineering Intern, Hexaware Technologies Inc.</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">July 2025 – August 2025</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-2">
                  <li>Developed EZSOP.ai to automate the creation of visual and video SOP content using AI.</li>
                  <li>Leveraged AI/ML, Generative AI, and Agentic AI technologies to optimize workflows.</li>
                  <li>Integrated Large Language Models, including OpenAI, Perplexity, and Vibe.</li>
                  <li>Implemented gamification to improve SOP compliance and training efficiency.</li>
                </ul>
              </div>
              <div className="group bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">Front Office Assistant, Chozhas</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">December 2022 – Present</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-2">
                  <li>Assisted customers and supported front-of-house operations during peak seasons.</li>
                </ul>
              </div>
            </div>
          </motion.section>
          
          <motion.section id="education" className="mb-16 py-8" {...sectionAnimation}>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-500 dark:border-blue-400 pb-2 mb-6 inline-block">Education</h2>
            <div className="space-y-6">
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Bridgewater Raritan High School</h3>
                <p className="text-md text-gray-600 dark:text-gray-400 mb-2">Anticipated Graduation: June 2025 | GPA: 3.9</p>
                <div className="mt-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">AP Computer Science Principles (4), AP Computer Science A (5)</p>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Rutgers University – New Brunswick</h3>
                <p className="text-md text-gray-600 dark:text-gray-400 mb-2">Anticipated Graduation: May 2029 | GPA: 3.5</p>
                <div className="mt-3">
                  <h4 className="font-semibold text-blue-600 dark:text-blue-300 mb-2">Relevant Courses:</h4>
                  <ul className="list-disc list-inside ml-4 text-gray-600 dark:text-gray-400 space-y-1">
                    <li>Intro Computer Science (01:198:111:01)</li>
                    <li>Data Structures (01:198:112)</li>
                    <li>Introduction to Discrete Structures I (01:198:205)</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section id="projects" className="mb-16 py-8" {...sectionAnimation}>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-500 dark:border-blue-400 pb-2 mb-6 inline-block">Projects (GitHub & Independent Work)</h2>
            <div className="space-y-6">
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">EZSOP.ai — AI Automation Platform</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">Developed a Generative AI system that converts SOPs into visual and video content using Python and large language models.</p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">Integrated OpenAI, Perplexity, and Vibe APIs to automate content generation and interactive avatars.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">Python</span>
                  <span className="bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium">AI/ML</span>
                  <span className="bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full text-xs font-medium">OpenAI</span>
                  <span className="bg-indigo-200 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded-full text-xs font-medium">Perplexity</span>
                  <span className="bg-pink-200 dark:bg-pink-700 text-pink-800 dark:text-pink-200 px-2 py-1 rounded-full text-xs font-medium">Vibe</span>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Chess Game (Java)</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">Designed and built a fully functioning chess game with object-oriented principles.</p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">Programmed game logic, piece movement rules, and user interface elements in Java.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-orange-200 dark:bg-orange-700 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-full text-xs font-medium">Java</span>
                  <span className="bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">OOP</span>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Weather Application</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">Collaborated with classmates to create a weather application using Java and Python. Implemented API calls and data parsing to display real-time weather information.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-orange-200 dark:bg-orange-700 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-full text-xs font-medium">Java</span>
                  <span className="bg-yellow-200 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full text-xs font-medium">Python</span>
                  <span className="bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">API Integration</span>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">LLM Prompting & AI Tools (GitHub — personal scripts)</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">Created scripts for optimized prompt engineering to improve AI responsiveness. Built agent workflows and evaluation scripts to compare outputs from multiple LLMs.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-yellow-200 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full text-xs font-medium">Python</span>
                  <span className="bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium">Prompt Engineering</span>
                  <span className="bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full text-xs font-medium">LLMs</span>
                </div>
                <div className="flex space-x-4">
                  <a href="https://github.com/StevenMcJohnson" target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-400 hover:underline flex items-center">
                    <Github size={16} className="mr-1" /> GitHub
                  </a>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Personal Resume Website (TypeScript)</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">Designed and developed a personal resume website using TypeScript with a focus on clean UI and responsiveness.</p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">Implemented modular components and structured code for maintainability and scalability. Deployed the website to professionally showcase projects, skills, and experience.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">TypeScript</span>
                  <span className="bg-cyan-200 dark:bg-cyan-700 text-cyan-800 dark:text-cyan-200 px-2 py-1 rounded-full text-xs font-medium">React</span>
                  <span className="bg-teal-200 dark:bg-teal-700 text-teal-800 dark:text-teal-200 px-2 py-1 rounded-full text-xs font-medium">Tailwind CSS</span>
                </div>
                <div className="flex space-x-4">
                  <a href="https://github.com/StevenMcJohnson" target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-400 hover:underline flex items-center">
                    <Github size={16} className="mr-1" /> GitHub
                  </a>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section id="organizations" className="mb-16 py-8" {...sectionAnimation}>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-500 dark:border-blue-400 pb-2 mb-6 inline-block">Student Organizations</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Rutgers University – New Brunswick:</h3>
                <div className="space-y-4 ml-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg shadow-lg">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Rutgers University Coding Program (RUCP)</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-2">
                      <li>Participated in collaborative coding sessions and technical workshops focused on problem-solving and software development.</li>
                      <li>Plan to participate in upcoming hackathons alongside peers to collaborate on software development projects.</li>
                    </ul>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg shadow-lg">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Rutgers University Cloud Computing Club</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-2">
                      <li>Engaged in cloud computing workshops covering cloud infrastructure, deployment, and modern computing concepts.</li>
                      <li>Collaborated with members to learn about cloud platforms, scalable systems, and real-world applications of cloud technology.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Bridgewater Raritan High School:</h3>
                <div className="space-y-4 ml-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg shadow-lg">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Coding with a Purpose</h4>
                    <p className="text-gray-700 dark:text-gray-300 ml-2">Secretary of coding with a purpose and collaborated with peers on coding projects focused on applying programming skills to real-world problems.</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg shadow-lg">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">C.O.D.E (Coding Club)</h4>
                    <p className="text-gray-700 dark:text-gray-300 ml-2">Vice president of C.O.D.E at my school, and participated in coding activities and workshops to build foundational computer science skills.</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg shadow-lg">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Key Club</h4>
                    <p className="text-gray-700 dark:text-gray-300 ml-2">Contributed to community service initiatives through volunteer projects and organized events.</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg shadow-lg">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Operation Elementary</h4>
                    <p className="text-gray-700 dark:text-gray-300 ml-2">Supported local schools by volunteering time and assisting with educational and community activities.</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg shadow-lg">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">ESG Internship Club</h4>
                    <p className="text-gray-700 dark:text-gray-300 ml-2">Explored topics related to business, sustainability, and professional development through club activities.</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg shadow-lg">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Varsity Track & Field & Cross Country</h4>
                    <p className="text-gray-700 dark:text-gray-300 ml-2">Varsity athlete selected as an alternate for New Balance Nationals, demonstrating commitment and competitive excellence.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section id="volunteer" className="mb-16 py-8" {...sectionAnimation}>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-500 dark:border-blue-400 pb-2 mb-6 inline-block">Volunteer Experience</h2>
            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Operation Christmas Child Shoebox Project</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">October 2020 - Present</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-2">
                  <li>Helped package Christmas gifts for children in need.</li>
                  <li>Helped raise funds.</li>
                </ul>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Operation Elementary</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">July 2022 - Present</p>
                <p className="text-gray-700 dark:text-gray-300 ml-2">Got the opportunity to give back to my elementary school by volunteering my time to support.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">International Community Day</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">October 2023</p>
                <p className="text-gray-700 dark:text-gray-300 ml-2">Baked empanadas for my class.</p>
              </div>
            </div>
          </motion.section>
        </main>
    </div>
    )
}

export default Home; 