import UserForm from "./UserForm";

function UserProfile() {
  return (
    <div>
      <h1 className="text-2xl font-thin">Account Settings</h1>
      <div className="flex justify-center mt-3 bg-white rounded-2xl p-5 md:p-10">
        <UserForm />
      </div>
    </div>
  );
}

export default UserProfile;
