import { useState } from "react";

function Booking() {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Booking berhasil atas nama ${name}`);
  };

  return (
    <section id="booking" className="section">
      <h2>Booking Appointment</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama Pelanggan"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select required>
          <option value="">
            Pilih Desain Nail Art
          </option>

          <option>Blush Pink</option>
          <option>Soft Nude</option>
          <option>Glitter Shine</option>
        </select>

        <input type="date" required />

        <button type="submit">
          Pesan Sekarang
        </button>
      </form>
    </section>
  );
}

export default Booking;