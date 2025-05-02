const Footer = () => {
    return (
      <footer className="bg-blue-800 text-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-3">
          <div>
            <p className="text-base font-semibold">&copy; 2025 SOLSTICE COLLEGE. All rights reserved.</p>
          </div>
          <div className="text-sm">
            <p>Contact: <a href="mailto:info@solsticecollege.edu" className="underline">info@solsticecollege.edu</a> | +91 9876543210</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  