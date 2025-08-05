"use client"

import { useState , useEffect} from "react"
import { Download, Github, Linkedin, Mail, Phone, Menu, X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import FloatingParticles from "@/components/ui/partical"
import toast from "react-hot-toast"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

    const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | "">("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const responsePromise = fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      await toast.promise(
        responsePromise,
        {
          loading: "Sending Email...",
          success: "Email sent successfully !",
          error: "Failed to send email !",
        }
      );

      await responsePromise;
      
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });

        setSubmitStatus("success");

        const form = document.querySelector("form");
        form?.reset();

    } catch (error) {
      setSubmitStatus("error");
      console.error("Error sending email :", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // const scrollToSection = (sectionId: string) => {
  //   const element = document.getElementById(sectionId)
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth" })
  //     setIsMenuOpen(false) // Close menu after clicking
  //   }
  // }

  const navItems = [
    { name: "Home", id: "#home" },
    { name: "About", id: "#about" },
    { name: "Skills", id: "#skills" },
    { name: "Experience", id: "#experience" },
    { name: "Projects", id: "#projects" },
    { name: "Freelance", id: "#freelance" },
    { name: "Education", id: "#education" },
    { name: "Contact", id: "#contact" },
  ]

  return (
    <div className="min-h-screen relative bg-black  text-white">
      {/* Grid Background Pattern */}
      <FloatingParticles/>

            {/* Grid Background Pattern - Make it more subtle for other sections */}
      <div
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div
        className="  fixed inset-0 opacity-10"
        style={{ 
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />


      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50  backdrop-blur-sm border-b border-gray-800">
        <div className="flex items-center justify-between p-6 md:p-8  md:py-4">
          {/* <div
            className="text-white font-bold text-xl cursor-pointer hover:text-gray-300 transition-colors"
            onClick={() => scrollToSection("home")}
          >
            CHRISTEEN PAUL
          </div> */}
          <div className=" boder bg-black rounded-full flex items-center gap-2 ">
                        <div className="w-12 h-12 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-700/50 hover:scale-110 transition-all duration-300 cursor-pointer border border-gray-700/50">
              <a href="https://github.com/chrispaul-code"><Github className="h-7 w-7 text-gray-300 hover:text-white transition-colors" /></a>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={toggleMenu}>
            {isMenuOpen ? <X className="size-8" /> : <Menu className="size-8" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-gray-800 transition-all duration-300 ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <nav className="p-6">
            <ul className="space-y-4 w-fit mx-auto ">
              {navItems.map((item) => (
                <li key={item.id}>
                 <a href={item.id}>
                  <button
                    className="block w-full text-left text-white hover:text-gray-300 transition-colors py-2 text-lg font-medium"
                  >
                    {item.name}
                  </button></a> 
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20"
      >
                {/* Enhanced Grid Background for Hero */}
        <div
          className="absolute inset-0 opacity-30 z-[-1]"
          style={{
            backgroundImage: `
        linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
      `,
            backgroundSize: "60px 60px",
          }}
        />
        
        <div className="mb-8">
            <h1
              className={`text-6xl md:text-8xl lg:text-[8rem] xl:text-[8rem] font-black text-transparent  bg-clip-text mb-4 tracking-tight leading-none transition-all duration-1000 ${
                isVisible ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-10"
              }`}
              style={{
                // textShadow: "0 4px 8px rgba(0,0,0,0.3), 0 8px 16px rgba(0,0,0,0.2)",
                filter: "drop-shadow(0 2px 4px rgba(255,255,255,0.1))",
                backgroundImage:"linear-gradient(to bottom, white 0%  50%,#777 80% 100% ) "
              }}
            >
              CHRISTEEN PAUL
            </h1>
        </div>

        <div className="mb-8 space-y-4">
              <h2
              className={`text-lg md:text-xl lg:text-2xl text-gray-400 tracking-[0.3em] font-medium transition-all duration-1000 delay-300 ${
                isVisible ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-10"
              }`}
            >
              FULL STACK DEVELOPER
            </h2>
          <p className="text-gray-400 text-sm md:text-base">Available for Freelance Projects</p>
        </div>
    
    <a className="cursor-pointer" target="_blank" href="https://drive.google.com/file/d/1zxCTgVDxhy1aM1kbVWiI9l4dWFXYmLZ3/view">
        <Button  className="bg-white text-black hover:bg-green-500 px-6 py-3 rounded-md font-medium mb-12 cursor-pointer z-100"  size="lg">
          <Download className="w-4 h-4 mr-2" />
           Download Resume
        </Button>
    </a>


          {/* Social Icons */}
          <div
            className={`flex items-center justify-center space-x-8 mb-16 mt-8 transition-all duration-1000 delay-1000 ${
              isVisible ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="w-16 h-16 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-700/50 hover:scale-110 transition-all duration-300 cursor-pointer border border-gray-700/50">
              <a href="https://github.com/chrispaul-code"><Github className="h-7 w-7 text-gray-300 hover:text-white transition-colors" /></a>
            </div>
            <div className="w-16 h-16 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-700/50 hover:scale-110 transition-all duration-300 cursor-pointer border border-gray-700/50">
              <a href="https://www.linkedin.com/in/christeencode/"><Linkedin className="h-7 w-7 text-gray-300 hover:text-white transition-colors" /></a>
            </div>
            <div className="w-16 h-16 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-700/50 hover:scale-110 transition-all duration-300 cursor-pointer border border-gray-700/50">
              <a href="mailto:chrispaul1311@gmail.com"><Mail className="h-7 w-7 text-gray-300 hover:text-white transition-colors" /></a>
            </div>
            <div className="w-16 h-16 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-700/50 hover:scale-110 transition-all duration-300 cursor-pointer border border-gray-700/50">
              <a href="tel:918928016153"><Phone className="h-7 w-7 text-gray-300 hover:text-white transition-colors" /></a>
            </div>
          </div>

        <div className="mt-16">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-600 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="relative z-10 py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">ABOUT ME</h2>
        <div className="text-gray-300 leading-relaxed space-y-4">
          <p>
            I'm a passionate full-stack developer with a strong foundation in both frontend and backend technologies. My
            journey in web development started with a curiosity about how things work behind the scenes, and it has
            evolved into a deep love for creating efficient, scalable, and user-friendly applications.
          </p>
          <p>
            With expertise in modern JavaScript frameworks like React and Node.js, I bring a comprehensive approach to
            web development. I'm particularly drawn to projects that challenge me to think creatively and solve complex
            problems, whether it's optimizing database queries, implementing responsive designs, or architecting
            scalable backend systems.
          </p>
          <p>
            I believe in writing clean, maintainable code and staying up-to-date with the latest industry trends and
            best practices. My goal is to create digital experiences that not only meet technical requirements but also
            provide genuine value to users and businesses alike.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">SKILLS</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: "HTML", icon: "🌐" },
            { name: "CSS", icon: "🎨" },
            { name: "JavaScript", icon: "⚡" },
            { name: "TypeScript", icon: "📘" },
            { name: "React", icon: "⚛️" },
            { name: "Next.js", icon: "▲" },
            { name: "Node.js", icon: "🟢" },
            { name: "Express", icon: "🚀" },
            { name: "MongoDB", icon: "🍃" },
            { name: "PostgreSQL", icon: "🐘" },
            { name: "Git", icon: "📝" },
            { name: "Docker", icon: "🐳" },
            { name: "AWS", icon: "☁️" },
            { name: "Python", icon: "🐍" },
            { name: "Java", icon: "☕" },
            { name: "PHP", icon: "🔧" },
          ].map((skill, index) => (
            <div
              key={index}
              className="flex flex-col hover:scale-105 transition-transform duration-300 items-center p-4 bg-gray-900/50 rounded-lg hover:bg-gray-800/50 transition-colors"
            >
              <div className="text-3xl mb-2">{skill.icon}</div>
              <span className="text-sm text-gray-300">{skill.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="relative z-10 py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">WORK EXPERIENCE</h2>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* <Card className="bg-gray-900/50 hover:scale-105 transition-transform duration-300 border-gray-800 ">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Backend Developer - Audios</h3>
                  <p className="text-gray-400">Jan 2023 - Present</p>
                </div>
              </div>
              <ul className="text-gray-300 space-y-2">
                <li>• Developed and maintained RESTful APIs using Node.js and Express</li>
                <li>• Implemented database schemas and optimized queries for PostgreSQL</li>
                <li>• Collaborated with frontend teams to integrate APIs and ensure seamless user experience</li>
                <li>• Participated in code reviews and maintained high code quality standards</li>
              </ul>
            </CardContent>
          </Card> */}

          <Card className="bg-gray-900/50 hover:scale-105 transition-transform duration-300 border-gray-800">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div >
                  <h3 className="text-xl font-bold text-white">Block Intelligence </h3>
                  <p className="text-gray-400 mt-2">Front-end Developer Intern</p>
                </div>
                <p className="text-gray-400">Nov 2024 – Jan 2025</p>
              </div>
              <ul className="text-gray-200 space-y-2">
                <li>• Developed efficient and maintainable code in HTML, CSS, and JavaScript.</li>
                <li>• Built responsive UI layouts using Tailwind CSS and ensured cross-device compatibility</li>
                <li>• Collaborated on UI/UX design using Figma and translated mockups into pixel-perfect components.</li>
                <li>• Gained experience in agile development methodologies and team collaboration</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">PROJECTS</h2>
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="flex space-x-4 bg-gray-900/50 rounded-lg p-1">
              <Button variant="secondary" size="sm" className="bg-white text-black">
                Featured
              </Button>
              {/* <Button variant="ghost" size="sm" className="text-gray-400">
                Frontend
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400">
                Backend
              </Button> */}
            </div>
          </div>

          <div className="grid grid-cols-1 max-w-5xl mx-auto   gap-8">
            {[
              {
                title: "Agency Website",
                description: [
                  "Modern responsive website built with React",
                  "Integrated contact forms and CMS",
                  "Optimized for SEO and performance",
                  "Custom animations and interactions",
                ],
                techStack:[
                  "Figma", "React.js", "Tailwind CSS", "Express.js"
                ],
                img:"/asset1.jpg",
                live:"https://www.devian.in",
                github:"https://github.com/chrispaul-code"
                
              },
              {
                title: "Toundra",
                description: [
                  "Full-stack restaurant management system",
                  "Real-time order tracking and notifications",
                  "Integrated contact form functionality using Express.js and Nodemailer for email handling.",
                  "Admin dashboard for menu management",
                ],
                techStack:[
                  "Figma", "React.js", "Tailwind CSS", "Express.js"
                ],
                img:"/toundra.png",
                live:"https://www.devian.in",
                github:"https://github.com/chrispaul-code"
              },
              {
                title: "Chem Stock",
                description: [
                  "Track cryptocurrency investments and expenses",
                  "Real-time price updates via API integration",
                  "Data visualization with charts and graphs",
                  "Export functionality for tax reporting",
                ],
                  techStack:[
                  "Figma", "React.js", "Tailwind CSS", "Express.js"
                ],
                img:"/chemstock.png",
                live:"https://www.devian.in",
                github:"https://github.com/chrispaul-code"
              },
              {
                title: "DevTinder",
                description: [
                  "RESTful API wrapper for AI services",
                  "Authentication and rate limiting",
                  "Comprehensive documentation and testing",
                  "Deployed on AWS with auto-scaling",
                ],

                 techStack:[
                  "Figma", "React.js", "Tailwind CSS", "Express.js"
                ],
                img:"/asset1.jpg",   
                live:"https://www.devian.in",
                github:"https://github.com/chrispaul-code"
              },
              {
                title: "Swiggy Clone",
                description: [
                  "Full-featured online shopping platform",
                  "User authentication and profile management",
                  "Shopping cart and checkout functionality",
                  "Admin panel for inventory management",
                ],
                 techStack:[
                  "Figma", "React.js", "Tailwind CSS", "Express.js","Node.js","Redux"
                ],
                img:"/chemstock.png",
                live:"https://www.devian.in",
                github:"https://github.com/chrispaul-code"
              },
              // {
              //   title: "URL Shortener",
              //   description: [
              //     "Custom URL shortening service",
              //     "Analytics and click tracking",
              //     "QR code generation for shortened URLs",
              //     "Bulk URL processing capabilities",
              //   ],
              //     techStack:[
              //     "Figma", "React.js", "Tailwind CSS", "Express.js"
              //   ],
              //   img:"/asset1.jpg",
              // },
            ].map((project, index) => (
<Card
  key={index}
  className="flex flex-col md:flex-row gap-6 bg-[#0B0F19] border border-white/10 rounded-xl p-4"
>
  {/* Image Preview Placeholder */}
  <div className="md:w-1/3 w-full mt-4 ">
    <div className="bg-gray-800 h-42 p-2 rounded-lg flex items-center justify-center text-gray-500 text-sm">
      {/* Replace with actual image if available */}
      <img src={project.img} alt={project.title} />
    </div>
  </div>

  {/* Project Info */}
  <div className="md:w-[600px] w-full flex flex-col justify-between">
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-white text-xl font-semibold mb-2">{project.title}</h3>
        <div className="flex gap-2">
          <a href={project.live}>
             <Button
                size="sm"
                className="bg-white text-black font-medium px-3 py-1 hover:bg-gray-200"
              >
               Live
             </Button>
          </a>
 
          <a href={project.github}>
          <Button
            size="sm"
            className="bg-white text-black font-medium px-2 py-1 hover:bg-gray-200"
          >
            GitHub
          </Button>
          </a>
        </div>
      </div>
      <div className="text-gray-400 mb-2 text-sm leading-relaxed mt-1">
        {/* Optional: add a one-liner project summary here if you want */}
            <ul className="text-gray-300 space-y-1 mb-4">
              {project.description.map((item, i) => (
                      <li key={i}>• {item}</li>
              ))}
          </ul>
      </div>

      {/* Technologies Used */}
      <div className="">
        <h4 className="text-white mb-2 font-medium text-sm">Technologies Used:</h4>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, i) => (
            <span
              key={i}
              className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
</Card>

            ))}
          </div>
        </div>
      </section>

      {/* Freelance Services Section */}
      <section id="freelance" className="relative z-10 py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">FREELANCE SERVICES</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Full Stack Development",
              price: "Starting from $2500",
              description: "Complete web application development from concept to deployment",
            },
            {
              title: "Frontend Development",
              price: "Starting from $1500",
              description: "Modern, responsive user interfaces using React and Next.js",
            },
            {
              title: "Backend Development",
              price: "Starting from $2000",
              description: "Scalable server-side solutions with APIs and database integration",
            },
          ].map((service, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-800 text-center">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-2xl font-bold text-green-400 mb-4">{service.price}</p>
                <p className="text-gray-300">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Education Section */}
      {/* <section id="education" className="relative z-10 py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">EDUCATION</h2>
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gray-900/50 hover:scale-105 transition-transform duration-300 border-gray-800">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Bachelor of Technology</h3>
              <p className="text-gray-400 mb-4">2021 - 2025</p>
              <ul className="text-gray-300 space-y-2">
                <li>
                  • St. Francis Institute of Technology
                </li>

              </ul>
            </CardContent>
          </Card>
        </div>
      </section> */}

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">GET IN TOUCH</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-6">Send a Message</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                placeholder="Your Name"
                className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400"
                onChange={handleChange}
                name="name"
              />

              <Input
                type="email"
                placeholder="Your Email"
                className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400"
                onChange={handleChange}
                 name="email"
              />
              <Input
                placeholder="Subject"
                className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400"
                onChange={handleChange}
                 name="subject"
              />
              <Textarea
                placeholder="Your Message"
                rows={6}
                className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400"
                onChange={handleChange}
                 name="message"
              />
              <Button className="w-full bg-white text-black hover:bg-gray-100" type="submit" >{isSubmitting?"Sending...":"Send Message"}</Button>
              <p>{submitStatus}</p>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">chrispaul1311@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">+91 8928016153</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Social Media</h3>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
                  <Github className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
                  <Linkedin className="h-6 w-6" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Location</h3>
              <p className="text-gray-300">
                India
                <br />
                Available for remote work worldwide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">© 2025 Christeen Paul. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
