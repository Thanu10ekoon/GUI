using System;
using System.Windows;
using System.Windows.Controls;

namespace Reps_Sheet
{
    public partial class Signup : Window
    {
        public Signup()
        {
            InitializeComponent();
        }

        private void SignBtnSignPgClick(object sender, RoutedEventArgs e)
        {
            string name = nametxt.Text.Trim();
            string email = emailtxt.Text.Trim();
            string password = txtPassword.Password;

            if (string.IsNullOrWhiteSpace(name) ||
                string.IsNullOrWhiteSpace(email) ||
                string.IsNullOrWhiteSpace(password))
            {
                MessageBox.Show("Please fill in all fields.",
                                "Validation Error",
                                MessageBoxButton.OK,
                                MessageBoxImage.Warning);
                return;
            }

            User newUser = new User
            {
                Name = name,
                email = email,
                Password = password
            };

            try
            {
                using (var context = new UserDataContext())
                {
                    context.Users.Add(newUser);
                    context.SaveChanges();
                }

                MessageBox.Show("User registered successfully!",
                                "Success",
                                MessageBoxButton.OK,
                                MessageBoxImage.Information);

                nametxt.Text = string.Empty;
                emailtxt.Text = string.Empty;
                txtPassword.Password = string.Empty;
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error saving user: {ex.Message}",
                                "Error",
                                MessageBoxButton.OK,
                                MessageBoxImage.Error);
            }
        }

        private void BackgroundVideo_MediaEnded(object sender, RoutedEventArgs e)
        {
            var mediaElement = sender as MediaElement;
            if (mediaElement != null)
            {
                mediaElement.Position = TimeSpan.Zero;
                mediaElement.Play();
            }
        }
    }
}
