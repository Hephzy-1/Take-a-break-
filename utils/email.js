const nodemailer = require('nodemailer');
require('dotenv').config()

// Transporter Object
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'stmp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.Email,
    pass: process.env.EmailPassword
  }
});

async function registerEmail (email) {
  const mailOptions = {
    from: 'Take A Break',
    to: email,
    subject: 'You have been registered',
    html: `<h2>Thank you for signing up to Take A Break</h2>`
  }

  const info = transporter.sendMail(mailOptions)

  await info.response
}

async function resetLinkMail (email, token) {
  const mailOptions = {
    from: 'Take A Break',
    to: email,
    subject: 'Reset Link',
    html: `Here is your reset link 
    <br> <br>
    <button>
      <a href="https://take-a-break-anny.onrender.com/auth/reset/${token}">Reset Password</a>
    </button>
    
    <br><br> or click or paste this in your browser 

    <br><br> https://take-a-break-anny.onrender.com/auth/reset/${token}

    <br><br> This link expires in ${process.env.EXPIRY}`
  }

  const info = await transporter.sendMail(mailOptions);

  return info.response
}

async function contactUs (email, subject, fullname, message) {
  const mailOptions = {
    from: email,
    to: process.env.Email,
    subject: `Contact Us TAB: ${subject}`,
    text: `Name: ${fullname} \nEmail: ${email} \nMessage: ${message}`
  }

  const info = await transporter.sendMail(mailOptions);
  return info.response
}

async function newsletterMail (email) {
  const mailOptions = {
    from: 'Take A Break',
    to: email,
    subject: 'Newletter',
    text: `Thank you for subscribing to Take A Break Newsletter. Stay tuned for updates.`
  }

  const info = await transporter.sendMail(mailOptions);
  return info.response
}

// async function feedback (message) {
//   const mailOptions = {
//     from: 'user',
//     to: process.env.Email,
//     subject: `TAB Feedback`,
//     text: `Message: ${message}`
//   }

//   const info = await transporter.sendMail(mailOptions);
//   return info.response
// }

async function feedback(message) {
  const mailOptions = {
    from: 'user',
    to: process.env.Email,
    subject: 'TAB Feedback', // Corrected syntax
    text: `Message: ${message}` // Corrected syntax
  };

  const info = await transporter.sendMail(mailOptions);
  return info.response;
}

module.exports = {
  registerEmail,
  resetLinkMail,
  contactUs,
  newsletterMail,
  feedback
}