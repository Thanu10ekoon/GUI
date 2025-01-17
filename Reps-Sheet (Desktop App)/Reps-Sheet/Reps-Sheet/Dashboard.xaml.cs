using System;
using System.Linq;
using System.Windows;
using System.Windows.Controls;

namespace Reps_Sheet
{
    public partial class Dashboard : Window
    {
        public int CurrentUserId { get; set; }
        private Workout selectedWorkout;

        public Dashboard()
        {
            InitializeComponent();
            Loaded += Dashboard_Loaded;
        }

        private void Dashboard_Loaded(object sender, RoutedEventArgs e)
        {
            LoadDates();
        }

        private void LoadDates()
        {
            using (var context = new UserDataContext())
            {
                // Load distinct dates for the current user
                var dates = context.Workouts
                    .Where(w => w.UserId == CurrentUserId)
                    .Select(w => w.DateDone.Date)
                    .Distinct()
                    .OrderByDescending(d => d)
                    .ToList();
                DateListBox.ItemsSource = dates;
            }
        }

        private void DateListBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (DateListBox.SelectedItem is DateTime selectedDate)
            {
                LoadWorkoutsForDate(selectedDate);
            }
        }

        private void LoadWorkoutsForDate(DateTime date)
        {
            using (var context = new UserDataContext())
            {
                var workouts = context.Workouts
                    .Where(w => w.UserId == CurrentUserId && w.DateDone.Date == date.Date)
                    .ToList();
                WorkoutsListView.ItemsSource = workouts;
            }
        }

        private void WorkoutsListView_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (WorkoutsListView.SelectedItem is Workout workout)
            {
                selectedWorkout = workout;
                WorkoutNameTextBox.Text = workout.WorkoutName;
                RepsTextBox.Text = workout.Reps.ToString();
                DateDonePicker.SelectedDate = workout.DateDone;
            }
        }

        private void AddWorkout_Click(object sender, RoutedEventArgs e)
        {
            if (!int.TryParse(RepsTextBox.Text, out int reps))
            {
                MessageBox.Show("Please enter a valid number of reps.");
                return;
            }
            var workoutName = WorkoutNameTextBox.Text;
            var dateDone = DateDonePicker.SelectedDate;
            if (dateDone == null)
            {
                MessageBox.Show("Please select a date.");
                return;
            }
            using (var context = new UserDataContext())
            {
                var workout = new Workout
                {
                    WorkoutName = workoutName,
                    Reps = reps,
                    DateDone = dateDone.Value,
                    UserId = CurrentUserId
                };
                context.Workouts.Add(workout);
                context.SaveChanges();
            }
            LoadDates();
            if (DateListBox.SelectedItem is DateTime selectedDate)
            {
                LoadWorkoutsForDate(selectedDate);
            }
            ClearInputFields();
        }

        private void UpdateWorkout_Click(object sender, RoutedEventArgs e)
        {
            if (selectedWorkout == null)
            {
                MessageBox.Show("Please select a workout to update.");
                return;
            }
            if (!int.TryParse(RepsTextBox.Text, out int reps))
            {
                MessageBox.Show("Please enter a valid number of reps.");
                return;
            }
            using (var context = new UserDataContext())
            {
                var workout = context.Workouts.FirstOrDefault(w => w.Id == selectedWorkout.Id);
                if (workout != null)
                {
                    workout.WorkoutName = WorkoutNameTextBox.Text;
                    workout.Reps = reps;
                    workout.DateDone = DateDonePicker.SelectedDate ?? workout.DateDone;
                    context.SaveChanges();
                }
            }
            LoadDates();
            if (DateListBox.SelectedItem is DateTime selectedDate)
            {
                LoadWorkoutsForDate(selectedDate);
            }
            ClearInputFields();
        }

        private void DeleteWorkout_Click(object sender, RoutedEventArgs e)
        {
            if (selectedWorkout == null)
            {
                MessageBox.Show("Please select a workout to delete.");
                return;
            }
            using (var context = new UserDataContext())
            {
                var workout = context.Workouts.FirstOrDefault(w => w.Id == selectedWorkout.Id);
                if (workout != null)
                {
                    context.Workouts.Remove(workout);
                    context.SaveChanges();
                }
            }
            LoadDates();
            if (DateListBox.SelectedItem is DateTime selectedDate)
            {
                LoadWorkoutsForDate(selectedDate);
            }
            ClearInputFields();
        }

        private void ClearInputFields()
        {
            WorkoutNameTextBox.Text = "";
            RepsTextBox.Text = "";
            DateDonePicker.SelectedDate = null;
            selectedWorkout = null;
        }
    }
}
