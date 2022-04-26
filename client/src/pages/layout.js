// import React from "react";
// import LeftSidebar from "../components/left-menu-home";
// import Box from "@mui/material/Box";
// import { Grid } from "@mui/material";
// import { useTheme } from "@mui/system";

// export default function Layout({children}) {
//   const theme = useTheme();

//   return (
//     <Box
//       sx={{
//         maxWidth: theme.breakpoints.values.lg,
//         margin: "0 auto",
//       }}
//     >
//       <Grid container>
//         <Grid item xs={1} lg={2}>
//           <LeftSidebar />
//         </Grid>
//         <Grid item xs={11} lg={10}>
//           <Grid container>
//             <Grid item xs={12} lg={8}>
//               <Box
//                 sx={{
//                   height: "100vh",
//                   margin: "0 1rem",
//                   borderLeft: "1px solid #ccc",
//                   borderRight: "1px solid #ccc",
//                 }}
//               >
//                 {children}
//               </Box>
//             </Grid>
//             {/* <Hidden lgDown>
//               <Grid item lg={4} sx={{ height: "100vh" }}>
//                 <RightSidebar />
//               </Grid>
//             </Hidden> */}
//           </Grid>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }