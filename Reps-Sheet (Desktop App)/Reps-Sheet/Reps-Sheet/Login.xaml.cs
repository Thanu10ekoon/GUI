using System;
using System.Linq;
using System.Windows;

namespace Reps_Sheet
{
    /// <summary>
    /// Interaction logic for Login.xaml
    /// </summary>
    public partial class Login : Window
    {
        public Login()
        {
            InitializeComponent();
        }

        // Make the video loop by resetting position to 0 when it ends
        private void BackgroundVideo_MediaEnded(object sender, RoutedEventArgs e)
        {
            BackgroundVideo.Position = TimeSpan.Zero;
            BackgroundVideo.Play();
        }

        private void LogBtnLogPgClick(object sender, RoutedEventArgs e)
        {
            var Email = emailtxt.Text;
            var Password = txtPassword.Password;

            using (UserDataContext context = new UserDataContext())
            {
                var user = context.Users.FirstOrDefault(u => u.email == Email && u.Password == Password);
                if (user != null)
                {
                    GrantAccess(user.Id);
                    Close();
                }
                else
                {
                    MessageBox.Show("Invalid Username or Password");
                }
            }
        }



        public void GrantAccess(int userId)
        {
            Dashboard dashboard = new Dashboard();
            dashboard.CurrentUserId = userId;
            dashboard.Show();
        }


    }
}
