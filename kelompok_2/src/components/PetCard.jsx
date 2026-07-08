function PetCard({
  pet,
  onDeletePet,
  onToggleAdoption,
}) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h4>🐾 {pet.nama}</h4>

        <p><strong>Jenis:</strong> {pet.jenis}</p>
        <p><strong>Umur:</strong> {pet.umur}</p>
        <p><strong>Gender:</strong> {pet.gender}</p>

        <p>
          <strong>Status:</strong>{" "}
          {pet.adopted
            ? "✅ Sudah Diadopsi"
            : "❌ Belum Diadopsi"}
        </p>

        <button
          className="btn btn-success me-2"
          onClick={() => onToggleAdoption(pet.id)}
        >
          Ubah Status
        </button>

        <button
          className="btn btn-danger"
          onClick={() => onDeletePet(pet.id)}
        >
          Hapus
        </button>
      </div>
    </div>
  );
}

export default PetCard;