const nails = [
  {
    id: 1,
    name: "Blush Pink",
    price: "Rp120.000"
  },
  {
    id: 2,
    name: "Soft Nude",
    price: "Rp130.000"
  },
  {
    id: 3,
    name: "Glitter Shine",
    price: "Rp140.000"
  }
];

function Catalog() {
  return (
    <section id="catalog" className="section">
      <h2>Katalog Nail Art</h2>

      <div className="cards">
        {nails.map((item) => (
          <div className="card" key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Catalog;