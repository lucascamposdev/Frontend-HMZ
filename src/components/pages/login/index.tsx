import './index.css'

// Hooks
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/context/useAuth";

// Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"

// Images
import smallLogo from '@/assets/images/small-logo-black.png';
import { useState } from "react";

const Login = () => {
  const [ isError, setIsError ] = useState<boolean>(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(e.target as HTMLFormElement); 
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      await login(username, password);
      navigate("/"); 
    } catch (error) {
      setIsError(true);
      clearInput(formElement);
    }
  };

  const clearInput = (formElement: HTMLFormElement) => {
    formElement.reset(); 
  };

  return (
    <div className="flex h-full p-5 font-poppins">

      <section className="p-5 flex-col items-center justify-center lg:flex-1 lg:flex hidden h-full">
        <div className="gap-2 border-r w-full flex justify-center flex-col items-center h-52">
          <h1 className="font-kanit text-4xl font-bold text-center animated-title">Simplificamos juntos.</h1>
          <span className="text-gray-400 text-sm">
            Supply Chain | Industrial | Systems
          </span>
        </div>
      </section>

      <section className="relative flex flex-col gap-10 items-center justify-center  flex-1 h-full   rounded-lg px-2">
        <figure>
          <img src={smallLogo} alt="logo" className="w-[120px]"/>
        </figure>

        <form onSubmit={handleLogin} className="w-72 gap-1 flex flex-col" onClick={() => setIsError(false)}>
          <Input
            type="text"
            placeholder="Usuário"
            className="bg-primary"
            name="username"
            required
            autoComplete="off"
            />
          <Input
            type="password"
            placeholder="Senha"
            className="bg-primary"
            name="password"
            required
            />
          {isError && <div className="text-red-500 text-center mt-2 text-sm">Credenciais inválidas.</div>}
          <Button type="submit" className="mt-5" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
          </Button>
        </form>

        <span className="flex justify-between w-full px-8 absolute bottom-5 text-sm">
          <a href="#">Esqueci minha senha</a>
          <a href="#">Cadastre-se</a>
        </span>
      </section>
    </div>
  );
}

export default Login