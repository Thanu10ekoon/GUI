using System;
using System.ComponentModel.DataAnnotations;

namespace Reps_Sheet
{
    public class Workout
    {
        [Key]
        public int Id { get; set; }
        public DateTime DateDone { get; set; }
        public int Reps { get; set; }
        public string WorkoutName { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
