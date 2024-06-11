using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using Movie.INFARSTRUTURE.Models.MailModel;

namespace MovieApi.Extensions
{
    public interface IMailService
    {
        Task SendMail(MailData mailContent);
        Task SendEmailAsync(string email, string subject, string htmlMessage);
    }
    public class MailService:IMailService
    {
        private readonly MailSettings mailSettings;

        private readonly ILogger<IMailService> logger;


        // mailSetting được Inject qua dịch vụ hệ thống
        // Có inject Logger để xuất log
        public MailService(IOptions<MailSettings> _mailSettings, ILogger<IMailService> _logger)
        {
            mailSettings = _mailSettings.Value;
            logger = _logger;
            logger.LogInformation("Create SendMailService");
        }

        // Gửi email, theo nội dung trong mailContent
        public async Task SendMail(MailData mailContent)
        {
            var email = new MimeMessage();
            email.Sender = new MailboxAddress(mailSettings.SenderName, mailSettings.SenderEmail);
            email.From.Add(new MailboxAddress(mailSettings.SenderName, mailSettings.SenderEmail));
            email.To.Add(MailboxAddress.Parse(mailContent.To));
            email.Subject = mailContent.Subject;


            var builder = new BodyBuilder();
            builder.HtmlBody = mailContent.Body;
            email.Body = builder.ToMessageBody();

            // dùng SmtpClient của MailKit
            using var smtp = new MailKit.Net.Smtp.SmtpClient();

            try
            {
                smtp.Connect(mailSettings.Server, mailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
                smtp.Authenticate(mailSettings.SenderEmail, mailSettings.Password);
                await smtp.SendAsync(email);
            }
            catch (Exception ex)
            {
                // Gửi mail thất bại, nội dung email sẽ lưu vào thư mục mailssave
                System.IO.Directory.CreateDirectory("mailssave");
                var emailsavefile = string.Format(@"mailssave/{0}.eml", Guid.NewGuid());
                await email.WriteToAsync(emailsavefile);

                logger.LogInformation("Lỗi gửi mail, lưu tại - " + emailsavefile);
                logger.LogError(ex.Message);
            }

            smtp.Disconnect(true);

            logger.LogInformation("send mail to " + mailContent.To);

        }
        public async Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            await SendMail(new MailData()
            {
                To = email,
                Subject = subject,
                Body = htmlMessage
            });
        }

    }
}
