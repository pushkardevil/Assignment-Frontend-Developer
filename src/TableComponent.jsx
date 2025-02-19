// import React, { useState, useEffect } from "react";
// import { MaterialReactTable } from "material-react-table";
// import { Box, Avatar, Chip, Checkbox, Radio } from "@mui/material";


// const tableSchema = [
//   { accessorKey: "avatar", header: "Name", type: "avatar" },
//   { accessorKey: "status", header: "Status", type: "badge" },
//   { accessorKey: "role", header: "Role" },
//   { accessorKey: "email", header: "Email" },
//   { accessorKey: "teams", header: "Teams", type: "tags" },
//   { accessorKey: "radio1", header: "", type: "radio" },
//   { accessorKey: "radio2", header: "", type: "radio" },
// ];

// // Sample JSON data
// const tableData = Array(10).fill({
//   avatar: "https://i.pravatar.cc/40",
//   username: "Username",
//   email: "username@company.com",
//   status: "Working",
//   role: "Product Manager",
//   teams: ["Design", "Product", "Development", "+5"],
// });

// const TableComponent = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     setData(tableData);
//   }, []);

//   const columns = [
//     {
//       accessorKey: "select",
//       header: "", 
//       Cell: () => <Checkbox />,
//       size: 50,
//     },
//     ...tableSchema.map((column) => ({
//       accessorKey: column.accessorKey,
//       header: column.header,
//       Cell: ({ cell }) => {
//         if (column.type === "avatar") {
//           return (
//             <Box display="flex" alignItems="center" gap={1}>
//               <Avatar src={cell.row.original.avatar} />
//               <Box>
//                 <Box>{cell.row.original.username}</Box>
//                 <Box sx={{ fontSize: "12px", color: "gray" }}>
//                   @{cell.row.original.username.toLowerCase()}
//                 </Box>
//               </Box>
//             </Box>
//           );
//         }
//         if (column.type === "badge") {
//           return <Chip label={cell.getValue()} color="primary" />;
//         }
//         if (column.type === "tags") {
//           return (
//             <Box display="flex" gap={0.5}>
//               {cell.getValue().map((tag, index) => (
//                 <Chip key={index} label={tag} variant="outlined" />
//               ))}
//             </Box>
//           );
//         }
//         if (column.type === "radio") {
//           return <Radio />;
//         }
//         return cell.getValue();
//       },
//     })),
//   ];

//   return (
//     <MaterialReactTable
//       columns={columns}
//       data={data}
//       enableRowSelection={false} 
//       enablePagination
//       initialState={{ pagination: { pageSize: 10 } }}
//     />
//   );
// };

// export default TableComponent;




import React, { useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Avatar, Chip, Checkbox, Radio } from "@mui/material";

const tableData = Array(10).fill(null).map((_, index) => ({
  id: index,
  avatar: "https://i.pravatar.cc/40",
  username: `User ${index + 1}`,
  email: `user${index + 1}@company.com`,
  status: "Working",
  role: "Product Manager",
  teams: ["Design", "Product", "Development", "+5"],
}));


const getChipColor = (team) => {
  switch (team) {
    case "Design":
      return { backgroundColor: "#2196F3", color: "#fff" }; 
    case "Product":
      return { backgroundColor: "#1E88E5", color: "#fff" }; 
    case "Development":
      return { backgroundColor: "#1565C0", color: "#fff" }; 
    default:
      return {};
  }
};

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState({});

  useEffect(() => {
    setData(tableData);
  }, []);

  
  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    const newSelection = {};
    data.forEach((row) => {
      newSelection[row.id] = checked;
    });
    setSelectedRows(newSelection);
  };

  
  const handleRowSelect = (id) => {
    setSelectedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  
  const columns = [
    {
      accessorKey: "selectAll",
      header: (
        <Checkbox
          indeterminate={
            Object.values(selectedRows).includes(true) &&
            !Object.values(selectedRows).every((v) => v)
          }
          checked={Object.values(selectedRows).length > 0 && Object.values(selectedRows).every((v) => v)}
          onChange={handleSelectAll}
        />
      ),
      Cell: ({ row }) => (
        <Checkbox
          checked={selectedRows[row.original.id] || false}
          onChange={() => handleRowSelect(row.original.id)}
        />
      ),
      size: 50,
    },
    {
      accessorKey: "name",
      header: "Name",
      Cell: ({ row }) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar src={row.original.avatar} />
          <Box>
            <Box>{row.original.username}</Box>
            <Box sx={{ fontSize: "12px", color: "gray" }}>
              @{row.original.username.toLowerCase().replace(/\s/g, "")}
            </Box>
          </Box>
        </Box>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      Cell: ({ row }) => <Chip label={row.original.status} color="primary" />,
    },
    {
      accessorKey: "role",
      header: "Role",
      Cell: ({ row }) => row.original.role,
    },
    {
      accessorKey: "email",
      header: "Email",
      Cell: ({ row }) => row.original.email,
    },
    {
      accessorKey: "teams",
      header: "Teams",
      Cell: ({ row }) => (
        <Box display="flex" gap={0.5}>
          {row.original.teams.map((team, index) => (
            <Chip
              key={index}
              label={team}
              sx={getChipColor(team)}
              variant="filled"
            />
          ))}
        </Box>
      ),
    },
    {
      accessorKey: "radio1",
      header: "",
      Cell: () => <Radio />,
    },
    {
      accessorKey: "radio2",
      header: "",
      Cell: () => <Radio />,
    },
  ];

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowSelection={false}
      enablePagination
      initialState={{ pagination: { pageSize: 10 } }}
    />
  );
};

export default TableComponent;


