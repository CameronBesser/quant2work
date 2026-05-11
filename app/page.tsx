export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f7f2] text-[#1c1c1c]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f7f7f2]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c8ff66] text-lg font-bold">
              Q
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-wide uppercase">
                QuantumWork
              </span>
              <span className="text-[11px] font-medium text-black/50">
                WOSB Certified
              </span>
            </div>
          </div>

          <nav className="hidden gap-8 text-sm font-medium md:flex">
            <a href="#services" className="hover:opacity-70">
              Services
            </a>
            <a href="#solutions" className="hover:opacity-70">
              Solutions
            </a>
            <a href="#faq" className="hover:opacity-70">
              FAQ
            </a>
            <a href="#contact" className="hover:opacity-70">
              Contact
            </a>
            <a href="#career" className="hover:opacity-70">
              Career
            </a>
            <a href="#join" className="hover:opacity-70">
              Join Us
            </a>
          </nav>

          <a
            href="#contact"
            className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            Contact Us
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#6a6a6a]">
              Women-Owned Small Business (WOSB)
            </p>

            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              AI, Cyber & Software Solutions for Government.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#4d4d4d]">
              We offer a spectrum of AI solutions that automate and unlock new
              levels of productivity.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#solutions"
                className="rounded-full bg-[#c8ff66] px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
              >
                Explore Solutions
              </a>
              <a
                href="#contact"
                className="rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-black/5"
              >
                Contact Us
              </a>
              <a
                href="#career"
                className="rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-black/5"
              >
                Join Our Team →
              </a>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative h-[420px] w-full max-w-[520px] rounded-[32px] bg-[#dff3c8] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
              <div className="absolute right-6 top-6 h-20 w-20 rounded-full bg-[#c8ff66]" />
              <div className="absolute bottom-8 left-8 h-28 w-28 rounded-full border-[18px] border-black/80 bg-transparent" />
              <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
              <div className="absolute left-10 top-10 max-w-[220px] rounded-2xl bg-white p-4 shadow-md">
                <p className="text-sm font-medium">
                  AI, Cyber & Software tailored for government missions.
                </p>
              </div>
              <div className="absolute bottom-10 right-8 rounded-2xl bg-white px-5 py-4 shadow-md">
                <p className="text-xs uppercase tracking-[0.2em] text-[#6a6a6a]">
                  WOSB
                </p>
                <p className="mt-1 text-2xl font-semibold">Trusted Partner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do - Core Services */}
      <section id="services" className="border-t border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6a6a6a]">
              What We Do
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
              Our Core Services
            </h2>
            <p className="mt-4 text-base text-[#4d4d4d]">
              Solutions across AI, Cybersecurity, and Software Development.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* AI Solutions Card */}
            <div className="rounded-[28px] border border-black/5 bg-[#f7f7f2] p-8">
              <h3 className="text-2xl font-semibold">AI Solutions</h3>
              <p className="mt-2 text-[#4d4d4d]">
                Large language models, data science, and AI Agents.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-black/40"></span>
                  LLM Integration
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-black/40"></span>
                  Data Science
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-black/40"></span>
                  AI Agents
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-black/40"></span>
                  Model Training
                </li>
              </ul>
            </div>

            {/* Cybersecurity Card */}
            <div className="rounded-[28px] border border-black/5 bg-[#eef7ff] p-8">
              <h3 className="text-2xl font-semibold">Cybersecurity</h3>
              <p className="mt-2 text-[#4d4d4d]">
                Advanced threat detection for sensitive systems.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-black/40"></span>
                  Post-Quantum Crypto
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-black/40"></span>
                  Pen Testing
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-black/40"></span>
                  Phishing Solutions
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-black/40"></span>
                  Cyber Audits
                </li>
              </ul>
            </div>

            {/* App Development Card */}
            <div className="rounded-[28px] border border-black/5 bg-[#fff8de] p-8">
              <h3 className="text-2xl font-semibold">App Development</h3>
              <p className="mt-2 text-[#4d4d4d]">
                End-to-end development with modern UI/UX.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-black/40"></span>
                  Full-Stack Dev
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-black/40"></span>
                  UI/UX Design
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-black/40"></span>
                  Cloud Deployment
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-black/40"></span>
                  API Integration
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Artificial Intelligence - Deep Dive */}
      <section id="solutions" className="bg-white pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6a6a6a]">
              Artificial Intelligence
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
              AI Solutions That Transform
            </h2>
            <p className="mt-4 text-base text-[#4d4d4d]">
              Our team of AI scientists builds and deploys cutting-edge
              solutions.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-black/5 bg-[#f7f7f2] p-6">
              <p className="text-3xl font-semibold text-[#c8ff66]">01</p>
              <h3 className="mt-4 text-xl font-semibold">
                Large Language Models
              </h3>
              <p className="mt-2 text-sm text-[#4d4d4d]">
                Custom LLM solutions tailored to your agency needs.
              </p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-[#f7f7f2] p-6">
              <p className="text-3xl font-semibold text-[#c8ff66]">02</p>
              <h3 className="mt-4 text-xl font-semibold">Data Science</h3>
              <p className="mt-2 text-sm text-[#4d4d4d]">
                Advanced analytics and data-driven decision making.
              </p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-[#f7f7f2] p-6">
              <p className="text-3xl font-semibold text-[#c8ff66]">03</p>
              <h3 className="mt-4 text-xl font-semibold">AI Agents</h3>
              <p className="mt-2 text-sm text-[#4d4d4d]">
                Autonomous agents that automate complex workflows.
              </p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-[#f7f7f2] p-6">
              <p className="text-3xl font-semibold text-[#c8ff66]">04</p>
              <h3 className="mt-4 text-xl font-semibold">
                Model Training and Deploy
              </h3>
              <p className="mt-2 text-sm text-[#4d4d4d]">
                Build, train, and deploy AI using the best technology stack.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cybersecurity & App Development Details */}
      <section className="bg-[#f7f7f2] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-[28px] bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-semibold">Cybersecurity</h3>
              <p className="mt-2 text-[#4d4d4d]">
                Protect Your Critical Systems — Advanced threat detection for
                sensitive government systems.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Post-Quantum Cryptography</p>
                  <p className="text-sm text-[#6a6a6a]">
                    Next-gen encryption for quantum threats.
                  </p>
                </div>
                <div>
                  <p className="font-medium">Penetration Testing</p>
                  <p className="text-sm text-[#6a6a6a]">
                    Identify vulnerabilities before adversaries do.
                  </p>
                </div>
                <div>
                  <p className="font-medium">Phishing Solutions</p>
                  <p className="text-sm text-[#6a6a6a]">
                    Protect from social engineering attacks.
                  </p>
                </div>
                <div>
                  <p className="font-medium">Cyber Audits</p>
                  <p className="text-sm text-[#6a6a6a]">
                    Comprehensive security assessments.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-[28px] bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-semibold">App Development</h3>
              <p className="mt-2 text-[#4d4d4d]">
                End-to-End Application Development — Modern UI/UX experiences
                built with cutting-edge technologies.
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-b border-black/5 py-2">
                  <span className="font-medium">Modern UI/UX</span>
                  <span className="text-sm text-[#6a6a6a]">React, Next.js</span>
                </div>
                <div className="flex items-center justify-between border-b border-black/5 py-2">
                  <span className="font-medium">Full-Stack Development</span>
                  <span className="text-sm text-[#6a6a6a]">Node, Python</span>
                </div>
                <div className="flex items-center justify-between border-b border-black/5 py-2">
                  <span className="font-medium">Cloud-Native Architecture</span>
                  <span className="text-sm text-[#6a6a6a]">AWS, Azure</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="font-medium">Scalable and Secure</span>
                  <span className="text-sm text-[#6a6a6a]">Zero-trust ready</span>
                </div>
              </div>
              <div className="mt-6 rounded-xl bg-[#f7f7f2] p-3 font-mono text-xs">
                <pre className="whitespace-pre-wrap">
                  {`const solution = await buildApp({
  stack: 'modern',
  secure: true,
  scalable: true,
});`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Stats */}
      <section className="border-y border-black/5 bg-[#111111] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:grid-cols-4 lg:px-10">
          <div className="text-center md:text-left">
            <p className="text-4xl font-semibold">50+</p>
            <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/60">
              AI Models Deployed
            </p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-4xl font-semibold">WOSB</p>
            <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/60">
              Certified Business
            </p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-4xl font-semibold">100%</p>
            <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/60">
              U.S. Based Team
            </p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-4xl font-semibold">24/7</p>
            <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/60">
              Support and Monitoring
            </p>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6a6a6a]">
              Partners
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Our Trusted Partners
            </h2>
            <p className="mt-2 text-[#4d4d4d]">
              We work with top partners to fulfill a range of requirements.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-8 opacity-60 grayscale">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex h-16 w-28 items-center justify-center rounded-lg bg-[#f7f7f2] text-sm font-medium"
              >
                Partner {i}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-black/5 bg-[#f7f7f2] py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6a6a6a]">
              FAQ
            </p>
            <h2 className="mt-2 text-3xl font-semibold">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="mt-12 space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">
                Is QuantumWorks a U.S. company?
              </h3>
              <p className="mt-2 text-[#4d4d4d]">
                Yes, we are a U.S.-based, Women-Owned Small Business (WOSB) with
                100% domestic team members.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">
                What AI services do you offer?
              </h3>
              <p className="mt-2 text-[#4d4d4d]">
                LLM integration, data science, autonomous AI agents, and custom
                model training & deployment.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">
                What cybersecurity capabilities do you provide?
              </h3>
              <p className="mt-2 text-[#4d4d4d]">
                Post-quantum cryptography, penetration testing, phishing
                defense, and full cyber audits.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">
                Do you work with government agencies?
              </h3>
              <p className="mt-2 text-[#4d4d4d]">
                Absolutely. Our solutions are built to meet federal security and
                compliance standards.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">
                Can you build custom applications?
              </h3>
              <p className="mt-2 text-[#4d4d4d]">
                Yes — from full-stack development to UI/UX design, cloud
                deployment, and API integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Careers */}
      <section id="career" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6a6a6a]">
              Careers
            </p>
            <h2 className="mt-2 text-3xl font-semibold">Join Our Team</h2>
            <p className="mt-2 text-[#4d4d4d]">
              Build your career with QuantumWorks and work on cutting-edge
              technology.
            </p>
          </div>

          {/* Job Listings */}
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-black/5 p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Data Entry Clerk</h3>
              <p className="mt-1 text-2xl font-bold text-[#c8ff66]">
                $25 per hour
              </p>
              <p className="mt-2 text-[#4d4d4d]">
                Data processing, database management, documentation
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-[#6a6a6a]">
                  Full-time • Remote
                </span>
                <a
                  href="mailto:recruiter@quantum-works.org"
                  className="rounded-full bg-black px-4 py-2 text-sm text-white"
                >
                  Apply Now →
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-black/5 p-6 shadow-sm">
              <h3 className="text-xl font-semibold">
                Customer Service Representative
              </h3>
              <p className="mt-1 text-2xl font-bold text-[#c8ff66]">
                $25 per hour
              </p>
              <p className="mt-2 text-[#4d4d4d]">
                Customer support, issue resolution, client communication
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-[#6a6a6a]">
                  Full-time • Remote
                </span>
                <a
                  href="mailto:recruiter@quantum-works.org"
                  className="rounded-full bg-black px-4 py-2 text-sm text-white"
                >
                  Apply Now →
                </a>
              </div>
            </div>
          </div>

          {/* Why Join Us */}
          <div className="mt-20">
            <h3 className="text-center text-2xl font-semibold">Why Join Us</h3>
            <p className="text-center text-[#4d4d4d]">
              Benefits & Perks — We offer competitive compensation and a
              supportive work environment.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl bg-[#f7f7f2] p-4 text-center">
                <p className="text-2xl">🏠</p>
                <p className="mt-1 font-medium">Remote First</p>
                <p className="text-xs text-[#6a6a6a]">
                  Work from anywhere in the world
                </p>
              </div>
              <div className="rounded-xl bg-[#f7f7f2] p-4 text-center">
                <p className="text-2xl">💰</p>
                <p className="mt-1 font-medium">Competitive Pay</p>
                <p className="text-xs text-[#6a6a6a]">
                  $25 per hour with regular reviews
                </p>
              </div>
              <div className="rounded-xl bg-[#f7f7f2] p-4 text-center">
                <p className="text-2xl">📈</p>
                <p className="mt-1 font-medium">Growth Opportunities</p>
                <p className="text-xs text-[#6a6a6a]">
                  Continuous learning & career advancement
                </p>
              </div>
              <div className="rounded-xl bg-[#f7f7f2] p-4 text-center">
                <p className="text-2xl">💊</p>
                <p className="mt-1 font-medium">Health Benefits</p>
                <p className="text-xs text-[#6a6a6a]">
                  Comprehensive medical coverage
                </p>
              </div>
              <div className="rounded-xl bg-[#f7f7f2] p-4 text-center">
                <p className="text-2xl">🏖️</p>
                <p className="mt-1 font-medium">Flexible PTO</p>
                <p className="text-xs text-[#6a6a6a]">
                  Paid time off & holidays
                </p>
              </div>
              <div className="rounded-xl bg-[#f7f7f2] p-4 text-center">
                <p className="text-2xl">💻</p>
                <p className="mt-1 font-medium">Equipment Provided</p>
                <p className="text-xs text-[#6a6a6a]">
                  Laptop and home office setup
                </p>
              </div>
              <div className="rounded-xl bg-[#f7f7f2] p-4 text-center">
                <p className="text-2xl">🎓</p>
                <p className="mt-1 font-medium">Training Programs</p>
                <p className="text-xs text-[#6a6a6a]">
                  $2000/year for professional development
                </p>
              </div>
              <div className="rounded-xl bg-[#f7f7f2] p-4 text-center">
                <p className="text-2xl">⏰</p>
                <p className="mt-1 font-medium">Flexible Hours</p>
                <p className="text-xs text-[#6a6a6a]">
                  Choose your work schedule
                </p>
              </div>
            </div>
          </div>

          {/* Application Email */}
          <div id="join" className="mt-20 rounded-2xl bg-[#f7f7f2] p-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6a6a6a]">
              Send Us Your Application
            </p>
            <h3 className="mt-2 text-2xl font-semibold">
              Email your resume and cover letter
            </h3>
            <a
              href="mailto:recruiter@quantum-works.org"
              className="mt-4 inline-block text-xl font-medium text-black underline decoration-[#c8ff66] underline-offset-4"
            >
              recruiter@quantum-works.org
            </a>
            <p className="mt-4 text-sm text-[#6a6a6a]">
              We'll respond to your application within 24-48 hours
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="border-t border-black/5 bg-[#f7f7f2] py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6a6a6a]">
              Get in Touch
            </p>
            <h2 className="mt-2 text-3xl font-semibold">
              Let's Build Something Together
            </h2>
            <p className="mt-2 text-[#4d4d4d]">
              Ready to transform your operations? Reach out to us.
            </p>
          </div>
          <form className="mt-10 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 focus:border-black focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 focus:border-black focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Organization</label>
              <input
                type="text"
                placeholder="Your organization"
                className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 focus:border-black focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Message</label>
              <textarea
                rows={4}
                placeholder="Tell us about your project..."
                className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 focus:border-black focus:outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/90"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-[#6a6a6a] md:flex-row md:items-center md:justify-between lg:px-10">
          <div className="flex items-center gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c8ff66] text-sm font-bold">
              Q
            </div>
            <p>© 2025 QuantumWorks. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-black">
              Privacy
            </a>
            <a href="#" className="hover:text-black">
              Terms
            </a>
            <a href="#" className="hover:text-black">
              WOSB Certified
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}