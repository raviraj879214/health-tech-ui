
import React from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Label from "../form/Label";
import { useForm } from "react-hook-form";

interface UserMetaCardProps {
  user: {
    firstname: number;
    lastname: string;
    email: string;
    Bio: string;
    address: string;
    country: string;
    phone: string;
    postalcode: string;
    state: string;
  };
  sendUpdatedata: (data: Record<string, string | undefined>) => void;
}

interface UpdateData {
  firstname: string;
  lastname: string;
  Bio: string;
  address: string;
  country: string;
  phone: string;
  postalcode: string;
  state: string;
}

export default function UserInfoCard({ user, sendUpdatedata }: UserMetaCardProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const { register, formState: { errors }, handleSubmit } = useForm<UpdateData>();

  const onUpdate = (data: UpdateData) => {
    const labeledData = {
      firstname: data.firstname,
      lastname: data.lastname,
      Bio: data.Bio,
      address: data.address,
      country: data.country,
      phone: data.phone,
      postalcode: data.postalcode,
      state: data.state
    };
    sendUpdatedata(labeledData);
    closeModal();
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div><p className="mb-2 text-xs">First Name</p><p>{user.firstname}</p></div>
            <div><p className="mb-2 text-xs">Last Name</p><p>{user.lastname}</p></div>
            <div><p className="mb-2 text-xs">Email</p><p>{user.email}</p></div>
            <div><p className="mb-2 text-xs">Phone</p><p>{user.phone}</p></div>
            <div><p className="mb-2 text-xs">Bio</p><p>{user.Bio}</p></div>
          </div>
        </div>

        <button onClick={openModal} className="flex w-full items-center justify-center gap-2 rounded-full border px-4 py-3">
          Edit
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px]">
        <form className="flex flex-col" onSubmit={handleSubmit(onUpdate)}>
          <div className="mt-7">
            <h5 className="mb-5 text-lg">Personal Information</h5>

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <Label>First Name</Label>
                <input
                  type="text"
                  defaultValue={user.firstname}
                  {...register("firstname", { required: "Please enter firstname" })}
                  className="input-class"
                />
                {errors.firstname && <p className="text-red-500">{errors.firstname.message}</p>}
              </div>

              <div>
                <Label>Last Name</Label>
                <input
                  type="text"
                  defaultValue={user.lastname}
                  {...register("lastname", { required: "Please enter lastname" })}
                  className="input-class"
                />
                {errors.lastname && <p className="text-red-500">{errors.lastname.message}</p>}
              </div>

              <div>
                <Label>Email Address</Label>
                <input
                  type="text"
                  defaultValue={user.email}
                  disabled={true}
                  className="input-class cursor-not-allowed opacity-60"
                />
              </div>

              <div>
                <Label>Phone</Label>
                <input
                  type="text"
                  defaultValue={user.phone}
                  {...register("phone", { required: "Please enter phone" })}
                  className="input-class"
                />
                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
              </div>

              <div className="col-span-2">
                <Label>Bio</Label>
                <input
                  type="text"
                  defaultValue={user.Bio}
                  {...register("Bio", { required: "Please enter Bio" })}
                  className="input-class"
                />
                {errors.Bio && <p className="text-red-500">{errors.Bio.message}</p>}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6 lg:justify-end">
            <Button size="sm" variant="outline" onClick={closeModal}>Close</Button>
            <Button size="sm">Save Changes</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
