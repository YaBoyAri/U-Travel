import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    namaDriver: '',
    NIK: '',
    plateNomor: '',
    email: '',
    password: '',
    ktp: null,
    kendaraan: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append('namaDriver', formData.namaDriver);
    data.append('NIK', formData.NIK);
    data.append('platNomor', formData.platNomor);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('ktp', formData.ktp);
    data.append('kendaraan', formData.kendaraan);
  
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        body: data,
      });
  
      const result = await response.json();
      console.log(result);
      alert('Registrasi berhasil!');
    } catch (error) {
      console.error(error);
      alert('Registrasi gagal.');
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center text-blue-900">
          Register Driver
        </h2>

        <div>
          <label className="block font-semibold">Nama Lengkap :</label>
          <input
            type="text"
            name="namaDriver"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">NIK :</label>
          <input
            type="text"
            name="NIK"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Plat Nomor :</label>
          <input
            type="text"
            name="platNomor"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Email :</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Password :</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">KTP :</label>
          <input
            type="file"
            name="ktp"
            onChange={handleChange}
            className="w-full p-2 border rounded file:mr-2 file:py-1 file:px-2 file:bg-blue-700 file:text-white"
          />
        </div>

        <div>
          <label className="block font-semibold">Foto Kendaraan :</label>
          <input
            type="file"
            name="kendaraan"
            onChange={handleChange}
            className="w-full p-2 border rounded file:mr-2 file:py-1 file:px-2 file:bg-blue-700 file:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;