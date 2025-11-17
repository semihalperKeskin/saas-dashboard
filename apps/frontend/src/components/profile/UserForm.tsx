import { UpdateUserInput, UserInput } from "@vizionboard/validation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import apiClient from "~/api/client";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { RootState } from "~/app/store";
import { fetchUser } from "~/features/userSlice";
import toastMessage from "../toast";

function UserForm() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(
    (state: RootState) => state.user.entities as UserInput
  );

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const { register, handleSubmit } = useForm<UpdateUserInput>();

  const onSubmit: SubmitHandler<UpdateUserInput> = async (data) => {
    try {
      await apiClient("/api/user/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const message: string = "Successfully updated your profile.";
      toastMessage(message, "success");
    } catch (error) {
      const message: string = "Failed to update your profile.";
      toastMessage(message, "error");
    }
  };

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
