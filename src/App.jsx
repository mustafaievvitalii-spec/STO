import { useEffect, useRef, useState } from 'react';

const services = [
  'Діагностика двигуна',
  'Ремонт підвіски',
  'Ремонт турбін',
  'Вихлопні системи',
  'Тюнінг та збільшення потужності',
  'Детейлінг',
];

const reasons = [
  'Діагностика рівня офіційного сервісу від досвідчених майстрів.',
  'Прозорий кошторис перед кожним ремонтом або модернізацією.',
  'Преміальні комплектуючі, відкалібрований інструмент і бездоганна увага до деталей.',
  'Експертиза у продуктивності для щоденних авто та індивідуальних проєктів.',
];

const workflow = [
  'Консультація',
  'Точна діагностика',
  'Ремонт або тюнінг',
  'Фінальний дорожній тест',
];

const reviews = [
  {
    quote:
      'Команда знайшла складну несправність за один візит, і автомобіль знову відчувається як новий.',
    name: 'Маркус Р.',
  },
  {
    quote:
      'Вишукана майстерня, чудова комунікація та бездоганний тюнінг потужності.',
    name: 'Олена К.',
  },
  {
    quote:
      'До мого проєкту відновлення поставилися як до виставкового авто з першої хвилини.',
    name: 'Данило С.',
  },
];

const faqs = [
  {
    question: 'Чи працюєте ви із сучасними продуктивними автомобілями?',
    answer:
      'Так. Ми обслуговуємо сучасні автомобілі та виконуємо діагностику, тюнінг, ремонт підвіски, турбін і вихлопних систем.',
  },
  {
    question: 'Чи можна записатися на огляд перед погодженням ремонту?',
    answer:
      'Звичайно. Ми починаємо з консультації та огляду, після чого надаємо зрозумілий план робіт до старту ремонту.',
  },
  {
    question: 'Чи потрібно завантажувати відео для головного екрана зараз?',
    answer:
      'Ні. Сторінка вже підготовлена для відео головного екрана та показує темний фон, доки файли не додано.',
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
  const hasFrozenRef = useRef(false);
  const [hasVideoError, setHasVideoError] = useState(false);

  const freezeOnFinalFrame = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (hasFrozenRef.current) {
      return;
    }

    hasFrozenRef.current = true;
    video.pause();

    if (Number.isFinite(video.duration) && video.duration > 0) {
      video.currentTime = Math.max(video.duration - 0.04, 0);
    }
  };

  const setHeroPlaybackSpeed = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.defaultPlaybackRate = 1.5;
    video.playbackRate = 1.5;
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;

    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
      return;
    }

    if (video.duration - video.currentTime <= 0.06) {
      freezeOnFinalFrame();
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
        preload="auto"
        onLoadedMetadata={setHeroPlaybackSpeed}
        onLoadedData={() => {
          hasFrozenRef.current = false;
          setHasVideoError(false);
          setHeroPlaybackSpeed();
        }}
        onPlay={setHeroPlaybackSpeed}
        onTimeUpdate={handleTimeUpdate}
        onEnded={freezeOnFinalFrame}
        onError={() => setHasVideoError(true)}
        aria-hidden="true"
      >
        <source src="/videos/hero-car.mp4" type="video/mp4" media="(min-width: 769px)" />
        <source src="/videos/mobile-car.mp4" type="video/mp4" media="(max-width: 768px)" />
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
        <nav className="nav" aria-label="Головна навігація">
          <a className="brand" href="#top">Апекс Ательє</a>
          <a href="#services">Послуги</a>
          <a href="#process">Як ми працюємо</a>
          <a href="#contact">Контакти</a>
        </nav>
        <div className="hero-content">
          <p className="eyebrow fade-in">Естетика преміального гаража. Точність гоночного рівня.</p>
          <h1 className="fade-in fade-in--delay">Преміальна автомайстерня</h1>
          <p className="hero-subtitle fade-in fade-in--delay-2">
            Професійна діагностика, ремонт, тюнінг та відновлення сучасних автомобілів.
          </p>
          <div className="hero-actions fade-in fade-in--delay-3">
            <a className="btn btn-primary" href="#contact">Записатися на консультацію</a>
            <a className="btn btn-secondary" href="#services">Переглянути послуги</a>
          </div>
        </div>
        <div className="scroll-cue">Гортайте</div>
      </section>

      <section className="section" id="services">
        <SectionHeader
          eyebrow="Послуги"
          title="Спеціалізований догляд для точних машин"
          text="Від діагностики до фінального детейлінгу — кожну послугу виконано за стандартами преміальної майстерні."
        />
        <div className="card-grid services-grid">
          {services.map((service, index) => (
            <article className="service-card premium-card" data-reveal key={service}>
              <span className="card-number">0{index + 1}</span>
              <h3>{service}</h3>
              <p>Відпрацьовані процедури, чітка комунікація та результат, гідний преміального гаража.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section">
        <div data-reveal>
          <span className="section-kicker">Чому обирають нас</span>
          <h2>Створено для власників, які помічають кожну деталь</h2>
          <p>
            Ми поєднуємо сучасні діагностичні технології з делікатним підходом реставраційного ательє.
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
          eyebrow="До / Після"
          title="Помітні трансформації та вимірюваний результат"
          text="Наш робочий простір створений для ремонту, відновлення та модернізацій, які виглядають так само переконливо, як і відчуваються за кермом."
        />
        <div className="comparison" data-reveal>
          <div className="comparison-panel comparison-panel--before">
            <span>До</span>
            <p>Шумна підвіска, втомлений вигляд, невирішені попередження на панелі.</p>
          </div>
          <div className="comparison-divider" />
          <div className="comparison-panel comparison-panel--after">
            <span>Після</span>
            <p>Збалансований хід, глибокий блиск, чиста діагностика та впевнена віддача потужності.</p>
          </div>
        </div>
      </section>

      <section className="section" id="process">
        <SectionHeader
          eyebrow="Як ми працюємо"
          title="Прозорий процес від першого дзвінка до фінального тест-драйву"
        />
        <div className="timeline">
          {workflow.map((step, index) => (
            <div className="timeline-step" data-reveal key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step}</h3>
              <p>Кожен етап документується, перевіряється та проходить контроль якості перед передачею авто.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section reviews">
        <SectionHeader eyebrow="Відгуки клієнтів" title="Нам довіряють ентузіасти й власники щоденних авто" />
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
        <SectionHeader eyebrow="Поширені запитання" title="Відповіді ще до вашого візиту" />
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
          <span className="section-kicker">Контакти</span>
          <h2>Зв’язатися з нами</h2>
          <p>Розкажіть про ваш автомобіль і потрібну послугу. Ми підготуємо наступний крок.</p>
        </div>
        <form className="contact-form" data-reveal>
          <label>
            Ім’я
            <input type="text" name="name" placeholder="Ваше ім’я" required />
          </label>
          <label>
            Телефон
            <input type="tel" name="phone" placeholder="Ваш номер телефону" required />
          </label>
          <label>
            Марка та модель автомобіля
            <input type="text" name="carModel" placeholder="Марка, модель і рік" />
          </label>
          <label>
            Необхідна послуга
            <select name="service" defaultValue="">
              <option value="" disabled>Оберіть послугу</option>
              {services.map((service) => (
                <option value={service} key={service}>{service}</option>
              ))}
            </select>
          </label>
          <label className="full-span">
            Коментар
            <textarea name="message" rows="5" placeholder="Опишіть, що саме потрібно" />
          </label>
          <button className="btn btn-primary full-span" type="submit">Надіслати заявку</button>
        </form>
      </section>
    </main>
  );
}
