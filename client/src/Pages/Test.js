// import React from "react";
// import {
//   Button,
//   TextField,
//   Form,
//   Typography,
//   Paper,
//   Grid,
//   Container,
// } from "@mui/material";

// const ChatMessage = ({ message, time }) => {
//   return (
//     <Paper style={{ marginBottom: 10 }}>
//       <Typography variant="body1" color="textSecondary">
//         {message}
//       </Typography>
//       <Typography variant="caption" color="textSecondary">
//         {time}
//       </Typography>
//     </Paper>
//   );
// };

// const Test = () => {
//   const [messages, setMessages] = React.useState([
//     { message: "Hi there!", time: "9:41" },
//     { message: "How are you?", time: "9:42" },
//     { message: "I'm good, thanks! What about you?", time: "9:43" },
//     { message: "I'm doing well, thanks for asking!", time: "9:44" },
//   ]);

//   const handleSubmit = () => {
//     const newMessage = { message: "", time: "" };
//     setMessages([...messages, newMessage]);
//   };

//   return (
//     <Container>
//       <Grid container spacing={20}>
//         <Grid item xs={12}>
//           <Form onSubmit={handleSubmit}>
//             <TextField
//               label="Message"
//               value={messages[0].message}
//               onChange={(event) =>
//                 setMessages((messages) => {
//                   const newMessages = [...messages];
//                   newMessages[0].message = event.target.value;
//                   return newMessages;
//                 })
//               }
//             />
//           </Form>
//         </Grid>
//         <Grid item xs={12}>
//           {messages.map((message) => (
//             <ChatMessage
//               key={message.message}
//               message={message.message}
//               time={message.time}
//             />
//           ))}
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default Test;

// // import * as React from "react";
// // import Box from "@mui/material/Box";
// // import Drawer from "@mui/material/Drawer";
// // import Button from "@mui/material/Button";
// // import List from "@mui/material/List";
// // import Divider from "@mui/material/Divider";
// // import ListItem from "@mui/material/ListItem";
// // import ListItemButton from "@mui/material/ListItemButton";
// // import ListItemIcon from "@mui/material/ListItemIcon";
// // import ListItemText from "@mui/material/ListItemText";
// // import InboxIcon from "@mui/icons-material/MoveToInbox";
// // import MailIcon from "@mui/icons-material/Mail";

// // export default function TemporaryDrawer() {
// //   const [state, setState] = React.useState({
// //     top: false,
// //     left: false,
// //   });

// //   const toggleDrawer = (anchor, open) => (event) => {
// //     if (event.type === "keydown") {
// //       return;
// //     }

// //     setState({ ...state, [anchor]: open });
// //   };

// //   const list = (anchor) => (
// //     <Box
// //       sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
// //       onClick={toggleDrawer(anchor, false)}
// //       onKeyDown={toggleDrawer(anchor, false)}
// //     >
// //       <List>
// //         {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
// //           <ListItem key={text} disablePadding>
// //             <ListItemButton>
// //               <ListItemIcon>
// //                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
// //               </ListItemIcon>
// //               <ListItemText primary={text} />
// //             </ListItemButton>
// //           </ListItem>
// //         ))}
// //       </List>
// //     </Box>
// //   );

// //   return (
// //     <div>
// //       {["left", "right", "top", "bottom"].map((anchor) => (
// //         <React.Fragment key={anchor}>
// //           <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
// //           <Drawer
// //             anchor={anchor}
// //             open={state[anchor]}
// //             onClose={toggleDrawer(anchor, false)}
// //           >
// //             {list(anchor)}
// //           </Drawer>
// //         </React.Fragment>
// //       ))}
// //     </div>
// //   );
// // }
