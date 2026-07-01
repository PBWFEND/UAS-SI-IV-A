import { useEffect, useState } from "react";

function PetForm({ onAddPet, editPet, onUpdatePet }) {
  const [nama, setNama] = useState("");
  const [jenis, setJenis] = useState("");
  const [umur, setUmur] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (editPet) {
      setNama(editPet.nama);
      setJenis(editPet.jenis);
      setUmur(editPet.umur);
      setGender(editPet.gender);
    }
  }, [editPet]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nama || !jenis || !umur || !gender) {
      alert("Semua data harus diisi!");
      return;
    }

    const petData = {
      id: editPet ? editPet.id : Date.now(),
      nama,
      jenis,
      umur,
      gender,
      adopted: editPet ? editPet.adopted : false,
    };

    if (editPet) {
      onUpdatePet(petData);
    } else {
      onAddPet(petData);
    }

    setNama("");
    setJenis("");
    setUmur("");
    setGender("");
  };

  return (
    <div className="card p-4 mb-4">
      <h3>{editPet ? "Edit Hewan" : "Tambah Hewan"}</h3>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Nama hewan"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Jenis"
          value={jenis}
          onChange={(e) => setJenis(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Umur"
          value={umur}
          onChange={(e) => setUmur(e.target.value)}
        />

        <select
          className="form-control mb-3"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Pilih Gender</option>
          <option value="Jantan">Jantan</option>
          <option value="Betina">Betina</option>
        </select>

        <button className="btn btn-primary w-100">
          {editPet ? "Update Hewan" : "Tambah Hewan"}
        </button>
      </form>
    </div>
  );
}

export default PetForm;