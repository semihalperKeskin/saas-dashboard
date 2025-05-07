function Profil() {
  return (
    <div className="flex justify-center mt-10">
      <form>
        <label className="flex flex-col mb-4">
          <span className="text-gray-700">Ad Soyad</span>
          <input type="text" className="bg-white" />
        </label>
        <label className="flex flex-col mb-4">
          <span className="text-gray-700">e-mail</span>
          <input type="text" className="bg-white" />
        </label>
        <label className="flex flex-col mb-4">
          <span className="text-gray-700">şifre</span>
          <input type="password" className="bg-white" disabled value="sdasd"/>
        </label>
      </form>
    </div>
  );
}
export default Profil;