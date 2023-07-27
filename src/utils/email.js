import nodemailer from "nodemailer"

async function sendEmail({ to = [], subject, html, attachments = [] } =  {}) {


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
        /* bcc,cc bc: ll security */
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Noxe" <${process.env.EMAIL}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        html, // html body
    });
    if (info.rejected.length) {
        return false
    } else {
        return true
    }
}

export default sendEmail