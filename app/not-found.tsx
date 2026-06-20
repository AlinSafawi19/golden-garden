import Link from "next/link";

export default function NotFound() {
  return (
    <section className="h-screen flex flex-col items-center justify-center gap-[10px] px-[20px] tablet:px-[30px]">
      <div className="max-w-[705px] w-full flex flex-col items-center gap-[40px] tablet:gap-[80px]">
        <img
          src="https://framerusercontent.com/images/Z0XJ4HPlZZ1gZim1M9hD0KD8IuA.png?scale-down-to=1024&width=1372&height=538"
          alt="404 illustration"
          className="w-full h-[137px] tablet:h-[277px] object-contain"
        />

        <div className="flex flex-col gap-[27px] items-center text-center">
          <div className="flex flex-col gap-[23px] items-center">
            <h1>PAGE DOESN&apos;T EXIST</h1>
            <p className="body-16-regular">
              The page you were looking for could not be found.
            </p>
          </div>

          <Link
            href="/"
            className="cta-link inline-flex items-center gap-[8px] text-[var(--color-dark-gray)] no-underline hover:text-[var(--color-black)]"
            style={{ transition: "color 0.6s cubic-bezier(0.44, 0, 0.56, 1)" }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "24px",
                letterSpacing: "-0.01em",
                lineHeight: 1,
              }}
            >
              [
            </span>
            <span className="body-16-regular" style={{ color: "inherit" }}>
              Back to Home Page
            </span>
            <span aria-hidden="true" className="arrow-roll">
              <span className="arrow-roll__item">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 15 0 L 15 10.5 L 13.637 10.5 L 13.637 2.5 L 1.5 15.5 L 0 14.088 L 12.5 1.5 L 3.729 1.5 L 3.729 0 Z"
                    fill="currentColor"
                    transform="translate(2.363 2.5)"
                  />
                </svg>
              </span>
              <span className="arrow-roll__item">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 15 0 L 15 10.5 L 13.637 10.5 L 13.637 2.5 L 1.5 15.5 L 0 14.088 L 12.5 1.5 L 3.729 1.5 L 3.729 0 Z"
                    fill="currentColor"
                    transform="translate(2.363 2.5)"
                  />
                </svg>
              </span>
            </span>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "24px",
                letterSpacing: "-0.01em",
                lineHeight: 1,
              }}
            >
              ]
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
