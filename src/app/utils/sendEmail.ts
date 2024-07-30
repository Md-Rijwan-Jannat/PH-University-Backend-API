import nodemailer from "nodemailer";

const sendEmail = async (to: string, resetLink: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use true for port 465, false for all other ports
      auth: {
        user: "rijwanjannat36@gmail.com",
        pass: "lych epuz scux pmkg",
      },
    });

    const mailOptions = {
      from: "rijwanjannat36@gmail.com", // sender address
      to, // list of receivers
      subject: "Password Reset Request", // Subject line
      text: "You requested a password reset. Please use the link below to reset your password.", // plain text body
      html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              padding: 10px 0;
            }
            .header img {
              width: 100px;
              margin: 5px 0;
            }
            .content {
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              padding: 10px 0;
              color: #888888;
              font-size: 12px;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              font-size: 16px;
              color: #ffffff;
              background-color: #ff4268;
              text-decoration: none;
              border-radius: 5px;
            }
            .button:hover {
              background-color: #cc3553;
            }
              .logo {
              height: 4rem;
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
            }
            .logo img {
              margin-right: 10px;
              width: 3rem;
              height: 3rem;
              border-radius: 50%;
              border: 2px solid #FFFFFF;
            }
          </style>
        </head>
        <body>
          <div class="container">
           <div class="header">
              <div class="logo">
                <img src="https://i.ibb.co/TBtNvMX/letter-p.png" alt="PH University" />
                <img src="https://i.ibb.co/YZp5KR5/letter-h.png" alt="PH University" />
                <img src="https://i.ibb.co/Kj8LxC5/letter-u.png" alt="PH University" />
              </div>
              <h2>Password Reset Request</h2>
            </div>
            <div class="content">
              <p>Dear User,</p>
              <p>You requested a password reset. Please use the button below to reset your password within 10 minutes.</p>
              <p><a href="${resetLink}" class="button">Reset Password</a></p>
              <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
              <p>Thank you,</p>
              <p>Your Company Name</p>
            </div>
            <div class="footer">
              <p>&copy; 2024 Your Company Name. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    // console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const sEndEmail = sendEmail;
