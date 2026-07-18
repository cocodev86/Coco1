"use client";

import { useEffect, useState } from "react";

export default function MobileBookingBar() {
  const [bookingVisible, setBookingVisible] = useState(false);

  useEffect(() => {
    const bookingSection = document.getElementById("booking");

    if (!bookingSection || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setBookingVisible(entry.isIntersecting),
      {
        threshold: 0.08,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    observer.observe(bookingSection);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`mobile-booking-bar${bookingVisible ? " is-hidden" : ""}`}
      aria-hidden={bookingVisible}
    >
      <span>
        <strong>Ready to automate?</strong>
        <small>Free strategy call</small>
      </span>
      <a
        className="mobile-booking-button"
        href="#booking"
        tabIndex={bookingVisible ? -1 : 0}
      >
        Book now
      </a>
    </div>
  );
}
