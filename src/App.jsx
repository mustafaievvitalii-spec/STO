import { useEffect, useRef, useState } from 'react';

const services = [
  'Engine diagnostics',
  'Suspension repair',
  'Turbo repair',
  'Exhaust systems',
  'Performance tuning',
  'Detailing',
];

const reasons = [
  'Factory-level diagnostics backed by senior technicians.',
  'Transparent estimates before every repair or upgrade.',
  'Premium parts, calibrated tools and concours-level care.',
  'Performance knowledge for daily drivers and weekend builds.',
];

const workflow = [
  'Consultation',
  'Precision inspection',
  'Repair or tuning',
  'Final road test',
];

const reviews = [
  {
    quote:
      'The team diagnosed a complex issue in one visit and made the car feel new again.',
    name: 'Marcus R.',
  },
  {
    quote:
      'Beautiful workshop, excellent communication and a flawless performance tune.',
    name: 'Elena K.',
  },
  {
    quote:
      'They treated my restoration like a show car from the moment it arrived.',
    name: 'Daniel S.',
  },
];

const faqs = [
  {
    question: 'Do you work on modern performance vehicles?',
    answer:
      'Yes. We support modern vehicles with diagnostics, tuning, suspension, turbo and exhaust services.',
  },
  {
    question: 'Can I book an inspection before approving repairs?',
    answer:
      'Absolutely. We begin with a consultation and inspection, then provide a clear service plan before work starts.',
  },
  {
    question: 'Do the hero videos need to be uploaded now?',
    answer:
      'No. The page is prepared for /videos/hero-desktop.mp4 and /videos/hero-mobile.mp4 and shows a dark fallback until they are added.',
  },
];

function useRevealOnScroll() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}

function HeroVideo() {
  const videoRef = useRef(null);
  const [hasVideoError, setHasVideoError] = useState(false);

  const handleEnded = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div className={`hero-media ${hasVideoError ? 'hero-media--fallback' : ''}`}>
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        muted
        playsInline
        preload="metadata"
        onEnded={handleEnded}
        onError={() => setHasVideoError(true)}
        aria-hidden="true"
      >
        <source src="/videos/hero-desktop.mp4" type="video/mp4" media="(min-width: 769px)" />
        <source src="/videos/hero-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
      </video>
    </div>
  );
}

function SectionHeader({ eyebrow, title, text }) {
  return (
    <div className="section-header" data-reveal>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? 'is-open' : ''}`} data-reveal>
      <button className="faq-question" type="button" onClick={onToggle} aria-expanded={isOpen}>
        {item.question}
        <span>{isOpen ? '−' : '+'}</span>
      </button>
      <div className="faq-answer" aria-hidden={!isOpen}>
        <p>{item.answer}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [openFaq, setOpenFaq] = useState(0);
  useRevealOnScroll();

  return (
    <main>
      <section className="hero" id="top">
        <HeroVideo />
        <div className="hero-overlay" />
        <nav className="nav" aria-label="Main navigation">
          <a className="brand" href="#top">Apex Atelier</a>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="hero-content">
          <p className="eyebrow fade-in">Luxury garage aesthetics. Race-grade precision.</p>
          <h1 className="fade-in fade-in--delay">Premium Automotive Workshop</h1>
          <p className="hero-subtitle fade-in fade-in--delay-2">
            Professional diagnostics, repair, tuning and restoration for modern vehicles.
          </p>
          <div className="hero-actions fade-in fade-in--delay-3">
            <a className="btn btn-primary" href="#contact">Book a consultation</a>
            <a className="btn btn-secondary" href="#services">View services</a>
          </div>
        </div>
        <div className="scroll-cue">Scroll</div>
      </section>

      <section className="section" id="services">
        <SectionHeader
          eyebrow="Services"
          title="Specialist care for precision machines"
          text="From diagnostics to final detailing, every service is delivered with a premium workshop standard."
        />
        <div className="card-grid services-grid">
          {services.map((service, index) => (
            <article className="service-card premium-card" data-reveal key={service}>
              <span className="card-number">0{index + 1}</span>
              <h3>{service}</h3>
              <p>Calibrated procedures, clean communication and a finish worthy of a luxury garage.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section">
        <div data-reveal>
          <span className="section-kicker">Why Choose Us</span>
          <h2>Built for owners who notice every detail</h2>
          <p>
            We combine modern diagnostic technology with the careful touch of a restoration atelier.
          </p>
        </div>
        <div className="reason-list">
          {reasons.map((reason) => (
            <div className="reason-item" data-reveal key={reason}>{reason}</div>
          ))}
        </div>
      </section>

      <section className="section before-after">
        <SectionHeader
          eyebrow="Before / After"
          title="Visible transformations, measurable performance"
          text="Our workshop floor is designed for repairs, restorations and upgrades that look as good as they drive."
        />
        <div className="comparison" data-reveal>
          <div className="comparison-panel comparison-panel--before">
            <span>Before</span>
            <p>Noisy suspension, tired finish, unresolved warning lights.</p>
          </div>
          <div className="comparison-divider" />
          <div className="comparison-panel comparison-panel--after">
            <span>After</span>
            <p>Balanced ride, deep gloss, clean diagnostics and confident power delivery.</p>
          </div>
        </div>
      </section>

      <section className="section" id="process">
        <SectionHeader
          eyebrow="How We Work"
          title="A clear process from first call to final road test"
        />
        <div className="timeline">
          {workflow.map((step, index) => (
            <div className="timeline-step" data-reveal key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step}</h3>
              <p>Every phase is documented, reviewed and quality checked before handover.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section reviews">
        <SectionHeader eyebrow="Reviews" title="Trusted by enthusiasts and daily drivers" />
        <div className="card-grid">
          {reviews.map((review) => (
            <figure className="review-card premium-card" data-reveal key={review.name}>
              <blockquote>“{review.quote}”</blockquote>
              <figcaption>{review.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section faq-section">
        <SectionHeader eyebrow="FAQ" title="Answers before you arrive" />
        <div className="faq-list">
          {faqs.map((item, index) => (
            <FAQItem
              item={item}
              isOpen={openFaq === index}
              onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
              key={item.question}
            />
          ))}
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="contact-copy" data-reveal>
          <span className="section-kicker">Contact</span>
          <h2>Book a consultation</h2>
          <p>Tell us about your vehicle and the service you need. We will prepare the next step.</p>
        </div>
        <form className="contact-form" data-reveal>
          <label>
            Name
            <input type="text" name="name" placeholder="Your name" required />
          </label>
          <label>
            Phone
            <input type="tel" name="phone" placeholder="Your phone number" required />
          </label>
          <label>
            Car model
            <input type="text" name="carModel" placeholder="Make, model and year" />
          </label>
          <label>
            Service needed
            <select name="service" defaultValue="">
              <option value="" disabled>Select a service</option>
              {services.map((service) => (
                <option value={service} key={service}>{service}</option>
              ))}
            </select>
          </label>
          <label className="full-span">
            Message
            <textarea name="message" rows="5" placeholder="Tell us what you need" />
          </label>
          <button className="btn btn-primary full-span" type="submit">Send request</button>
        </form>
      </section>
    </main>
  );
}
