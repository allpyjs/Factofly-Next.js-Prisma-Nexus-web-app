import nodemailer from 'nodemailer';
import config from '../../apiConfig';

const options = {
  host: config.smtp.address,
  port: config.smtp.port,
  secure: config.smtp.port === 465,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.password
  }
};

const mailClient = nodemailer.createTransport(options);

export default mailClient;
