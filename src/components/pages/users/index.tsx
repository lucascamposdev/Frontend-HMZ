// Hooks
import { useState, useEffect } from "react";
import { useUsers } from "@/components/context/useUsers";

// Components
import Table from "./Table";
import { columns } from "./columns";

const Users = () => {
  const { users, fetchUsers } = useUsers();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [hasMoreData, setHasMoreData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchUsers(page, pageSize);
      setHasMoreData(result?.length === pageSize || false);
    };

    fetchData();
  }, [page, pageSize]);

  return (
    <div className="h-full ">
      <div className="flex flex-col gap-5">
        <h1 className="font-kanit text-3xl">Usuários</h1>
        <Table
          data={users}
          columns={columns}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          hasMoreData={hasMoreData}
        />
      </div>
    </div>
  );
};

export default Users;
