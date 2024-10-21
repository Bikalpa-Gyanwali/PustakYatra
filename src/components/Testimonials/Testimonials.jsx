import React from 'react';
import Slider from "react-slick";
import Img2 from '../../assets/Books/book1.jpg';
import Img1 from '../../assets/Books/book2.jpg';
import Img3 from '../../assets/Books/book3.jpg';

const testimonialData = [
  {
    id: 1,
    name: "Victor",
    text: "PustakYatra has completely transformed how I find books. The personalized recommendations are spot on, and I love how easy it is to discover new titles. A must-visit for any book lover!",
    img: Img1,
  },
  {
    id: 2,
    name: "Satya Narayan",
    text: "I was amazed by the variety of books available here! The community recommendations and insightful reviews helped me find books that matched my interests perfectly.",
    img: Img2,
  },
  {
    id: 3,
    name: "Sachin Tendulkar",
    text: "As an avid reader, PustakYatra has become my go-to place for discovering the best books. The user-friendly interface and the ability to connect with other readers make the experience even better.",
    img: Img3,
  },
];

const Testimonials = () => {

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 10000, // large screens
        settings: {
          slidesToShow: 3, // Show 3 slides initially
          slidesToScroll: 1,
          infinite: true,
          centerMode: true, // To center the reviews
          centerPadding: "40px", // Adds spacing between centered slides
        },
      },
      {
        breakpoint: 1024, // medium screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 640, // small screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div data-aos="fade-up" data-aos-duration="300" className="py-16 px-6 lg:px-20 bg-light dark:bg-dark">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            What our customers say
          </p>
          <h1 className="text-4xl font-bold text-dark dark:text-light">
            Testimonials
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-4">
            Hear from our community of readers and see how PustakYatra has impacted their reading journey.
          </p>
        </div>

        <div
          data-aos="zoom-in"
          data-aos-duration="300"
          className="grid grid-cols-1 gap-8"
        >
          <Slider {...settings}>
            {testimonialData.map((data) => {
              return (
                <div key={data.id} className="my-6 px-3"> {/* Adds padding to each review */}
                  <div className="flex flex-col gap-4 shadow-lg py-8 px-6 rounded-xl bg-white dark:bg-dark text-black/80 dark:text-light relative h-full"> {/* h-full ensures each review has equal height */}
                    <div className="flex items-center gap-4">
                      <img
                        className="rounded-full w-20 h-20 border-4 border-primary"
                        src={data.img}
                        alt={data.name}
                      />
                      <div>
                        <h1 className="text-2xl font-bold text-primary dark:text-secondary">
                          {data.name}
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {data.text}
                        </p>
                      </div>
                    </div>
                    <p className="text-primary/20 dark:text-secondary/10 text-9xl font-serif absolute top-0 right-0">
                      ,,
                    </p>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
