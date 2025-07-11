import { Github, Linkedin, Mail, Phone, ExternalLink, ArrowDown } from 'lucide-react';
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
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveLink(`/#${entry.target.id}`);
                }
            });
        }, { threshold: 0.5, rootMargin: '-20% 0px -50% 0px' });

        sections.forEach(section => observer.observe(section));

        return () => {
            sections.forEach(section => observer.unobserve(section));
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
              className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-blue-400 object-cover shadow-lg"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
            <h1 className="text-5xl sm:text-7xl font-bold text-white mb-4">Steven John</h1>
            <p className="text-xl text-gray-400 mb-8">Aspiring Software Developer</p>
            <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-4 text-gray-400">
              <a href="mailto:Steven.John06@icloud.com" className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                <Mail size={20} />
                <span>Steven.John06@icloud.com</span>
              </a>
              <a href="tel:9086361176" className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                <Phone size={20} />
                <span>908-636-1176</span>
              </a>
            </div>
             <div className="flex justify-center items-center space-x-4 mt-6">
                <a href="https://github.com/StevenMcJohnson" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors"><Github size={24}/></a>
                <a href="https://www.linkedin.com/in/steven-john-465687350/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors"><Linkedin size={24}/></a>
            </div>
          </header>
           <button onClick={() => scrollToSection('about')} className="absolute bottom-16 animate-bounce">
              <ArrowDown size={32} className="text-gray-500"/>
           </button>
        </motion.section>

        <main>
          <motion.section id="about" className="mb-16 py-8" {...sectionAnimation}>
            <h2 className="text-3xl font-bold text-white border-b-2 border-blue-400 pb-2 mb-6 inline-block">About Me</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              I possess strong math, analytical, and communication skills. I am passionate about coding and enjoy volunteering and giving back to the community.
            </p>
          </motion.section>

          <motion.section id="experience" className="mb-16 py-8" {...sectionAnimation}>
            <h2 className="text-3xl font-bold text-white border-b-2 border-blue-400 pb-2 mb-6 inline-block">Experience</h2>
            <div className="space-y-8">
              <div className="group">
                <h3 className="text-xl font-semibold flex items-center gap-2">Coding with a Purpose <span className="text-sm text-gray-500">- July 2022</span></h3>
                <p className="text-gray-400 ml-2">Built a weather app with a team of classmates using Java & Python. <a href="#" className="inline-flex items-center text-blue-400 hover:underline opacity-0 group-hover:opacity-100 transition-opacity"><ExternalLink size={16} className="ml-1"/></a></p>
              </div>
              <div className="group">
                <h3 className="text-xl font-semibold flex items-center gap-2">Front Office Assistant, Chozhas <span className="text-sm text-gray-500">- Dec 2022 - present</span></h3>
                <p className="text-gray-400 ml-2">Assisted and greeted customers to ensure an excellent customer experience.</p>
              </div>
              <div className="group">
                <h3 className="text-xl font-semibold flex items-center gap-2">Hack Swift Hackathon</h3>
                <p className="text-gray-400 ml-2">Created a hackathon team and led the development of a chess game in Java. <a href="#" className="inline-flex items-center text-blue-400 hover:underline opacity-0 group-hover:opacity-100 transition-opacity"><ExternalLink size={16} className="ml-1"/></a></p>
              </div>
            </div>
          </motion.section>

          <motion.section id="skills" className="mb-16 py-8" {...sectionAnimation}>
            <h2 className="text-3xl font-bold text-white border-b-2 border-blue-400 pb-2 mb-6 inline-block">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {['Python (Intermediate)', 'Java (Intermediate)', 'TypeScript', 'HTML', 'CSS', 'Microsoft Office', 'Conversational Spanish', 'Swimming', 'Cooking', 'Cursor', 'Gemini'].map((skill, i) => (
                <motion.span 
                  key={skill}
                  className="bg-gray-800 text-blue-300 px-4 py-2 rounded-full shadow-md"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.section>
          
          <motion.section id="education" className="mb-16 py-8" {...sectionAnimation}>
            <h2 className="text-3xl font-bold text-white border-b-2 border-blue-400 pb-2 mb-6 inline-block">Education</h2>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">High School</h3>
              <p className="text-md text-gray-400">Sept 2020 – Present (Anticipated graduation June 2025)</p>
              <p className="text-md text-gray-400">GPA: 3.7 (weighted)</p>
              <div className="mt-4">
                <h4 className="font-semibold text-blue-300">AP Classes & Scores:</h4>
                <ul className="list-disc list-inside ml-4 text-gray-400">
                  <li>AP Computer Science Principles: 4</li>
                  <li>AP CSA: 5</li>
                </ul>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-blue-300">Rutgers Pre-College Course:</h4>
                <ul className="list-disc list-inside ml-4 text-gray-400">
                  <li>Data Structures (01:198:112)</li>
                </ul>
              </div>
            </div>
             <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6">
                <h3 className="text-xl font-semibold">Awards & Certificates</h3>
                 <ul className="list-disc list-inside text-gray-400">
                  <li>National Honor Society (November 2021)</li>
                  <li>AP Scholar Award (June 2022)</li>
                </ul>
             </div>
          </motion.section>

          <motion.section id="volunteer" className="mb-16 py-8" {...sectionAnimation}>
            <h2 className="text-3xl font-bold text-white border-b-2 border-blue-400 pb-2 mb-6 inline-block">Volunteer Experience</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-300">
              <li>
                <strong>Operation Christmas Child Shoebox Project</strong> (Oct 2020 - present): Packaged gifts for children in need and assisted with fundraising.
              </li>
              <li>
                <strong>Operation Elementary</strong> (July 2022 - present): Volunteered to support my former elementary school.
              </li>
               <li>
                <strong>International Community Day</strong> (Oct 2023): Baked empanadas for a class event.
              </li>
            </ul>
          </motion.section>
        </main>
    </div>
    )
}

export default Home; 