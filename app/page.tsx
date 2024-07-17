'use client'
import Link from "next/link";
import Image from "next/image";
import { SyntheticEvent, useState } from "react";
import { toast } from "@/components/ui/use-toast";

export default function Home() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function login(e: SyntheticEvent) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast({ title: `Gagal login: ${errorData.message || 'Unknown error'}`, variant: 'destructive' });
        throw new Error(`Gagal login: ${errorData.message || 'Unknown error'}`);
        
      }

      const payload = await response.json();
      console.log('Payload:', payload);

      const data = payload.data;
      
      // Save token to local storage
      localStorage.setItem('token', data.token);

      // save some user informatio to local storage
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data.user.posisi.id == 1) { // Admin
        console.log('Admin');
        window.location.href = '/admin/dashboard';
      } else if (data.user.posisi.id == 2) { // CRM
        console.log('CRM');
        window.location.href = '/crm/dashboard';
      } else if (data.user.posisi.id >= 3) { // SPV
        console.log('SPV');
        window.location.href = '/user/dashboard';
      }
      toast({ title: 'Berhasil Login', variant: 'berhasil' });
    } catch (error) {
      console.error('Error:', error as Error);
    }
  }
  return (
    <>
    <div className="body-login p-5">
    <div className="flex pt-10 pb-5 justify-center ">
          <Image src="/Heronusa.PNG" alt="Heronusa Logo" width={400} height={400} />
    </div>
    <div className="flex justify-center items-center">
    <div className="bg-white w-full sm:w-1/2 xl:w-1/3  rounded-md shadow-lg p-6">
       <form onSubmit={login} method="POST" className="login-form">
      <h1 className="font-black text-2xl pb-3 text-center">LOGIN</h1>
      <p className="text-center pb-5">Masukkan Username dan Password dengan benar!</p>

      <div className="input-box">
        <input
          type="email"
          name="email"
          placeholder="Masukkan Email..."
          required
          value={email}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div className="input-box">
      <input
        type={showPassword ? "text" : "password"} 
        name="password"
        placeholder="Masukkan Password..."
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 toggle-password "
        onClick={togglePasswordVisibility}
      >
        <path
          fillRule="evenodd"
          d={
            showPassword
              ? "M 12 1 C 9.5425419 1 7.4302219 2.5041568 6.5 4.6484375 A 1.0001 1.0001 0 1 0 8.3339844 5.4433594 C 8.9637625 3.9916401 10.353458 3 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 6 8 C 4.9 8 4 8.9 4 10 L 4 20 C 4 21.1 4.9 22 6 22 L 18 22 C 19.1 22 20 21.1 20 20 L 20 10 C 20 8.9 19.1 8 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 13 C 13.1 13 14 13.9 14 15 C 14 16.1 13.1 17 12 17 C 10.9 17 10 16.1 10 15 C 10 13.9 10.9 13 12 13 z"
              
              : "M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 C 4.9 8 4 8.9 4 10 L 4 20 C 4 21.1 4.9 22 6 22 L 18 22 C 19.1 22 20 21.1 20 20 L 20 10 C 20 8.9 19.1 8 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 12 13 C 13.1 13 14 13.9 14 15 C 14 16.1 13.1 17 12 17 C 10.9 17 10 16.1 10 15 C 10 13.9 10.9 13 12 13 z"
          }
          clipRule="evenodd"
        />
      </svg>

      </div>

      <div className="flex justify-center">
        <button className="bg-D32124 font-bold text-white px-10 py-2 rounded-md" type="submit">
          Masuk
        </button>
      </div>
    </form>
      </div>
    </div>
    </div>
    </>
  );
}
