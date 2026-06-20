"use client";

const STARS_SRC = "data:image/svg+xml,<svg display='block' role='presentation' viewBox='0 0 20 4' xmlns='http://www.w3.org/2000/svg'><path d='M 1.527 0.188 L 1.756 0.65 C 1.787 0.714 1.871 0.776 1.941 0.788 L 2.356 0.858 C 2.622 0.902 2.684 1.096 2.493 1.288 L 2.17 1.614 C 2.116 1.669 2.086 1.775 2.102 1.851 L 2.195 2.254 C 2.268 2.573 2.1 2.697 1.82 2.53 L 1.431 2.298 C 1.36 2.256 1.245 2.256 1.173 2.298 L 0.784 2.53 C 0.505 2.697 0.336 2.572 0.409 2.254 L 0.501 1.851 C 0.518 1.775 0.488 1.669 0.433 1.614 L 0.111 1.288 C -0.08 1.096 -0.018 0.902 0.247 0.858 L 0.663 0.788 C 0.732 0.776 0.815 0.714 0.846 0.65 L 1.075 0.188 C 1.2 -0.063 1.403 -0.063 1.527 0.188 Z' fill='rgb(251, 191, 55)' stroke='rgb(251, 191, 55)' stroke-width='0.23' stroke-linecap='round' stroke-linejoin='round' transform='translate(0.26 0.695)'/><path d='M 1.527 0.188 L 1.756 0.65 C 1.787 0.714 1.871 0.776 1.941 0.788 L 2.356 0.858 C 2.622 0.902 2.684 1.096 2.493 1.288 L 2.17 1.614 C 2.116 1.669 2.086 1.775 2.102 1.851 L 2.195 2.254 C 2.268 2.573 2.1 2.697 1.82 2.53 L 1.431 2.298 C 1.36 2.256 1.245 2.256 1.173 2.298 L 0.784 2.53 C 0.505 2.697 0.336 2.572 0.409 2.254 L 0.501 1.851 C 0.518 1.775 0.488 1.669 0.433 1.614 L 0.111 1.288 C -0.08 1.096 -0.018 0.902 0.247 0.858 L 0.663 0.788 C 0.732 0.776 0.815 0.714 0.846 0.65 L 1.075 0.188 C 1.2 -0.063 1.403 -0.063 1.527 0.188 Z' fill='rgb(251, 191, 55)' stroke='rgb(251, 191, 55)' stroke-width='0.23' stroke-linecap='round' stroke-linejoin='round' transform='translate(4.479 0.695)'/><path d='M 1.527 0.188 L 1.756 0.65 C 1.787 0.714 1.871 0.776 1.941 0.788 L 2.356 0.858 C 2.622 0.902 2.684 1.096 2.493 1.288 L 2.17 1.614 C 2.116 1.669 2.086 1.775 2.102 1.851 L 2.195 2.254 C 2.268 2.573 2.1 2.697 1.82 2.53 L 1.431 2.298 C 1.36 2.256 1.245 2.256 1.173 2.298 L 0.784 2.53 C 0.505 2.697 0.336 2.572 0.409 2.254 L 0.501 1.851 C 0.518 1.775 0.488 1.669 0.433 1.614 L 0.111 1.288 C -0.08 1.096 -0.018 0.902 0.247 0.858 L 0.663 0.788 C 0.732 0.776 0.815 0.714 0.846 0.65 L 1.075 0.188 C 1.2 -0.063 1.403 -0.063 1.527 0.188 Z' fill='rgb(251, 191, 55)' stroke='rgb(251, 191, 55)' stroke-width='0.23' stroke-linecap='round' stroke-linejoin='round' transform='translate(8.698 0.695)'/><path d='M 1.527 0.188 L 1.756 0.65 C 1.787 0.714 1.871 0.776 1.941 0.788 L 2.356 0.858 C 2.622 0.902 2.684 1.096 2.493 1.288 L 2.17 1.614 C 2.116 1.669 2.086 1.775 2.102 1.851 L 2.195 2.254 C 2.268 2.573 2.1 2.697 1.82 2.53 L 1.431 2.298 C 1.36 2.256 1.245 2.256 1.173 2.298 L 0.784 2.53 C 0.505 2.697 0.336 2.572 0.409 2.254 L 0.501 1.851 C 0.518 1.775 0.488 1.669 0.433 1.614 L 0.111 1.288 C -0.08 1.096 -0.018 0.902 0.247 0.858 L 0.663 0.788 C 0.732 0.776 0.815 0.714 0.846 0.65 L 1.075 0.188 C 1.2 -0.063 1.403 -0.063 1.527 0.188 Z' fill='rgb(251, 191, 55)' stroke='rgb(251, 191, 55)' stroke-width='0.23' stroke-linecap='round' stroke-linejoin='round' transform='translate(12.917 0.695)'/><path d='M 1.527 0.188 L 1.756 0.65 C 1.787 0.714 1.871 0.776 1.941 0.788 L 2.356 0.858 C 2.622 0.902 2.684 1.096 2.493 1.288 L 2.17 1.614 C 2.115 1.669 2.085 1.775 2.103 1.851 L 2.195 2.254 C 2.268 2.573 2.1 2.697 1.82 2.53 L 1.431 2.298 C 1.36 2.256 1.245 2.256 1.173 2.298 L 0.784 2.53 C 0.505 2.697 0.336 2.572 0.409 2.254 L 0.501 1.851 C 0.518 1.775 0.488 1.669 0.433 1.614 L 0.11 1.288 C -0.08 1.096 -0.018 0.902 0.247 0.858 L 0.663 0.788 C 0.732 0.776 0.815 0.714 0.846 0.65 L 1.075 0.188 C 1.2 -0.063 1.403 -0.063 1.527 0.188 Z' fill='rgb(251, 191, 55)' stroke='rgb(251, 191, 55)' stroke-width='0.23' stroke-linecap='round' stroke-linejoin='round' transform='translate(17.135 0.695)'/></svg>";

const Stars = () => (
  <img src={STARS_SRC} alt="5 stars" width={128} height={26} style={{ display: "block" }} />
);

const successStories = [
  {
    quote: "Our backyard has completely transformed into a peaceful retreat. The attention to detail and care they put into every corner truly exceeded our expectations.",
    name: "Savannah Nguyen",
    location: "Houston, TX",
    image: "https://framerusercontent.com/images/ClFmQB14W7crwd6VdHlYJBcbE.png?scale-down-to=1024&width=904&height=1200",
  },
  {
    quote: "From design to maintenance, everything was handled professionally. Our garden looks stunning all year round, and we couldn't be happier with the results.",
    name: "Ethan Brooks",
    location: "Denver, CO",
    image: "https://framerusercontent.com/images/rQ92osCGkMe2Ovjsyh4pAgYnzsM.png?width=332&height=332",
  },
  {
    quote: "They understood exactly what we wanted and brought our vision to life beautifully. The space feels fresh, vibrant, and perfectly designed for our lifestyle.",
    name: "Isabella Chen",
    location: "San Jose, CA",
    image: "https://framerusercontent.com/images/6LVLDyL2L9I0uyNZafNkMhK1k.png?width=332&height=332",
  },
  {
    quote: "The team was responsive, creative, and a joy to work with. Every plant and pathway feels intentional, and our outdoor space has never looked better.",
    name: "Marcus Reed",
    location: "Austin, TX",
    image: "https://framerusercontent.com/images/rQ92osCGkMe2Ovjsyh4pAgYnzsM.png?width=332&height=332",
  },
  {
    quote: "We were amazed by how they turned a neglected yard into a lush, inviting garden. The whole process was smooth and the results speak for themselves.",
    name: "Olivia Martin",
    location: "Portland, OR",
    image: "https://framerusercontent.com/images/6LVLDyL2L9I0uyNZafNkMhK1k.png?width=332&height=332",
  },
  {
    quote: "Professional, punctual, and passionate about their craft. They listened to our ideas and delivered a garden that feels uniquely ours.",
    name: "Daniel Carter",
    location: "Seattle, WA",
    image: "https://framerusercontent.com/images/ClFmQB14W7crwd6VdHlYJBcbE.png?scale-down-to=1024&width=904&height=1200",
  },
];

export default function SuccessStoriesGrid() {
  return (
    <div className="grid grid-cols-1 tablet:grid-cols-3 gap-[24px] tablet:gap-x-[24px] tablet:gap-y-[40px] desktop:gap-x-[24px] desktop:gap-y-[48px]">
      {successStories.map((t) => (
        <div
          key={t.name}
          className="flex flex-col gap-[20px] p-[20px]"
          style={{ backgroundColor: "var(--color-white)", borderRadius: 12 }}
        >
          <img src={t.image} alt={t.name} className="object-cover" style={{ borderRadius: 12, width: 166, height: 166 }} />
          <div className="flex flex-col gap-[16px]">
            <Stars />
            <p className="heading-4b" style={{ color: "var(--color-black)" }}>{t.quote}</p>
            <div className="flex flex-col gap-[4px]">
              <span className="heading-4b" style={{ color: "var(--color-black)" }}>{t.name}</span>
              <span className="body-16-regular" style={{ color: "#464646" }}>{t.location}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
