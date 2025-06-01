// src/pages/Contact.jsx
export default function Contact() {
  return (
    <div>
      <h2>Contact Us</h2>
      <form>
        <input type="text" placeholder="Your Name" required />
        <br />
        <input type="email" placeholder="Your Email" required />
        <br />
        <textarea placeholder="Your Message" required></textarea>
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
