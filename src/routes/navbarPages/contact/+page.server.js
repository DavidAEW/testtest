import {GOOGLE_EMAIL} from "$env/static/private";
import transporter from "$lib/emailSetup.server.js";

export const actions = {
    default: async ({request}) => {
        try {
            const formData = await request.formData();
            const email = "samuelhilpert@web.de; davidalexandereugenwolf@gmail.com; seantylerstraub@gmail.com; uiyoungkim2002@gmail.com; raulouis22@gmail.com";
            const subject = formData.get("subject");
            const body = formData.get("body");
            let html = `<h2>${subject}</h2><pre>${body}</pre>`;

            const message = {
                from: GOOGLE_EMAIL,
                to: email,
                subject: subject,
                text: body,
                html: html,
            };

            const sendEmail = async (message) => {
                await new Promise((resolve, reject) => {
                    transporter.sendMail(message, (err, info) => {
                        if (err) {
                            console.error(err);
                            reject(err);
                        } else {
                            resolve(info);
                        }
                    });
                });
            };

            await sendEmail(message);

            return {
                success: "Email is sent",
            };
        } catch (error) {
            console.error(error);
        }
    }
};
