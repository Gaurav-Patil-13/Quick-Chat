"# Quick-Chat" 

Quick Chat is a full-stack real-time chat application developed using the MERN stack and Socket.IO, designed to provide fast, secure, and reliable one-to-one communication. The application features JWT-based authentication, real-time message delivery, online/offline user presence tracking, and persistent chat history stored in MongoDB. It also supports image and media sharing through Cloudinary and offers a fully responsive user interface optimized for both mobile and desktop devices. By combining REST APIs with WebSocket communication, Quick Chat ensures seamless message synchronization and an enhanced user experience.



How to Use Quick Chat

1.Register or Login
Create a new account using your email and password, or log in with existing credentials. 
After successful authentication, you will be redirected to the chat dashboard.

2.View Users
The sidebar displays a list of all available users.
Online users are shown in real time, and unseen message counts appear for new messages.

3.Start a Chat
Click on any user from the sidebar to open a chat.
Previous messages are automatically loaded from the database.

4.Send Messages
Type your message in the input box and press Enter or click the send button.
Messages are delivered instantly if the receiver is online.
If the receiver is offline, messages are stored and delivered when they come online.

5.Share Images & Media
Upload images or media files directly in the chat.
Media is securely stored and delivered using Cloudinary.

6.Online / Offline Status
User presence is updated in real time using Socket.IO.
Status changes automatically when users log in or log out.

7.Logout
Logging out safely disconnects the socket and clears the chat state.