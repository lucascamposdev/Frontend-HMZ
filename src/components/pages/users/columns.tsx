// Components
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import AppDialog from "./Dialog"

import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"

// Type
import { User } from "@/types/User"
import { useState } from "react"

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "first_name",
    header: "Nome",
  },
  {
    accessorKey: "last_name",
    header: "Sobrenome",
  },
  {
    header: "Ações",
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      const [isDialogOpen, setIsDialogOpen] = useState(false);

      const handleOpenDialog = () => setIsDialogOpen(true);
      const handleCloseDialog = () => setIsDialogOpen(false);

      return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={handleOpenDialog}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <AppDialog user={user} onClose={handleCloseDialog} />
        </Dialog>
      );
    },
  },
]
