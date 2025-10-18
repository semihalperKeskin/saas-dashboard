import { UpdateUserInput } from "@vizionboard/validation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import { useUser } from "~/contexts/UserContext";

function UserForm() {
  const { register, handleSubmit } = useForm<UpdateUserInput>();

  const onSubmit: SubmitHandler<UpdateUserInput> = (data) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("No token found");
      return;
    }

    fetch("/api/user/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Bir hata oluştu");
        }
        return response.json();
      })
      .then(() => {
        const message: string = "Successfully updated your profile.";
        toast.success(message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Bounce,
        });
      })
      .catch((error) => {
        console.error("Güncelleme hatası:", error);
      });
  };
  const user = useUser();

  const style = {
    label: "flex flex-col mb-4",
    span: "text-gray-700 text-lg",
    input: "bg-white border-1 p-1 rounded-md w-full mt-2",
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:w-1/2">
      <label className={style.label}>
        <span className={style.span}>Username</span>
        <input
          type="text"
          className={style.input}
          placeholder="e.g. johndoe"
          defaultValue={user?.username || ""}
          {...register("username")}
        />
      </label>
      <label className={style.label}>
        <span className={style.span}>Name</span>
        <input
          type="text"
          className={style.input}
          placeholder="e.g. John Doe"
          defaultValue={user?.name || ""}
          {...register("name")}
        />
      </label>
      <label className={style.label}>
        <span className={style.span}>e-mail</span>
        <input
          type="text"
          className={style.input}
          value={user?.email || ""}
          disabled
        />
      </label>
      <label className={style.label}>
        <span className={style.span}>Job</span>
        <input
          type="text"
          className={style.input}
          placeholder="e.g. Software Engineer"
          defaultValue={user?.job || ""}
          {...register("job")}
        />
      </label>
      <label className={style.label}>
        <span className={style.span}>Location</span>
        <input
          type="text"
          className={style.input}
          placeholder="e.g. San Francisco, CA"
          defaultValue={user?.location || ""}
          {...register("location")}
        />
      </label>
      <label className={style.label}>
        <span className={style.span}>Organization</span>
        <input
          type="text"
          className={style.input}
          placeholder="e.g. Google"
          defaultValue={user?.organization || ""}
          {...register("organization")}
        />
      </label>

      <input
        type="submit"
        className="btnbg-transparent hover:bg-blue-500 text-blue-600 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded cursor-pointer mt-4"
        value="Update"
      />
    </form>
  );
}

export default UserForm;
