import { motion } from 'framer-motion';

const Rutgers = () => {
  const sectionAnimation = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="text-gray-800 dark:text-gray-200 font-sans min-h-screen">
        <div className="max-w-4xl mx-auto p-4 sm:p-8 pt-24">
            <motion.section 
            id="rutgers"
            className="min-h-[80vh] flex flex-col justify-center"
            {...sectionAnimation}
            >
                <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">Rutgers University</h1>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-500 dark:border-blue-400 pb-2 mb-6 inline-block">School of Arts and Sciences</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    I am currently a student at Rutgers University - New Brunswick, enrolled in the School of Arts and Sciences. I am passionate about my studies and excited for the opportunities and experiences that lie ahead.
                </p>
            </motion.section>
        </div>
    </div>
  );
};

export default Rutgers; 