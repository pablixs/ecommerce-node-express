"use strict";

var express = require('express');

var router = express.Router(); // router.get('/', async (req, res) => {
//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//         from: '"Bouvier Artesanal 🍃" <info@bouvierartesanal.com.ar>', // sender address
//         to: "pablicjs@gmail.com", // list of receivers
//         subject: "Tu orden de compra en Bouvier Artesanal", // Subject line
//         text: "Hello world?", // plain text body
//         html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
//         <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
//         <head>
//         <!--[if gte mso 9]>
//         <xml>
//           <o:OfficeDocumentSettings>
//             <o:AllowPNG/>
//             <o:PixelsPerInch>96</o:PixelsPerInch>
//           </o:OfficeDocumentSettings>
//         </xml>
//         <![endif]-->
//           <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <meta name="x-apple-disable-message-reformatting">
//           <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
//           <title></title>
//             <style type="text/css">
//               @media only screen and (min-width: 620px) {
//           .u-row {
//             width: 600px !important;
//           }
//           .u-row .u-col {
//             vertical-align: top;
//           }
//           .u-row .u-col-100 {
//             width: 600px !important;
//           }
//         }
//         @media (max-width: 620px) {
//           .u-row-container {
//             max-width: 100% !important;
//             padding-left: 0px !important;
//             padding-right: 0px !important;
//           }
//           .u-row .u-col {
//             min-width: 320px !important;
//             max-width: 100% !important;
//             display: block !important;
//           }
//           .u-row {
//             width: 100% !important;
//           }
//           .u-col {
//             width: 100% !important;
//           }
//           .u-col > div {
//             margin: 0 auto;
//           }
//         }
//         body {
//           margin: 0;
//           padding: 0;
//         }
//         table,
//         tr,
//         td {
//           vertical-align: top;
//           border-collapse: collapse;
//         }
//         p {
//           margin: 0;
//         }
//         .ie-container table,
//         .mso-container table {
//           table-layout: fixed;
//         }
//         * {
//           line-height: inherit;
//         }
//         a[x-apple-data-detectors='true'] {
//           color: inherit !important;
//           text-decoration: none !important;
//         }
//         table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_content_image_1 .v-src-width { width: auto !important; } #u_content_image_1 .v-src-max-width { max-width: 30% !important; } #u_content_image_2 .v-container-padding-padding { padding: 30px 10px 10px 20px !important; } #u_content_image_2 .v-src-width { width: auto !important; } #u_content_image_2 .v-src-max-width { max-width: 100% !important; } #u_content_heading_4 .v-font-size { font-size: 45px !important; } #u_content_heading_3 .v-container-padding-padding { padding: 39px 10px 10px !important; } #u_content_heading_3 .v-font-size { font-size: 26px !important; } #u_content_text_2 .v-container-padding-padding { padding: 20px 10px 40px !important; } #u_content_heading_1 .v-container-padding-padding { padding: 40px 10px 0px !important; } #u_content_heading_1 .v-font-size { font-size: 50px !important; } #u_content_text_1 .v-container-padding-padding { padding: 15px 10px 30px !important; } #u_content_image_3 .v-src-width { width: auto !important; } #u_content_image_3 .v-src-max-width { max-width: 100% !important; } #u_content_button_1 .v-container-padding-padding { padding: 30px 10px 40px !important; } #u_content_button_1 .v-size-width { width: 65% !important; } #u_content_social_2 .v-container-padding-padding { padding: 40px 10px 10px !important; } #u_content_text_3 .v-container-padding-padding { padding: 10px 10px 40px !important; } }
//             </style>
//         <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css2?family=Federo&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
//         </head>
//         <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
//           <!--[if IE]><div class="ie-container"><![endif]-->
//           <!--[if mso]><div class="mso-container"><![endif]-->
//           <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
//           <tbody>
//           <tr style="vertical-align: top">
//             <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
//             <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
//         <div class="u-row-container" style="padding: 0px;background-color: transparent">
//           <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
//             <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-image: url('images/image-9.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;">
//               <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-image: url('images/image-9.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;"><![endif]-->
//         <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
//         <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
//           <div style="height: 100%;width: 100% !important;">
//           <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
//         <table id="u_content_image_1" style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//           <tbody>
//             <tr>
//               <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px 10px;font-family:helvetica,sans-serif;" align="left">
//         <table width="100%" cellpadding="0" cellspacing="0" border="0">
//           <tr>
//             <td style="padding-right: 0px;padding-left: 0px;" align="center">
//               <img align="center" border="0" src="cid:image3" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 18%;max-width: 104.4px;" width="104.4" class="v-src-width v-src-max-width"/>
//             </td>
//           </tr>
//         </table>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <table id="u_content_image_2" style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//           <tbody>
//             <tr>
//               <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 10px 25px;font-family:helvetica,sans-serif;" align="left">
//         <table width="100%" cellpadding="0" cellspacing="0" border="0">
//           <tr>
//             <td style="padding-right: 0px;padding-left: 0px;" align="center">
//               <img align="center" border="0" src="cid:image6" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 80%;max-width: 452px;" width="452" class="v-src-width v-src-max-width"/>
//             </td>
//           </tr>
//         </table>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <table id="u_content_heading_4" style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//           <tbody>
//             <tr>
//               <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 5px;font-family:helvetica,sans-serif;" align="left">
//           <h1 class="v-font-size" style="margin: 0px; color: #ffffff; line-height: 100%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: Federo; font-size: 40px;"><strong>CELEBRATE TOGETHER</strong></h1>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//           <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
//           </div>
//         </div>
//         <!--[if (mso)|(IE)]></td><![endif]-->
//               <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//             </div>
//           </div>
//         </div>
//         <div class="u-row-container" style="padding: 0px;background-color: transparent">
//           <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
//             <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-image: url('cid:image8');background-repeat: no-repeat;background-position: center top;background-color: transparent;">
//               <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-image: url('cid:image8');background-repeat: no-repeat;background-position: center top;background-color: transparent;"><![endif]-->
//         <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
//         <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
//           <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
//           <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
//         <table id="u_content_heading_3" style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//           <tbody>
//             <tr>
//               <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:35px 10px 10px;font-family:helvetica,sans-serif;" align="left">
//           <h1 class="v-font-size" style="margin: 0px; color: #fe9a37; line-height: 140%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: Federo; font-size: 33px;"><strong>JANUARY 22, 2023</strong></h1>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <table style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//           <tbody>
//             <tr>
//               <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:helvetica,sans-serif;" align="left">
//           <div>
//             <strong>Hello, world!</strong>
//           </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <table id="u_content_text_2" style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//           <tbody>
//             <tr>
//               <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 60px 60px;font-family:helvetica,sans-serif;" align="left">
//           <div style="line-height: 140%; text-align: center; word-wrap: break-word;">
//             <p style="font-size: 14px; line-height: 140%;"><span style="font-family: helvetica, sans-serif; font-size: 14px; line-height: 19.6px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida risus commodo viverra maecenas.</span></p>
//           </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//           <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
//           </div>
//         </div>
//         <!--[if (mso)|(IE)]></td><![endif]-->
//               <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//             </div>
//           </div>
//         </div>
//         <div class="u-row-container" style="padding: 0px;background-color: transparent">
//           <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
//             <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
//               <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
//         <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
//         <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
//           <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
//           <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
//         <table id="u_content_heading_1" style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//           <tbody>
//             <tr>
//               <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 0px;font-family:helvetica,sans-serif;" align="left">
//           <h1 class="v-font-size" style="margin: 0px; color: #fd4c57; line-height: 100%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: Federo; font-size: 71px;"><strong>19:00 PM</strong></h1>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <table id="u_content_text_1" style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//           <tbody>
//             <tr>
//               <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:15px 60px 30px;font-family:helvetica,sans-serif;" align="left">
//           <div style="line-height: 140%; text-align: center; word-wrap: break-word;">
//             <p style="font-size: 14px; line-height: 140%;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
//           </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <table id="u_content_image_3" style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//           <tbody>
//             <tr>
//               <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:helvetica,sans-serif;" align="left">
//         <table width="100%" cellpadding="0" cellspacing="0" border="0">
//           <tr>
//             <td style="padding-right: 0px;padding-left: 0px;" align="center">
//               <img align="center" border="0" src="cid:image7" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 84%;max-width: 504px;" width="504" class="v-src-width v-src-max-width"/>
//             </td>
//           </tr>
//         </table>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <table id="u_content_button_1" style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//           <tbody>
//             <tr>
//               <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 60px;font-family:helvetica,sans-serif;" align="left">
//           <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
//         <div align="center">
//           <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.unlayer.com" style="height:37px; v-text-anchor:middle; width:174px;" arcsize="11%"  stroke="f" fillcolor="#fe9a37"><w:anchorlock/><center style="color:#ffffff;font-family:helvetica,sans-serif;"><![endif]-->  
//             <a href="https://www.unlayer.com" target="_blank" class="v-button v-size-width" style="box-sizing: border-box;display: inline-block;font-family:helvetica,sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #ffffff; background-color: #fe9a37; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:30%; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
//               <span style="display:block;padding:10px 20px;line-height:120%;"><strong><span style="font-size: 14px; line-height: 16.8px;">Register Now</span></strong></span>
//             </a>
//           <!--[if mso]></center></v:roundrect><![endif]-->
//         </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//           <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
//           </div>
//         </div>
//         <!--[if (mso)|(IE)]></td><![endif]-->
//               <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//             </div>
//           </div>
//         </div>
//         <div class="u-row-container" style="padding: 0px;background-color: #ecf0f1">
//           <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
//             <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
//               <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #ecf0f1;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
//         <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
//         <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
//           <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
//           <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
//         <table id="u_content_social_2" style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//           <tbody>
//             <tr>
//               <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:60px 10px 10px;font-family:helvetica,sans-serif;" align="left">
//         <div align="center">
//           <div style="display: table; max-width:167px;">
//           <!--[if (mso)|(IE)]><table width="167" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:167px;"><tr><![endif]-->
//             <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 10px;" valign="top"><![endif]-->
//             <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
//               <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
//                 <a href="https://www.facebook.com/unlayer" title="Facebook" target="_blank">
//                   <img src="cid:image5" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
//                 </a>
//               </td></tr>
//             </tbody></table>
//             <!--[if (mso)|(IE)]></td><![endif]-->
//             <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 10px;" valign="top"><![endif]-->
//             <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
//               <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
//                 <a href="https://twitter.com/unlayerapp" title="Twitter" target="_blank">
//                   <img src="cid:image1" alt="Twitter" title="Twitter" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
//                 </a>
//               </td></tr>
//             </tbody></table>
//             <!--[if (mso)|(IE)]></td><![endif]-->
//             <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 10px;" valign="top"><![endif]-->
//             <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
//               <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
//                 <a href="https://www.linkedin.com/company/unlayer/mycompany/" title="LinkedIn" target="_blank">
//                   <img src="cid:image2" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
//                 </a>
//               </td></tr>
//             </tbody></table>
//             <!--[if (mso)|(IE)]></td><![endif]-->
//             <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
//             <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
//               <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
//                 <a href="https://www.instagram.com/unlayer_official/" title="Instagram" target="_blank">
//                   <img src="cid:image4" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
//                 </a>
//               </td></tr>
//             </tbody></table>
//             <!--[if (mso)|(IE)]></td><![endif]-->
//             <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//           </div>
//         </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <table style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//           <tbody>
//             <tr>
//               <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 0px;font-family:helvetica,sans-serif;" align="left">
//           <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #000000;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
//             <tbody>
//               <tr style="vertical-align: top">
//                 <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
//                   <span>&#160;</span>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <table id="u_content_text_3" style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
//           <tbody>
//             <tr>
//               <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 60px 60px;font-family:helvetica,sans-serif;" align="left">
//           <div style="line-height: 140%; text-align: center; word-wrap: break-word;">
//             <p style="font-size: 14px; line-height: 140%;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida risus commodo.</p>
//         <p style="font-size: 14px; line-height: 140%;"> </p>
//         <p style="font-size: 14px; line-height: 140%;"><strong>2261 Market Street #4667, San Francisco, CA 94114 </strong></p>
//           </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//           <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
//           </div>
//         </div>
//         <!--[if (mso)|(IE)]></td><![endif]-->
//               <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
//             </div>
//           </div>
//         </div>
//             <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
//             </td>
//           </tr>
//           </tbody>
//           </table>
//           <!--[if mso]></div><![endif]-->
//           <!--[if IE]></div><![endif]-->
//         </body>
//         </html>`, // html body
//         attachments: [{
//                 filename: 'image-1.png',
//                 path: './public/images/image-1.png',
//                 cid: 'image1'
//             },
//             {
//                 filename: 'image-2.png',
//                 path: './public/images/image-2.png',
//                 cid: 'image2'
//             },
//             {
//                 filename: 'image-3.png',
//                 path: './public/images/image-3.png',
//                 cid: 'image3'
//             },
//             {
//                 filename: 'image-4.png',
//                 path: './public/images/image-4.png',
//                 cid: 'image4'
//             },
//             {
//                 filename: 'image-5.png',
//                 path: './public/images/image-5.png',
//                 cid: 'image5'
//             },
//             {
//                 filename: 'image-6.png',
//                 path: './public/images/image-6.png',
//                 cid: 'image6'
//             },
//             {
//                 filename: 'image-7.png',
//                 path: './public/images/image-7.png',
//                 cid: 'image7'
//             },
//             {
//                 filename: 'image-8.png',
//                 path: './public/images/image-8.png',
//                 cid: 'image8'
//             },
//         ]
//     });
//     console.log(info)
//     res.send(info.messageId)
// })

module.exports = router;