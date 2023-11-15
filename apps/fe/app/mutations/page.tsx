'use client';

import { useAccountsControllerCreate } from '@fe/modules/api';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';

export default function Mutations() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    avatarUrl: '',
  });

  const { mutate } = useAccountsControllerCreate();

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const name = e.target.name;
    const value = e.currentTarget.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    console.log('formData', formData);
    e.preventDefault();

    mutate(
      { data: formData },
      {
        onSuccess: () => {
          alert('success');
        },
        onError: () => {
          alert('error');
        },
      }
    );
  };

  return (
    <main className="px-8">
      <form
        name="form"
        onSubmit={handleSubmit}
        className="flex flex-col justify-center gap-4 max-w-[400px]"
      >
        <div>
          <label className="text-dark block mb-2">First Name</label>
          <input
            onChange={handleInputChange}
            className="text-dark w-full rounded-[6px] border-[1px] border-solid px-3 py-[15px] transition-colors duration-300 hover:border-input-border-active hover:outline-none focus:border-input-border-active focus:outline-none"
            name="firstName"
            type="text"
          />
        </div>
        <div>
          <label className="text-dark block mb-2">Last Name</label>
          <input
            onChange={handleInputChange}
            className="text-dark w-full rounded-[6px] border-[1px] border-solid px-3 py-[15px] transition-colors duration-300 hover:border-input-border-active hover:outline-none focus:border-input-border-active focus:outline-none"
            name="lastName"
            type="text"
          />
        </div>

        <div>
          <label className="text-dark block mb-2">Email</label>
          <input
            onChange={handleInputChange}
            className="text-dark w-full rounded-[6px] border-[1px] border-solid px-3 py-[15px] transition-colors duration-300 hover:border-input-border-active hover:outline-none focus:border-input-border-active focus:outline-none"
            name="email"
            type="text"
          />
        </div>
        <div>
          <label className="text-dark block mb-2">AvatarUrl</label>
          <input
            onChange={handleInputChange}
            className="text-dark w-full rounded-[6px] border-[1px] border-solid px-3 py-[15px] transition-colors duration-300 hover:border-input-border-active hover:outline-none focus:border-input-border-active focus:outline-none"
            name="avatarUrl"
            type="text"
          />
        </div>

        <button
          type="submit"
          className="border border-dark rounded-full px-6 py-2"
        >
          Save
        </button>
      </form>
    </main>
  );
}
