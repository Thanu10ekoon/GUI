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
            // Gather input from the text fields
            string name = nametxt.Text.Trim();
            string email = emailtxt.Text.Trim();
            string password = txtPassword.Password;

            // Optional: Simple validation
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

            // Create new user object
            User newUser = new User
            {
                Name = name,
                email = email,
                Password = password
            };

            // Save to database using EF Core
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

                // Clear fields (optional)
                nametxt.Text = string.Empty;
                emailtxt.Text = string.Empty;
                txtPassword.Password = string.Empty;
            }
            catch (Exception ex)
            {
                // Handle or log exception
                MessageBox.Show($"Error saving user: {ex.Message}",
                                "Error",
                                MessageBoxButton.OK,
                                MessageBoxImage.Error);
            }
        }

        // Loop the background video when it ends
        private void BackgroundVideo_MediaEnded(object sender, RoutedEventArgs e)
        {
            BackgroundVideo.Position = TimeSpan.Zero;
            BackgroundVideo.Play();
        }

        // Back button click event to navigate to MainWindow
        private void BackButton_Click(object sender, RoutedEventArgs e)
        {
            MainWindow mainWindow = new MainWindow();  // Create an instance of MainWindow
            mainWindow.Show();                        // Show the MainWindow
            this.Close();                             // Close the current window (Signup)
        }
    }
}
