using System.ComponentModel.DataAnnotations;

namespace Eventopia2023.api.Models.Request
{
    public class RegistrationRequest
    {
        public string username { get; set; }
        [RegularExpression(@"^[a-zA-Z0-9!@#$&()]+$")]
        public string passwordHash{ get; set; }
        public string email { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public int age { get; set; }
        public string gender { get; set; }
        public string phoneNumber { get; set; }
        public string location { get; set; }
    }
}
