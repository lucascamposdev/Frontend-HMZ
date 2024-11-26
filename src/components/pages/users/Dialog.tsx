import { useUsers } from "@/components/context/useUsers"
import { Button } from "@/components/ui/button"
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { User } from "@/types/User"

interface DialogProps {
    user: User;
    onClose: () => void; 
}

const Dialog = ({ user, onClose }: DialogProps) => {
    const { updateUserById, deleteUserById, isLoading } = useUsers();

    // Atualizar Usuário
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const formData = new FormData(e.target as HTMLFormElement);
    
          const updatedUser = {
            id: user.id,
            email: formData.get("email") as string,
            first_name: formData.get("first_name") as string,
            last_name: formData.get("last_name") as string,
          };
    
          await updateUserById(user.id, updatedUser);
          onClose(); 
        } catch (error) {
          console.error("Erro ao atualizar o usuário:", error);
        }
      };

    // Excluir Usuário
    const handleDeleteUser = async (id: number) => {
        try {
            const success = await deleteUserById(id);
            if (success) {
              onClose(); 
            }
          } catch (error) {
            console.error("Erro ao excluir o usuário:", error);
          }
      };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Editar Usuário</DialogTitle>
            </DialogHeader>
            <DialogDescription />
            <div onSubmit={handleSubmit}>
                <form className="gap-3 flex flex-col">
                    <Label>Email
                        <Input defaultValue={user?.email} name="email" />
                    </Label>
                    <Label>Nome
                        <Input defaultValue={user?.first_name} name="first_name" />
                    </Label>
                    <Label>Sobrenome
                        <Input defaultValue={user?.last_name} name="last_name" />
                    </Label>
                    <div className="w-full flex justify-between mt-4">
                        <Button 
                        type="button" 
                        onClick={() => handleDeleteUser(user.id)} 
                        variant="destructive" 
                        disabled={isLoading}>
                            Excluir
                        </Button>
                        <Button type="submit" disabled={isLoading}>Salvar</Button>
                    </div>
                </form>
            </div>
            <DialogFooter>
            </DialogFooter>
        </DialogContent>
    )
}

export default Dialog