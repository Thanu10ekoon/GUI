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
                bool userfound = context.Users.Any(user => user.email == Email && user.Password == Password);

                if (userfound)
                {
                    GrantAccess();
                    Close();
                }
                else
                {
                    MessageBox.Show("Invalid Username or Password");
                }
            }
        }

        public void GrantAccess()
        {
            Dashboard dashboard = new Dashboard();
            dashboard.Show();
        }
    }
}
