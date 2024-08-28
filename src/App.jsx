import { useEffect, useRef } from "react";
import { useState } from "react";

const websites = [
  {
    id: 1,
    link: "https://daianamuf.github.io/Frontend-Mentor-Challenges/",
    date: "OCT 2023",
    title: "Frontend Mentor Challenges",
    description:
      "The beginning of my journey started with small challenges from frontendmentor.io, when I started to explore concepts of components, web design and, most importantly, JavaScript.",
    image: "/assets/images/1.png",
  },
  {
    id: 2,
    link: "https://cristian-milea.ro",
    date: "MAR 2024",
    title: "Cristian Milea",
    description:
      "The first website I created all by myself was the next big challenge for me, as I had just learned my favourite javascript framework, React.js. When creating it, I can say I was actually nervous and excited at the same time, as I was trying for the first time to implement all the concepts I have studied about! This is the reason why I don't update it's code: for it to symbolize the first big step in my career and how far I've come!",
    image: "/assets/images/2.png",
  },
  {
    id: 3,
    link: "https://farmacia-iziapharm.ro",
    date: "MAY 2024",
    title: "Iziapharm ",
    description:
      "When developing this website, I had encountered a whole new concept for me: making sure that the UX experience was really a top priority, as this website focuses on customer browsing and orders. This is when I realised I still had much more to learn about web development, but it made me even more enthusiastic about the process.",
    image: "/assets/images/3.png",
  },
  {
    id: 4,
    link: "https://beamish-stroopwafel-c178bf.netlify.app",
    date: "JUN 2024",
    title: "Vet Quiz",
    description:
      "While still in the process of studying React, I created this app so I would prove to myself that I can develop any kind of web application. I had fun in the process, it was something easy but different than what I had done so far!",
    image: "/assets/images/4.png",
  },
  {
    id: 5,
    link: "https://physiobloom.ro",
    date: "JUL 2024",
    title: "Physiobloom Studio",
    description:
      "The process of development of this website was something I really enjoyed, as I wanted to focus more on creating an elegant, soft design that would perfectly describe the business it is presenting. A lot of hours were put into researching inspiration for this kind of website where details mattered more than it's complexity.",
    image: "/assets/images/5.png",
  },
  {
    id: 6,
    link: "https://evosiding.ro",
    date: "AUG 2024",
    title: "Evosiding",
    description:
      "Already on my 6th project, I found myself put into another challenge: creating a website that would ease the process for the owner in order for them to present the business! This is why this site focuses more on what is happening in the background, so I implemented an optimised content management system, so the owner can efficiently display their merchandise.",
    image: "/assets/images/6.png",
  },
  {
    id: 7,
    link: "",
    date: "SOON",
    title: "More in the future!",
    description:
      "For now, I hope that the next opportunities will come with different challenges, different ideas, as I am excited to grow and do more and more projects that extend my web development career!",
  },
];

const touchMedia = window.matchMedia("(max-width: 900px)");

function App() {
  const [slides] = useState(websites);
  const [currSlide, setCurrSlide] = useState(0);
  const [currIndex, setCurrIndex] = useState(0);
  const sliderRef = useRef(null);

  const goToSlide = (index) => {
    setCurrSlide(index);

    if (touchMedia.matches) {
      const sliderElement = sliderRef.current;
      if (sliderElement) {
        const slideWidth = sliderElement.offsetWidth;
        const scrollPosition = index * slideWidth;
        sliderElement.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    const sliderElement = sliderRef.current;
    let newSlideIndex;

    const calculateNewIndex = () => {
      if (sliderElement) {
        const scrollLeft = sliderElement.scrollLeft;
        const slideWidth = sliderElement.offsetWidth;
        newSlideIndex = Math.round(scrollLeft / slideWidth);
      }
      return 0;
    };

    const handleScroll = () => {
      calculateNewIndex();
      setCurrIndex(newSlideIndex);
      return;
    };

    if (touchMedia.matches) {
      if (sliderElement) {
        sliderElement.addEventListener("scroll", handleScroll);
      }

      return () => {
        if (sliderElement) {
          sliderElement.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, []);

  return (
    <main className="wrapper">
      <h1 className="heading">Daiana&apos;s Timeline</h1>
      <section
        className={`slider ${touchMedia.matches ? "mobile" : ""}`}
        ref={sliderRef}
      >
        {slides.map((website, index) => (
          <div
            key={website.id}
            className={`website website-${index + 1}`}
            style={{ transform: `translateX(${100 * (index - currSlide)}%)` }}
          >
            {website.image && <img src={website.image} alt={website.title} />}
            <div className="website__info">
              <h2>{website.title}</h2>
              <a href={website.link} target="_blank" rel="noopener noreferrer">
                {website.link}
              </a>
              <p>{website.description}</p>
            </div>
          </div>
        ))}
      </section>
      <div className="dots">
        {slides.map((website, index) => (
          <span
            key={index}
            className={`dots__dot ${
              index === currSlide && !touchMedia.matches
                ? "dots__dot--active"
                : ""
            } ${
              index === currIndex && touchMedia.matches
                ? "dots__dot--active"
                : ""
            }`}
            onClick={() => goToSlide(index)}
          >
            {website.date}
          </span>
        ))}
      </div>
    </main>
  );
}

export default App;
