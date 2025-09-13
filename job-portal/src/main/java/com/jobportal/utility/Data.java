package com.jobportal.utility;

public class Data {
    public static String getMessageBody(String otp, String username) {
        return String.format("""
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>OTP Verification</title>
                  <style>
                    body {
                      margin: 0;
                      padding: 0;
                      font-family: Arial, sans-serif;
                      background-color: #f6f6f6;
                    }
                    .container {
                      max-width: 600px;
                      margin: 40px auto;
                      background-color: #ffffff;
                      padding: 30px;
                      border-radius: 8px;
                      box-shadow: 0 0 5px rgba(0,0,0,0.1);
                    }
                    .header {
                      text-align: center;
                      padding-bottom: 20px;
                    }
                    .otp {
                      font-size: 28px;
                      font-weight: bold;
                      color: #2d89ef;
                      letter-spacing: 8px;
                      margin: 20px 0;
                      text-align: center;
                    }
                    .footer {
                      margin-top: 30px;
                      font-size: 12px;
                      color: #888;
                      text-align: center;
                    }
                    @media (max-width: 600px) {
                      .container {
                        margin: 20px;
                        padding: 20px;
                      }
                    }
                  </style>
                </head>
                <body>
                
                  <div class="container">
                    <div class="header">
                      <h2>Verify Your Email Address</h2>
                    </div>
                
                    <p>Hello, %s!</p>
                
                    <p>To complete your verification, please use the following One-Time Password (OTP):</p>
                
                    <div class="otp">%s</div>
                
                    <p>This code is valid for the next 10 minutes. Please do not share this code with anyone.</p>
                
                    <p>If you did not request this, please ignore this email.</p>
                
                    <div class="footer">
                      &copy; 2025 Job Hunt. All rights reserved.
                    </div>
                  </div>
                
                </body>
                </html>
                """, username, otp);

    }
}
