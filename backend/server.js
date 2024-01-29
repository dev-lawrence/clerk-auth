import express from 'express';
import dotenv from 'dotenv';
import { Webhook } from 'svix';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import User from './userModel.js';

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to Database');
  })
  .catch((err) => console.log(err.message));

const app = express();

app.post(
  '/api/webhooks',
  bodyParser.raw({ type: 'application/json' }),
  async function (req, res) {
    try {
      const payloadString = req.body.toString();
      const svixHeaders = req.headers;

      const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
      const evt = wh.verify(payloadString, svixHeaders);

      const { id, ...attributes } = evt.data;

      const eventType = evt.type;

      if (eventType === 'user.created') {
        const firstName = attributes.first_name;
        const lastName = attributes.last_name;

        console.log(firstName);
        console.log(lastName);

        const user = new User({
          clerkUserId: id,
          firstName: firstName,
          lastName: lastName,
        });

        await user.save();

        console.log('User has created');

        // console.log(`User ${id} is ${eventType}`);
        // console.log(attributes);
      }

      res.status(200).json({
        success: true,
        message: 'Webhook Received',
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
);

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
