import Catalogue1 from '../../assets/Catalogue1.svg'
import Catalogue2 from '../../assets/Catalogue2.svg'

export default function HomeCatalog() {
  return (
    <div className="w-full">
      <div className="max-w-[1440px] mx-auto 
        px-4 sm:px-6 md:px-8 lg:px-[124px]
        mt-6 sm:mt-8 md:mt-12 lg:mt-[97px]"
      >
        <div className="w-full lg:w-[1192px] h-auto lg:h-[462px] mx-auto
          grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8
          lg:gap-10"
        >
          {/* Text Content Section */}
          <div className="col-span-1 h-auto lg:h-[462px] w-full lg:w-[363px] mx-auto
            mb-8 sm:mb-10 md:mb-12 lg:mb-0"
          >
            <div className="flex flex-col justify-between h-full">
              <div className="text-left">
                <h1 className="text-[40px] sm:text-[48px] md:text-[56px] lg:text-[96px]
                  font-bold font-['Poppins']
                  leading-[1.2]
                  mb-2 sm:mb-3 md:mb-4"
                >
                  2024
                </h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px]
                  font-bold font-['Poppins']
                  leading-[1.5]
                  mb-6"
                >
                  Collection
                </h2>
              </div>
              
              <p className="w-full lg:w-[363px]
                text-[#222222]
                text-sm sm:text-base
                font-normal font-['Poppins']
                leading-tight
                mt-6 lg:mt-[24px]"
              >
                Step into a world of winter elegance and style with our latest
                Winter Collection. As temperatures drop, our curated selection of
                clothing is designed to keep you fashionably warm. From luxurious
                knitwear to trend-setting outerwear, each piece in our collection is
                a celebration of seasonal sophistication.
              </p>
            </div>
          </div>

          {/* Image Cards Section */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-6">
            {[
              {
                id: 1,
                title: "Cozy Breeze",
                description: "Embrace the season with our carefully curated selection of garments, each piece thoughtfully designed to blend fashion and functionality. From cozy knits to elegant outerwear, our collection invites you to indulge in the allure of winter fashion.",
                image: Catalogue1,
                link: "#"
              },
              {
                id: 2,
                title: "Bold Move",
                description: "Step into a world where fashion meets functionality with our latest Sneaker Collection. Designed for those who appreciate the perfect fusion of style and comfort, our curated selection of sneakers is a celebration of urban chic.",
                image: Catalogue2,
                link: "#"
              }
            ].map((card) => (
              <div 
                key={card.id} 
                className="group relative overflow-hidden rounded-lg 
                  w-full 
                  h-[320px] sm:h-[380px] md:h-[420px] lg:h-[462px] 
                  mx-auto"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 
                  p-4 sm:p-5 md:p-6 
                  flex flex-col justify-end 
                  items-center md:items-start 
                  gap-3 sm:gap-4 md:gap-5 lg:gap-6"
                >
                  <h3 className="text-white 
                    text-xl sm:text-2xl 
                    font-semibold 
                    text-center md:text-left"
                  >
                    {card.title}
                  </h3>
                  <p className="text-white/90 
                    text-sm md:text-base 
                    line-clamp-3 
                    text-center md:text-left 
                    w-full md:max-w-[80%]"
                  >
                    {card.description}
                  </p>
                  <button className="inline-flex 
                    bg-[#222222] text-white 
                    py-2 sm:py-[7px] 
                    px-4 sm:px-[10px] 
                    rounded 
                    text-sm md:text-base
                    hover:bg-gray-600 
                    transition duration-300
                    mx-auto md:mx-0"
                  >
                    View more
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
