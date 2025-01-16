using System.ComponentModel.DataAnnotations;

namespace Reps_Sheet
{
    public class User
    {
        public string Name { get; set; }
        public string Password { get; set; }
        [Key]
        public int Id { get; set; }
        public string email { get; set; }
    }
}