import React from "react";
import "./GallerySection.css";
import gallery1 from "../images/gallery1.jpg";
import gallery2 from "../images/gallery2.jpg";
import gallery3 from "../images/gallery3.jpg";
import gallery5 from "../images/gallery5.jpg";
import gallery6 from "../images/gallery6.jpg";

export default function GallerySection() {
  return (
    <section className="gallery-section">
      <h2 className="text-center">Follow us on Instagram</h2>
      <p className="text-center text-muted">@smartwear</p>
      <div className="gallery-grid animated-grid">
        <img src={gallery1} alt="Smartwatch 1" />
        <img src={gallery2} alt="Smartwatch 2" />
        <img src={gallery3} alt="Smartwatch 3" />
        <img src={gallery5} alt="Smartwatch 5" />
        <img src={gallery6} alt="Smartwatch 6" />
        <img src={gallery6} alt="Smartwatch 6" />


      </div>
    </section>
  );
}
