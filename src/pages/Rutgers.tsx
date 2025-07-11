import { motion } from 'framer-motion';

const Rutgers = () => {
  const sectionAnimation = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-gray-900 text-gray-200 font-sans min-h-screen">
        <div className="max-w-4xl mx-auto p-4 sm:p-8 pt-24">
            <motion.section 
            id="rutgers"
            className="min-h-[80vh] flex flex-col justify-center"
            {...sectionAnimation}
            >
                <h1 className="text-5xl sm:text-7xl font-bold text-white mb-4">Rutgers University</h1>
                <h2 className="text-3xl font-bold text-white border-b-2 border-blue-400 pb-2 mb-6 inline-block">School of Arts and Sciences</h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                    I am currently a student at Rutgers University - New Brunswick, enrolled in the School of Arts and Sciences. I am passionate about my studies and excited for the opportunities and experiences that lie ahead.
                </p>
            </motion.section>
        </div>
    </div>
  );
};

export default Rutgers; 