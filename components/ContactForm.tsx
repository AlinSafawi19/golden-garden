export default function ContactForm() {
  return (
    <div className="rounded-[12px] overflow-hidden flex flex-col tablet:flex-row tablet:justify-between">
      {/* Left — mint green */}
      <div
        className="w-full flex-1 tablet:max-w-[40%] desktop:max-w-[520px] flex flex-col gap-[20px] tablet:gap-[24px] desktop:gap-[35px] tablet:justify-between p-[20px] desktop:p-[40px]"
        style={{ backgroundColor: "var(--color-mint-green)" }}
      >
        <h3 className="heading-3 max-w-[307px]">
          Have any questions? We&apos;re just a form away— send us a message.
        </h3>

        {/* Information wrapper */}
        <div className="flex flex-col gap-[16px]">
          <a
            href="mailto:info.example@gmail.com"
            className="body-20-regular-4 hover:text-[var(--color-black)] hover:underline"
          >
            info.example@gmail.com
          </a>
          <a
            href="tel:+15555555555"
            className="body-20-regular-4 hover:text-[var(--color-black)] hover:underline"
          >
            (555) 555-5555
          </a>
        </div>
      </div>

      {/* Right — dark teal */}
      <div
        className="w-full flex-1 flex flex-col gap-[20px] tablet:gap-[24px] desktop:gap-[35px] p-[20px] desktop:p-[57px]"
        style={{ backgroundColor: "var(--color-dark-teal)" }}
      >
        <h3 className="heading-3 max-w-[396px]" style={{ color: "var(--color-white)" }}>
          We will be in touch within the next 24 hours!
        </h3>

        {/* Form wrapper */}
        <form className="flex flex-col gap-[20px]">
          {/* Full Name field */}
          <label className="flex flex-col gap-[16px]">
            <span className="body-18-regular">Full Name *</span>
            <input
              type="text"
              name="fullName"
              required
              placeholder="Robert"
              className="w-full bg-transparent outline-none placeholder:text-[#FFFFFFB3] border-0 border-b border-b-[#FFFFFFB3] focus:border-b-[var(--color-white)]"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "1.4em",
                letterSpacing: "0px",
                color: "var(--color-white)",
                paddingBottom: "16px",
                transition: "border-color 0.6s cubic-bezier(0.44, 0, 0.56, 1)",
              }}
            />
          </label>

          {/* Email + Phone row */}
          <div className="flex flex-col gap-[24px] tablet:flex-row tablet:gap-[24px]">
            {/* Email field */}
            <label className="flex-1 flex flex-col gap-[16px]">
              <span className="body-18-regular">Email *</span>
              <input
                type="email"
                name="email"
                required
                placeholder="robert@mail.com"
                className="w-full bg-transparent outline-none placeholder:text-[#FFFFFFB3] border-0 border-b border-b-[#FFFFFFB3] focus:border-b-[var(--color-white)]"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "1.4em",
                  letterSpacing: "0px",
                  color: "var(--color-white)",
                  paddingBottom: "16px",
                  transition: "border-color 0.6s cubic-bezier(0.44, 0, 0.56, 1)",
                }}
              />
            </label>

            {/* Phone field */}
            <label className="flex-1 flex flex-col gap-[16px]">
              <span className="body-18-regular">Phone *</span>
              <input
                type="tel"
                name="phone"
                required
                placeholder="xxxxxxxxxxxxxxxx"
                className="w-full bg-transparent outline-none placeholder:text-[#FFFFFFB3] border-0 border-b border-b-[#FFFFFFB3] focus:border-b-[var(--color-white)]"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "1.4em",
                  letterSpacing: "0px",
                  color: "var(--color-white)",
                  paddingBottom: "16px",
                  transition: "border-color 0.6s cubic-bezier(0.44, 0, 0.56, 1)",
                }}
              />
            </label>
          </div>

          {/* Subject field */}
          <label className="flex flex-col gap-[16px]">
            <span className="body-18-regular">Subject *</span>
            <input
              type="text"
              name="subject"
              required
              placeholder="Subject"
              className="w-full bg-transparent outline-none placeholder:text-[#FFFFFFB3] border-0 border-b border-b-[#FFFFFFB3] focus:border-b-[var(--color-white)]"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "1.4em",
                letterSpacing: "0px",
                color: "var(--color-white)",
                paddingBottom: "16px",
                transition: "border-color 0.6s cubic-bezier(0.44, 0, 0.56, 1)",
              }}
            />
          </label>

          {/* Message field */}
          <label className="flex flex-col gap-[16px]">
            <span className="body-18-regular">Message *</span>
            <textarea
              name="message"
              required
              placeholder="Message"
              className="w-full bg-transparent outline-none resize-y placeholder:text-[#FFFFFFB3] border-0 border-b border-b-[#FFFFFFB3] focus:border-b-[var(--color-white)]"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "1.4em",
                letterSpacing: "0px",
                color: "var(--color-white)",
                paddingBottom: "16px",
                minHeight: "70px",
                transition: "border-color 0.6s cubic-bezier(0.44, 0, 0.56, 1)",
              }}
            />
          </label>

          <button
            type="submit"
            className="cta-link inline-flex items-center gap-[8px] self-start appearance-none bg-transparent border-0 p-0 cursor-pointer no-underline text-[var(--color-white)]"
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
              Submit Now
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
          </button>
        </form>
      </div>
    </div>
  );
}
