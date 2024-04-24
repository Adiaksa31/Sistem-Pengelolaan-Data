import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <div className="body-login p-5">

    <div className="flex pt-10 pb-5 justify-center ">
          <Image src="/Heronusa.PNG" alt="Heronusa Logo" width={400} height={400} />
    </div>
    <div className="flex justify-center items-center">
    <div className="bg-white w-full sm:w-1/2 xl:w-1/3  rounded-md shadow-lg p-6">
      <form action="">
        <h1 className="font-black text-2xl pb-3 text-center">LOGIN</h1>
        <p className="text-center pb-5">Masukkan Username dan Password dengan benar!</p>

        <div className="input-box">
          <input type="text" name="username" placeholder="Username" required/>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
          </svg>
        </div>

        <div className="input-box">
          <input type="password" name="password" placeholder="Password" required/>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
          </svg>
        </div>

        <div className="flex justify-center">
            <button className="bg-D32124 font-bold text-white px-10 py-2 rounded-md" type="submit">Masuk</button>
        </div>
        <div className="flex justify-center">
           <Link href="/admin/dashboard">Admin</Link>
        </div>
        <div className="flex justify-center">
           <Link href="/crm/dashboard">CRM</Link>
        </div>
        <div className="flex justify-center">
           <Link href="/spv/dashboard">SPV</Link>
        </div>
      </form>
      </div>
    </div>
    </div>
    </>
  );
}
