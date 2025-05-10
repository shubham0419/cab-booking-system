import Link from "next/link";


export default function Home() {
  return (
    <>
        <div className="bg-cover bg-center bg-[url('./assets/images/Designer.jpeg')] h-screen w-full bg-red-300 justify-between flex-col flex capitalize pt-8 text-white">
          <img className="w-18 ml-8" src="https://imgs.search.brave.com/fHYAjImZJ6gcfAcibG1OlsHtGl0QvzTmzVM-zU6K5YI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy5sb2dvZnVyeS5j/b20vbG9nb19zcmMv/ZTQ4ZTJjMjFiMTcx/YTA3ODg0NGM2NTNl/ODExOTI3MWYuc3Zn" alt="" />
          <div className="bg-white py-5 px-8 pb-7 w-full">
              <h2 className="text-2xl pb-1 font-bold text-black">get started with uber</h2>
              <Link href={"/user/login"} className="flex justify-center w-full py-3 rounded bg-black">Continue</Link>
          </div>
        </div>
    </>
  );
}
