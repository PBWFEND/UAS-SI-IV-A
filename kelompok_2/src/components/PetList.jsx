function PetList({ pets, onDeletePet, onToggleAdoption, onEditPet }) {
  return (
    <div className="pet-grid">
      {pets.map((pet) => (
        <div
          key={pet.id}
          className={`pet-card ${pet.adopted ? "adopted" : "not-adopted"}`}
        >
          <div className="pet-header">
            <h4>🐾 {pet.nama}</h4>

            <span
              className={`status-badge ${
                pet.adopted ? "adopted-badge" : "not-adopted-badge"
              }`}
            >
              {pet.adopted ? "Adopted" : "Available"}
            </span>
          </div>

          <div className="pet-info">
            <p><b>Jenis:</b> {pet.jenis}</p>
            <p><b>Umur:</b> {pet.umur}</p>
            <p><b>Gender:</b> {pet.gender}</p>
          </div>

          <div className="pet-actions">
            <button
              className="btn btn-sm btn-success"
              onClick={() => onToggleAdoption(pet.id)}
            >
              {pet.adopted ? "Unadopt" : "Adopt"}
            </button>

            <button
              className="btn btn-sm btn-warning"
              onClick={() => onEditPet(pet)}
            >
              Edit
            </button>

            <button
              className="btn btn-sm btn-danger"
              onClick={() => onDeletePet(pet.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PetList;